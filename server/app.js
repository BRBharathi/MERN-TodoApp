const express = require("express");
const path = require("path");
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
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PATCH"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
const buildPath = path.join(__dirname, "../client/build");
app.use(express.static(buildPath));

const userRouter = require("./controller/usercontroller");
const todoRouter = require("./controller/todocontroller");
app.use("/user", userRouter);
app.use("/todo", todoRouter);

app.get("/*", function (req, res) {
  res.sendFile(path.join(buildPath, "index.html"), function (err) {
    if (err) {
      res.status(500).json({ message: "Internal server errorrs" });
    }
  });
});

// starting the server
app.listen(process.env.PORT, () => {
  console.log("Server started on port", process.env.PORT);
});
