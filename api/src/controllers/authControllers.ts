import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../server";
import { generateToken, verifyToken } from "../utils/authentication/generateToken";
import { BadRequestError } from "../utils/errorHandler/BadRequestError";
import { InternalError } from "../utils/errorHandler/InternalError";
import { signinValidator, signupValidator } from "../utils/validator/authValidator";
import { SelectUser } from "../utils/Interface/UserInterface";
import { Signin, Signup } from "../utils/Interface/authInterface";
import { Email } from "../utils/authentication/SendEmail";
import { UnauthorizedError } from "../utils/errorHandler/UnauthorizedError";
import { NotFoundError } from "../utils/errorHandler/NotFoundError";
import { serializeCookie } from "../utils/authentication/cookie";
import queryString from "querystring";
import axios from "axios";
import { users } from ".prisma/client";

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
    let user: Partial<users>;
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

    let user: Partial<users> | null;

    try {
      user = await prisma.users.findUnique({ where: { email } });
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
    } catch (err) {
      return next(new InternalError("Something went wrong"));
    }
    // match password
    const passwordMatch = await bcrypt.compare(password, user.password!);

    if (!passwordMatch) {
      return next(
        new BadRequestError("Incorrect password", {
          password: "Incorrect password",
        })
      );
    }

    // generate token
    const token = generateToken({ username: user.username as string, email });

    // handle if user not confirmed account (respon)
    if (user && !user.confirmed) {
      const setQueryString = queryString.stringify({ token });
      return res.status(400).json({
        message: "User need confirmation email",
        errors: {
          global: "User need confirmation email",
          options: {
            email: {
              message: "Not receive email?, pleases click this link to send back",
              redirect: `/auth/email?${setQueryString}`,
            },
          },
        },
      });
    }

    // set to cookie
    res.set("Set-Cookie", serializeCookie("token", token));

    // remove password
    const { password: passwordDB, ...userWithoutPass } = user;

    return res.json({ user: { ...userWithoutPass }, redirect: "/" });
  },

  // ==== GET METHOD ====
  confirmation: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;

    let username: any, email: any;
    verifyToken((<unknown>token) as string, process.env.JWT_SECRET!, (err: any, decodedToken: any) => {
      if (err) {
        return next(new BadRequestError("Invalid token", err));
      }
      console.log(decodedToken);
      username = decodedToken.username;
      email = decodedToken.email;
      const expiredTime = decodedToken.exp;
      if (Date.now() >= expiredTime * 1000) {
        return next(new BadRequestError("Token expired"));
      }
    });

    if (!username && !email) {
      return next(new UnauthorizedError("Invalid token"));
    }

    try {
      const user = await prisma.users.update({ where: { email }, data: { confirmed: true } });
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

  googleConfirmation: async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;

    console.log(code);

    if (!code) {
      return next(new BadRequestError("Invalid query string"));
    }

    const {
      data: { access_token },
    } = await axios({
      url: `https://oauth2.googleapis.com/token`,
      method: "post",
      data: {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: process.env.OAUTH_REDIRECT,
        grant_type: "authorization_code",
        code,
      },
    });

    if (!access_token) {
      return next(new InternalError("Cannot get access token"));
    }

    const { data } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(data); // { id, email, given_name, family_name }

    if (!data) {
      return next(new InternalError("Cannot get data from token"));
    }

    const { email, name, pictureUri } = data;

    // insert to db data users if does't exist, if exist just return user
    let user: any;
    let isUserRegistered: any;
    try {
      isUserRegistered = await prisma.users.findUnique({ where: { email }, select: SelectUser });

      if (!isUserRegistered) {
        user = await prisma.users.create({
          data: { email: email, user_role: "user", password: "google", username: name, confirmed: true },
        });

        if (!user) {
          return next(new InternalError("Cannot create user"));
        }
      }
    } catch (err) {
      return next(new InternalError("Something went wrong", err));
    }

    // set google token
    const oauth_token = generateToken({ username: name, email });
    res.set("Set-Cookie", serializeCookie("oauth_token", oauth_token));

    if (isUserRegistered) {
      return res.json({ success: true, user: isUserRegistered });
    } else {
      return res.json({ success: true, user });
    }
  },

  signout: async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    const oauth_token = req.cookies.oauth_token;
    if (token) res.clearCookie("token");
    if (oauth_token) res.clearCookie("oauth_token");

    return res.json({ success: true, redirect: "/signin" });
  },
};
