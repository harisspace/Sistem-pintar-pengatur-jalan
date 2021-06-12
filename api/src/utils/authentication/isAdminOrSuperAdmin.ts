// import { NextFunction, Request, Response } from "express";
// import { prisma } from "../../server";
// import { ForbiddenError } from "../errorHandler/ForbiddenError";

// export const isAdminOrSuperAdmin = async (req: Request, res: Response, next: NextFunction) => {
//   const { user_role, user_uid } = res.locals.user;

//   if (user_role === "user") return next(new ForbiddenError("You're not allowed"));

//   try {
//     const user = await prisma.usersystemlinks.fi;
//   } catch (err) {}

//   next();
// };
