import React from 'react';
import './Tile.css';

const Tile = ({ post, baseUrl }) => {
  // How could I adjust the size of each tile depending  on the viewport so that there is no whitespace on any screensize?
  // Get current viewport width; find a way to divide it evently at any viewport
  // tiles can be 100% width of column
  return (
    <div
      className="image-tile"
      style={{
        backgroundImage: `url(${baseUrl}/uploads/${post.image.filename})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '500px',
        width: '500px',
      }}
    >
      <div className="tile-content-container flex-col justify-center align-center">
        <h1>{post.title}</h1>
        <p>
          {post.content.split(' ').length > 10
            ? `${post.content.split(' ').slice(0, 10).join(' ')}...`
            : post.content}
        </p>
      </div>
    </div>
  );
};

export default Tile;
