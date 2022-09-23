import React from "react";
import styles from "./styles.module.scss";

const Post = ({ activePost, setActivePost, baseUrl }) => {
  console.log(activePost);
  return (
    <div className={styles.post}>
      <div className={styles.closePost} onClick={() => setActivePost()}>
        <img src="https://www.svgrepo.com/show/151290/close.svg" />
      </div>
      <div
        className={styles.postImage}
        style={{
          backgroundImage: `url(${baseUrl}/uploads/${activePost.image.filename})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className={styles.postInfo}>
        <div className={styles.postInfoLeft}>
          <h1>{activePost.title}</h1>
        </div>
        <div className={styles.postInfoRight}>
          <p>{activePost.content}</p>
        </div>
      </div>
      <div className={styles.comments}>
        <h1>Comments</h1>
        {activePost.comments.length > 0 ? (
          activePost.comments.map((comment) => (
            <div className={styles.comment}>{comment}</div>
          ))
        ) : (
          <span>No comments yet!</span>
        )}
      </div>
    </div>
  );
};

export default Post;
