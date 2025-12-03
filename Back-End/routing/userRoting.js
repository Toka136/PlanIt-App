const express = require("express");
const Permission = require("../middleWares/deltePermission");
const userController = require("../controllers/userController");
const router = express.Router();
const upload = require("../utils/multerCode");
router
  .route("/:id")
  .delete(Permission, userController.deleteUser)
  .get(Permission, userController.getUser);
router
  .route("/avatar/:id")
  .patch(Permission, upload.single("avatar"), userController.updateUserAvatar);
router.route("/username/:id").patch(Permission, userController.updateUserName);
router
  .route("/password/:id")
  .patch(Permission, userController.updateUserPassword);
module.exports = router;
