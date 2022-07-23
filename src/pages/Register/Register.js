import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import './Register.css';

const Register = ({ baseUrl }) => {
  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });
  console.log(formState)
  // No token being created. Server not logging user creation process. Implies issue with frontend
  // formState logging correct value

  const { login } = useAuth();

  const handleFormSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${baseUrl}/photo-gallery/api/users/register`, {
        first_name: formState.first_name,
        last_name: formState.last_name,
        email: formState.email,
        password: formState.password,
      })
      .then((userData) => {
        // console.log(userData)
        login(userData.data);
        window.location.replace('/dashboard');
      })
      .catch((err) => {
        console.log(err);
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
          <span>Start for free</span>
          <h1>Create a new account</h1>
          <span>
            Already a member? <Link to="/login">Log in</Link>
          </span>
        </div>
        <form className="register-form form" onSubmit={handleFormSubmit}>
          <div className="register-names-container flex-row justify-center align-center">
            <div className="register-first-name input-container">
              <span>First Name:</span>
              <input
                name="first_name"
                id="first_name"
                onChange={handleChange}
              />
            </div>
            <div className="register-last-name input-container">
              <span>Last Name:</span>
              <input name="last_name" id="last_name" onChange={handleChange} />
            </div>
          </div>
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
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="register-right-panel"></div>
    </div>
  );
};

export default Register;
