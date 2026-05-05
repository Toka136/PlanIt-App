const Task = require("../models/taskModel");
const mongoose = require("mongoose");
const asyncWrapper = require("../middleWares/asyncWrapper");
const getuserInfo = require("../utils/getUserinfo");
const responsStatus = require("../utils/responseStatus");
const appError = require("../utils/appError");
const taskStatus = require("../utils/taskStatus");
const taskService = require("../services/taskService");
const getTasks = asyncWrapper(async (req, res, next) => {
  const result = await taskService.getTasks(req.cookies.token, req.query);
  return res.status(200).json({
    status: responsStatus.SUCCESS,
    ...result,
  });
});
const updateTask = asyncWrapper(async (req, res, next) => {
  const body = req.body;
  const task = await taskService.updateTask(body);
  res.status(200).json({ status: responsStatus.SUCCESS, data: task });
});
const addTask = asyncWrapper(async (req, res, next) => {
  const task = await taskService.addTask(req.body, req.cookies.token);
  return res.status(201).json({ status: responsStatus.SUCCESS, data: task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deleteInfo = await taskService.deleteTask(id);
  return res
    .status(200)
    .json({ status: responsStatus.SUCCESS, data: deleteInfo });
});
const getTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await taskService.getTask(id);
  return res.status(200).json({ status: responsStatus.SUCCESS, data: task });
});
const getTasksStats = asyncWrapper(async (req, res, next) => {
  const stats = await taskService.getTasksStats(req.cookies.token);
  return res.status(200).json({ status: responsStatus.SUCCESS, data: stats });
});
const getTasksCloseDate = asyncWrapper(async (req, res, next) => {
  const tasks = await taskService.getTasksCloseDate(req.cookies.token);
  return res.status(200).json({ status: responsStatus.SUCCESS, data: tasks });
});
module.exports = {
  addTask,
  getTasks,
  deleteTask,
  getTask,
  updateTask,
  getTasksStats,
  getTasksCloseDate,
};
