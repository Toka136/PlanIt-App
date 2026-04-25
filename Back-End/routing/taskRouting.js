const express = require("express");
const taskController = require("../controllers/taskController");
const taskPermission = require("../middleWares/taskPermission");
const ValidationMiddleware = require("../middleWares/Validation");
const { addTaskSchema } = require("../Schema/Tasks/addTaskSchema");
const { editTaskSchema } = require("../Schema/Tasks/editTaskSchema");
const { getTasksSchema } = require("../Schema/Tasks/getTasks");
const { idValidation } = require("../Schema/Tasks/IdValidation");
const router = express.Router();
router
  .route("/")
  .get(ValidationMiddleware(getTasksSchema, 2), taskController.getTasks);
router.route("/stats").get(taskController.getTasksStats);
router
  .route("/create")
  .post(ValidationMiddleware(addTaskSchema, 1), taskController.addTask);
router.route("/closeDate").get(taskController.getTasksCloseDate);
router
  .route("/:id")
  .delete(
    ValidationMiddleware(idValidation, 0),
    taskPermission,
    taskController.deleteTask,
  )
  .get(
    ValidationMiddleware(idValidation, 0),
    taskPermission,
    taskController.getTask,
  )
  .patch(
    taskPermission,
    ValidationMiddleware(editTaskSchema, 1),
    taskController.updateTask,
  );

module.exports = router;
