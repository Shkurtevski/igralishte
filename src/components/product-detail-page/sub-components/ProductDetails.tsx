import React from "react";

interface ProductDetailsProps {
  material: string;
  lining: string;
  condition: string;
  maintenance: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  material,
  lining,
  condition,
  maintenance,
}) => {
  return (
    <React.Fragment>
      <h3  className="product-material">Материјал:</h3>
      <p>{material}</p>
      <p>{lining}</p>
      <h3  className="product-condition">
        Состојба: {condition}
        <span className="product-condition-span">прочитај повеќе</span>
      </h3>
      <h3  className="product-maintenance">Насоки за одржување:</h3>
      <p>{maintenance}</p>
    </React.Fragment>
  );
};

export default ProductDetails;
