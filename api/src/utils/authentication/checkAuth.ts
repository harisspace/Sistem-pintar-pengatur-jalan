import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errorHandler/UnauthorizedError";
import jwt from "jsonwebtoken";
import { prisma } from "../../server";
import { SelectUser } from "../Interface/UserInterface";
import { InternalError } from "../errorHandler/InternalError";
import { users } from ".prisma/client";
import { NotFoundError } from "../errorHandler/NotFoundError";

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.token;

  let user: Partial<users> | null;
  let email, username;

  if (!token) {
    return next(new UnauthorizedError("Unauthenticated, please loggin first"));
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decodedToken: any) => {
    if (err) {
      return next(new UnauthorizedError("Unauthenticated, invalid token", err));
    }

    email = decodedToken.email;
    const exp = decodedToken.exp;
    username = decodedToken.username;

    if (Date.now() >= exp * 1000) {
      return next(new UnauthorizedError("Unauthenticated, expired token"));
    }
  });

  try {
    user = await prisma.users.findUnique({ where: { email }, select: SelectUser });
    if (!user) {
      return next(new NotFoundError("User not found"));
    }
  } catch (err) {
    return next(new InternalError("Something went wrong"));
  }

  if (user) res.locals.user = user;

  return next();
};
