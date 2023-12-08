import React from "react";
import useFetch from "../../../custom-hooks/useFetch";
import { FooterContentLinks } from "../../../interfaces";
import ErrorPage from "../../ErrorPage";

const FooterLinks: React.FC = () => {
  const { data, isLoading, error } = useFetch<FooterContentLinks[]>(
    "http://localhost:5001/footer_content"
  );

  if (!data) {
    console.log("No data!");
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
          <div key={item.id}>
            <h3>{item.firstContent}</h3>
            <p>{item.secondContent}</p>
            <form>
              <label htmlFor="email">E-mail адреса:</label>
              <input type="email" name="email" id="email" />
              <button className="filter-btn">Зачлени се!</button>
              <hr />
            </form>
            <p>{item.thirdContent}</p>
            <p>{item.fourthContent}</p>
            <p>{item.fifthContent}</p>
            <p>{item.sixthContent}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default FooterLinks;
