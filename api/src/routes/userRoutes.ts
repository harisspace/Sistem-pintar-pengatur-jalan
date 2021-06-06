import { Router } from "express";
import userControllers from "../controllers/userControllers";
import { isMe } from "../utils/authentication/isMe";
import { uploudImage } from "../utils/upload/image";

const router = Router();

router.get("/", userControllers.allUsers);
router
  .route("/:username")
  .get(userControllers.user)
  .patch(isMe, uploudImage.single("profile"), userControllers.updateUser);

export default router;
