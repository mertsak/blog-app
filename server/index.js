import express from "express";
import database from "./db.js";
import cors from "cors";
import authRoute from "./routes/authRoute.js";

// ! Call the express function
const app = express();

// ! Middlewares
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// ! routes
app.use("/", authRoute);

// ! Call the database function
database();

const port = process.env.PORT || 3002;

// ! Listen to the port
app.listen(port, () => {
  console.log(
    `server is running at http://localhost:${port} and the time is ${new Date().toLocaleTimeString()} `
  );
});
