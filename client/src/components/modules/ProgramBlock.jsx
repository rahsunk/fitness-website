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
