import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logIn = () => {
    const URL = 'http://localhost:4000/login';
    const data = { username, password };

    axios.post(URL, data)
      .then((res) => {
        console.log(res.data);
        if(res.data.message) {
          console.log(res.data.message);
          if(res.data.token){
            localStorage.setItem('token', res.data.token)
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div>Login</div>
      Username
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      Password
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={logIn}>Login</button>
      <Link to="/signup">Signup</Link>
    </div>
  );
};

export default Login;
