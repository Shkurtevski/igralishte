import React, { useState } from "react";

import sparksElements from "../../images/sparks-elements.png";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import useFetch from "../../custom-hooks/useFetch";
import { About } from "../../interfaces";

const AboutUs = () => {
  const { data } = useFetch<About[]>("http://localhost:5001/about_us");
  const [activeContent, setActiveContent] = useState("Нашата Приказна");

  const initialBreadcrumbs = ["Почетна", "За Нас"];
  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];
    return breadcrumbs;
  };

  const handleContentToggle = (content: string) => {
    setActiveContent(content);
  };

  return (
    <React.Fragment>
      <div className="about-us">
        <div className="about-us-wrapper">
          <BreadCrumbs crumbs={getBreadCrumbs()} />
          <div className="text-content-wrapper mb-1">
            <img src={sparksElements} alt="banner" />
            {data && data.length > 0 && <h2>{data[0].title}</h2>}
          </div>
          <div className="button-wrapper">
            <button
              onClick={() => handleContentToggle("Нашата Приказна")}
              className={
                activeContent === "Нашата Приказна" ? "active btn1" : "btn1"
              }
            >
              Нашата Приказна
            </button>
            <button
              onClick={() => handleContentToggle("Нашата Работа")}
              className={
                activeContent === "Нашата Работа" ? "active btn2" : "btn2"
              }
            >
              Нашата Работа
            </button>
          </div>
          <div className="content-wrapper">
            {activeContent === "Нашата Приказна" && data && data.length > 0 && (
              <React.Fragment>
                <img src={data[0].image} alt="banner" />
                <h2>{data[0].contentTitle}</h2>
                <p>{data[0].descriptionOne}</p>
                <p>{data[0].descriptionTwo}</p>
                <p>{data[0].descriptionThree}</p>
              </React.Fragment>
            )}
          </div>
          <div className="second-content-wrapper">
            {activeContent === "Нашата Работа" && data && data.length > 0 && (
              <React.Fragment>
                <img src={data[1].image} alt="random-img" />
                <h2>{data[1].contentTitle}</h2>
                <p>{data[1].descriptionOne}</p>
                <p>{data[1].descriptionTwo}</p>
                <p>{data[1].descriptionThree}</p>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutUs;
