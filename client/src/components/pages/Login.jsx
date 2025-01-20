import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import "./Login.css";

const Login = (props) => {
  const [catHappiness, setCatHappiness] = useState(0);

  const incrementCatHappiness = () => {
    setCatHappiness(catHappiness + 1);
  };

  return (
    <div className="Login-box">
      <h1>Fit-mates</h1>
      {/* <img src="../../assets/fitMatesLogo.png"></img> */}
      <img
        src="https://static-00.iconduck.com/assets.00/fire-emoji-402x512-8ma95d17.png"
        className="Login-logo"
      ></img>
      <GoogleLogin
        text="signin_with"
        onSuccess={props.handleLogin}
        onFailure={(err) => console.log(err)}
        containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
      />
    </div>
  );
};

export default Login;
