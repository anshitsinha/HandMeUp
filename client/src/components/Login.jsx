import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';

const Login = () => {
  return (
    <div>
      <Header />
      <div>Login</div>
      Username
      <input type="text" />
      <br />
      Password
      <input type="text" />
      <br />
      <button>Login</button>
      < Link to="/signup">Signup</Link>
    </div>
  );
}

export default Login;
