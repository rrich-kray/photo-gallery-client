import React from 'react';
import './Post.css';

// Two equal length columns.
// Left column contains image
// Right contains title, description, author.
const Post = ({ post }) => {
  return (
    <div className="post flex-row">
      <div
        className="post-left-panel"
        style={{
          backgroundImage: `url(http://localhost:3001/uploads/${post.image.filename})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className="post-right-panel">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default Post;
