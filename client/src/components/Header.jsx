import React from 'react'
import { Link } from 'react-router-dom';
import { logOut } from './Logout';

import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <Link to = "/" className='title'> HandMeUp </Link>
        {!localStorage.getItem('token') ? <Link to = "/login"> LOGIN </Link> : 
        <div>
          <button onClick={logOut}> Logout </button>
          <Link to = "/add-product"> Add a Product </Link>
        </div> }
        
    </div>
  )
}

export default Header;