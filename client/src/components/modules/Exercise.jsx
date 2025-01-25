import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Program.css";
import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";

// /**
//  * The navigation bar at the top of all pages. Takes no props.
//  */
const Exercise = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
      <h2>{props.rep}</h2>
      <img src={props.img} />
    </>
  );
};

export default Exercise;
