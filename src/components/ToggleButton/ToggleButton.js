import React from 'react';
import './ToggleButton.css';

const ToggleButton = ({ toggleNav }) => {
  return (
    <div className="toggle-btn" onClick={() => toggleNav()}>
      <img src="https://www.svgrepo.com/show/54131/expand.svg" />
    </div>
  );
};

export default ToggleButton;
