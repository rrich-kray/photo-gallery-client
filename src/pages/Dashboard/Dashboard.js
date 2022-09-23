import React, { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";
import Nav from "../../components/Nav/Nav";
import ToggleButton from "../../components/ToggleButton/ToggleButton";
import Tile from "../../components/Tile/Tile";
import Modal from "../../components/Modal/Modal";
import styles from "./styles.module.scss";
import Post from "../../components/Post/Post";

const Dashboard = ({ baseUrl }) => {
  const [isNavVisible, changeNavVisibility] = useState(false);
  const [isModalVisible, changeModalVisibility] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activePost, setActivePost] = useState();
  const [isPostVisible, setPostVisibility] = useState(false);
  const [navRef, setNavRef] = useState();
  const user = JSON.parse(localStorage.getItem("user"));

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
      .get(`${baseUrl}/photo-gallery/api/users/${user.id}`, config)
      .then((userData) => {
        userData.data.Posts.map((post) => postsArr.push(post));
        setPosts(postsArr);
      });
  }, []);

  return (
    <div className={styles.dashboard}>
      {activePost && (
        <Post
          activePost={activePost}
          setActivePost={setActivePost}
          baseUrl={baseUrl}
        />
      )}
      {isNavVisible && (
        <Nav
          links={["/dashboard", "/profile", "/logout"]}
          toggleModal={toggleModal}
        />
      )}
      {isModalVisible && <Modal userId={user.id} baseUrl={baseUrl} />}
      <ToggleButton toggleNav={toggleNav} />
      <div className={styles.dashboardHeader}>
        <div className={styles.headerInfo}>
          <div className={styles.avatarContainer}>
            {posts.filter((post) => post.image.is_avatar === true).length >
            0 ? (
              <img
                src={`${baseUrl}/uploads/${
                  posts.filter((post) => post.image.is_avatar === true).image
                    .filename
                }`}
              ></img>
            ) : (
              <span style={{ textAlign: "center", fontSize: "0.75rem" }}>
                No Avatar Set
              </span>
            )}
          </div>
          <div className={styles.name}>
            <span>{`${user.first_name} ${user.last_name}`}</span>
          </div>
          <span className={styles.email}>{user.email}</span>
          <div className={styles.following}>0 Following</div>
          <button className={styles.editProfile}>Edit Profile</button>
        </div>
      </div>
      <div className={styles.galleryHeader}>
        <button className={styles.galleryHeaderBtn}>Gallery</button>
        <button className={styles.galleryHeaderBtn}>Liked Posts</button>
        <button className={styles.galleryHeaderBtn}>Saved Posts</button>
      </div>
      <div className={styles.photoContainer}>
        {!posts === 0 && (
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
        )}
        {posts.map((post) => (
          <Tile
            post={post}
            baseUrl={baseUrl}
            isPostVisible={isPostVisible}
            setPostVisibility={setPostVisibility}
            setActivePost={setActivePost}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
