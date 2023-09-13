import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
});

const Auth = mongoose.model("auth", AuthSchema);

export default Auth;
