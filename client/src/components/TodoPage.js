import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import TodoForm from "./TodoForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/TodoStyle.css";
import UpdateForm from "./UpdateForm";

const TodoPage = () => {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const { isUserLoggedIn, setIsUserLoggedIn } = authContext;

  const [todolist, setTodolist] = useState([]);

  const [fetchTrigger, setFetchTrigger] = useState(isUserLoggedIn);
  const [selectedTodo, setSelectedTodo] = useState("");
  const BASE_URL = process.env.API_BASE_URL;
  //List the Todos from the Database

  useEffect(() => {
    const fetchTodos = async () => {
      if (isUserLoggedIn) {
        console.log("user logged in");
        try {
          console.log("getall api is going to be called");
          console.log("Base url", BASE_URL);
          const response = await fetch("http://localhost:8080/todo/getall");
          // const response = await fetch(`${BASE_URL}/todo/getall`);
          console.log("getall api is called from todo page");
          if (response.ok) {
            const data = await response.json();
            console.log("getall data from todopage", data);
            const list = setTodolist(data.todo);
            console.log("setTodolist data", list);
          } else {
            console.error("Failed to fetch todos");
          }
        } catch (error) {
          console.error("Error fetching todos:", error);
        }
      }
    };

    if (isUserLoggedIn && fetchTrigger) {
      fetchTodos(); // Fetch todos when fetchTrigger changes
      setFetchTrigger(false); // Reset fetchTrigger
    }
  }, [isUserLoggedIn, fetchTrigger]);

  //when todo  is addded list is populated on the page
  const updateTodoList = (newTodo) => {
    setTodolist([...todolist, newTodo]);
  };

  const deleteTodo = async (item) => {
    console.log("delete method");
    console.log(item._id);
    console.log(item);
    const id = item._id;
    try {
      const response = await fetch(`http://localhost:8080/todo/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      if (response.ok) {
        const data = await response.text();
        setFetchTrigger(true);
        console.log(data);
      } else {
      }
    } catch (error) {
      console.log("Data Error", error);
    }
  };

  const editTodo = (taskToEdit) => {
    console.log("Edit clicked");
    console.log(taskToEdit);

    setSelectedTodo(taskToEdit);
  };

  const updateTodo = async (item) => {
    console.log("update clicked");
    console.log(item);
    const id = item._id;
    try {
      const response = await fetch(`http://localhost:8080/todo/update/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const data = response.json();
        setFetchTrigger(true);
        console.log(data);
      } else {
      }
    } catch (error) {
      console.log("Data Error", error);
    }

    setSelectedTodo(null);
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);

    navigate("/todo");
  };

  return (
    <div className="backdrop">
      <div className="position-absolute top-0 end-0 m-3">
        {!isUserLoggedIn && (
          <Link className="loginlink" to="/login">
            Login
          </Link>
        )}
        <div>
          {!isUserLoggedIn && (
            <Link className="signuplink" to="/signup">
              /Signup
            </Link>
          )}
        </div>
        <div>
          {isUserLoggedIn && (
            <Link
              className="position-absolute top-0 end-0 m-3"
              onClick={handleLogout}
            >
              Logout
            </Link>
          )}
        </div>
      </div>

      <div>
        <div>
          <div className="container1">
            <h4>Todolist</h4>
            <TodoForm
              isUserLoggedIn={isUserLoggedIn}
              updateTodoList={updateTodoList}
            />
            <div>
              {selectedTodo && (
                <UpdateForm
                  isUserLoggedIn={isUserLoggedIn}
                  selectedTodo={selectedTodo}
                  updateTodo={updateTodo}
                />
              )}
            </div>

            <div className="row">
              {isUserLoggedIn &&
                Array.isArray(todolist) &&
                todolist.map((item) => (
                  <div
                    key={item.id}
                    className="col-10 mb-2 d-flex align-items-left"
                  >
                    <p className="flex-grow-1 mb-0 fs-5">{item.todo}</p>
                    <button
                      onClick={() => editTodo(item)}
                      className="btn btn-sm btn-info me-2"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => deleteTodo(item)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
