import { Router } from "express";
import * as systemControllers from "../controllers/systemControllers";
import { checkAuth } from "../utils/authentication/checkAuth";
import { isSuperAdmin } from "../utils/authentication/isSuperAdmin";

const router = Router();

router
  .route("/")
  .get(checkAuth, isSuperAdmin, systemControllers.getSystems)
  .post(checkAuth, isSuperAdmin, systemControllers.create_system);
router.get("/find", checkAuth, systemControllers.findSystem);
router
  .route("/:systemName")
  .patch(checkAuth, isSuperAdmin, systemControllers.updateSystem)
  .delete(checkAuth, isSuperAdmin, systemControllers.deleteSystem);

export default router;
