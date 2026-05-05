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
    const err = new appError(
      "User already exist",
      400,
      responsStatus.FAILED,
    );
    throw err;
  }
  const pass = await bcrypt.hash(password, saltRounds);
  const newUser = {
    email: email,
    userName: userName,
    password: pass,
    avatar: file?file.path:"https://res.cloudinary.com/dyntejquk/image/upload/v1778020582/default-avatar-icon-of-social-media-user-vector_o9rf94.jpg",
    avatarPublicId:file?file.filename:"planIt-app/defualt_awpxfk"
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
    const compare = await bcrypt.compare(data.password, user.password);
    if (compare) {
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
    const err_invalid = new appError(
      "Invalid data",
      400,
      responsStatus.FAILED,
    );
    throw err_invalid;
  }
  const err_notfound = new appError(
    "User not found",
    400,
    responsStatus.FAILED,
  );
  throw err_notfound;
};
const refreshToken = async (token) => {
  if (!token) {
    const err_invalid = new appError(
      "refresh token not found",
      400,
      responsStatus.FAILED,
    );
    throw err_invalid;
  } else {
    const decode = await jwtToken.verify(token, process.env.JWTTOKEN);
    if (!decode) {
      const err_invalid = new appError(
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
        return {
          id: user._id,
          email: user.email,
          userName: user.userName,
          avatar: user.avatar,
          token: user.token,
          refreshToken: user.refreshToken,
        };
      } else {
        const err_notfound = new appError(
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
