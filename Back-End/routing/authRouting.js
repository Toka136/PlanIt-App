const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../utils/multerCode");
router
  .route("/register")
  .post(upload.single("avatar"), authController.register);
router.route("/login").post(authController.login);
module.exports = router;
