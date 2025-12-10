const asyncWrapper = require("../middleWares/asyncWrapper");
const User = require("../models/userModels");
const appError = require("../utils/appError");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const responsStatus = require("../utils/responseStatus");
const jwt = require("../utils/JWTToken");
const register = asyncWrapper(async (req, res, next) => {
  console.log("body", req.body);
  console.log("req.file", req.file);
  const oldUser = await User.findOne({ email: req.body.email });
  if (oldUser) {
    const err = appError.create(
      "User already exist",
      400,
      responsStatus.FAILED
    );
    return next(err);
  }
  console.log("file", req.file);
  if (req.body.password.length < 8) {
    const err = appError.create(
      "password must at least 8 charcters",
      400,
      responsStatus.FAILED
    );
    return next(err);
  }
  const pass = await bcrypt.hash(req.body.password, saltRounds);
  const newUser = User({
    email: req.body.email,
    userName: req.body.userName,
    password: pass,
    avatar: req.file?.filename,
  });
  await newUser.save();
  return res
    .status(201)
    .json({ statusText: responsStatus.SUCCESS, data: newUser });
});
const login = asyncWrapper(async (req, res, next) => {
  console.log("body", req.body);
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email: email });
  if (user) {
    const compare = await bcrypt.compare(password, user.password);
    if (compare) {
      console.log("user.id", user);
      const token = await jwt({ id: user._id });
      console.log("token", token);
      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          statusText: responsStatus.SUCCESS,
          data: { id: user._id, email: user.email, userName: user.userName },
        });
    }
    return next(appError.create("Invalid data", 400, responsStatus.FAILED));
  } else {
    return next(appError.create("Invalid data", 400, responsStatus.FAILED));
  }
});
module.exports = {
  register,
  login,
};
