const User = require("../models/userModels");

const findByEmail = async (email) => {
  return await User.findOne({ email: email });
};
const findById = async (id) => {
  return await User.findById(id);
};
const createUser = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};
const saveUser = async (user) => {
  return await user.save();
};
module.exports = {
  findByEmail,
  createUser,
  saveUser,
  findById,
};
