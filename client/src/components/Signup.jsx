import React, { useState, useEffect, useRef } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import "./Login.css";
import API_URL from "../constants";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = () => {
    const URL = API_URL + "/signup";
    const data = { username, password };

    axios
      .post(URL, data)
      .then((res) => {
        console.log(res.data);
        navigate("/login");
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
            className="input-field"
            id="input-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="input-1" className="input-label">
            <span className="input-label-content">Username</span>
          </label>
        </span>

        <span className="input">
          <input
            type="password"
            className="input-field"
            id="input-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label htmlFor="input-2" className="input-label">
            <span className="input-label-content">Password</span>
          </label>
        </span>
        <div className="butonss">
          <button id="sendButton" onClick={signUp} type="button">
            Signup
          </button>
          <br />
          <p className="question">Already have an account?</p>
          <button
            id="sendButton"
            onClick={() => {
              window.location.href = "/login";
            }}
            type="button"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
