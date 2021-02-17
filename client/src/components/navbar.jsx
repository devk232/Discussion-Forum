import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        Community
      </NavLink>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor03">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="#">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="#">
              Features
            </NavLink>
          </li>
          {!user && (
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
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/me">
                  Hi {user.username} !
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/users/logout">
                  LogOut
                </NavLink>
              </li>
            </React.Fragment>
          )}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="/drop"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown
            </a>
            {/* <div className="dropdown-menu">
                <a className="dropdown-item" to="#">
                  Action
                </a>
                <a className="dropdown-item" to="#">
                  Another action
                </a>
                <a className="dropdown-item" to="#">
                  Something else here
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" to="#">
                  Separated link
                </a>
              </div> */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
