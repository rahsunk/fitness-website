import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import { UserContext } from "../context/UserContext";

/**
 * The navigation bar at the top of all pages.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div>Fit-mates</div>
      <Link to="/home" className="NavBar-link">
        Home
      </Link>
      <Link to="/programs" className="NavBar-link">
        Programs
      </Link>
      {/* <p className="NavBar-link">Friends</p> */}
      <Link to="/map" className="NavBar-link">
        Map
      </Link>
      {/* <p className="NavBar-link">Settings</p> */}
      {props.userId ? (
        <button
          className="NavBar-link NavBar-login u-inlineBlock"
          onClick={props.handleLogout}
        >
          Sign out
        </button>
      ) : (
        <div></div>
      )}
    </nav>
  );
};

export default NavBar;
