import { Router } from "express";
import { checkAuth } from "../utils/authentication/checkAuth";
import dashboardControllers from "../controllers/dashboardControllers";

const router = Router();

router.get("/", checkAuth, dashboardControllers.dashboard);

export default router;
