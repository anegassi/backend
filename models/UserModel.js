const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  _id: String,

  fullname: String,

  email: String,

  address: String,

  password: String,

  role: String,
});

module.exports = mongoose.model("Users", UsersSchema);
