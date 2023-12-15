import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/useProductDataContext";
import { useFilterContext } from "../../../contexts/useFilterContext";
import ProductCard from "./ProductCard";
import ErrorPage from "../../error-page/ErrorPage";
import FilterForm from "./FilterForm";
import { Product } from "../../../interfaces";
import { useDetailedFilterContext } from "../../../contexts/useDetailedFilterContext";

interface Props {
  selectedFilter: string;
}

const ProductCardContainer: React.FC<Props> = ({ selectedFilter }) => {
  const { data, isLoading, error } = useContext(ProductContext);
  const { isFilterFormVisible } = useFilterContext();

  const {
    categoryStates,
    brandStates,
    sizeStates,
    colorStates,
    isDiscounting,
    priceRangeStates,
  } = useDetailedFilterContext();

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
    let filteredProducts = [...products];

    if (categoryStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoryStates.includes(product.category)
      );
    }

    if (brandStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        brandStates.includes(product.brand)
      );
    }

    if (sizeStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.some(
          (size) =>
            sizeStates.includes(size.name) && parseInt(size.quantity) > 0
        )
      );
    }

    if (colorStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.some(
          (color) =>
            colorStates.includes(color.name) && parseInt(color.quantity) > 0
        )
      );
    }

    if (isDiscounting) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isDiscounting
      );
    }

    if (priceRangeStates.length > 0) {
      const priceRange = priceRangeStates[0];
      if (priceRange === "priceRange1") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            parseInt(product.price) >= 500 && parseInt(product.price) <= 1000
        );
      } else if (priceRange === "priceRange2") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            parseInt(product.price) >= 1000 && parseInt(product.price) <= 2000
        );
      } else if (priceRange === "priceRange3") {
        filteredProducts = filteredProducts.filter(
          (product) =>
            parseInt(product.price) >= 2000 && parseInt(product.price) <= 2500
        );
      } else if (priceRange === "priceRange4") {
        filteredProducts = filteredProducts.filter(
          (product) => parseInt(product.price) >= 2500
        );
      }
    }

    return filteredProducts;
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
      <div className="filter-form">
        <div
          className={`filter-form-window ${
            !isFilterFormVisible ? "" : "hidden"
          }`}
        >
          <FilterForm />
        </div>
      </div>
      <div className="product-card-container">
        {filteredAndSortedProducts.length === 0 ? (
          <p>No products match the selected filters.</p>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductCardContainer;
