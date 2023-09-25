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
      .populate("author")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("author");

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    let newPath = null;

    if (req.file) {
      const { originalname, path } = req.file;

      const parts = originalname.split(".");

      const ext = parts[parts.length - 1];

      newPath = path + "." + ext;

      fs.renameSync(path, newPath);
    }

    const postDoc = await Post.findById(req.params.id);

    const isAuthor = postDoc.author === req.body.author;

    if (!isAuthor) {
      return res.status(401).json({ error: "unauthorized" });
    }

    const { title, summary, content } = req.body;

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.status(201).json({ message: "post updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByIdAndDelete(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createPost, getPosts, getPost, updatePost, deletePost };
