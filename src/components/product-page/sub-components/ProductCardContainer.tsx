import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/useProductDataContext";
import { useFilterContext } from "../../../contexts/useFilterContext";

import ProductCard from "./ProductCard";
import ErrorPage from "../../ErrorPage";

const ProductCardContainer: React.FC = () => {
  const { data, isLoading, error } = useContext(ProductContext);
  const { selectedCategory, selectedBrand } = useFilterContext();

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const filteredProducts = selectedCategory
    ? data.filter((product) => product.category === selectedCategory)
    : selectedBrand
    ? data.filter((product) => product.brand === selectedBrand)
    : data;

  return (
    <React.Fragment>
      <div className="product-card-container">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductCardContainer;
