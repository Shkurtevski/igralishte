import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/useProductDataContext";
import ErrorPage from "../ErrorPage";
import QuantitySelector from "./sub-components/QuantitySelector";
import RelatedProducts from "../related-products/RelatedProducts";
import DropdownDetailPage from "./sub-components/DropdownDetailPage";
import ImageSection from "./sub-components/ImageSection";
import ProductDetails from "./sub-components/ProductDetails";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useContext(ProductContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  console.log(selectedQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const toggleColorDropdown = () => {
    setIsColorDropdownOpen(!isColorDropdownOpen);
  };

  const product = data?.find((p) => p.slug === slug);

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

  return (
    <React.Fragment>
      <div className="product-detail-page">
        <div className="product-detail-wrapper">
          <div className="content-grouper-one">
            <p className="product-title mb-1">{product.title}</p>
            <img src={product.images[0]} alt={`${product.title} - fashion`} />
          </div>
          <ImageSection
            images={product.images}
            currentImageIndex={currentImageIndex}
            handleLeftArrowClick={handleLeftArrowClick}
            handleRightArrowClick={handleRightArrowClick}
            productTitle={product.title}
          />
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
              <p className="product-sizes mr-0_5">Величини:</p>
              <DropdownDetailPage
                items={product.sizes}
                isOpen={isSizeDropdownOpen}
                toggleDropdown={toggleSizeDropdown}
              />
            </div>
            <p className="size-description mb-1">{product.sizesDescription}</p>
            <p>Види ги димензиите</p>
          </div>
          <div className="content-grouper-five">
            <div className="content-grouper-five-wrapper">
              <p className="product-colors mr-0_5">Бои:</p>
              <DropdownDetailPage
                items={product.colors}
                isOpen={isColorDropdownOpen}
                toggleDropdown={toggleColorDropdown}
              />
            </div>
            <ProductDetails
              material={product.material}
              lining={product.lining}
              condition={product.condition}
              maintenance={product.maintenance}
            />
          </div>
          <div className="content-grouper-seven mb-1">
            <p className="related-products mb-1">Други парчиња:</p>
            <RelatedProducts />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetailPage;
