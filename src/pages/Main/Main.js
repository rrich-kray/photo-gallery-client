import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import axios from "axios";
import Tile from "../../components/Tile/Tile";
import Post from "../../components/Post/Post";
import DashNav from "../../components/DashNav/DashNav";

const Main = ({
  baseUrl,
  activePost,
  setActivePost,
  isModalVisible,
  toggleModal,
}) => {
  const [formState, setFormState] = useState({
    search: "",
  });
  const [posts, setPosts] = useState([]);
  console.log(posts);

  let config = {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("token") ? localStorage.getItem("token") : ""
      }`,
    },
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await axios.get(
      `${baseUrl}/photo-gallery/api/posts`,
      {
        search: formState.search,
      },
      config
    );
  }

  useEffect(() => {
    axios.get(`${baseUrl}/photo-gallery/api/posts`).then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className={styles.main}>
      <DashNav
        links={["Home", "Dashboard", "Create Post"]}
        toggleModal={toggleModal}
      />
      {activePost && (
        <Post activePost={activePost} setActivePost={setActivePost} />
      )}
      <section className={styles.searchArea}>
        <div className={styles.searchContainer}>
          <input
            name="search"
            onChange={(e) =>
              setFormState({ ...formState, search: e.target.value })
            }
          />
          <div className={styles.btnWrapper} onClick={handleFormSubmit}>
            <img
              className={styles.searchBtn}
              src="https://www.svgrepo.com/show/14071/search.svg"
            />
          </div>
        </div>
      </section>
      <section className={styles.filterBar}>
        <div className={styles.datePanel}>
          <select name="sort-by-date">
            <option value="ascending">Ascending</option>
            <option value="descending">Descending</option>
          </select>
        </div>
        <div className={styles.featuredPanel}>
          <button className={styles.panelBtn}>All Posts</button>
          <button className={styles.panelBtn}>Featured</button>
          <button className={styles.panelBtn}>Most Liked</button>
        </div>
        <div className={styles.otherPanel}></div>
      </section>
      <section className={styles.gallery}>
        {posts.length > 0 &&
          posts.map((post) => (
            <Tile post={post} baseUrl={baseUrl} setActivePost={setActivePost} />
          ))}
      </section>
    </div>
  );
};

export default Main;
