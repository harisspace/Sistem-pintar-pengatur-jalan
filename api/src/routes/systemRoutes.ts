import { Router } from "express";
import * as systemControllers from "../controllers/systemControllers";
import { checkAuth } from "../utils/authentication/checkAuth";
import { isSuperAdmin } from "../utils/authentication/isSuperAdmin";
import { uploadImage } from "../utils/upload/image";

const router = Router();

router
  .route("/")
  .get(checkAuth, systemControllers.getSystems)
  .post(checkAuth, isSuperAdmin, uploadImage.single("image"), systemControllers.create_system);
router.get("/find", checkAuth, systemControllers.findSystem);
router
  .route("/:systemName")
  .get(checkAuth, systemControllers.getSystem)
  .patch(checkAuth, isSuperAdmin, uploadImage.single("image"), systemControllers.updateSystem)
  .post(checkAuth, systemControllers.requestTobeAdmin)
  .delete(checkAuth, isSuperAdmin, systemControllers.deleteSystem);
router
  .route("/join/:systemUid")
  .post(checkAuth, systemControllers.requestJoin)
  .post(checkAuth, isSuperAdmin, systemControllers.addAdmin);

export default router;
