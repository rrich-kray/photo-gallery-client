import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import store from "../../store";
import styles from "./styles.module.scss";
import { useRecoilState } from "recoil";
import { userState } from "../..";

const Login = ({ baseUrl }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();

  const handleFormSubmit = async (e) => {
    await e.preventDefault();

    if (!formState.email || !formState.password) {
      setError("Email/Password cannot be blank!");
      return;
    }

    const response = await axios.post(
      `${baseUrl}/photo-gallery/api/users/login`,
      {
        email: formState.email,
        password: formState.password,
      }
    );

    if (response.data.errorMessage) {
      setError(response.data.errorMessage);
      return;
    }

    console.log(response);

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    window.location.replace("/dashboard");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className={styles.registerLogin}>
      <div className={styles.overlay}></div>
      <div className={styles.formPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <span>Login to an existing account</span>
            <h1>Welcome back!</h1>
            <span>
              Not a member yet? <Link to="/register">Register</Link>
            </span>
          </div>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            {error && <div className={styles.errorHandler}>{error}</div>}
            <div className={styles.inputContainer}>
              <span>Email:</span>
              <input name="email" id="email" onChange={handleChange} />
            </div>
            <div className={styles.inputContainer}>
              <span>Password:</span>
              <input name="password" id="password" onChange={handleChange} />
            </div>
            <div
              className={styles.registerBtnsContainer}
              style={{ zIndex: "999" }}
            >
              <button className={styles.formBtn} onClick={handleFormSubmit}>
                Log in
              </button>
              {/* <button className="form-btn">Login</button> */}
            </div>
          </form>
        </div>
      </div>
      <div className={styles.formPanel}></div>
    </div>
  );
};

export default Login;
