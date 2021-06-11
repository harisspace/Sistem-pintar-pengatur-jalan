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
// === GET METHOD ===

// get all systems
export const getSystems = async (req: Request, res: Response, next: NextFunction) => {
  const systems = await prisma.systems
    .findMany({ orderBy: { created_at: "desc" }, select: { ...SelectSystem, users: { select: SelectUser } } })
    .catch((err) => next(new InternalError("Something went wrong", err)));

  if (systems) return next(new NotFoundError("There's no system yet"));

  res.json(systems);
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
  const { name, placed }: CreateSystem = req.body;
  const file = req.file;

  let image_uri: string = "sistem.png";
  if (file) {
    image_uri = file.filename;
  }

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
  } catch (err) {
    return next(new InternalError("Something went wrong"));
  }

  return res.json({ success: true, system });
};
