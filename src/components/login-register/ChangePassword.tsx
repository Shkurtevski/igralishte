import React from "react";
import { Link } from "react-router-dom";
import bigLogo from "../../images/big-logo.png";

const ChangePassword: React.FC = () => {
  return (
    <React.Fragment>
      <div className="change-password">
        <Link to={"/"}>
          <img src={bigLogo} alt="igralishte-logo" className="logo" />
        </Link>
        <div className="change-password-wrapper">
          <p>Стара лозинка</p>
          <div className="border-div">******</div>
          <p>Нова лозинка</p>
          <div className="border-div">******</div>
          <p>Повтори нова лозинка</p>
          <div className="border-div">******</div>
          <Link to="/login">
            <button type="submit" className="btn btn-black">
              Зачувај
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChangePassword;
