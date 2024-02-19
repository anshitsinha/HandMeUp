import React from 'react'
import { Link } from 'react-router-dom';

import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        <Link to = "/"> HandMeUp </Link>
        <Link to = "/login"> LOGIN </Link>
    </div>
  )
}

export default Header;