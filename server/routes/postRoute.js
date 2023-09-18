import express from "express";
import { createPost, getPosts } from "../controllers/postController.js";

// ! Call the express function
const router = express.Router();

// ! routes
router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);

export default router;
