import React from "react";
import cartIcon from "../../../images/cart-icon.png";
import favoritesIcon from "../../../images/favorites-icon.png";
import profile from "../../../svg-icons/user-icon.svg";
import { Link } from "react-router-dom";
import useFetch from "../../../custom-hooks/useFetch";
import { User } from "../../../interfaces";

interface Props {
  closeHamburgerMenu: () => void;
}

const NavbarLinksDown: React.FC<Props> = ({ closeHamburgerMenu }) => {
  const usersUrl = "https://igralishte-webs.onrender.com/users";
  const { data: users } = useFetch<User[]>(usersUrl);

  const handleLogout = async () => {
    if (users && users.length > 0) {
      const userId = users[0].id;
      try {
        await fetch(`${usersUrl}/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isLoggedIn: false }),
        });
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };

  const loggedInUser = users?.find((user) => user.isLoggedIn)!;

  return (
    <React.Fragment>
      <div className="navbar-links-down">
        <Link to="/added-to-card">
          <div
            className="navbar-links-down-grouper"
            onClick={closeHamburgerMenu}
          >
            <img src={cartIcon} alt="favorites-icon" />
            <p>Кошничка</p>
          </div>
        </Link>
        <Link to="/favorites">
          <div
            className="navbar-links-down-grouper"
            onClick={closeHamburgerMenu}
          >
            <img src={favoritesIcon} alt="favorites-icon" />
            <p>Омилени</p>
          </div>
        </Link>
        {users && users.length > 0 && users[0].isLoggedIn ? (
          <div className="navbar-links-down-grouper">
            <img src={profile} alt="favorites-icon" className="user-icon" />
            <p className="profile-logout">
              <Link to={`/login/${loggedInUser.id}`}>
                <span className="login-span">Мој профил</span> /{" "}
              </Link>
              <Link to="/login">
                <span onClick={handleLogout} className="login-span">
                  Одлогирај се
                </span>
              </Link>
            </p>
          </div>
        ) : (
          <div
            className="navbar-links-down-grouper"
            onClick={closeHamburgerMenu}
          >
            <img src={profile} alt="favorites-icon" />
            <p className="login-register">
              <Link to="/login">
                <span className="login-span">Логирај се</span>
              </Link>{" "}
              /{" "}
              <Link to="/pre-register">
                <span className="register-span">Регистрирај се</span>
              </Link>
            </p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default NavbarLinksDown;
