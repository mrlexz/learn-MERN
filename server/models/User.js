const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const UserScheme = new Scheme({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("users", UserScheme);
