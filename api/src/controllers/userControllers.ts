import { users } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { BadRequestError } from "../utils/errorHandler/BadRequestError";
import { ForbiddenError } from "../utils/errorHandler/ForbiddenError";
import { InternalError } from "../utils/errorHandler/InternalError";
import { NotFoundError } from "../utils/errorHandler/NotFoundError";
import { SelectUser } from "../utils/Interface/UserInterface";
import fs from "fs";

export default {
  // === GET METHOD ===

  user: async (req: Request, res: Response, next: NextFunction) => {
    const { username } = req.params;

    let user;
    try {
      user = await prisma.users.findUnique({ where: { username }, select: SelectUser });
      if (!user) return next(new NotFoundError("User not found"));
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }

    return res.json({ success: true, user });
  },

  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    let users;
    try {
      users = await prisma.users.findMany({
        where: { confirmed: true },
        orderBy: [{ created_at: "desc" }],
        select: SelectUser,
      });

      if (!users) return next(new NotFoundError("There's no user"));
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }

    return res.json({ success: true, users });
  },

  // === PATCH METHOD ===
  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    const { username } = req.params;

    let newThing = req.body;

    if (file) {
      // check is image_uri already exist, if exist delete from public/image
      try {
        const user = await prisma.users.findUnique({ where: { username }, select: SelectUser });

        if (!user) return next(new NotFoundError("User not found"));

        if (user.image_uri) {
          fs.unlinkSync(`public\\images\\${user.image_uri}`);
        }
      } catch (err) {
        return next(new InternalError("Something went wrong", err));
      }
    }

    newThing = { ...newThing, image_uri: file.filename };

    if (newThing.password || newThing.email || newThing.created_at || newThing.confirmed || newThing.role)
      return next(new ForbiddenError("Invalid key"));

    let user: Partial<users>;

    try {
      user = await prisma.users.update({ data: { updated_at: new Date(), ...newThing }, where: { username } });
      console.log(user);
      if (!user) return next(new NotFoundError("User not found"));
    } catch (err) {
      return next(new BadRequestError("Username already exist, please change other username", err));
    }

    res.json({ success: true, user });
  },
};
