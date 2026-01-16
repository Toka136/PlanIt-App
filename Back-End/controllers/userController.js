const User = require("../models/userModels");
const responsStatus = require("../utils/responseStatus");
const asyncWrapper = require("../middleWares/asyncWrapper");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const saltRounds = 10;
const appError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const getUser = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.token;
  console.log("token=>", token);
  const info = await jwt.verify(token, process.env.JWTTOKEN);
  console.log("info=>", info);
  const user = await User.findById(info.id);
  return res
    .status(200)
    .json({ statusText: responsStatus.SUCCESS, data: { user } });
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  console.log("in function");
  const deletInfo = await User.deleteOne({ _id: req.params.id });
  return res
    .status(200)
    .json({ statusText: responsStatus.SUCCESS, data: deletInfo });
});
const updateUserAvatar = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const file = path.join(__dirname, "uploads", user.avatar);
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
    }
    // console.log("req.file", req.file);
    user.avatar = req.file ? req.file.filename : "defualt.webp";
    await user.save();
    return res
      .status(200)
      .json({ statusText: responsStatus.SUCCESS, data: user.avatar });
  }
  return next(appError.create("User Not found !!", 400, responsStatus.FAILED));
});
const updateUserName = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.userName = req.body.userName;
    await user.save();
    return res
      .status(200)
      .json({ statusText: responsStatus.SUCCESS, data: user.userName });
  }
  return next(appError.create("User Not found !!", 400, responsStatus.FAILED));
});
const updateUserPassword = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const c = await bcrypt.compare(req.body.currentPassword, user.password);
    if (c) {
      if (req.body.password.length < 8) {
        return next(
          appError.create(
            "password must be at least 8 !!",
            400,
            responsStatus.FAILED
          )
        );
      }
      const pass = await bcrypt.hash(req.body.password, saltRounds);
      console.log("req.body.password", pass);

      user.password = pass;
      await user.save();
      return res
        .status(200)
        .json({ statusText: responsStatus.SUCCESS, data: user });
    }
    return next(
      appError.create("current pass wrong!!", 400, responsStatus.FAILED)
    );
  }
  return next(appError.create("User Not found !!", 400, responsStatus.FAILED));
});
module.exports = {
  getUser,
  deleteUser,
  updateUserAvatar,
  updateUserName,
  updateUserPassword,
};
