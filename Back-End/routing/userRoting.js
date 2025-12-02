const express = require("express");
const deletePermission = require("../middleWares/deltePermission");
const userController = require("../controllers/userController");
const router = express.Router();
router.route("/").get(userController.getUser);
router.route("/:id").delete(deletePermission, userController.deleteUser);
module.exports = router;
