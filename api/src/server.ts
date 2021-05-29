import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { isOperationalError, logError, logErrorMiddleware, returnError } from "./utils/errorHandler/logger";
import authRoutes from "./routes/authRoutes";
import { NotFoundError } from "./utils/errorHandler/NotFoundError";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();

// setup prisma orm
export const prisma = new PrismaClient();
// express app
const app = express();

// logging http req and res for development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
// allow origin and cross origin
app.use(cors());
// settings middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie parser
app.use(cookieParser());

// routes - base (api/v1)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/email", emailRoutes);

// handle 404 for endpoint doesnt exist
app.all("*", (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl}`));
});

// handle error and logging error
app.use(logErrorMiddleware);
app.use(returnError);

process.on("unhandledRejection", (error) => {
  logError(error);
  throw error;
});

process.on("uncaughtException", (error) => {
  logError(error);
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`running on port ${process.env.PORT || 4000}`);
});