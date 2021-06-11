import * as authControllers from "../controllers/authControllers";
import { Router } from "express";

const router = Router();

router.post("/signup", authControllers.signup);
router.post("/signin", authControllers.signin);
router.get("/signout", authControllers.signout);
router.get("/confirmation/:token", authControllers.confirmation);
router.get("/checkCookie", authControllers.checkCookie);
// oauth
router.get("/google/confirmation", authControllers.googleConfirmation);

export default router;
