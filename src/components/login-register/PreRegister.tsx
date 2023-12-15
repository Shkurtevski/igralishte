import React from "react";
import { Link } from "react-router-dom";
import bigLogo from "../../images/big-logo.png";
import googleIcon from "../../svg-icons/google-icon.svg";
import facebookIcon from "../../svg-icons/facebook-icon.svg";

const PreRegister = () => {
  return (
    <div className="pre-register">
      <Link to={"/"}>
        <img src={bigLogo} alt="igralishte-logo" className="logo" />
      </Link>
      <div className="pre-register-wrapper">
        <Link to={"/register"}>
          <button className="pre-register-btn">
            Регистрирај се со емаил адреса
          </button>
        </Link>
        <p className="or">или</p>
        <button className="pre-register-btn google-btn">
          <img src={googleIcon} alt="google-icon" />{" "}
          <span>Регистрирај се преку Google</span>
        </button>
        <button className="pre-register-btn">
          <img src={facebookIcon} alt="facebook-icon" />
          <span> Регистрирај се преку Facebook</span>
        </button>
        <p>
          Веќе имаш профил?{" "}
          <Link to="/login">
            <span className="login-span">Логирај се</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PreRegister;
