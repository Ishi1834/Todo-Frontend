import { useState, useContext } from "react";
import { LoggedInContext } from "../Contexts/LoggedInContext";
import { Link, useNavigate } from "react-router-dom";
import LoginService from "../Services/Login";

export default function LogInOutPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const { userLoggedIn, setUserLoggedIn } = useContext(LoggedInContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await LoginService.login({
        username,
        password,
      });
      setUsername("");
      setPassword("");
      window.localStorage.setItem("loggedTodoUser", JSON.stringify(user));
      setUserLoggedIn(true);
      navigate("/");
    } catch (err) {
      setLoginError("Invalid credentials. Please try again.");
      console.log("Wrong credentials");
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedTodoUser");
  };

  if (userLoggedIn) {
    return (
      <div className="container my-4">
        <h2>Click the button below to logout</h2>
        <form onSubmit={handleLogout}>
          <button type="submit" className="btn btn-warning">
            Submit
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="container my-4">
      <h2>Login to get your tasks</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="text-danger mb-3">{loginError}</div>
        <div className="mb-3 d-flex">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button className="btn btn-link mx-2">
            <Link to="/account">Sign up</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
