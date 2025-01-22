import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import "./Home.css";
import { useOutletContext } from "react-router-dom";

import Program from "../modules/Program";

const Home = () => {
  let props = useOutletContext();
  const [program, setProgram] = useState("Upper Body");

  return (
    <div className="Home-screen">
      {/* <img src="../../assets/fitMatesLogo.png"></img> */}
      {/* {console.log(props.userId, program)} */}
      {props.userId && <Program id={props.userId} program={program} />}
    </div>
  );
};

export default Home;
