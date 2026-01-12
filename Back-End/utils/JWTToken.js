const jwt = require("jsonwebtoken");
module.exports = async (payload) => {
  // console.log("JWTTOKEN", process.env.JWTTOKEN);
  const token = await jwt.sign(payload, process.env.JWTTOKEN, {
    expiresIn: "15m",
  });
  return token;
};
