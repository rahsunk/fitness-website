import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { get, post } from "../../utilities";

import Exercise from "../modules/Exercise";
import "./GamePage.css";
import { useOutletContext } from "react-router-dom";

// let program1 = [
//   {
//     name: "Arm Circles Forward",
//     img: "https://liftmanual.com/wp-content/uploads/2023/04/arm-circles.jpg",
//     rep: "1x10",
//     timed: false,
//   },
//   {
//     name: "Arm Circles Backward",
//     img: "https://liftmanual.com/wp-content/uploads/2023/04/arm-circles.jpg",
//     rep: "1x10",
//     timed: false,
//   },
//   {
//     name: "Band Pull Aparts",
//     img: "https://liftmanual.com/wp-content/uploads/2023/04/resistance-band-pull-apart.jpg",
//     rep: "1x15",
//     timed: false,
//   },
//   {
//     name: "Thread the Needle",
//     img: "https://www.inspireusafoundation.org/wp-content/uploads/2023/09/thread-the-needle-muscles-1024x345.png",
//     rep: "1x10",
//     timed: false,
//   },
// ];

const GamePage = () => {
  let props = useOutletContext();
  const [curProgram, setProgram] = useState("Upper Body");
  const [index, setIndex] = useState(0);
  const [curExerciseList, setExerciseList] = useState([]);
  const [curID, setID] = useState(undefined);
  const [curExercise, setExercise] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // document.title = "News Feed";
    get("/api/workouts", { id: props.userId, program: curProgram }).then(
      (workoutObjs) => {
        // curExerciseList = workoutObjs.map((workoutObj) => {
        //   workoutObj.exerciseList;
        // });
        // console.log(workoutObjs);
        let exerciseList = [];
        for (let i = 0; i < workoutObjs.length; i++) {
          exerciseList.push(workoutObjs[0].exerciseList[i]);
        }
        setExerciseList(exerciseList);
        setID(workoutObjs[0].id);
      }
    );
  }, []);

  // let workoutList = workouts.map((workoutObj) => (
  //   <Workout
  //     name={workoutObj.name}
  //     img={workoutObj.img}
  //     status={workoutObj.status}
  //   />
  // ));

  const handleNext = () => {
    setIndex(index + 1);
  };

  const handleClear = () => {
    setIndex(0);
    post("/api/clear", {
      id: props.userId,
      program: curProgram,
      name: "Warm-Up",
    });
    navigate("/home");
  };

  if (curExerciseList.length == 0) {
    return <div>NOT LOGGED IN</div>;
  } else {
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
            name={curExerciseList[index].name}
            img={curExerciseList[index].img}
            rep={curExerciseList[index].rep}
            timed={curExerciseList[index].timed}
          />
          {index < curExerciseList.length - 1 ? (
            <button className="Gameplay-next" onClick={handleNext}>
              Next
            </button>
          ) : (
            <Link onClick={handleClear}>
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
  }
};

export default GamePage;
