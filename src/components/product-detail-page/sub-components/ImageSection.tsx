import React from "react";
import arrowLeft from "../../../svg-icons/arrow-left-small.svg";
import arrowRight from "../../../svg-icons/arrow-right-small.svg";

const ImageSection: React.FC<{
  images: string[];
  currentImageIndex: number;
  handleLeftArrowClick: () => void;
  handleRightArrowClick: () => void;
  productTitle: string;
}> = ({
  images,
  currentImageIndex,
  handleLeftArrowClick,
  handleRightArrowClick,
  productTitle,
}) => {
  const displayedImages = Array.from(
    { length: 4 },
    (_, index) => images[(currentImageIndex + index) % images.length]
  );

  return (
    <React.Fragment>
      <div className="content-grouper-one">
        <p className="product-title mb-1">{productTitle}</p>
        <img
          src={images[currentImageIndex]}
          alt={`${productTitle} - fashion`}
        />
      </div>
      <div className="content-grouper-two mb-1">
        <div className="images-wrapper">
          <img
            src={arrowLeft}
            alt="arrow-icon"
            className="arrow-left-icon"
            onClick={handleLeftArrowClick}
          />
          <img
            src={arrowRight}
            alt="arrow-icon"
            className="arrow-right-icon"
            onClick={handleRightArrowClick}
          />
          <div className="image">
            {images.length >= 4
              ? displayedImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${productTitle} - fashion`}
                    className="product-image"
                  />
                ))
              : images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${productTitle} - fashion`}
                    className="product-image"
                  />
                ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ImageSection;
