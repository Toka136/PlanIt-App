const getuserInfo = require("../utils/getUserinfo");
const asyncWrapper = require("../middleWares/asyncWrapper");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
const Task = require("../models/taskModel");
const { deleteCache } = require("../utils/deleteCache");
module.exports = asyncWrapper(async (req, res, next) => {
  const tokenCheck = await getuserInfo(req.cookies.token);
  if (tokenCheck.status === "failed")
    next(new appError(tokenCheck.id, 400, responsStatus.FAILED));
  console.log("req.params.id", req.params.id);
  const task = await Task.findById(req.params.id);

  if (task) {
    if (task.owner.equals(tokenCheck.id)){
          await deleteCache(tokenCheck.id)
       next();}
    else
      next(new appError("Unauthorized access", 400, responsStatus.FAILED));
  } else next(new appError("task Not Found", 400, responsStatus.FAILED));
});
