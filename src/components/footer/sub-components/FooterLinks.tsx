import React from "react";
import useFetch from "../../../custom-hooks/useFetch";
import { FooterContentLinks } from "../../../interfaces";
import ErrorPage from "../../error-page/ErrorPage";
import SocialLinks from "./SocialLinks";
import { Link } from "react-router-dom";
import getApiUrl from "../../../apiConfig";

const FooterLinks: React.FC = () => {
  const apiUrl: string = getApiUrl();
  const { data, isLoading, error } = useFetch<FooterContentLinks[]>(
    `${apiUrl}/footer_content`
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
            <div className="footer-links-wrapper">
              <Link to="/about-us">{item.thirdContent}</Link>
              <Link to="/contact">{item.fourthContent}</Link>
              <Link to="/location">{item.fifthContent}</Link>
              <Link to="/faq" className="last-footer-link">
                {item.sixthContent}
              </Link>
            </div>
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
