import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Program.css";
import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

import Workout from "./Workout";

const Program = (props) => {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.id != undefined) {
      get("/api/workouts", { id: props.id, program: props.program }).then(
        (workoutObjs) => {
          setWorkouts(workoutObjs);
        }
      );
    }
  }, []);

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
      <h1 className="Program-title">{props.program}</h1>
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
