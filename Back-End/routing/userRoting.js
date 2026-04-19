const express = require("express");
const Permission = require("../middleWares/deltePermission");
const userController = require("../controllers/userController");
const router = express.Router();
const upload = require("../utils/multerCode");
router.route("/:id").delete(Permission, userController.deleteUser);
router.route("/profile/").get(userController.getUser);
router
  .route("/profile/update")
  .patch(upload.single("avatar"), userController.updateUser);
module.exports = router;
