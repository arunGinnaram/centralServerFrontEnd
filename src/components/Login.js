import React from "react";
import axios from "axios";
import "./Login.css";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
// import Registration from "./Registration";
import { useLogin } from "../context/LoginDetailsContext";
function Login() {
  // const [loginDetails, setLoginDetails] = React.useState({});
  const { dispatch, state } = useLogin();
  const navigate = useNavigate();
  const baseURL = "http://localhost:8088/login";
  const validate = () => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
    };
    axios
      .post(baseURL, { username: "reg123", password: "pet@123" }, { headers })
      .then((response) => {
        console.log(response.data.Authorization);
        console.log(response.data.STATUS);
        dispatch({
          type: "AUTH",
          value: response.data.Authorization,
        });
        dispatch({
          type: "STATUS",
          value: response.data.STATUS,
        });
        navigate("/SideNav");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="login-container">
      <div className="login">
        <div className="signin">
          <h4>Sign in</h4>
        </div>
        <div className="input">
          <input className="inp" placeholder="Enter username"></input>
        </div>
        <div className="input">
          <input className="inp" placeholder="Enter password"></input>
        </div>
        <button className="btnlogin" onClick={validate}>
          Login
        </button>
      </div>
      <div className="info">
        <h2>Central Server</h2>
        <h3>Timing Technologies India</h3>
        <span>
          &copy;2016 All Rights Reserved. <br />
          Timing Technologies India
        </span>
        <a href="#">Privacy and Terms</a>
      </div>
    </div>
  );
}

export default Login;
