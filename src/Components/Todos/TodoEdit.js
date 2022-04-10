import { useContext, useEffect, useState } from "react";
import {
  TodoEditContext,
  ItemIdContext,
  TodoListContext,
} from "../../Contexts/HomePageContext";
import { UserTokenContext } from "../../Contexts/LoggedInContext";
import api from "../../API/todos";

export default function TodoItem(props) {
  const [displayedContent, setDisplayedContent] = useState({});
  const [loadingDisplay, setLoadingDisplay] = useState(true);
  const [taskDone, setTaskDone] = useState(false);
  const [body, setBody] = useState("");

  const { setTodoEdit } = useContext(TodoEditContext);
  const { itemId, setItemId } = useContext(ItemIdContext);
  const { todos, setTodos } = useContext(TodoListContext);
  const { userToken } = useContext(UserTokenContext);

  useEffect(() => {
    const item = props.todos.filter((todo) => todo.id === itemId)[0];
    setDisplayedContent(item);
    setBody(item.body);
    setLoadingDisplay(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateItem = async (todoItem) => {
    const updatedTodos = todos.filter((todo) => todo.id !== itemId);
    // patch request to server
    const data = todoItem;
    const config = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
    try {
      const response = await api.patch(`${itemId}/`, data, config);
      console.log(response);
      setTodos([...updatedTodos, response.data]);
      setItemId();
      setTodoEdit(false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const handleEdit = (event) => {
    event.preventDefault();
    const todoItem = {
      body: body,
      done: taskDone,
    };
    updateItem(todoItem);
  };

  if (loadingDisplay) {
    return <h3>loading...</h3>;
  }
  return (
    <div className="card text-center">
      <div className="card-header">{displayedContent.category}</div>
      <div className="card-body">
        <h5 className="card-title">{displayedContent.title}</h5>
        <form onSubmit={handleEdit}>
          <p className="card-text">{displayedContent.body}</p>
          <input
            type="text"
            className="form-control mb-3"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          ></input>
          <div className="my-3">
            <input
              className="form-check-input mx-2"
              type="checkbox"
              checked={taskDone}
              onChange={() => {
                setTaskDone(!taskDone);
              }}
            />
            Task Done
          </div>
          <button className="btn btn-warning mb-2">Submit</button>
        </form>
      </div>
      <div className="card-footer text-muted">
        Created on: {displayedContent.created_at.split("T")[0]}
        <span className="mx-2">
          At {displayedContent.created_at.split("T")[1].split(":")[0]}:00
        </span>
      </div>
    </div>
  );
}
