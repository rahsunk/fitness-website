import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Program.css";
import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

import Workout from "./Workout";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const Program = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // document.title = "News Feed";
    // console.log(props.id);
    if (props.id != undefined) {
      get("/api/workouts", { id: props.id, program: props.program }).then(
        (workoutObjs) => {
          setWorkouts(workoutObjs);
        }
      );
    }
  }, []);

  // const initReset = () => {
  //   post("/api/reset", {
  //     id: props.id,
  //     program: props.program,
  //   }).then((message) => {
  //     // console.log(message, "ALL CLEAR");
  //     setWorkouts(workouts);
  //   });
  // };

  let workoutList = workouts.map((workoutObj) => (
    <Workout
      id={props.id}
      program={props.program}
      name={workoutObj.name}
      img={workoutObj.img}
      status={workoutObj.status2}
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
      {/* <button onClick={props.resetProgram} className="Program-reset">
        RESET
      </button> */}
    </span>
  );
};

export default Program;
