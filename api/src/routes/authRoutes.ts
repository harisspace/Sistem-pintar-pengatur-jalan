import authControllers from "../controllers/authControllers";
import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/signin", authControllers.signin);
router.get("/confirmation/:token", authControllers.confirmation);
// oauth
router.get("/google/confirmation", authControllers.googleConfirmation);

export default router;
