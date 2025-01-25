import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import "./Home.css";
import { useOutletContext } from "react-router-dom";
import { get, post } from "../../utilities";

import Program from "../modules/Program";
import Login from "../modules/Login";

const Home = () => {
  let props = useOutletContext();
  const [program, setProgram] = useState("");
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    if (props.userId != undefined) {
      get("/api/programs", { id: props.userId }).then((programObj) => {
        setProgram(programObj.curProgram);
        getWorkouts(programObj.curProgram);
      });
    }
  }, [props.userId]);

  const getWorkouts = (program) => {
    if (props.userId !== undefined) {
      get("/api/workouts", { id: props.userId, program: program }).then(
        (workoutObjs) => {
          setWorkouts(workoutObjs);
        }
      );
    }
  };

  const resetProgram = () => {
    post("/api/reset", {
      id: props.userId,
      program: program,
    }).then(() => {
      // console.log(message, "ALL CLEAR");
      setWorkouts([]); // Clear current workouts
      setProgram("");

      get("/api/programs", { id: props.userId }).then((programObj) => {
        setProgram(programObj.curProgram); // Set the new program
        getWorkouts(programObj.curProgram); // Fetch workouts for the new program
      });
    });
  };
  // If logged in, render Program, else render Login page
  return (
    <div className="Home-screen">
      {!props.userId ? (
        <Login />
      ) : !program ? (
        <h1>LOADING...</h1>
      ) : (
        <>
          <Program
            id={props.userId}
            program={program}
            workouts={workouts}
            resetProgram={resetProgram}
          />
          <button onClick={resetProgram} className="Home-reset">
            RESET ALL PROGRAMS
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
