const appError = require("../utils/appError");
const getuserInfo = require("../utils/getUserinfo");
const TaskRepo = require("../repositories/TaskRepo");
const responsStatus = require("../utils/responseStatus");
const taskStatus = require("../utils/taskStatus");
const mongoose = require("mongoose");

const getTasks = async (token, query) => {
  console.log("token", token);
  const resp = await getuserInfo(token);
  if (resp.status === "failed")
    throw appError.create(resp.id, 401, responsStatus.FAILED);
  const { priority, status, page = 1, limit = 10, search } = query;
  let filter = { owner: resp.id };
  if (status && status !== "All") filter.status = status;
  if (search)
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  console.log("filter", filter);
  const skip = (page - 1) * limit;
  const data = await TaskRepo.getTasks(filter, skip, limit);
  const count = await TaskRepo.getTasksCount(filter);
  return {
    data,
    count,
    page,
    limit,
    pages: Math.ceil(count / limit),
  };
};
const addTask = async (body, token) => {
  const resp = await getuserInfo(token);
  console.log("resp", resp);
  if (resp.status === "failed")
    throw appError.create(resp.id, 400, responsStatus.FAILED);
  const task = {
    title: body.title,
    description: body.description,
    dueDate: body.dueDate,
    priority: body.priority,
    status: body.status,
    owner: resp.id,
  };
  await TaskRepo.saveTask(task);
  return task;
};
const updateTask = async (body) => {
  const task = await TaskRepo.getTaskById(body.id);
  if (task) {
    console.log("task", task);
    task.title = body.title ? body.title : task.title;
    task.description = body.description ? body.description : task.description;
    task.dueDate = body.dueDate ? body.dueDate : task.dueDate;
    task.priority = body.priority ? body.priority : task.priority;
    task.status = body.status ? body.status : task.status;
    if (task.status === "Completed") task.endDate = new Date();
    await TaskRepo.saveTask(task);
    return task;
  } else {
    throw appError.create("task not found", 400, responsStatus.FAILED);
  }
};
const deleteTask = async (id) => {
  const deleteInfo = await TaskRepo.deleteTask(id);
};
const getTasksStats = async (token) => {
  console.log("req.cookies.token", token);
  const owner_ID = await getuserInfo(token);
  if (owner_ID.status === "failed")
    throw appError.create("invalid token", 401, responsStatus.FAILED);
  console.log("owner_ID", owner_ID.id);
  const id = new mongoose.Types.ObjectId(owner_ID.id);
  console.log("owner_ID", id);
  const stats = await TaskRepo.getStats(id);
  if (stats.length === 0)
    return {
      count: 0,
      inprogressCount: 0,
      notStartCount: 0,
      completedCount: 0,
      completeRate: 0,
    };
  return stats[0];
};
const getTasksCloseDate = async (token) => {
  const owner_ID = await getuserInfo(token);
  if (owner_ID.status === "failed")
    throw appError.create(owner_ID.id, 401, responsStatus.FAILED);
  console.log("owner_ID", owner_ID.id);
  const id = new mongoose.Types.ObjectId(owner_ID.id);
  const tasksCD = await TaskRepo.getTasksCloseDate(id);
  return tasksCD;
};
const getTask = async (id) => {
  return await TaskRepo.getTaskById(id);
};
module.exports = {
  getTasks,
  deleteTask,
  addTask,
  updateTask,
  getTasksStats,
  getTasksCloseDate,
  getTask,
};
