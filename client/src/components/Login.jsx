import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logIn = () => {
    const URL = "http://localhost:4000/login";
    const data = { username, password };

    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.message) {
          console.log(res.data.message);
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("input--filled");
  };

  const handleInputBlur = (e) => {
    const parent = e.target.parentNode;
    if (e.target.value.trim() === "") {
      parent.classList.remove("input--filled");
    }
  };

  return (
    <div>
      <Header />

      <div className="loginForm">
        <span className="input">
          <input
            type="text"
            className="input__field"
            id="input-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="input-1" className="input__label">
            <span className="input__label-content">Username</span>
          </label>
        </span>

        <span className="input">
          <input
            type="password"
            className="input__field"
            id="input-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="input-2" className="input__label">
            <span className="input__label-content">Password</span>
          </label>
        </span>
        <div className="butonss">
          <button id="send-button" onClick={logIn} type="button">
            Send
          </button>
          <br />
          <p className="question">Dont have an account?</p>
          <button
            id="send-button"
            onClick={() => {
              window.location.href = "/signup";
            }}
            type="button"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
