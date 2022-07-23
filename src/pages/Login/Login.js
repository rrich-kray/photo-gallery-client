import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import './Login.css';

// Server is returning undefined token in production
// The fact that a token is being created at all implies the server received the request and attempted to create a token using the data provided.
// So route is correct.
// That implies a problem with the data being sent.
// is formState being updated?
const Login = ({ baseUrl }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });

  console.log(formState)

  const { login } = useAuth();

  // What am I not understanding? What assumptions am I making?
  // issue may be that the default form refresh is occurring before the attached callbacks
  // Callbacks added with .then() will never be invoked before the completion of the current run of the JavaScript event loop.
  // Maybe the page refresh is occuring in the event loop
  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/photo-gallery/api/users/login`, {
        email: formState.email,
        password: formState.password,
      })
      .then((userData) => {
        console.log(userData);
        login(userData.data);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    return setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="register flex-row">
      <div className="overlay"></div>
      <div className="register-left-panel flex-col justify-center align-center">
        <div className="register-text-container flex-col justify-center align-start">
          <span>Login to an existing account</span>
          <h1>Welcome back!</h1>
          <span>
            Not a member yet? <Link to="/register">Register</Link>
          </span>
        </div>
        <form className="register-form form" onSubmit={handleFormSubmit}>
          <div className="register-email-container input-container">
            <span>Email:</span>
            <input name="email" id="email" onChange={handleChange} />
          </div>
          <div className="register-password-container input-container">
            <span>Password:</span>
            <input name="password" id="password" onChange={handleChange} />
          </div>
          <div className="register-btns-container" style={{ zIndex: '999' }}>
            <button
              className="register-submit-btn form-btn"
              onClick={handleFormSubmit}
            >
              Log in
            </button>
            {/* <button className="form-btn">Login</button> */}
          </div>
        </form>
      </div>
      <div className="register-right-panel"></div>
    </div>
  );
};

export default Login;
