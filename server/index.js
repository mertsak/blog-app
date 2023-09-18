import express from "express";
import database from "./db.js";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import multer from "multer";

// ! Call the express function
const app = express();

// ! Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const upload = multer({
  dest: "../client/public",
});

// ! routes
app.use("/", authRoute);
app.use("/", upload.single("image"), postRoute);

// ! Call the database function
database();

const port = process.env.PORT || 3002;

// ! Listen to the port
app.listen(port, () => {
  console.log(
    `server is running at http://localhost:${port} and the time is ${new Date().toLocaleTimeString()} `
  );
});
