const User = require("../models/userModels");
const getuserInfo = require("../utils/getUserinfo");
const responsStatus = require("../utils/responseStatus");
const asyncWrapper = require("../middleWares/asyncWrapper");
const UserServiece = require("../services/UserServiece");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const saltRounds = 10;
const appError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const getUser = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;
  const user = await UserServiece.getUser(token);
  return res
    .status(200)
    .json({ statusText: responsStatus.SUCCESS, data: user });
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;
  const deletInfo = await UserServiece.deleteUser(req.cookies.token);
  return res
    .status(200)
    .json({ statusText: responsStatus.SUCCESS, data: deletInfo });
});
const updateUser = asyncWrapper(async (req, res, next) => {
  const user = await UserServiece.updateUser(
    req.cookies.token,
    req.body,
    req.file,
  );

  return res.status(200).json({
    statusText: responsStatus.SUCCESS,
    data: user,
  });
});
module.exports = {
  getUser,
  deleteUser,
  updateUser,
};
