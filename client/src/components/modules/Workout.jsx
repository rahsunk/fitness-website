import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Workout.css";
import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

const Workout = (props) => {
  const [status, setStatus] = useState(props.status);
  const navigate = useNavigate();

  const initGameplay = (name) => {
    post("/api/start", {
      id: props.id,
      program: props.program,
      name: name,
    }).then((message) => {
      console.log(message, "ONGOING");
      navigate("/game");
    });
  };

  const initNothing = () => {};

  return (
    <Link
      onClick={status != "lock" ? () => initGameplay(props.name) : initNothing}
    >
      <span
        className={
          props.status != "clear" ? "Workout-button" : "Workout-button-clear"
        }
      >
        <img
          src={
            status != "lock"
              ? props.img
              : "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f512.png"
          }
          className="Workout-img"
        ></img>
      </span>
      <h2>{status != "lock" ? props.name : "LOCKED"}</h2>
    </Link>
  );

  // if (status == "lock") {
  //   return (
  //     <Link>
  //       <span className="Workout-button">
  //         <img
  //           src="https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f512.png"
  //           className="Workout-img"
  //         ></img>
  //       </span>
  //       <h2>LOCKED</h2>
  //     </Link>
  //   );
  // } else if (status == "unlock") {
  //   return (
  //     <Link onClick={initGameplay}>
  //       <span className="Workout-button">
  //         <img src={props.img} className="Workout-img"></img>
  //       </span>
  //       <h2>{props.name}</h2>
  //     </Link>
  //   );
  // } else {
  //   return (
  //     <Link onClick={initGameplay}>
  //       <span className="Workout-button-clear">
  //         <img src={props.img} className="Workout-img"></img>
  //       </span>
  //       <h2>{props.name}</h2>
  //     </Link>
  //   );
  // }
};

export default Workout;
