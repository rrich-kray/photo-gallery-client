import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import Tile from "../../components/Tile/Tile";
import Modal from "../../components/Modal/Modal";
import jwt_decode from "jwt-decode";
import "./Dashboard.css";

const Dashboard = ({ baseUrl }) => {
  const [isNavVisible, changeNavVisibility] = useState(false);
  const [isModalVisible, changeModalVisibility] = useState(false);
  const [activePost, setActivePost] = useState();
  const [posts, setPosts] = useState([]);
  const [navRef, setNavRef] = useState();
  const userId = jwt_decode(localStorage.getItem("token")).data[0];

  let config = {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
      }`,
    },
  };

  const toggleModal = () => {
    if (!isModalVisible) {
      changeModalVisibility(true);
      return;
    }
    changeModalVisibility(false);
  };

  const toggleNav = () => {
    if (isNavVisible) {
      changeNavVisibility(false);
      return;
    }
    changeNavVisibility(true);
  };

  useEffect(() => {
    const postsArr = [];
    axios
      .get(`${baseUrl}/photo-gallery/api/users/${userId}`, config)
      .then((userData) => {
        userData.data.Posts.map((post) => postsArr.push(post));
        setPosts(postsArr);
      });
  }, []);

  console.log(posts);

  return (
    <div className="dashboard flex-col">
      {isNavVisible && (
        <Nav
          links={["/dashboard", "/profile", "/logout"]}
          toggleModal={toggleModal}
        />
      )}
      {isModalVisible && <Modal userId={userId} baseUrl={baseUrl} />}
      <ToggleButton toggleNav={toggleNav} />
      <div className="photo-container">
        {posts.length ||
          (!posts === 0 && (
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              No posts found!
            </div>
          ))}
        {posts.map((post) => (
          <Tile post={post} baseUrl={baseUrl} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
