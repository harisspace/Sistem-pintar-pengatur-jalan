import { NextFunction, query, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../server";
import { generateToken, verifyToken } from "../utils/Auth/generateToken";
import { BadRequestError } from "../utils/errorHandler/BadRequestError";
import { InternalError } from "../utils/errorHandler/InternalError";
import { signinValidator, signupValidator } from "../utils/validator/authValidator";
import { SelectUser, User } from "../utils/Interface/UserInterface";
import { Signin, Signup } from "../utils/Interface/authInterface";
import { Email } from "../utils/Auth/SendEmail";
import { UnauthorizedError } from "../utils/errorHandler/UnauthorizedError";
import { NotFoundError } from "../utils/errorHandler/NotFoundError";
import { serializeCookie } from "../utils/Auth/cookie";
import queryString from "querystring";

// controllers
export default {
  // ==== POST METHOD ====
  signup: async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password }: Signup = req.body;
    const { valid, errors } = signupValidator(username, email, password);

    // if not valid input
    if (!valid) {
      return next(new BadRequestError("Bad user input", errors));
    }

    try {
      //  find user email or username
      const checkUser = await prisma.users.findFirst({
        where: { OR: [{ username }, { email }] },
        select: { user_uid: true },
      });

      // if email exist send email is taken
      if (checkUser) {
        return next(
          new BadRequestError("Username or email is taken", {
            username: "Username or email is taken",
            email: "Username or email is taken",
          })
        );
      }
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }

    // generate token for sending verification link
    const token = generateToken({ username, email });

    // TODO: if not exist send email verification and redirect to home
    const transporter = new Email(email, token);
    if (process.env.NODE_ENV === "development") {
      transporter.verify();
    }
    const emailResult = await transporter.sendEmail();
    console.log(emailResult);

    // hashing password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // save to database
    let user: Partial<User>;
    try {
      user = await prisma.users.create({
        data: {
          username,
          email,
          password: hashPassword,
          user_role: "user",
        },
        select: SelectUser,
      });
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }

    res.json({
      user: { ...user },
      message: "We will send you email message to confirm you're account",
      redirect: "/",
    });
  },

  signin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: Signin = req.body;

    const { errors, valid } = signinValidator(email, password);

    if (!valid) {
      return next(new BadRequestError("Invalid email", errors));
    }

    let user: Partial<User> | null;
    try {
      user = await prisma.users.findUnique({ where: { email }, select: SelectUser });
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
    } catch (err) {
      return next(new InternalError("Something went wrong"));
    }

    // generate token
    const token = generateToken({ username: user.username as string, email });

    // handle if user not confirmed account (respon)
    if (user && !user.confirmed) {
      const setQueryString = queryString.stringify({ token });
      return res.json({
        message: "User need confirmation email",
        options: {
          email: {
            message: "Not receive email?, pleases click this link to send back",
            redirect: `/api/v1/auth/email?${setQueryString}`,
          },
        },
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) {
      return next(
        new BadRequestError("Incorrect password", {
          password: "Incorrect password",
        })
      );
    }

    // set to cookie
    serializeCookie("token", token);

    return res.json({ user: { ...user }, redirect: "/" });
  },

  // ==== GET METHOD ====
  confirmation: (req: Request, res: Response, next: NextFunction) => {
    const token = req.params;

    const { username, email }: any = verifyToken((<unknown>token) as string, process.env.JWT_SECRET!);

    if (!username && !email) {
      return next(new UnauthorizedError("Invalid token"));
    }

    try {
      const user = prisma.users.update({ where: { email, username }, data: { confirmed: true } });
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }

    // create new token anticipate for new expiredIn
    const newToken = generateToken({ username, email });

    // set cookie
    res.set("Set-Cookie", serializeCookie("token", newToken));

    return res.json({ success: true, redirect: "/" });
  },
};
