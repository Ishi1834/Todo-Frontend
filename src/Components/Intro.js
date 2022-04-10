import { useState } from "react";
import Categories from "./Categories";
import { Link } from "react-router-dom";

export default function Intro() {
  const [todos] = useState([
    {
      id: 1,
      title: "Work on sign up page.",
      body: "Add form validation.",
      done: false,
      category: 1,
      created_at: "2022-03-28T15:57:50.728590Z",
      updated_at: "2022-04-02T16:22:29.317109Z",
    },
    {
      id: 2,
      title: "Go for a run",
      body: "30 minute run at tempo pace.",
      done: false,
      category: 3,
      created_at: "2022-04-01T20:00:57.779927Z",
      updated_at: "2022-04-01T20:00:57.779927Z",
    },
    {
      id: 3,
      title: "Write unit test.",
      body: "Write test for the homepage.",
      done: false,
      category: 1,
      created_at: "2022-04-01T20:39:20.517348Z",
      updated_at: "2022-04-01T20:39:20.517348Z",
    },
    {
      id: 4,
      title: "Cleaning.",
      body: "Clean the dishes.",
      done: false,
      category: 5,
      created_at: "2022-04-02T02:12:09.582163Z",
      updated_at: "2022-04-02T02:28:05.367811Z",
    },
  ]);

  const categoryDic = [
    { type: "Work", color: "#fd7e14" },
    { type: "Study", color: "#ffc107" },
    { type: "Exercise", color: "#474ade" },
    { type: "Chores", color: "#a350ba" },
    { type: "Miscellaneous", color: "#198754" },
  ];

  const handleNew = () => {
    console.log("add new to list");
  };
  const handleEdit = (id) => {
    console.log("edit", id);
  };
  const handleDelete = (id) => {
    console.log("delete", id);
  };
  return (
    <div className="container my-4">
      <h2>Demo Page</h2>
      <h5 className="mb-4">
        Login or sign up to be able to create your own todo list.
      </h5>
      <div className="mb-3 d-flex justify-content-center">
        <button className="btn btn-primary">
          <Link
            to="/loginout"
            style={{ color: "white", textDecoration: "none" }}
          >
            Login
          </Link>
        </button>
        <button className="btn btn-link mx-2">
          <Link to="/account">Sign up</Link>
        </button>
      </div>
      <div>
        <h2 className="text-center">My Todo List</h2>
        <Categories categoryDic={categoryDic} />
        <button className="btn btn-primary mb-4" onClick={handleNew}>
          Add a new Todo
        </button>

        {todos.map((todo) => {
          return (
            <div className="card text-center mb-4" key={todo.id}>
              <h5
                className="card-header"
                style={{
                  backgroundColor: categoryDic[todo.category - 1].color,
                  color: "white",
                }}
              >
                {categoryDic[todo.category - 1].type}
              </h5>
              <div className="card-body">
                <h5 className="card-title">{todo.title}</h5>
                <p className="card-text">{todo.body}</p>
                <button
                  className="btn btn-warning mx-2"
                  onClick={() => {
                    handleEdit(todo.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    handleDelete(todo.id);
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="card-footer text-muted ">
                Created on: {todo.created_at.split("T")[0]}
                <span className="mx-2">
                  At {todo.created_at.split("T")[1].split(":")[0]}:00
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
