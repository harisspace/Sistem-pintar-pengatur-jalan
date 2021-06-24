import { users } from ".prisma/client";
import { NextFunction, Request, Response } from "express";
import { ForbiddenError } from "../errorHandler/ForbiddenError";

export const isMe = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.params;

  const user: Partial<users> = res.locals.user;
  console.log(user, username);

  if (username !== user.username) return next(new ForbiddenError("You are not allowed"));

  return next();
};
