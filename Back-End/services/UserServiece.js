const jwt = require("jsonwebtoken");
const saltRounds = 10;
const UserRepo = require("../repositories/UserRepo");
const AuthRepo = require("../repositories/AuthRepo");
const getuserInfo = require("../utils/getUserinfo");
const appError = require("../utils/appError");
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs");
const responsStatus = require("../utils/responseStatus");

const getUser = async (token) => {
  const info = await getuserInfo(token);
  if (info.status === "failed")
    throw appError.create("invalid Token", 401, responsStatus.FAILED);
  const options = {
    password: 0,
    token: 0,
    refreshToken: 0,
    __v: 0,
  };
  const user = await UserRepo.getUSerById(info.id, options);
  return user;
};
const updateUser = async (token, body, file) => {
  const userId = await getuserInfo(token);
  console.log("userId", userId.id);
  if (userId.status === "failed") {
    throw appError.create("invalid token", 401, responsStatus.FAILED);
  }

  const user = await UserRepo.getUSerById(userId.id);
  if (!user) {
    throw appError.create("User Not found !!", 400, responsStatus.FAILED);
  }
  // ✅ update username
  if (body.userName) {
    user.userName = body.userName;
  }
  // ✅ update password
  if (body.password && body.currentPassword) {
    const isMatch = await bcrypt.compare(body.currentPassword, user.password);

    if (!isMatch) {
      throw appError.create(
        "current password is wrong!!",
        400,
        responsStatus.FAILED,
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, saltRounds);
    user.password = hashedPassword;
  }
  if (file) {
    const filePath = path.join(__dirname, "uploads", user.avatar);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    user.avatar = file.filename;
  }
  await AuthRepo.saveUser(user);
  return user;
};
const deleteUser = async (token) => {
  const info = await getuserInfo(token);
  if (info.status === "failed")
    throw appError.create("invalid Token", 401, responsStatus.FAILED);
  return await UserRepo.deleteUseById(info.id);
};

module.exports = {
  getUser,
  updateUser,
  deleteUser,
};
