import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/useProductDataContext";
import { useFilterContext } from "../../../contexts/useFilterContext";
import ProductCard from "./ProductCard";
import ErrorPage from "../../ErrorPage";
import { Product } from "../../../interfaces";

const ProductCardContainer: React.FC<{ selectedFilter: string }> = ({
  selectedFilter,
}) => {
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

  const applyFilter = (products: Product[]): Product[] => {
    if (selectedCategory) {
      return products.filter(
        (product) => product.category === selectedCategory
      ) as Product[];
    }

    if (selectedBrand) {
      return products.filter(
        (product) => product.brand === selectedBrand
      ) as Product[];
    }

    return products;
  };

  const applySorting = (products: Product[]): Product[] => {
    switch (selectedFilter) {
      case "new":
        return products
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
      case "priceHighToLow":
        return products
          .slice()
          .sort((a, b) => parseInt(b.price) - parseInt(a.price));
      case "priceLowToHigh":
        return products
          .slice()
          .sort((a, b) => parseInt(a.price) - parseInt(b.price));
      default:
        return products;
    }
  };

  const filteredAndSortedProducts: Product[] = applySorting(applyFilter(data));

  return (
    <React.Fragment>
      <div className="product-card-container">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ProductCardContainer;
