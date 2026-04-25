const appError = require("../utils/appError");
const responsStatus = require("../utils/responseStatus");

const ValidationMiddleware = (schema, bodynumber) => {
  return (req, res, next) => {
    let result = null;
    if (bodynumber === 1) result = schema.safeParse(req.body);
    else if (bodynumber === 2) result = schema.safeParse(req.query);
    else if (bodynumber === 0) result = schema.safeParse(req.params);
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
