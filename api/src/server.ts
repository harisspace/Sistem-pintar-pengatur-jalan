import express, { Request } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { isOperationalError, logError, logErrorMiddleware, returnError } from "./utils/errorHandler/logger";
import authRoutes from "./routes/authRoutes";
import { NotFoundError } from "./utils/errorHandler/NotFoundError";
import emailRoutes from "./routes/emailRoutes";
import userRouter from "./routes/userRoutes";
import systemRoutes from "./routes/systemRoutes";
import { createServer, IncomingMessage } from "http";
import WebSocket from "ws";
import { generateToken, verifyToken } from "./utils/authentication/generateToken";
import { IncomingMessageCustom } from "./types/custom";

dotenv.config();
// setup prisma orm
export const prisma = new PrismaClient();
// express app
const app = express();

// allow origin and cross origin
app.use(
  cors({
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  })
);

// server
const server = createServer(app);

// websocket instance
const wss = new WebSocket.Server({ noServer: true });

// logging http req and res for development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// settings middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cookie parser
app.use(cookieParser());
app.use(express.static("public"));

// routes - base (api/v1)
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/system", systemRoutes);

// handle 404 for endpoint doesnt exist
app.all("*", (req, res, next) => {
  next(new NotFoundError(`Can't find ${req.originalUrl}`));
});

function parseCookies(request: IncomingMessage) {
  let list: any = {},
    rc = request.headers.cookie;

  rc &&
    rc.split(";").forEach(function (cookie) {
      let parts: any = cookie.split("=");
      list[parts.shift().trim()] = decodeURI(parts.join("="));
    });

  return list;
}

// websocket
server.on("upgrade", (req, socket, head) => {
  let cookies: any;
  let decodedToken: any;
  if (req.headers.cookie) {
    cookies = parseCookies(req);
    try {
      decodedToken = verifyToken(cookies.token, process.env.JWT_SECRET!);
    } catch (err) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
    }
  }
  const user_uid = decodedToken.user_uid;
  req.user_uid = user_uid;

  wss.handleUpgrade(req, socket, head, function done(ws) {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", (ws, req: IncomingMessageCustom) => {
  console.log(req.user_uid);
  ws.on("message", function incoming(data: any) {
    console.log(data);
    let clientData = JSON.parse(data);
    console.log(clientData.user_uid);

    wss.clients.forEach((client) => {
      if (client !== ws && clientData.user_uid == req.user_uid && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ data: "ini data dari server" }));
        console.log("in");
      }
    });
  });
});

// handle error and logging error
app.use(logErrorMiddleware);
app.use(returnError);

// socket instance

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

server.listen(process.env.PORT || 4000, () => {
  console.log(`running on port ${process.env.PORT || 4000}`);
});
