const express = require("express");
const Permission = require("../middleWares/deltePermission");
const userController = require("../controllers/userController");
const router = express.Router();
const upload = require("../utils/multerCode");
const ValidationMiddleware = require("../middleWares/Validation");
const { updateUserSchema } = require("../Schema/Users/UpdateUser");
router.route("/:id").delete(Permission, userController.deleteUser);
router.route("/profile/").get(userController.getUser);
router
  .route("/profile/update")
  .patch(
    upload.single("avatar"),
    ValidationMiddleware(updateUserSchema, 1),
    userController.updateUser,
  );
module.exports = router;
