const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: String,
    name: String,
    post: String,
    like: [
      {
        lid: String,
      },
    ],
    comment: [
      {
        cid: String,
        cname: String,
        comment: String,
        commentedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true } // createdAt and updatedAt for the post itself
);

const Post = mongoose.model("posts", postSchema);

module.exports = Post;

