import React, { useReducer, createContext, useContext } from "react";
import store from "../store";
import jwt_decode from "jwt-decode";

const token = localStorage.getItem("token");

const ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
};

const initialState = {
  user: token
    ? { id: jwt_decode(token).id, email: jwt_decode(token).email }
    : null,
};

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const authReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user: payload,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: ACTIONS.LOGIN,
      payload: { id: userData.user.id, email: userData.user.email },
    });
    // window.location.replace("/dashboard");
    // const store = store.getState();
    // store.setState({
    //   ...state,
    //   user: userData,
    // });
  };

  const logout = () => {
    dispatch({
      type: ACTIONS.LOGOUT,
    });
    localStorage.removeItem("token");
    window.location.replace("/register");
    // const store = store.getState();
    // store.setState({
    //   ...state,
    //   user: {},
    // });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
