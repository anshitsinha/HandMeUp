import React from 'react'
import { Link } from 'react-router-dom';

import './Header.css'

const Header = () => {
  return (
    <div className='header'>
        HandMeUp
        <Link to = "/login"> LOGIN </Link>
    </div>
  )
}

export default Header;