import React, { useState } from "react";
import hamburger from "../../svg-icons/hamburger.svg";
import search from "../../svg-icons/search.svg";
import arrowLeft from "../../svg-icons/arrow-left.svg";
import logo from "../../images/logo-igralishte.png";
import NavbarLinks from "./sub-components/NavbarLinks";
import { Link } from "react-router-dom";
import { useFilterContext } from "../../contexts/useFilterContext";
import TextSlider from "../text-slider/TextSlider";
import NavbarLinksDown from "./sub-components/NavbarLinksDown";

const Navbar: React.FC = () => {
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);

  const { closeFilterForm } = useFilterContext();

  const toggleHamburgerMenu = () => {
    setHamburgerMenuOpen(!hamburgerMenuOpen);
    setSearchOverlayOpen(false);
    closeFilterForm();
  };

  const toggleSearchOverlay = () => {
    setSearchOverlayOpen(!searchOverlayOpen);
    setHamburgerMenuOpen(false);
  };

  const closeHamburgerMenu = () => {
    setHamburgerMenuOpen(false);
  };

  return (
    <React.Fragment>
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
            <Link to={"/"}>
              <img src={logo} alt="logo-igralishte" />
            </Link>
          </div>
          <div className="content-wrapper">
            <img src={search} alt="search-icon" onClick={toggleSearchOverlay} />
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
              <Link to={"/"} onClick={closeHamburgerMenu}>
                <img src={logo} alt="logo-igralishte" />
              </Link>
            </div>
            <div className="content-wrapper">
              <img
                src={search}
                alt="search-icon"
                onClick={toggleSearchOverlay}
              />
            </div>
          </div>
          <div className="links-wrapper">
            <NavbarLinks closeHamburgerMenu={closeHamburgerMenu} />
          </div>
          <div className="links-down-wrapper">
            <NavbarLinksDown closeHamburgerMenu={closeHamburgerMenu} />
          </div>
        </div>

        <div className={`search-overlay ${searchOverlayOpen ? "open" : ""}`}>
          <div className="search-overlay-wrapper">
            <div className="content-wrapper">
              <img
                src={arrowLeft}
                alt="search-icon"
                onClick={toggleSearchOverlay}
                className="arrow-left"
              />
            </div>
            <input
              type="text"
              name="text"
              id="search"
              placeholder="Пребарувај..."
            />
            <div className="content-wrapper">
              <img
                src={search}
                alt="search-icon"
                onClick={toggleSearchOverlay}
                className="search-icon"
              />
            </div>
          </div>
        </div>
        {!hamburgerMenuOpen && !searchOverlayOpen && <TextSlider />}
      </div>
    </React.Fragment>
  );
};

export default Navbar;
