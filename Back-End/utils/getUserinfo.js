const asyncWrapper = require("../middleWares/asyncWrapper");
const jwt = require("jsonwebtoken");
const getuserInfo = async (token) => {
  try {
    const info = await jwt.verify(token, process.env.JWTTOKEN);
    console.log("infooo", info);
    const res = {
      status: "success",
      id: info.id,
    };
    return res;
  } catch (err) {
    const res = {
      status: "failed",
      id: err.message,
    };
    return res;
  }
};
module.exports = getuserInfo;
