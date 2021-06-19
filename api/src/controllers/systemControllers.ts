import { Prisma, systems } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { BadRequestError } from "../utils/errorHandler/BadRequestError";
import { InternalError } from "../utils/errorHandler/InternalError";
import { NotFoundError } from "../utils/errorHandler/NotFoundError";
import { SelectSystem, SelectUser } from "../utils/Interface/Select.db.cols";
import { CreateSystem } from "../utils/Interface/systemInterface";
import { createSystemValidator } from "../utils/validator/systemValidator";
import fs from "fs";
import { verifyToken } from "../utils/authentication/generateToken";
import { UnauthorizedError } from "../utils/errorHandler/UnauthorizedError";
import { ForbiddenError } from "../utils/errorHandler/ForbiddenError";
import { makeText, slugify } from "../utils/helper/slugify";
// === GET METHOD ===

// get all systems
export const getSystems = async (req: Request, res: Response, next: NextFunction) => {
  const systems = await prisma.systems
    .findMany({
      orderBy: { created_at: "desc" },
      select: { ...SelectSystem, users: { select: SelectUser }, usersystemlinks: { select: { user_uid: true } } },
    })
    .catch((err) => err);

  if (systems instanceof Error) return next(new InternalError("Something went wrong"));

  if (systems) {
    if (systems.length < 1) return next(new NotFoundError("There's no system yet"));
  }

  res.json({ systems });
};

export const getSystem = async (req: Request, res: Response, next: NextFunction) => {
  let { systemName: name } = req.params;
  name = makeText(name);

  let system: any;
  try {
    system = await prisma.systems.findUnique({
      where: { name },
      select: {
        users: { select: SelectUser },
        usersystemlinks: { select: { users: { select: { image_uri: true, id: true, username: true } } } },
        created_at: true,
        name: true,
        placed: true,
        status: true,
        image_uri: true,
      },
    });
    if (!system) return next(new NotFoundError("System not found"));
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return next(new BadRequestError("Invalid name"));
    }
    return next(new InternalError("Something went wrong"));
  }
  return res.json(system);
};

export const findSystem = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.query;
  console.log(name);

  let systems: object[];
  try {
    systems = await prisma.systems.findMany({ where: { name: { contains: (<unknown>name) as string } } }); // contains e.g LIKE %name%

    if (systems.length < 1) {
      return next(new NotFoundError("There's no systems match with name query"));
    }
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      return next(new BadRequestError("Invalid name"));
    }
    return next(new InternalError("Something went wrong"));
  }

  return res.json({ systems });
};

// === POST METHOD ===
export const create_system = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.file, req.body);
  const { name, placed }: CreateSystem = req.body;
  const file = req.file;

  let image_uri: string = "sistem.png";
  if (file) {
    image_uri = file.filename;
  }

  // const slugName = slugify(name);

  const { user_uid } = res.locals.user;

  const { valid, errors } = createSystemValidator(name, placed);

  if (!valid) return next(new BadRequestError("Bad user input", errors));

  let system: Partial<systems>;
  try {
    system = await prisma.systems.create({
      data: { name, placed, status: "off", user_uid, image_uri },
      select: SelectSystem,
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (err.code === "P2002") {
        console.log("There is a unique constraint violation, a new system cannot be created");
        return next(new BadRequestError("Name must be unique"));
      }
    }
    return next(new InternalError("Something went wrong"));
  }

  return res.json(system);
};

// === PATCH METHOD ===
export const updateSystem = async (req: Request, res: Response, next: NextFunction) => {
  const { name: nameFromParams } = req.params;
  let newThing = req.body;
  const file = req.file;

  if (file) {
    try {
      const system = await prisma.systems.findUnique({ where: { name: nameFromParams } });
      if (!system) {
        return next(new NotFoundError("system not found"));
      }
      if (system.image_uri) {
        fs.unlinkSync(`public\\images\\${system.image_uri}`);
      }
    } catch (err) {
      return next(new InternalError("Something went wrong"));
    }
  }

  let updatedSystem;
  try {
    updatedSystem = await prisma.systems.update({
      data: { updated_at: new Date(), ...newThing },
      where: { name: nameFromParams },
    });
  } catch (err) {
    return next(new InternalError("Something went wrong"));
  }

  return res.json({ updateSystem });
};

// === DELETE METHOD ===
export const deleteSystem = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params;

  let system;
  try {
    system = await prisma.systems.delete({ where: { name } });
    if (!system) return next(new NotFoundError("System not found, invalid name params"));
  } catch (err) {
    return next(new InternalError("Something went wrong"));
  }

  return res.json({ success: true, system });
};

// === POST METHOD ===
export const requestTobeAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { systemName } = req.params;
  const token = req.headers.authorization?.split(" ")[1]; // ["Bearer", "token"]
  const { user_uid } = req.body; // uuid from user request
  console.log(token);

  if (!token) return next(new UnauthorizedError("Not unauthorized"));

  // check system name
  const system = await prisma.systems.findUnique({ where: { name: systemName } }).catch((err) => err);
  if (system instanceof Error) return next(new InternalError("Something went wrong"));
  if (!system) return next(new NotFoundError("System not found"));

  let username: string;
  try {
    const decodedToken: any = verifyToken(token, process.env.JWT_SECRET!);
    username = decodedToken.username;
  } catch (err) {
    console.log(err);
    return next(new InternalError("Something went wrong"));
  }

  const user = await prisma.users.findUnique({ where: { username }, select: SelectUser }).catch((err) => err);
  if (user instanceof Error) {
    return next(new InternalError("Something went wrong"));
  }

  if (user.user_role !== "superadmin") {
    return next(new ForbiddenError("You're not allowed"));
  }

  // this superadmin
  const findSystemLink = await prisma.usersystemlinks
    .findFirst({ where: { user_uid, system_uid: system.system_uid } })
    .catch((err) => err);
  if (findSystemLink instanceof Error) return next(new InternalError("Something went wrong"));

  if (findSystemLink) return next(new ForbiddenError("You're still admin on this system"));

  // otherwise create admin for this system
  const systemLink = await prisma.usersystemlinks.create({
    data: { user_uid, system_role: "admin", system_uid: system.system_uid },
  });

  return res.json({ success: true, systemLink });
};
