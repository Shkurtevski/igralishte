import React from "react";
import { Link } from "react-router-dom";
import ImgText from "./sub-components/ImgText";
import Container from "../../containers/Container";
import CardCarousel from "./sub-components/CardCarousel";
import bannerImg from "../../images/banner.png";
import circlePink from "../../images/circle-01-pink.png";
import contentOne from "../../images/homepage-content1.png";
import circleTwo from "../../images/homepage-content-circle-2.png";
import contentTwo from "../../images/homepage-content-2.png";
import circleThree from "../../images/homepage-circle-3.png";

const Homepage: React.FC = () => {

  return (
    <React.Fragment>
      <div className="homepage">
        <Link to="/product-page">
          <ImgText
            bannerImage={bannerImg}
            circleImage={circlePink}
          />
        </Link>
        <Container>
          <div className="homepage-wrapper">
            <div className="homepage-content">
              <CardCarousel />
            </div>
          </div>
        </Container>
        <Link to="/another-destination">
          <ImgText
            bannerImage={contentOne}
            circleImage={circleTwo}
            className="second-image-text-content"
            className1="second-wrapper"
            className2="second-circle"
            
          />
        </Link>
        <Link to="/yet-another-destination">
          <ImgText
            bannerImage={contentTwo}
            circleImage={circleThree}
           
          />
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
