// import React, { useState, useEffect } from "react";
// import { GoogleLogin } from "@react-oauth/google";
// import "../../utilities.css";
// import "./ProgramBlock.css";
// import { useOutletContext, useNavigate } from "react-router-dom";
// import { get, post } from "../../utilities";

// const ProgramBlock = (props) => {
//   const navigate = useNavigate();
//   const [img, setImg] = useState("");
//   const [curProgram, setProgram] = useState("");
//   const [isClicked, setisClicked] = useState(false);

//   const navigateToHome = (credentialResponse) => {
//     navigate("/home");
//   };

//   const setImage = () => {};

//   useEffect(() => {
//     if (props.program === "Upper Body") {
//       setImg(
//         "https://static-00.iconduck.com/assets.00/person-lifting-weights-emoji-2048x2045-vjjgypu7.png"
//       );
//     } else if (props.program == "Lower Body") {
//       setImg(
//         "https://static-00.iconduck.com/assets.00/leg-emoji-1851x2048-p3ci1djr.png"
//       );
//     } else if (props.program == "Endurance") {
//       setImg("https://images.emojiterra.com/google/android-11/512px/1f3c3.png");
//     }

//     get("/api/programs", { id: props.id }).then((programObj) =>
//       setProgram(programObj.curProgram)
//     );
//   }, []);

//   const handleProgramChange = () => {
//     post("/api/programs", { id: props.id, program: props.program });
//     setProgram(props.program);
//     setisClicked(!isClicked);
//   };

//   return (
//     <>
//       <div
//         onClick={handleProgramChange}
//         className={
//           isClicked || props.program == curProgram
//             ? "ProgramBlock-selected"
//             : "ProgramBlock-box"
//         }
//       >
//         <img src={img} className="ProgramBlock-img"></img>
//         <h1>{props.program}</h1>
//       </div>
//     </>
//   );
// };

// export default ProgramBlock;

import React, { useState, useEffect } from "react";
import "../../utilities.css";
import "./ProgramBlock.css";
import { get, post } from "../../utilities";
import weightlifter from "../../assets/weightlifter.png";
import leg from "../../assets/leg.png";
import runner from "../../assets/runner.png";

const ProgramBlock = ({ program, selectedProgram, setSelectedProgram, id }) => {
  const [img, setImg] = useState("");

  useEffect(() => {
    // Set the image based on the selected program
    if (program === "Upper Body") {
      setImg(weightlifter);
    } else if (program === "Lower Body") {
      setImg(leg);
    } else if (program === "Endurance") {
      setImg(runner);
    }

    // Fetch current program from the API if needed
    get("/api/programs", { id }).then((programObj) => {
      // You can sync the selected program with the API if needed
      if (programObj.curProgram !== selectedProgram) {
        setSelectedProgram(programObj.curProgram); // Sync with the backend if necessary
      }
    });
  }, [program, id, selectedProgram, setSelectedProgram]);

  const handleProgramChange = () => {
    post("/api/programs", { id, program });
    setSelectedProgram(program); // Update the selected program globally
  };

  return (
    <div
      onClick={handleProgramChange}
      className={
        selectedProgram === program
          ? "ProgramBlock-selected" // Apply selected class if the program is currently selected
          : "ProgramBlock-box" // Default box class if not selected
      }
    >
      <img src={img} className="ProgramBlock-img" alt={program} />
      <h1>{program}</h1>
    </div>
  );
};

export default ProgramBlock;
