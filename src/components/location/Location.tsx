import React from "react";

import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import sparksElements from "../../images/sparks-elements.png";

const Location: React.FC = () => {
  const initialBreadcrumbs = ["Почетна", "Локатор"];
  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];
    return breadcrumbs;
  };

  return (
    <React.Fragment>
      <div className="location">
        <div className="location-wrapper">
          <BreadCrumbs crumbs={getBreadCrumbs()} />
          <div className="text-content-wrapper mb-1">
            <img src={sparksElements} alt="banner" />
            <h2>Локатор</h2>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.070082252446!2d21.414380212047952!3d41.99877147110874!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x135415882af66105%3A0xe1f000c294f5f0e3!2s14%2C%20Kosturski%20Heroi%206%2C%20Skopje%201000%2C%20North%20Macedonia!5e0!3m2!1sen!2sde!4v1702454634295!5m2!1sen!2sde"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps"
          ></iframe>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Location;
