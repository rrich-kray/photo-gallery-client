import React from "react";
import axios from "axios";
import "./Tile.css";

const Tile = ({
  post,
  baseUrl,
  isPostVisible,
  setPostVisibility,
  setActivePost,
}) => {
  console.log(isPostVisible);
  return (
    <div
      className="image-tile"
      onClick={() => {
        setActivePost(post);
      }}
      style={{
        backgroundImage: `url(${baseUrl}/uploads/${post.image.filename})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="tile-content-container flex-col justify-center align-center">
        <div
          className="trash-icon-container"
          onClick={async () => {
            await axios.delete(`${baseUrl}/photo-gallery/api/posts/${post.id}`);
            window.location.replace("/dashboard");
          }}
        >
          <img src="https://www.svgrepo.com/show/120929/trash.svg" />
        </div>
        <h1>{post.title}</h1>
        <p>
          {post.content.split(" ").length > 10
            ? `${post.content.split(" ").slice(0, 10).join(" ")}...`
            : post.content}
        </p>
      </div>
    </div>
  );
};

export default Tile;
