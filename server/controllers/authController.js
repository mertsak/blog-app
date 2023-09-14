import Auth from "../models/authModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Auth.findOne({ username });

    if (username === "" || password === "") {
      return res.status(400).json({
        msg: "kullanıcı adı veya şifre boş olamaz",
      });
    }

    if (user) {
      return res.status(400).json({
        msg: "kullanıcı adı zaten kullanılıyor lütfen başka bir kullanıcı adı seçin veya giriş yapın",
      });
    }

    if (username.length < 3) {
      return res.status(400).json({
        msg: "kullanıcı adı 3 karakterden az olamaz",
      });
    }

    if (username.length > 20) {
      return res.status(400).json({
        msg: "kullanıcı adı 20 karakterden fazla olamaz",
      });
    }

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

    if (username === "" || password === "") {
      return res.status(400).json({
        msg: "kullanıcı adı veya şifre boş olamaz",
      });
    }

    if (!user) {
      return res.status(400).json({
        msg: "kullanıcı adı bulunamadı lütfen kayıt olun",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        msg: "kullanıcı adı ve şifre eşleşmiyor",
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
