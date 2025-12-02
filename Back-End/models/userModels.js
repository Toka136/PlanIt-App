const mongoose = require("mongoose");
const userSchem = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  avatar: {
    type: String,
  },
  token: {
    type: String,
  },
});
module.exports = mongoose.model("User", userSchem);
