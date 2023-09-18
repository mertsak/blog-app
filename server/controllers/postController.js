import fs from "fs";
import Post from "../models/postModal.js";

const createPost = async (req, res) => {
  try {
    const { originalname, path } = req.file;

    const parts = originalname.split(".");

    const ext = parts[parts.length - 1];

    fs.renameSync(path, path + "." + ext);

    const { title, summary, content, author } = req.body;

    const newPost = await Post.create({
      title,
      summary,
      content,
      author,
      cover: path + "." + ext,
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPost, getPosts };
