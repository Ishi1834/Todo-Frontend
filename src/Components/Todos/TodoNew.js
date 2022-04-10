import { useContext, useState } from "react";
import { FormContext, TodoListContext } from "../../Contexts/HomePageContext";
import { UserTokenContext } from "../../Contexts/LoggedInContext";
import api from "../../API/todos";

export default function NewTodo() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("1");
  const [body, setBody] = useState("");

  const { userToken } = useContext(UserTokenContext);
  const { setNewTodo } = useContext(FormContext);
  const { todos, setTodos } = useContext(TodoListContext);

  // generating a random value to be used as the key for the list
  const idValue = () => {
    return new Date().getTime() * todos.length;
  };
  const handleCancel = () => {
    setNewTodo(false);
  };

  //api call to submit form
  const postTodo = async (post) => {
    const data = post;
    //console.log(userToken, data);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      },
    };
    try {
      const response = await api.post("", data, config);
      //console.log(response.data);
      setTodos([...todos, response.data]);
      setNewTodo(false);
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const handleSubmit = (event) => {
    const currentTime = new Date().toLocaleTimeString();
    event.preventDefault();
    const newPost = {
      id: idValue(),
      title: title,
      body: body,
      category: category,
      created_at: currentTime,
    };
    postTodo(newPost);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select a category</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option defaultValue="1">Work</option>
            <option value="2">Study</option>
            <option value="3">Exercise</option>
            <option value="4">Chores</option>
            <option value="5">Miscellaneous</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            type="text"
            className="form-control"
            value={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary me-4">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
