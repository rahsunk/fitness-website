import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

import Exercise from "../modules/Exercise";
import "./GamePage.css";
import { useOutletContext } from "react-router-dom";

const GamePage = () => {
  let props = useOutletContext();
  const [curProgram, setProgram] = useState("");
  const [index, setIndex] = useState(0);
  const [curExerciseList, setExerciseList] = useState([]);
  const [curExercise, setExercise] = useState(undefined);
  const [curID, setID] = useState(undefined);
  const [time, setTime] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.userId != undefined) {
      get("/api/programs", { id: props.userId })
        .then((programObj) => {
          setProgram(programObj.curProgram);
        })
        .then(() => {
          get("/api/start", {
            id: props.userId,
            program: curProgram,
            status: "ongoing",
          }).then((workoutObj) => {
            setExerciseList(workoutObj.exerciseList);
            setID(workoutObj.id);
            setExercise(workoutObj.name);
          });
        });
    }
  }, []);

  get("/api/start", {
    id: props.userId,
    program: curProgram,
    status: "ongoing",
  }).then((workoutObj) => {
    setExerciseList(workoutObj.exerciseList);
    setID(workoutObj.id);
    setExercise(workoutObj.name);
  });

  const handleNext = () => {
    if (curExerciseList[index + 1].timed) {
      setTime(curExerciseList[index + 1].rep);
    }
    setIndex(index + 1);
  };

  const handleClear = () => {
    post("/api/clear", {
      id: props.userId,
      program: curProgram,
      name: curExercise,
    }).then((message) => {
      // console.log(message);
      navigate("/home");
    });
  };

  const handleExit = () => {
    post("/api/exit", {
      id: props.userId,
      program: curProgram,
      name: curExercise,
    }).then((message) => {
      // console.log(message);
      navigate("/home");
    });
  };

  if (curExerciseList.length == 0) {
    return <h1 className="Gameplay-warning">RETURN TO HOME FIRST!</h1>;
  } else if (!curProgram) {
    return <h1>LOADING...</h1>;
  } else {
    return (
      <>
        <span className="Exercise-box">
          <div className="Exercise-exit">
            <Link>
              <button onClick={handleExit} className="Gameplay-exit">
                Exit
              </button>
            </Link>
          </div>
          <Exercise exercise={curExerciseList[index]} />

          {index < curExerciseList.length - 1 ? (
            <button className="Gameplay-next" onClick={handleNext}>
              Next
            </button>
          ) : (
            <Link onClick={handleClear}>
              <button className="Gameplay-finish">Finish</button>
            </Link>
          )}
        </span>
      </>
    );
  }
};

export default GamePage;
