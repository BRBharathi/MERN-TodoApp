import React, { useState } from "react";

function TodoForm({ isUserLoggedIn, updateTodoList }) {
  const [todo, setTodo] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const addTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/todo/add`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ todo }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Todoform todo data  after adding", data);
        updateTodoList(data);
        //console.log(data);
      } else {
        console.error("Task not saved");
      }
    } catch (error) {
      console.error("data error:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todo.length !== 0) {
      addTodo(todo);
    }

    setTodo("");
  };
  console.log("TodoForm" + isUserLoggedIn);
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} className="row g-3 align-items-center">
        <input
          className="form-control"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          disabled={!isUserLoggedIn}
          placeholder="Enter Todo"
        ></input>

        <button
          disabled={!isUserLoggedIn}
          type="submit"
          className="btn btn-primary w-100 mb-3"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
