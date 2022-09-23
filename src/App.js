import "./App.css";
import React, { useEffect, useState } from "react";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import jwt_decode from "jwt-decode";
import Dashboard from "./pages/Dashboard/Dashboard";
import store from "./store";
import { useAuth } from "./contexts/AuthContext";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "./index";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";

function App() {
  const [user, setUser] = useRecoilState(userState);
  // const baseUrl = "https://photo-gallery-server-rrich.herokuapp.com";
  const baseUrl = "http://localhost:3001";
  const token = localStorage.getItem("token");
  console.log(user);

  return (
    <div className="app flex-row justify-center align-center">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              !token ? <Navigate to="login" /> : <Navigate to="dashboard" />
            }
          />
          <Route
            exact
            path="/login"
            element={
              !token ? (
                <Login baseUrl={baseUrl} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/register"
            element={
              !token ? (
                <Register baseUrl={baseUrl} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              token ? <Dashboard baseUrl={baseUrl} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
