import React, { useEffect, useState } from "react";

const UpdateForm = ({ isUserLoggedIn, selectedTodo, updateTodo }) => {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (selectedTodo) {
      setTodo(selectedTodo.todo);
    }
  }, [selectedTodo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todo.length !== 0 && selectedTodo) {
      const updatedTodo = { ...selectedTodo, todo };

      console.log("updated todo in edit form ", updatedTodo);
      updateTodo(updatedTodo);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          disabled={!isUserLoggedIn}
          placeholder="Enter Todo"
        ></input>

        <button disabled={!isUserLoggedIn} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
