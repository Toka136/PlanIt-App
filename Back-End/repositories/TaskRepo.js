const Task = require("../models/taskModel");
const taskStatus = require("../utils/taskStatus");

const getTasks = async (filter, skip, limit) => {
  return await Task.find(filter).skip(skip).limit(limit);
};
const getTasksCount = async (filter) => {
  return await Task.countDocuments(filter);
};
const deleteTask = async (id) => {
  return await Task.deleteOne({ _id: id });
};
const saveTask = async (task) => {
  const new_task = new Task(task);
  return await new_task.save();
};
const saveTaskD = async (task) => {
  return await task.save();
};
const getTaskById = async (id) => {
  return await Task.findById(id);
};
const getStats = async (id) => {
  const stats = await Task.aggregate([
    { $match: { owner: id } },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        inprogressCount: {
          $sum: { $cond: [{ $eq: ["$status", taskStatus.InProgress] }, 1, 0] },
        },
        notStartCount: {
          $sum: { $cond: [{ $eq: ["$status", taskStatus.Notstarted] }, 1, 0] },
        },
        completedCount: {
          $sum: { $cond: [{ $eq: ["$status", taskStatus.Completed] }, 1, 0] },
        },
        completeRate: {
          $avg: { $cond: [{ $eq: ["$status", taskStatus.Completed] }, 1, 0] },
        },
      },
    },
  ]);
  return stats;
};
const getTasksCloseDate = async (id) => {
  const tasks = await Task.aggregate([
    { $match: { owner: id } },
    {
      $addFields: {
        diffInDays: {
          $ceil: {
            $divide: [
              { $subtract: ["$dueDate", "$$NOW"] },
              1000 * 60 * 60 * 24,
            ],
          },
        },
      },
    },
    {
      $match: {
        diffInDays: { $lte: 2 },
        status: { $ne: taskStatus.Completed },
      },
    },
    { $sort: { diffInDays: 1 } },
    {
      $addFields: {
        relativeTime: {
          $switch: {
            branches: [
              { case: { $lt: ["$diffInDays", 0] }, then: "overdue" },
              { case: { $eq: ["$diffInDays", 0] }, then: "today" },
              { case: { $eq: ["$diffInDays", 1] }, then: "tomorrow" },
              { case: { $eq: ["$diffInDays", 2] }, then: "in 2 days" },
            ],
            default: "later",
          },
        },
      },
    },
  ]);
  return tasks;
};
module.exports = {
  getTasks,
  getTasksCount,
  deleteTask,
  saveTask,
  getTaskById,
  saveTaskD,
  getStats,
  getTasksCloseDate,
};
