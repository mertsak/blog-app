import express from "express";
import database from "./db.js";
import dotenv from "dotenv";

// ! Call the express function
const app = express();

// ! Call the database function
database();

const port = process.env.PORT || 3002;

// ! Listen to the port
app.listen(port, () => {
  console.log(
    `server is running at http://localhost:${port} and the time is ${new Date().toLocaleTimeString()} `
  );
});
