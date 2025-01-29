import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import "../../utilities.css";
import "./Login.css";
import { useOutletContext, useNavigate } from "react-router-dom";
import fitMatesLogo from "../../assets/fitMatesLogo.png";

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
      <img src={fitMatesLogo} className="Login-logo"></img>
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
