import { useContext, useState } from "react";
import {
  TodoEditContext,
  ItemIdContext,
  FormContext,
  TodoDeleteContext,
} from "../../Contexts/HomePageContext";
import Categories from "../Categories";
import NewTodo from "../Todos/TodoNew";
import TodoDelete from "../Todos/TodoDelete";
import TodoEdit from "../Todos/TodoEdit";

export default function TodoList(props) {
  const [newTodo, setNewTodo] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);
  const [todoEdit, setTodoEdit] = useState(false);

  const { setItemId } = useContext(ItemIdContext);

  const categoryDic = [
    { type: "Work", color: "#fd7e14" },
    { type: "Study", color: "#ffc107" },
    { type: "Exercise", color: "#474ade" },
    { type: "Chores", color: "#a350ba" },
    { type: "Miscellaneous", color: "#198754" },
  ];

  const handleEdit = (id) => {
    console.log("edit item ", id);
    setItemId(id);
    setTodoEdit(true);
  };

  const handleDelete = (id) => {
    setItemId(id);
    setDeleteTodo(true);
  };

  const handleNew = () => {
    setNewTodo(true);
  };

  if (todoEdit) {
    return (
      <TodoEditContext.Provider value={{ todoEdit, setTodoEdit }}>
        <TodoEdit todos={props.todos} />
      </TodoEditContext.Provider>
    );
  }

  if (deleteTodo) {
    return (
      <TodoDeleteContext.Provider value={{ setDeleteTodo }}>
        <TodoDelete todos={props.todos} />
      </TodoDeleteContext.Provider>
    );
  }

  if (newTodo) {
    return (
      <FormContext.Provider value={{ setNewTodo }}>
        <NewTodo />
      </FormContext.Provider>
    );
  }

  return (
    <div>
      <h2 className="text-center">My Todo List</h2>
      <Categories categoryDic={categoryDic} />
      <button className="btn btn-primary mb-4" onClick={handleNew}>
        Add a new Todo
      </button>

      {props.todos.map((todo) => {
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
  );
}
