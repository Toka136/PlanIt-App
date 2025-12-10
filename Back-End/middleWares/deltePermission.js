const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  // console.log("cookie token", req.cookies.token);
  // console.log("token=>", token);
  const decode = await jwt.verify(token, process.env.JWTTOKEN);
  console.log("decode.id", decode.id);
  console.log("id", req.params.id);
  if (decode.id !== req.params.id) {
    return next(
      appError.create("Unauthorized access", 400, responsStatus.FAILED)
    );
  } else {
    next();
  }
};
