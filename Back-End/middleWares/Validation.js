const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");

const ValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      req.body = result.data;
      next();
    } else {
      console.log("result.error.issues[0]", result.error.issues[0]);
      next(
        appError.create(
          `${result.error.issues[0].path[0]} ${result.error.issues[0].message}`,
          400,
          responsStatus.FAILED,
        ),
      );
    }
  };
};
module.exports = ValidationMiddleware;
