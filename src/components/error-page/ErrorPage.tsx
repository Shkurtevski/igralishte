import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="error-page">
        <div className="error-page-wrapper">
          <h2>Страната не е пронајдена!</h2>
          <Link to="/">
            <button className="btn btn-black">Кон почетна</button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ErrorPage;
