import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import "./Login.css";
import { useOutletContext, useNavigate } from "react-router-dom";

const Login = () => {
  let props = useOutletContext();
  const navigate = useNavigate();

  const navigateToHome = (credentialResponse) => {
    props.handleLogin(credentialResponse);
    navigate("/home");
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
        onSuccess={navigateToHome}
        onFailure={(err) => console.log(err)}
        containerProps={{ className: "NavBar-link NavBar-login u-inlineBlock" }}
      />
    </div>
  );
};

export default Login;
