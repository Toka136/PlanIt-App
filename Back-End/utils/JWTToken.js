const jwt = require("jsonwebtoken");
module.exports = async (payload, duration) => {
  const token = await jwt.sign(payload, process.env.JWTTOKEN, {
    expiresIn: duration,
  });
  return token;
};
