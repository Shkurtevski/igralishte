import React from "react";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import sparksElements from "../../images/sparks-elements.png";
import Container from "../../containers/Container";
import Question from "./sub-components/Question";

const FaqPage: React.FC = () => {
  const initialBreadcrumbs = ["Почетна", "Често поставувани прашања"];
  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];
    return breadcrumbs;
  };

  return (
    <React.Fragment>
      <Container>
        <div className="faq">
          <div className="faq-wrapper">
            <BreadCrumbs crumbs={getBreadCrumbs()} />
            <div className="text-content-wrapper mb-1">
              <h2>Често поставувани прашања</h2>
              <img src={sparksElements} alt="banner" />
            </div>
            <div className="content-wrapper">
              <Question
                question="1. Ова е примерок за прашања кои би биле на страната?"
                description="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              />
              <Question
                question="2. Ова е примерок за прашања кои би биле на страната?"
                description="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              />
              <Question
                question="3. Ова е примерок за прашања кои би биле на страната?"
                description="It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              />
            </div>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default FaqPage;
