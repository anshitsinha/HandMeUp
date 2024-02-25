import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { logOut } from "./Logout";
import "./Header.css";

const Header = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isScrolled ? "scrolled" : ""}`}>
      <Link to="/" className="title">
        HandMeUp
      </Link>
      <div className="userControls">
        <input
          className="search"
          type="text"
          value={props && props.search}
          onChange={(e) =>
            props.handleSearch && props.handleSearch(e.target.value)
          }
        />
        <div
          className="search-btn"
          style={{ cursor: "pointer" }}
          onClick={() => props.handleClick && props.handleClick()}
        >
          Search
        </div>

        {!localStorage.getItem("token") ? (
          <Link to="/login">LOGIN</Link>
        ) : (
          <>
            <div onClick={logOut} style={{ cursor: "pointer" }}>
              Logout
            </div>
            <Link to="/add-product">Add a Product</Link>
            <Link to="/my-products">My Products</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
