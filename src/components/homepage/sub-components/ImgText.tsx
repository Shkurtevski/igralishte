import React from "react";

interface ImgTextProps {
  bannerImage: string;
  circleImage: string;
  className?: string;
  className1?: string;
  className2?: string;
}

const ImgText: React.FC<ImgTextProps> = ({
  bannerImage,
  circleImage,
  className,
  className1,
  className2,
}) => {
  return (
    <React.Fragment>
      <div className={`banner ${className || ""}`}>
        <div className={`banner-wrapper ${className1 || ""}`}>
          <img src={bannerImage} alt="banner" />
          <img
            src={circleImage}
            alt="circle-with-text"
            className={`circle-banner ${className2 || ""}`}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImgText;
