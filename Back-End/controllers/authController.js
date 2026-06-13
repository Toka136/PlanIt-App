const asyncWrapper = require("../middleWares/asyncWrapper");
const User = require("../models/userModels");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const responsStatus = require("../utils/responseStatus");
const jwt = require("../utils/JWTToken");
const jwtToken = require("jsonwebtoken");
const authService = require("../services/authService");
const register = asyncWrapper(async (req, res, next) => {
  try {
    const data = await authService.register(req.body, req.file);
    return res.status(200).json({
      statusText: responsStatus.SUCCESS,
      data: data,
    });
  } catch (err) {
    next(err);
  }
});
const login = asyncWrapper(async (req, res, next) => {
  const dataLogin = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const data = await authService.login(dataLogin);
   await res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res
      .cookie("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        statusText: responsStatus.SUCCESS,
        data: {
          id: data.id,
          email: data.email,
          userName: data.userName,
          avatar: data.avatar,
        },
      });
  } catch (err) {
    const errU = new appError(err.message, 400, responsStatus.FAILED);
    next(errU);
  }
});
const logout = asyncWrapper(async (req, res, next) => {
  await res.clearCookie("token");
  return res.clearCookie("refreshToken").status(200).json({
    statusText: responsStatus.SUCCESS,
    data: {},
  });
});
const refreshToken = asyncWrapper(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  try {
    const data = await authService.refreshToken(token);
    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res
      .cookie("token", data.token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
      .status(200)
      .json({
        statusText: responsStatus.SUCCESS,
        data: data,
      });
  } catch (err) {
    next(new appError(err.message, 400, responsStatus.FAILED));
  }
});
module.exports = {
  register,
  login,
  logout,
  refreshToken,
};
