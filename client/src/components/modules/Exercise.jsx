import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../pages/GamePage.css";
import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";

// /**
//  * The navigation bar at the top of all pages. Takes no props.
//  */
const Exercise = (props) => {
  const [time, setTime] = useState(props.exercise.rep);

  useEffect(() => {
    if (props.exercise.timed) {
      const interval = setInterval(() => {
        if (time != 0) {
          setTime(time - 1);
        }
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [time]);

  useEffect(() => {
    setTime(props.exercise.rep);
  }, [props.exercise.name]);

  return (
    <>
      <h1>{props.exercise.name}</h1>
      {props.exercise.timed ? (
        time <= 5 ? (
          <h2 className="Gameplay-time-five-seconds">{time}</h2>
        ) : (
          <h2 className="Gameplay-time">{time}</h2>
        )
      ) : (
        <h2>{time}</h2>
      )}
      <img src={props.exercise.img} />
    </>
  );
};

export default Exercise;
