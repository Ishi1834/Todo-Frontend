import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import HomePage from "./Pages/HomePage";
import LogInOutPage from "./Pages/LogInOutPage";
import AccountPage from "./Pages/AccountPage";
import Intro from "./Components/Intro";

import { LoggedInContext, UserTokenContext } from "./Contexts/LoggedInContext";

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState();

  // login if token is in the local storage
  useEffect(() => {
    const LoggedUserJson = window.localStorage.getItem("loggedTodoUser");
    if (LoggedUserJson) {
      const user = JSON.parse(LoggedUserJson);
      setUserLoggedIn(true);
      setUserToken(user.key);
    }
  }, [userLoggedIn]);

  return (
    <LoggedInContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      <UserTokenContext.Provider value={{ userToken, setUserToken }}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={userLoggedIn ? <HomePage /> : <Intro />}
            ></Route>
            <Route path="/loginout" element={<LogInOutPage />}></Route>
            <Route path="/account" element={<AccountPage />}></Route>
          </Routes>
        </Layout>
      </UserTokenContext.Provider>
    </LoggedInContext.Provider>
  );
}
