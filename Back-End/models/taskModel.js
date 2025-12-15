const mongoose = require("mongoose");
const taskStatus = require("../utils/taskStatus");
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
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: taskStatus.Notstrted,
    enum: [taskStatus.Completed, taskStatus.InProgress, taskStatus.Notstrted],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
module.exports = mongoose.model("Task", taskSchema);
