import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Program.css";
import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";

import Workout from "./Workout";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Program = (props) => {
  const [workouts, setWorkouts] = useState([]);

  // useEffect(() => {
  //   // document.title = "News Feed";
  //   get("/api/workouts").then((workoutObjs) => {
  //     setWorkouts(workoutObjs);
  //   });
  // }, []);

  useEffect(() => {
    // document.title = "News Feed";
    // console.log(props.id);
    get("/api/workouts", { id: props.id, program: props.program }).then(
      (workoutObjs) => {
        setWorkouts(workoutObjs);
      }
    );
  }, []);

  let workoutList = workouts.map((workoutObj) => (
    <Workout
      id={props.id}
      name={workoutObj.name}
      img={workoutObj.img}
      status={workoutObj.status}
    />
  ));

  return (
    <span>
      <span className="Program-1-item">{workoutList[0]}</span>
      <div className="Program-2-item">
        {workoutList[1]}
        {workoutList[2]}
      </div>
      <span className="Program-1-item">{workoutList[3]}</span>
    </span>
  );
};

export default Program;
