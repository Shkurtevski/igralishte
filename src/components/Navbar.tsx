import React, { useState } from "react";
import hamburger from "../svg-icons/hamburger.svg";
import search from "../svg-icons/search.svg";
import logo from "../images/logo-igralishte.png";

const Navbar = () => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="navbar-wrapper">
        <div className="content-wrapper">
          <img
            src={hamburger}
            alt="hamburger-menu-icon"
            onClick={toggleHamburgerMenu}
          />
        </div>
        <div className="content-wrapper">
          <img src={logo} alt="logo-igralishte" />
        </div>
        <div className="content-wrapper">
          <img src={search} alt="search-icon" />
        </div>
      </div>
      <div className={`hamburger-menu ${hamburgerMenuOpen ? "open" : ""}`}>
        <div className="hamburger-menu-wrapper">
          <div className="content-wrapper">
            <img
              src={hamburger}
              alt="hamburger-menu-icon"
              onClick={toggleHamburgerMenu}
            />
          </div>
          <div className="content-wrapper">
            <img src={logo} alt="logo-igralishte" />
          </div>
          <div className="content-wrapper">
            <img src={search} alt="search-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
