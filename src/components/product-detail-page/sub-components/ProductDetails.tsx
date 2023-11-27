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
      <p className="product-material">Материјал:</p>
      <p>{material}</p>
      <p>{lining}</p>
      <p className="product-condition">
        Состојба: {condition}
        <span className="product-condition-span">прочитај повеќе</span>
      </p>
      <p className="product-maintenance">Насоки за одржување:</p>
      <p>{maintenance}</p>
    </React.Fragment>
  );
};

export default ProductDetails;
