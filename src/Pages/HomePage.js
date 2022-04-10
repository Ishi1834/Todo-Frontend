import { useContext, useEffect, useState } from "react";
import { UserTokenContext } from "../Contexts/LoggedInContext";
import { ItemIdContext, TodoListContext } from "../Contexts/HomePageContext";
import api from "../API/todos";
import TodoList from "../Components/Todos/TodoList";

export default function HomePage() {
  const [itemId, setItemId] = useState();
  const [todos, setTodos] = useState([]);

  const { userToken } = useContext(UserTokenContext);

  useEffect(() => {
    const fetchTodos = async () => {
      const config = {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      };
      try {
        const response = await api.get("", config);
        setTodos(response.data);
      } catch (err) {
        console.log(err.response);
      }
    };
    fetchTodos();
  }, [userToken]);

  return (
    <div className="container my-4">
      <ItemIdContext.Provider value={{ itemId, setItemId }}>
        <TodoListContext.Provider value={{ todos, setTodos }}>
          <TodoList todos={todos} />
        </TodoListContext.Provider>
      </ItemIdContext.Provider>
    </div>
  );
}
