import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Nav.css';

const Nav = ({ links, toggleModal }) => {
  console.log(links);
  const { logout } = useAuth();
  return (
    <div className="nav flex-row justify-between align-center">
      {links &&
        links.map((link) => (
          <div className="link-container">
            {link === '/logout' ? (
              <button onClick={() => logout()}>Logout</button>
            ) : (
              <Link to={link} style={{ fontSize: '1rem' }}>
                {link[1].toUpperCase() + link.split('').slice(2).join('')}
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
