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
  const [isLoading, setIsLoading] = useState(true); // State for managing loading phase

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
      // Clear current workouts and program
      setWorkouts([]);
      setProgram("");

      get("/api/programs", { id: props.userId }).then((programObj) => {
        setProgram(programObj.curProgram);
        getWorkouts(programObj.curProgram);
      });
    });
  };

  useEffect(() => {
    if (program) {
      // Wait for 3 seconds (3000ms) before rendering the Program component
      const timer = setTimeout(() => {
        setIsLoading(false); // Set loading state to false after delay
      }, 1000);

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [program]);

  return (
    <div className="Home-screen">
      {!props.userId ? (
        <Login />
      ) : isLoading ? (
        <h1>LOADING...</h1> // Show loading message for 3 seconds
      ) : (
        <>
          <Program
            id={props.userId}
            program={program}
            workouts={workouts}
            resetProgram={resetProgram}
          />
          <button onClick={resetProgram} className="Home-reset">
            RESET ALL
          </button>
          <h3>Refresh after hitting reset!</h3>
        </>
      )}
    </div>
  );
};

export default Home;
