import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';

import Header from './Header';

const Signup = () => {

  const [ username, setusername ] = useState('');
  const [ password, setpassword ] = useState('');
  const signUp = () => {
    console.log({username, password});
    const URL = 'localhost:4000/signup';
    const data = { username, password };
    axios.post(URL, data)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
                alert('SERVER ERR')
            })
  }
  
  return (
    <div>
      <Header />
      <div>Signup</div>
      Username
      <input type="text" value={username} onChange={(e) => {setusername(e.target.value)}} />
      <br />
      Password
      <input type="text" value={password} onChange={(e) => {setpassword(e.target.value)}} />
      <br />
      <button onClick={signUp}>Signup</button>
      < Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
