const getuserInfo = require("../utils/getUserinfo");
const asyncWrapper = require("../middleWares/asyncWrapper");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
const Task = require("../models/taskModel");
module.exports = asyncWrapper(async (req, res, next) => {
  const tokenCheck = await getuserInfo(req.cookies.token);
  if (tokenCheck.status === "failed")
    next(appError.create(tokenCheck.id, 400, responsStatus.FAILED));
  console.log("req.params.id", req.params.id);
  const task = await Task.findById(req.params.id);

  if (task) {
    console.log("task founded", task);
    console.log("task.owner =>", task.owner);
    console.log("tokenCheck.id", tokenCheck.id);
    if (task.owner.equals(tokenCheck.id)) next();
    else
      next(appError.create("Unauthorized access", 400, responsStatus.FAILED));
  } else next(appError.create("task Not Found", 400, responsStatus.FAILED));
});
