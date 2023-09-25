import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

// ! Call the express function
const router = express.Router();

// ! routes
router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/getPost/:id").get(getPost);
router.route("/updatePost/:id").put(updatePost);
router.route("/deletePost/:id").delete(deletePost);

export default router;
