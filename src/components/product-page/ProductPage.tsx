import React, { useState } from "react";
import ProductCardContainer from "./sub-components/ProductCardContainer";
import BreadCrumbs from "./sub-components/BreadCrumbs";
import ProductFiltering from "./sub-components/ProductFiltering";
import { useFilterContext } from "../../contexts/useFilterContext";
import { useDetailedFilterContext } from "../../contexts/useDetailedFilterContext";

const ProductPage: React.FC = () => {
  const initialBreadcrumbs = ["Почетна", "Сите"];
  const [selectedFilter, setSelectedFilter] = useState("");

  const {
    categoryStates,
    brandStates,
    sizeStates,
    colorStates,
    isDiscounting,
    priceRangeStates,
    searchQuery,
  } = useDetailedFilterContext();

  const { selectedLink } = useFilterContext();

  const handleFilterChange = (selectedOption: string) => {
    setSelectedFilter(selectedOption);
  };

  const getFilteredBreadcrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];

    if (selectedLink && !breadcrumbs.includes(selectedLink)) {
      breadcrumbs = [...breadcrumbs, selectedLink];
    }

    if (categoryStates.length > 0) {
      breadcrumbs = [...breadcrumbs, ...categoryStates];
    }

    if (brandStates.length > 0) {
      breadcrumbs = [...breadcrumbs, ...brandStates];
    }

    if (sizeStates.length > 0) {
      breadcrumbs = [...breadcrumbs, ...sizeStates];
    }

    if (colorStates.length > 0) {
      breadcrumbs = [...breadcrumbs, ...colorStates];
    }

    if (isDiscounting) {
      breadcrumbs = [...breadcrumbs, "Попуст"];
    }

    if (priceRangeStates.length > 0) {
      const priceRanges = priceRangeStates.map((range) => {
        switch (range) {
          case "priceRange1":
            return "500 - 1000 ден.";
          case "priceRange2":
            return "1000 - 2000 ден.";
          case "priceRange3":
            return "2000 - 2500 ден.";
          case "priceRange4":
            return "2500 ден. и повеќе";
          default:
            return "";
        }
      });
      breadcrumbs = [...breadcrumbs, ...priceRanges];
    }

    if (selectedFilter) {
      switch (selectedFilter) {
        case "new":
          breadcrumbs = [...breadcrumbs, "Најново"];
          break;
        case "priceHighToLow":
          breadcrumbs = [...breadcrumbs, "Цена висока кон ниска"];
          break;
        case "priceLowToHigh":
          breadcrumbs = [...breadcrumbs, "Цена ниска кон висока"];
          break;
        default:
          breadcrumbs = [...breadcrumbs, selectedFilter];
          break;
      }
    }

    if (searchQuery) {
      breadcrumbs = [...breadcrumbs, searchQuery];
    }

    return breadcrumbs;
  };

  return (
    <React.Fragment>
      <div className="product-page">
        <BreadCrumbs crumbs={getFilteredBreadcrumbs()} />
        <ProductFiltering
          onFilterChange={handleFilterChange}
          resetFilter={true}
        />
        <ProductCardContainer selectedFilter={selectedFilter} />
      </div>
    </React.Fragment>
  );
};

export default ProductPage;
