const mogoose = require("mongoose");

const PostSchema = new mogoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: null,
    trim: true,
  },
  num_preview_like: {
    type: Number,
    default: 0,
  },
  posted_at: {
    type: String,
    required: true,
  },
  updated_at: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    default: null,
  },
});

const Post = mogoose.model("Post", PostSchema);
module.exports = Post;
