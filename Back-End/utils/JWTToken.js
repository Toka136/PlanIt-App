const jwt = require("jsonwebtoken");
module.exports = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWTTOKEN, {
    expiresIn: "4m",
  });
  return token;
};
