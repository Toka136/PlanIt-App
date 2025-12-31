const express = require("express");
const taskController = require("../controllers/taskController");
const taskPermission = require("../middleWares/taskPermission");
const router = express.Router();
router.route("/").get(taskController.getTasks).post(taskController.addTask);
router
  .route("/:id")
  .delete(taskPermission, taskController.deleteTask)
  .get(taskPermission, taskController.getTask);
module.exports = router;
