const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const upload = require("../utils/multerCode");
const ValidationMiddleware = require("../middleWares/Validation");
const { registerSchema } = require("../Schema/Auth/registerSchema");
router
  .route("/register")
  .post(
    upload.single("avatar"),
    ValidationMiddleware(registerSchema, 1),
    authController.register,
  );
router.route("/login").post(authController.login);
router.route("/logOut").get(authController.logout);
router.route("/refreshToken").get(authController.refreshToken);
module.exports = router;
