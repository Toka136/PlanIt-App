const express = require("express");
const taskController = require("../controllers/taskController");
const taskPermission = require("../middleWares/taskPermission");
const ValidationMiddleware = require("../middleWares/Validation");
const { addTaskSchema } = require("../Schema/Tasks/addTaskSchema");
const router = express.Router();
router.route("/").get(taskController.getTasks);
router.route("/stats").get(taskController.getTasksStats);
router
  .route("/create")
  .post(ValidationMiddleware(addTaskSchema), taskController.addTask);
router.route("/closeDate").get(taskController.getTasksCloseDate);
router
  .route("/:id")
  .delete(taskPermission, taskController.deleteTask)
  .get(taskPermission, taskController.getTask)
  .patch(taskPermission, taskController.updateTask);

module.exports = router;
