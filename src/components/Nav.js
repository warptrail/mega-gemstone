import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';

const Nav = ({ isAuthenticated, setAuth, setValidityCheck }) => {
  const emojiList = [
    '🚜',
    '🚗',
    '🚛',
    '🚗',
    '🛺',
    '🚀',
    '🏰',
    '🦒',
    '🐞',
    '🐛',
    '🐝',
    '🦕',
    '🐊',
    '🦈',
    '🐢',
    '🎺',
    '🏜',
    '🛸',
  ];

  const [emoji, setEmoji] = useState(emojiList[0]);

  const onLogout = () => {
    TokenService.clearAuthToken();
    setAuth(false);
    setValidityCheck({});
  };

  const chooseRandomEmoji = () => {
    setEmoji(emojiList[Math.floor(Math.random() * emojiList.length)]);
  };

  const renderMenu = () => {
    if (!isAuthenticated) {
      return (
        <ul className="flex-wrap list-inline">
          <li className=" list-inline-item btn-primary">
            <Link to="/">Home</Link>
          </li>
          <li className=" list-inline-item btn-primary">
            <Link to="/login">Login</Link>
          </li>
          <li className="list-inline-item btn-primary">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      );
    } else if (isAuthenticated) {
      return (
        <ul className="d-flex flex-wrap list-inline">
          <li>
            <button
              className="list-inline-item btn-primary login-good"
              onClick={chooseRandomEmoji}
            >
              click here
            </button>
          </li>
          <li className="emoji-list">
            <span role="img">{emoji}</span>
          </li>
          <li>
            <button onClick={onLogout} className="list-inline-item btn-danger">
              Logout
            </button>
          </li>
        </ul>
      );
    }
  };

  return <nav className="py-1">{renderMenu()}</nav>;
};

export default Nav;
