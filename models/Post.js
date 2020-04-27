const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: [1, 'Post title is empty'],
    maxlength: [200, '200 characters exceeded']
  },
  body: {
    type: Array,
    validate: {
      validator: function(v) {
        return /\S+/.test(v.join(''));
      },
      message: 'Please enter some post content'
    },
    required: [true, 'Post body required']
  },
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
