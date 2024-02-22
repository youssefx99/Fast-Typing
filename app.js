require("dotenv").config();
const express = require("express");
const connect = require("./utils/connect");

const app = express();
const DataBaseStr = process.env.DATABASE;
connect(DataBaseStr);

app.use("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
