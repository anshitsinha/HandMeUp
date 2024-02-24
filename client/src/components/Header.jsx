import React from 'react'
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { logOut } from './Logout';

import './Header.css'

const Header = (props) => {
  return (
    <div className='header'>
        <Link to="/" className='title'> HandMeUp </Link>
        <div className='userControls'>
          
        <input className='search'
                    type='text'
                    value={props && props.search}
                    onChange={(e) => props.handleSearch && props.handleSearch(e.target.value)
                    }
                />
                <div className='search-btn' onClick={() => props.handleClick && props.handleClick()} > Search </div>
        
                {!localStorage.getItem('token') ? (
  <Link to="/login">LOGIN</Link>
) : (
  <>
    <div onClick={logOut}>Logout</div>
    <Link to="/add-product">Add a Product</Link>
    <Link to="/my-products">My Products</Link>
  </>
)}
</div>
        
    </div>
  )
}

export default Header;