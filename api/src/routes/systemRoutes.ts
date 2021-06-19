import { Router } from "express";
import * as systemControllers from "../controllers/systemControllers";
import { checkAuth } from "../utils/authentication/checkAuth";
import { isSuperAdmin } from "../utils/authentication/isSuperAdmin";
import { uploudImage } from "../utils/upload/image";

const router = Router();

router
  .route("/")
  .get(checkAuth, systemControllers.getSystems)
  .post(checkAuth, isSuperAdmin, uploudImage.single("image"), systemControllers.create_system);
router.get("/find", checkAuth, systemControllers.findSystem);
router
  .route("/:systemName")
  .get(checkAuth, systemControllers.getSystem)
  .patch(checkAuth, isSuperAdmin, systemControllers.updateSystem)
  .post(checkAuth, systemControllers.requestTobeAdmin)
  .delete(checkAuth, isSuperAdmin, systemControllers.deleteSystem);

export default router;
