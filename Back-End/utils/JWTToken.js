const jwt = require("jsonwebtoken");
module.exports = async (payload, duration) => {
  // console.log("JWTTOKEN", process.env.JWTTOKEN);
  const token = await jwt.sign(payload, process.env.JWTTOKEN, {
    expiresIn: duration,
  });
  return token;
};
