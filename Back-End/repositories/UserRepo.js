const User = require("../models/userModels");
const getUSerById = async (id, options) => {
  return await User.findById(id, options);
};
const deleteUseById = async (id) => {
  return await User.deleteOne({ _id: req.params.id });
};
module.exports = {
  getUSerById,
  deleteUseById,
};
