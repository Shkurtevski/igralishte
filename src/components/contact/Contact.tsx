import React from "react";
import Container from "../../containers/Container";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import useFetch from "../../custom-hooks/useFetch";
import { ContactInfo } from "../../interfaces";
import sparksElements from "../../images/sparks-elements.png";
import { Link } from "react-router-dom";

const Contact = () => {
  const { data } = useFetch<ContactInfo[]>("http://localhost:5001/contact");

  const initialBreadcrumbs = ["Почетна", "Контакт"];
  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];
    return breadcrumbs;
  };

  return (
    <div>
      <Container>
        <div className="contact-us">
          <div className="contact-us-wrapper">
            <BreadCrumbs crumbs={getBreadCrumbs()} />
            <div className="text-content-wrapper mb-1">
              {data && data.length > 0 && <h2>{data[0].title}</h2>}
              <img src={sparksElements} alt="banner" />
            </div>
            <div className="content-wrapper">
              {data?.map((contactInfo) => (
                <React.Fragment>
                  <img src={contactInfo.image} alt={contactInfo.image} />
                  <h2>{contactInfo.contentTitle}</h2>
                  <p className="mb-2">{contactInfo.description}</p>
                  <h3 className="mb-2">{contactInfo.adress}</h3>
                  <h3>{contactInfo.numberTitle}</h3>
                  <p className="mb-2 number">{contactInfo.number}</p>
                  <h3>{contactInfo.workHoursTitle}</h3>
                  <p className="number">{contactInfo.monFriWorkingHours}</p>
                  <p className="number">{contactInfo.satWorkingHours}</p>
                </React.Fragment>
              ))}
              <Link to="/product-page">
                <button className="filter-btn">Кон продавницата</button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
