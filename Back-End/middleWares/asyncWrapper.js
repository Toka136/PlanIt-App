const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");

module.exports = (asyncFunction) => {
  return (req, res, next) => {
    asyncFunction(req, res, next).catch((err) => {
      //   const e = appError.create(err.message, 400, responsStatus.FAILED);
      next(err);
    });
  };
};
