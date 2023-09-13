import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({ username, password: passwordHash });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json("DONT REGISTER");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });

    if (!user) {
      return res.status(400).json({
        msg: "kullanıcı bulunamadı",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "yanlış şifre",
      });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      msg: "login başarılı",
    });
  } catch (error) {
    res.status(500).json({
      status: "DONT LOGIN",
      error,
    });
  }
};

export { register, login };
