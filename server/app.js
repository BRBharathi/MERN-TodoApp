const express = require("express");
require("dotenv").config;
const app = express();
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const url = process.env.MONGODB_URI;
console.log(url);
mongoose.connect(url, { useNewUrlParser: true });

const con = mongoose.connection;
//connecting with database
con.on("open", () => {
  console.log("connection created");
});

app.use(express.json());

app.use(cors({ origin: "https://mern-todoapp-frontend.onrender.com" }));

const userRouter = require("./controller/usercontroller");
const todoRouter = require("./controller/todocontroller");
app.use("/user", userRouter);
app.use("/todo", todoRouter);

// starting the server
app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
