const mongoose = require("mongoose");
const Scheme = mongoose.Schema;

const PostScheme = new Scheme({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  url: {
    type: String,
  },
  status: {
    type: String,
    enum: ["TO_LEARN", "LEARNING", "LEARNED"],
  },
  user: {
    type: Scheme.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", PostScheme);
