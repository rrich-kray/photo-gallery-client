import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useRecoilState } from "recoil";
import { userState } from "../..";
import "./Nav.css";

const Nav = ({ links, toggleModal }) => {
  return (
    <div className="nav flex-row justify-between align-center">
      {links &&
        links.map((link) => (
          <div className="link-container">
            {link === "/logout" ? (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  window.location.replace("/");
                }}
              >
                Logout
              </button>
            ) : (
              <Link to={link} style={{ fontSize: "1rem" }}>
                {link[1].toUpperCase() + link.split("").slice(2).join("")}
              </Link>
            )}
          </div>
        ))}
      <div className="link-container">
        <button onClick={() => toggleModal()}>Create a Post</button>
      </div>
    </div>
  );
};

export default Nav;
