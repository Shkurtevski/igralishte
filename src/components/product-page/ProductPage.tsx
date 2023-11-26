import React, { useState } from "react";
import ProductCardContainer from "./sub-components/ProductCardContainer";
import BreadCrumbs from "./sub-components/BreadCrumbs";
import ProductFiltering from "./sub-components/ProductFiltering";

const ProductPage: React.FC = () => {
  const initialBreadcrumbs = ["Почетна", "Сите"];
  const [selectedFilter, setSelectedFilter] = useState("");

  const handleFilterChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  const getFilteredBreadcrumbs = (): string[] => {
    const breadcrumbs = [...initialBreadcrumbs];

    if (selectedFilter) {
      switch (selectedFilter) {
        case "new":
          breadcrumbs.push("Најново");
          break;
        case "priceHighToLow":
          breadcrumbs.push("Цена висока кон ниска");
          break;
        case "priceLowToHigh":
          breadcrumbs.push("Цена ниска кон висока");
          break;
        default:
          breadcrumbs.push(selectedFilter);
          break;
      }
    }

    return breadcrumbs;
  };

  return (
    <React.Fragment>
      <div className="product-page">
        <BreadCrumbs crumbs={getFilteredBreadcrumbs()} />
        <ProductFiltering onFilterChange={handleFilterChange} />
        <ProductCardContainer selectedFilter={selectedFilter} />
      </div>
    </React.Fragment>
  );
};

export default ProductPage;
