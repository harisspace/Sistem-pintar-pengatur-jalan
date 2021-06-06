import multer from "multer";
import path from "path";
import { makeid } from "../helper/makeid";

// save image with multer
const storage = multer.diskStorage({
  destination: function (_, __, callback) {
    callback(null, "./public/images");
  },
  filename: function (_, file, callback) {
    const name = makeid(4);
    callback(null, name + Date.now() + path.extname(file.originalname)); // e.g hsdfsfj323423 + .jpg
  },
});

export const uploudImage = multer({
  storage,
  fileFilter: (_, file, callback) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      callback(null, true);
    } else {
      callback(new Error("File not image"));
    }
  },
});
