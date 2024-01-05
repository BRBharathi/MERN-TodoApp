const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const url = "mongodb://localhost:27017/TodoDatabase";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
//connecting with database
con.on("open", () => {
  console.log("connection created");
});

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

const userRouter = require("./controller/usercontroller");
const todoRouter = require("./controller/todocontroller");
app.use("/user", userRouter);
app.use("/todo", todoRouter);

// Move the wildcard route handler to the end
/*app.use("*", (req, res) => {
  res.status(404).send("Not Found");
});
 */
// starting the server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});

//starting the server
/*app
  .use((req, res) => {
    res.send("server started");
  })
  .listen(8080);*/
