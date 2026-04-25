const mongoose = require("mongoose");
const taskStatus = require("../utils/taskStatus");
const taskPeriority = require("../utils/taskPeriority");
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  priority: {
    type: String,
    required: true,
    enum: [taskPeriority.low, taskPeriority.meduim, taskPeriority.heigh],
  },
  status: {
    type: String,
    default: taskStatus.Notstarted,
    enum: [taskStatus.Completed, taskStatus.InProgress, taskStatus.Notstarted],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Task", taskSchema);
