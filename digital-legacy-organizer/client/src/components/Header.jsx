import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header({ username, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Digital Legacy Organizer</h1>
      </div>
      {username && (
        <div className="header-right">
          <nav className="nav-links">
            <Link to="/">Assets</Link>
            <Link to="/contacts">Trusted Contacts</Link>
          </nav>
          <div className="user-controls">
            <span>Welcome, {username}!</span>
            <button onClick={onLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;