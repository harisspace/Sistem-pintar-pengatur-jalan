import { Router } from "express";
import * as userControllers from "../controllers/userControllers";
import { checkAuth } from "../utils/authentication/checkAuth";
import { isMe } from "../utils/authentication/isMe";
import { uploadImage } from "../utils/upload/image";

const router = Router();

router.get("/", userControllers.allUsers);
router.get("/notification", checkAuth, userControllers.getNotifications);
router
  .route("/:username")
  .get(userControllers.user)
  .patch(checkAuth, isMe, uploadImage.single("profile"), userControllers.updateUser)
  .delete(checkAuth, isMe, userControllers.deleteUser);
export default router;
