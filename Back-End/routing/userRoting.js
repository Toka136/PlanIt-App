const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const upload = require("../utils/multerCode");
const ValidationMiddleware = require("../middleWares/Validation");
const { updateUserSchema } = require("../Schema/Users/UpdateUser");
router.route("/profile/delete").delete( userController.deleteUser);
router.route("/profile/").get(userController.getUser);
router
  .route("/profile/update")
  .patch(
    upload.single("avatar"),
    ValidationMiddleware(updateUserSchema, 1),
    userController.updateUser,
  );
module.exports = router;
