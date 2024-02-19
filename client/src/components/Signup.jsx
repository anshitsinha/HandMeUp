import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const Signup = () => {
  return (
    <div>
      <Header />
      <div>Signup</div>
      Username
      <input type="text" />
      <br />
      Password
      <input type="text" />
      <br />
      <button>Signup</button>
      < Link to="/login">Login</Link>
    </div>
  );
}

export default Signup;
