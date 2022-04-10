import { useContext, useEffect, useState } from "react";
import {
  TodoDeleteContext,
  ItemIdContext,
  TodoListContext,
} from "../../Contexts/HomePageContext";
import { UserTokenContext } from "../../Contexts/LoggedInContext";
import api from "../../API/todos";

export default function TodoDelete(props) {
  const [item, setItem] = useState({});

  const { setDeleteTodo } = useContext(TodoDeleteContext);
  const { itemId, setItemId } = useContext(ItemIdContext);
  const { todos, setTodos } = useContext(TodoListContext);
  const { userToken } = useContext(UserTokenContext);

  useEffect(() => {
    setItem(props.todos.filter((todo) => todo.id === itemId)[0]);
  }, []);

  const handleCancel = () => {
    setItemId();
    setDeleteTodo(false);
  };

  const handleDelete = async () => {
    const updatedTodos = props.todos.filter((todo) => todo.id !== itemId);
    const config = {
      headers: {
        Authorization: `Token ${userToken}`,
      },
    };
    try {
      const response = await api.delete(`${itemId}`, config);
      // filter state without mutating it
      setTodos(updatedTodos);
      setItemId();
      setDeleteTodo(false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  return (
    <div className="container w-50">
      <div className="card">
        <h4 className="card-header">
          Are you sure you want to delete this item?
        </h4>
        <div className="card-body">
          <h6 className="fs-4">{item.title}</h6>
          <p className="fs-5">{item.body}</p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-secondary mx-2" onClick={handleCancel}>
              Cancel
            </button>
            <button className="btn btn-danger mx-2" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
