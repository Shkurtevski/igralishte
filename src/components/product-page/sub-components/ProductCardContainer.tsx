import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/useProductDataContext";
import ProductCard from "./ProductCard";
import ErrorPage from "../../ErrorPage";

const ProductCardContainer: React.FC = () => {
  const { data, isLoading, error } = useContext(ProductContext);

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
  return (
    <React.Fragment>
      <div className="product-card-container">
        {data?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductCardContainer;
