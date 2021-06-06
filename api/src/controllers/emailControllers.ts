import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import { verifyToken } from "../utils/authentication/generateToken";
import { Email } from "../utils/authentication/SendEmail";
import { ForbiddenError } from "../utils/errorHandler/ForbiddenError";
import { NotFoundError } from "../utils/errorHandler/NotFoundError";
import { BadRequestError } from "../utils/errorHandler/BadRequestError";

export default {
  // === GET ===
  resendEmail: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.query?.token;

    console.log(token);
    if (!token || token === undefined) {
      console.log("masuk");
      return next(new BadRequestError("Token must provided as query string"));
    }

    const { username, email }: any = verifyToken(token as string, process.env.JWT_SECRET!);
    console.log(username, email);

    if (username && email) {
      try {
        const user = await prisma.users.findUnique({ where: { email } });
        if (user) {
          const transporter = new Email(email, token as string);
          if (process.env.NODE_ENV === "development") {
            transporter.verify();
          }
          const emailResult = await transporter.sendEmail();
          console.log(emailResult);
        }
      } catch (err) {
        return next(new NotFoundError("User not found", err));
      }
    } else {
      return next(new ForbiddenError("Invalid token query string"));
    }

    return res.json({ success: true, redirect: "/" });
  },
};
