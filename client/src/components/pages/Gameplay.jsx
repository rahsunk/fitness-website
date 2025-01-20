import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { get } from "../../utilities";

import Exercise from "../modules/Exercise";
import "./Gameplay.css";

let program1 = [
  {
    name: "Arm Circles Forward",
    img: "https://liftmanual.com/wp-content/uploads/2023/04/arm-circles.jpg",
    rep: "1x10",
    timed: false,
  },
  {
    name: "Arm Circles Backward",
    img: "https://liftmanual.com/wp-content/uploads/2023/04/arm-circles.jpg",
    rep: "1x10",
    timed: false,
  },
  {
    name: "Band Pull Aparts",
    img: "https://liftmanual.com/wp-content/uploads/2023/04/resistance-band-pull-apart.jpg",
    rep: "1x15",
    timed: false,
  },
  {
    name: "Thread the Needle",
    img: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/thread-the-needle-muscles-1024x345.png",
    rep: "1x10",
    timed: false,
  },
];

const Gameplay = () => {
  const [curExercise, setCurExercise] = useState(0);

  // useEffect(() => {
  //   // document.title = "News Feed";
  //   get("/api/exercises").then((exObjects) => {
  //     setWorkouts(exObjects);
  //   });
  // }, []);

  // let workoutList = workouts.map((workoutObj) => (
  //   <Workout
  //     name={workoutObj.name}
  //     img={workoutObj.img}
  //     status={workoutObj.status}
  //   />
  // ));

  const handleNext = () => {
    setCurExercise(curExercise + 1);
  };

  const handleClear = () => {};

  return (
    <>
      <div className="Gameplay-topRow">
        <h1>GET MOVING!!!</h1>
        <Link to="/">
          <button className="Gameplay-exit">Exit</button>
        </Link>
      </div>
      <span className="Exercise-box">
        <Exercise
          name={program1[curExercise].name}
          img={program1[curExercise].img}
          rep={program1[curExercise].rep}
          timed={program1[curExercise].timed}
        />
        {curExercise < program1.length - 1 ? (
          <button className="Gameplay-next" onClick={handleNext}>
            Next
          </button>
        ) : (
          <Link to="/" onClick={handleClear}>
            <button className="Gameplay-finish">Finish</button>
          </Link>
        )}

        {/* <span className="Program-1-item">{workoutList[0]}</span>
        <div className="Program-2-item">
          {workoutList[1]}
          {workoutList[2]}
        </div>
        <span className="Program-1-item">{workoutList[3]}</span> */}
      </span>
    </>
  );
};

export default Gameplay;
