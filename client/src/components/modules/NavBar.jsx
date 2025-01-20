import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import "./NavBar.css";
import { UserContext } from "../context/UserContext";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <p className="NavBar-title">Fit-mates</p>
      <Link to="/home" className="NavBar-link">
        Home
      </Link>
      <p className="NavBar-link">Programs</p>
      <p className="NavBar-link">Friends</p>
      <Link to="/map" className="NavBar-link">
        Map
      </Link>
      <p className="NavBar-link">Settings</p>
      <Link to="/login" className="NavBar-link" onClick={props.handleLogout}>
        Logout
      </Link>
    </nav>
  );
};

export default NavBar;
