import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import styles from "../Login/styles.module.scss";

const Register = ({ baseUrl }) => {
  const [error, setError] = useState("");
  const [formState, setFormState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  // No token being created. Server not logging user creation process. Implies issue with frontend
  // formState logging correct value

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !formState.email ||
      !formState.first_name ||
      !formState.password ||
      !formState.last_name
    ) {
      setError("You cannot leave any fields blank");
      return;
    }
    const response = await axios.post(
      `${baseUrl}/photo-gallery/api/users/register`,
      {
        ...formState,
      }
    );

    if (response.data.errorMessage) {
      setError(response.data.errorMessage);
      return;
    }

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
            <span>Start for free</span>
            <h1>Create a new account</h1>
            <span>
              Already a member? <Link to="/login">Log in</Link>
            </span>
          </div>
          <form className={styles.form} onSubmit={handleFormSubmit}>
            {error && <div className={styles.errorHandler}>{error}</div>}
            <div className={styles.registerNamesContainer}>
              <div className={styles.inputContainer}>
                <span>First Name:</span>
                <input
                  name="first_name"
                  id="first_name"
                  onChange={handleChange}
                />
              </div>
              <div className={styles.inputContainer}>
                <span>Last Name:</span>
                <input
                  name="last_name"
                  id="last_name"
                  onChange={handleChange}
                />
              </div>
            </div>
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
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={styles.formPanel}></div>
    </div>
  );
};

export default Register;
