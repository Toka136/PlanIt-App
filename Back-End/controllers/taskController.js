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
const updateTask = asyncWrapper(async (req, res, next) => {
  const body = req.body;
  console.log("task update body", body);
  const task = await Task.findById(body._id);
  if (task) {
    console.log("task", task);
    task.title = body.title ? body.title : task.title;
    task.description = body.description ? body.description : task.description;
    task.dueDate = body.dueDate ? body.dueDate : task.dueDate;
    task.priority = body.priority ? body.priority : task.priority;
    task.status = body.status ? body.status : task.status;
    await task.save();
    res.status(200).json({ status: responsStatus.SUCCESS, data: task });
  } else {
    next(appError.create("task not found", 400, responsStatus.FAILED));
  }
});
const addTask = asyncWrapper(async (req, res, next) => {
  const resp = await getuserInfo(req.cookies.token);
  console.log("resp", resp);
  if (resp.status === "failed")
    next(appError.create(resp.id, 400, responsStatus.FAILED));
  else {
    console.log("req.body", req.body);
    const task = Task({
      title: req.body.body.title,
      description: req.body.body.description,
      dueDate: req.body.body.dueDate,
      priority: req.body.body.priority,
      owner: resp.id,
    });

    await task.save();
    console.log("new task=>", task);
    return res.status(201).json({ status: responsStatus.SUCCESS, data: task });
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
  updateTask,
};
