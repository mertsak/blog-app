import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    summary: {
      type: String,
    },
    content: {
      type: String,
    },
    cover: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("post", PostSchema);

export default Post;
