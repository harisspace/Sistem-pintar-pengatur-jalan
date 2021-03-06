import { NextFunction, Request, Response, Router } from "express";
import queryString from "querystring";
import * as emailControllers from "../controllers/emailControllers";

const router = Router();

router.get("/", emailControllers.resendEmail);

export default router;
