import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../API/todos";
import { LoggedInContext } from "../../Contexts/LoggedInContext";

export default function Registration() {
  const navigate = useNavigate();
  // form state
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [signupError, setSignupError] = useState("");

  const { setUserLoggedIn } = useContext(LoggedInContext);

  const isRequired = (value) => (value === "" ? false : true);
  const validateLength = (length, min, max) =>
    length > min && length < max ? true : false;

  const validateUsername = (username) => {
    setSignupError("");
    var valid = false;
    const min = 6,
      max = 15;

    if (!isRequired(username)) {
      setUsernameError("Username cannot be blank.");
    } else if (!validateLength(username.length, min, max)) {
      setUsernameError(
        `Username should be between ${min} and ${max} characters.`
      );
    } else {
      setUsernameError("");
      valid = true;
    }
    return valid;
  };

  const validateEmail = (email) => {
    var valid = false;
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line
    if (!isRequired(email)) {
      setEmailError("Email cannot be blank.");
    } else if (!re.test(email)) {
      setEmailError("Please enter an email address.");
    } else {
      setEmailError("");
      valid = true;
    }
    return valid;
  };

  const validatePassword = (password) => {
    var valid = false;
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    if (!isRequired(password)) {
      setPasswordError("Password cannot be blank.");
    } else if (!re.test(password)) {
      setPasswordError(
        "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)"
      );
    } else {
      setPasswordError("");
      valid = true;
    }
    return valid;
  };

  const validatePassword2 = (password2) => {
    var valid = false;
    if (!isRequired(password2)) {
      setPassword2Error("Password cannot be blank.");
    } else if (password !== password2) {
      setPassword2Error("Both Password should match each other.");
    } else {
      setPassword2Error("");
      valid = true;
    }
    return valid;
  };

  // post form a save user token
  const handleLogin = (event) => {
    event.preventDefault();
    if (
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validatePassword2(password2)
    ) {
      const postUser = async () => {
        const parameters = {
          username: username,
          email: email,
          password1: password,
          password2: password2,
        };
        try {
          const response = await api.post(
            "dj-rest-auth/registration/",
            parameters
          );
          console.log(response);
          const user = response.data.key;
          window.localStorage.setItem("loggedTodoUser", JSON.stringify(user));
          setUserLoggedIn(true);
          navigate("/");
        } catch (err) {
          //console.log(err);
          console.log(err.response);
          if (
            err.response.data.username[0] ===
            "A user with that username already exists."
          ) {
            setSignupError("A user with that username already exists.");
          }
        }
      };
      postUser();
    }
  };

  return (
    <div className="container my-4">
      <h2>Sign up below</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              validateUsername(e.target.value);
              setUsername(e.target.value);
            }}
          />
          <small className="text-danger">{usernameError}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => {
              validateEmail(e.target.value);
              setEmail(e.target.value);
            }}
          />
          <small className="text-danger">{emailError}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              validatePassword(e.target.value);
              setPassword(e.target.value);
            }}
          />
          <small className="text-danger">{passwordError}</small>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={password2}
            onChange={(e) => {
              validatePassword2(e.target.value);
              setPassword2(e.target.value);
            }}
          />
          <small className="text-danger">{password2Error}</small>
        </div>
        <div className="text-danger mb-3">{signupError}</div>
        <div className="mb-3 d-flex">
          <button type="submit" className="btn btn-primary">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}
