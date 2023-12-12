import React from "react";
import useFetch from "../../../custom-hooks/useFetch";
import { FooterContentLinks } from "../../../interfaces";
import ErrorPage from "../../ErrorPage";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";

const FooterLinks: React.FC = () => {
  const { data, isLoading, error } = useFetch<FooterContentLinks[]>(
    "http://localhost:5001/footer_content"
  );

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <React.Fragment>
      <div className="footer-links">
        {data?.map((item) => (
          <div key={item.id} className="footer-wrapper">
            <h2>{item.firstContent}</h2>
            <p>{item.secondContent}</p>
            <form className="mb-1">
              <label htmlFor="email">E-mail адреса:</label>
              <input type="email" name="email" id="email" />
              <button className="filter-btn">Зачлени се!</button>
            </form>
            <Link to="/about-us">
              <p>{item.thirdContent}</p>
            </Link>
            <p>{item.fourthContent}</p>
            <p>{item.fifthContent}</p>
            <p>{item.sixthContent}</p>
          </div>
        ))}
        <SocialLinks />
        <p className="copyright">
          Сите права задржани &copy; 2023 igralishtesk.mk
        </p>
      </div>
    </React.Fragment>
  );
};

export default FooterLinks;
