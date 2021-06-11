import { NextFunction, Request, Response } from "express";
import { prisma } from "../../server";
import { ForbiddenError } from "../errorHandler/ForbiddenError";

export const isSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { user_uid, user_role } = res.locals.user;

  if (user_role !== "superadmin") return next(new ForbiddenError("You are not allowed"));

  return next();
};
