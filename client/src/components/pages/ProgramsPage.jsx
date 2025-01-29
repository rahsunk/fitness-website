import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import { useOutletContext } from "react-router-dom";
import { get, post } from "../../utilities";

import ProgramBlock from "../modules/ProgramBlock";
import Login from "../modules/Login";

const ProgramsPage = () => {
  let props = useOutletContext();

  const [selectedProgram, setSelectedProgram] = useState("");

  // If logged in, render Programs Page, else render Login page
  return (
    <div className="Home-screen">
      {props.userId ? (
        <>
          <h1>YOUR PROGRAMS</h1>
          <ProgramBlock
            id={props.userId}
            program="Upper Body"
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
          />
          <ProgramBlock
            id={props.userId}
            program="Lower Body"
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
          />
          <ProgramBlock
            id={props.userId}
            program="Endurance"
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
          />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default ProgramsPage;
