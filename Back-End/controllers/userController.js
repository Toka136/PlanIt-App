const User = require("../models/userModels");
const responsStatus = require("../utils/responseStatus");
const asyncWrapper = require("../middleWares/asyncWrapper");
const getUser = asyncWrapper(async (req, res, next) => {
  const users = await User.find();
  return res
    .status(200)
    .json({ statusText: responsStatus.SUCCESS, users: users });
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  console.log("in function");
  const deletInfo = await User.deleteOne({ _id: req.params.id });
  return res
    .status(200)
    .json({ statusText: responsStatus.SUCCESS, data: deletInfo });
});
module.exports = {
  getUser,
  deleteUser,
};
