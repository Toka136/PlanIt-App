const Task = require("../models/taskModel");
const asyncWrapper = require("../middleWares/asyncWrapper");
const getuserInfo = require("../utils/getUserinfo");
const responsStatus = require("../utils/responseStatus");
const appError = require("../utils/appError");
const getTasks = asyncWrapper(async (req, res, next) => {
  const resp = await getuserInfo(req.cookies.token);
  if (resp.status === "failed")
    next(appError.create(resp.id, 400, responsStatus.FAILED));
  const priority = req.query.p;
  const status = req.query.s;
  let tasks = [];
  if (!priority && !status) {
    tasks = await Task.find({ owner: resp.id });
  } else if (!priority && status) {
    tasks = await Task.find({ $and: [{ owner: resp.id }, { status: status }] });
  } else if (priority && !status) {
    tasks = await Task.find({
      $and: [{ owner: resp.id }, { priority: priority }],
    });
  } else {
    tasks = await Task.find({
      $and: [{ owner: resp.id }, { status: status }, { priority: priority }],
    });
  }
  return res.status(200).json({ status: responsStatus.SUCCESS, data: tasks });
});
const addTask = asyncWrapper(async (req, res, next) => {
  const resp = await getuserInfo(req.cookies.token);
  if (resp.status === "failed")
    next(appError.create(resp.id, 400, responsStatus.FAILED));
  else {
    const task = Task({
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      owner: resp.id,
    });
    await task.save();
    return res.status(201).json({ status: responsStatus.SUCCESS, task });
  }
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const deleteInfo = await Task.deleteOne({ _id: id });
  return res
    .status(200)
    .json({ status: responsStatus.SUCCESS, data: deleteInfo });
});
const getTask = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  return res.status(200).json({ status: responsStatus.SUCCESS, data: task });
});
module.exports = {
  addTask,
  getTasks,
  deleteTask,
  getTask,
};
