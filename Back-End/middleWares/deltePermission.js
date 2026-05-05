const jwt = require("jsonwebtoken");
const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");
module.exports = async (req, res, next) => {
  const token = req.cookies.token;
  const decode = await jwt.verify(token, process.env.JWTTOKEN);
  if (decode.id !== req.params.id) {
    return next(
      new appError("Unauthorized access", 400, responsStatus.FAILED),
    );
  } else {
    next();
  }
};
