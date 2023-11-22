import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/useProductDataContext";
import ErrorPage from "../ErrorPage";
import arrowLeft from "../../svg-icons/arrow-left-small.svg";
import arrowRight from "../../svg-icons/arrow-right-small.svg";
import QuantitySelector from "./sub-components/QuantitySelector";
import arrowDown from "../../svg-icons/arrow-down.svg";
import arrowUp from "../../svg-icons/arrow-up.svg";
import RelatedProducts from "../related-products/RelatedProducts";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useContext(ProductContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);

  console.log(selectedQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const product = data?.find((p) => p.id === id);

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <div className="is-loading-wrapper">
        <p>Loading..</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-wrapper">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <ErrorPage />;
  }

  const handleLeftArrowClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const displayedImages = Array.from(
    { length: 4 },
    (_, index) =>
      product.images[(currentImageIndex + index) % product.images.length]
  );

  return (
    <React.Fragment>
      <div className="product-detail-page">
        <div className="product-detail-wrapper">
          <div className="content-grouper-one">
            <p className="product-title mb-1">{product.title}</p>
            <img src={product.images[0]} alt={`${product.title} - fashion`} />
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
                {product.images.length >= 4
                  ? displayedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.title} - fashion`}
                        className="product-image"
                      />
                    ))
                  : product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.title} - fashion`}
                        className="product-image"
                      />
                    ))}
              </div>
            </div>
          </div>
          <div className="content-grouper-three mb-1">
            <p className="product-price mb-1">{product.price} ден.</p>
            <p className="product-description mb-1">{product.description}</p>
            <QuantitySelector onQuantityChange={handleQuantityChange} />
            <div className="content-wrapper mb-1">
              <button className="btn btn-pink">Додај во Кошничка</button>
            </div>
          </div>
          <div className="content-grouper-four mb-1">
            <div className="content-grouper-four-wrapper">
              <p className="sizes mr-0_5">Величина:</p>
              <div className="dropdown">
                <button
                  className="dropdown-btn mb-1"
                  onClick={toggleSizeDropdown}
                >
                  <img
                    src={isSizeDropdownOpen ? arrowUp : arrowDown}
                    alt="arrows"
                    style={{
                      margin: isSizeDropdownOpen
                        ? "0.4rem 0.1rem 0 0.1rem"
                        : "0 0 0.4rem 0.1rem",
                    }}
                  />
                </button>
                {isSizeDropdownOpen && (
                  <div className="dropdown-content">
                    <ul className="size-list">
                      {product.sizes.map((size) => (
                        <li key={size.name} className="size-item">
                          <p className="mr-0_5 size-name">{size.name}</p>
                          <p className="mr-0_5 size-quantity">
                            {parseInt(size.quantity, 10) > 0
                              ? parseInt(size.quantity, 10) === 1
                                ? `само ${size.quantity} парче`
                                : `${size.quantity} парчиња`
                              : "Продадено"}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <p className="size-description">{product.sizesDescription}</p>
          </div>
          <div className="content-grouper-seven mb-1">
            <p className="related-products">Други парчиња:</p>
            <RelatedProducts/>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetailPage;
