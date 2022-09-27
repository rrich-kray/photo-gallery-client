import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";

const DashNav = ({ links, toggleModal }) => {
  return (
    <nav className={styles.nav}>
      <section className={styles.logoContainer}></section>
      <section className={styles.linkWrapper}>
        <button
          className={styles.linkBtn}
          onClick={() => window.location.replace(`/home`)}
        >
          Home
        </button>
        <button
          className={styles.linkBtn}
          onClick={() => window.location.replace(`/dashboard`)}
        >
          Dashboard
        </button>
        <button className={styles.linkBtn} onClick={toggleModal}>
          Create Post
        </button>
      </section>
      <section className={styles.authLinks}>
        {localStorage.getItem("user") ? (
          <button
            className={styles.linkBtn}
            onClick={() => {
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              window.location.replace("/login");
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className={styles.linkBtn}
              onClick={() => window.location.replace("/login")}
            >
              Log in
            </button>
            <button
              className={styles.linkBtn}
              onClick={() => window.location.replace("/register")}
            >
              Register
            </button>
          </>
        )}
      </section>
    </nav>
  );
};

export default DashNav;
