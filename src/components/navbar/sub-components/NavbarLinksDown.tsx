import React from "react";
import cartIcon from "../../../images/cart-icon.png"
import favoritesIcon from "../../../images/favorites-icon.png";
import profile from "../../../svg-icons/profile.svg"
import { Link } from "react-router-dom";

interface Props {
  closeHamburgerMenu: () => void;
}

const NavbarLinksDown: React.FC<Props> = ({ closeHamburgerMenu }) => {
  return (
    <div className="navbar-links-down">
      <div className="navbar-links-down-grouper" onClick={closeHamburgerMenu}>
        <img src={cartIcon} alt="favorites-icon" />
        <p>Кошничка</p>
      </div>
      <Link to="/favorites">
        <div className="navbar-links-down-grouper" onClick={closeHamburgerMenu}>
          <img src={favoritesIcon} alt="favorites-icon" />
          <p>Омилени</p>
        </div>
      </Link>
      <div className="navbar-links-down-grouper" onClick={closeHamburgerMenu}>
        <img src={profile} alt="favorites-icon" />
        <p>Логирај се / Регистрирај се</p>
      </div>
    </div>
  );
};

export default NavbarLinksDown;
