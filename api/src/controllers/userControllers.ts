import { users } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { BadRequestError } from "../utils/errorHandler/BadRequestError";
import { ForbiddenError } from "../utils/errorHandler/ForbiddenError";
import { InternalError } from "../utils/errorHandler/InternalError";
import { NotFoundError } from "../utils/errorHandler/NotFoundError";
import { SelectUser } from "../utils/Interface/Select.db.cols";
import fs from "fs";

// === GET METHOD ===

export const user = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;

  let user;
  try {
    user = await prisma.users.findUnique({ where: { username }, select: SelectUser });
    if (!user) return next(new NotFoundError("User not found"));
  } catch (err) {
    return next(new InternalError("Something went wrong", err));
  }

  return res.json({ success: true, user });
};

export const getNotifications = async (req: Request, res: Response, next: NextFunction) => {
  let notifications;
  try {
    notifications = await prisma.notifications.findMany({ where: { to_uid: res.locals.user.user_uid } });
  } catch (err) {
    return next(new InternalError("Something was wrong"));
  }

  return res.json(notifications);
};

export const allUsers = async (req: Request, res: Response, next: NextFunction) => {
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
};

// === PATCH METHOD ===
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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

      newThing = { ...newThing, image_uri: file.filename };
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }
  }

  // cannot change this column
  if (newThing.password || newThing.email || newThing.created_at || newThing.confirmed || newThing.role) {
    return next(new ForbiddenError("Invalid key"));
  }

  let user: Partial<users>;

  try {
    user = await prisma.users.update({ data: { updated_at: new Date(), ...newThing }, where: { username } });
    console.log(user);
    if (!user) return next(new NotFoundError("User not found"));
  } catch (err) {
    return next(new BadRequestError("Username already exist, please change other username", err));
  }

  res.json({ success: true, user });
};

// === DELETE METHOD ===
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username;

  console.log(username);
  if (!username) return next(new BadRequestError("Username must provided"));

  const user = await prisma.users
    .delete({ where: { username }, select: SelectUser })
    .catch((err) => next(new InternalError("Something went wrong")));
  console.log(user);

  if (!user) return next(new NotFoundError("User not found"));

  res.clearCookie("token");
  res.clearCookie("oauth_token");

  return res.json({ user, success: true });
};
