import express from "express";
import { register, login } from "../controllers/authController.js";

// ! Call the express function
const router = express.Router();

// ! routes
router.route("/register").post(register);
router.route("/login").post(login);

export default router;
