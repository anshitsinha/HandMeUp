import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const signUp = () => {
    const URL = 'http://localhost:4000/signup';
    const data = { username, password };

    axios.post(URL, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div>Signup</div>
      Username
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      Password
      <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={signUp}>Signup</button>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Signup;
