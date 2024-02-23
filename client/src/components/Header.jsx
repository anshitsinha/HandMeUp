import React from 'react'
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { logOut } from './Logout';

import './Header.css'

const Header = (props) => {
  return (
    <div className='header'>
        <div onClick={() => window.location.reload()} className='title'> HandMeUp </div>
        <input className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handleSearch && props.handleSearch(e.target.value)
                    }
                />
                <button className='search-btn' onClick={() => props.handleClick && props.handleClick()} > Search </button>
        
        {!localStorage.getItem('token') ? <Link to = "/login"> LOGIN </Link> : 
        <div>
          <button onClick={logOut}> Logout </button>
          <Link to = "/add-product"> Add a Product </Link>
        </div> }
        
    </div>
  )
}

export default Header;