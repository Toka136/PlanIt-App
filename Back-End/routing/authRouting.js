const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    console.log("fileName", fileName);
    cb(null, fileName);
  },
});
const fileFilter = function (req, file, cb) {
  const fileType = file.mimetype.split("/")[0];
  {
    if (fileType === "image") {
      cb(null, true);
    } else {
      cb(appError.create("inavlid file type", 400, responsStatus.FAILED));
    }
  }
};
const upload = multer({ storage: storage, fileFilter });
const authController = require("../controllers/authController");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
router
  .route("/register")
  .post(upload.single("avatar"), authController.register);
router.route("/login").post(authController.login);
module.exports = router;
