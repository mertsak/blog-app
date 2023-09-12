import mongoose from "mongoose";

const database = () => {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/blog-app", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("mongoDB connected");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};

export default database;
