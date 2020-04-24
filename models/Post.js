const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
  },
}, {timestamps: true});

// Post Model
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
