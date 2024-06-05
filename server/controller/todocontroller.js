const express = require("express");
const router = express.Router();
const { mongoose } = require("mongoose");
const Todo = require("../model/Todo");

//fetch all todos
router.get("/getall", async (req, res) => {
  try {
    console.log("getall api called");
    const todoList = await Todo.find({}, "_id todo");
    console.log(todoList);
    if (!todoList) {
      return res.status(400).json({ message: "Records are not available" });
    }
    return res.status(200).json({ todo: todoList });
  } catch (err) {
    return res.status(500).json({ message: "Internal server err getall" });
  }
});

//add todo item in the database
router.post("/add", async (req, res) => {
  try {
    const newTodo = new Todo(req.body);
    const savedTodo = await newTodo.save();
    if (!savedTodo) {
      return res.status(400).json({ message: "Data is not saved" });
    }
    const { _id, todo } = savedTodo;
    return res.status(201).json({ _id, todo });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error add todo" });
  }
});

//delete todo item in the database
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("request param id", id);
    const deleteTodo = await Todo.findByIdAndDelete(id);

    if (!deleteTodo) {
      return res.status(400).json({ message: "Todo not found" });
    }

    return res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server Error delete todo" });
  }
});

//update todo item in the database

router.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const editedTodo = req.body;
    console.log("editedData", editedTodo);
    const updatedTodo = await Todo.findByIdAndUpdate(id, editedTodo, {
      new: true,
    });
    console.log("updated Todo", updatedTodo);
    if (!updatedTodo)
      return res.status(400).json({ message: "Todo is not found or updated" });
    else return res.status(200).json({ message: "Todo is updated" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error update todo" });
  }
});

module.exports = router;
