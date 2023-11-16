import React from "react";
import ProductCardContainer from "./sub-components/ProductCardContainer";

const ProductPage: React.FC = () => {
  return (
    <React.Fragment>
      <div className="product-page">
        <ProductCardContainer />
      </div>
      ;
    </React.Fragment>
  );
};

export default ProductPage;
