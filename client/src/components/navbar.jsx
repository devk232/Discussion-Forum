import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';


const NavBar = ({ user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      console.log('Searching for:', searchTerm);
      setSearchTerm('');
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const renderAuthLinks = () => {
    if (!user) {
      return (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/users/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
      );
    } else {
      return (
          <React.Fragment>
            {user.role === 'admin' && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/admin">
                    Admin
                  </NavLink>
                </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Hi {user.username}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#" onClick={onLogout}>
                Logout
              </NavLink>
            </li>
          </React.Fragment>
      );
    }
  };

  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Community
          </NavLink>
          <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <div className="search-bar-container">
              <SearchBar
                  searchTerm={searchTerm}
                  handleChange={handleChange}
                  handleKeyDown={handleKeyDown}
                  handleSearch={handleSearch}
              />
            </div>
            <ul className="navbar-nav ml-auto">{renderAuthLinks()}</ul>
          </div>
        </div>
      </nav>
  );
};

export default NavBar;