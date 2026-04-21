const authRepo = require("../repositories/AuthRepo");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("../utils/JWTToken");
const jwtToken = require("jsonwebtoken");
const saltRounds = 10;
const responsStatus = require("../utils/responseStatus");
const register = async (data, file) => {
  const { userName, email, password } = data;
  const oldUser = await authRepo.findByEmail(email);
  if (oldUser) {
    const err = appError.create(
      "User already exist",
      400,
      responsStatus.FAILED,
    );
    throw err;
  }
  console.log("file", file);
  const pass = await bcrypt.hash(password, saltRounds);
  const newUser = {
    email: email,
    userName: userName,
    password: pass,
    avatar: file?.filename,
  };
  await authRepo.createUser(newUser);
  return {
    id: newUser._id,
    email: newUser.email,
    userName: newUser.userName,
    avatar: newUser.avatar,
  };
};
const login = async (data) => {
  const user = await authRepo.findByEmail(data.email);
  if (user) {
    console.log("user", user);
    const compare = await bcrypt.compare(data.password, user.password);
    if (compare) {
      console.log("user.id", user);
      const token = await jwt({ id: user._id }, "1d");
      const refreshToken = await jwt({ id: user._id }, "7d");
      user.token = token;
      user.refreshToken = refreshToken;
      await authRepo.saveUser(user);
      return {
        id: user._id,
        email: user.email,
        userName: user.userName,
        avatar: user.avatar,
        token: user.token,
        refreshToken: user.refreshToken,
      };
    }
    const err_invalid = appError.create(
      "Invalid data",
      400,
      responsStatus.FAILED,
    );
    throw err_invalid;
  }
  const err_notfound = appError.create(
    "User not found",
    400,
    responsStatus.FAILED,
  );
  throw err_notfound;
};
const refreshToken = async (token) => {
  console.log("Refreshtoken", token);
  if (!token) {
    const err_invalid = appError.create(
      "refresh token not found",
      400,
      responsStatus.FAILED,
    );
    throw err_invalid;
  } else {
    console.log("token", token);
    const decode = await jwtToken.verify(token, process.env.JWTTOKEN);
    console.log("decode", decode);
    if (!decode) {
      const err_invalid = appError.create(
        "refresh token expired",
        400,
        responsStatus.FAILED,
      );
      throw err_invalid;
    } else {
      const user = await authRepo.findById(decode.id);
      if (user) {
        const newToken = await jwt({ id: user._id }, "1d");
        const newRefreshToken = await jwt({ id: user._id }, "7d");
        user.token = newToken;
        user.refreshToken = newRefreshToken;
        await authRepo.saveUser(user);
        console.log("newToken", newToken);
        console.log("newRefreshToken", newRefreshToken);
        return {
          id: user._id,
          email: user.email,
          userName: user.userName,
          avatar: user.avatar,
          token: user.token,
          refreshToken: user.refreshToken,
        };
      } else {
        const err_notfound = appError.create(
          "User Not found",
          400,
          responsStatus.FAILED,
        );
        throw err_notfound;
      }
    }
  }
};
module.exports = {
  register,
  login,
  refreshToken,
};
