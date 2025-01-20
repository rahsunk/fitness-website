import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import "./Home.css";

import Program from "../modules/Program";

const Home = (props) => {
  const [catHappiness, setCatHappiness] = useState(0);

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  return (
    <div className="Home-screen">
      <h1>Upper Body Program</h1>
      {/* <img src="../../assets/fitMatesLogo.png"></img> */}
      <Program />
    </div>
  );
};

export default Home;
