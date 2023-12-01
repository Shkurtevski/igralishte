import React from "react";
import CheckboxGroup from "./CheckboxGroup";
import { Product } from "../../../interfaces";

interface FilterFormProps {
  data: Product[];
  categoryStates: string[];
  brandStates: string[];
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  data,
  categoryStates,
  brandStates,
  toggleCategory,
  toggleBrand,
}) => {
  const uniqueCategories = new Set<string>();
  const uniqueBrands = new Set<string>();

  return (
    <form>
      {data.map((category) => {
        if (!uniqueCategories.has(category.category)) {
          uniqueCategories.add(category.category);
          return (
            <CheckboxGroup
              key={category.id}
              label={category.category}
              name={category.category}
              checked={categoryStates.includes(category.category)}
              onChange={() => toggleCategory(category.category)}
            />
          );
        }
        return null;
      })}
      {data.map((brand) => {
        if (!uniqueBrands.has(brand.brand)) {
          uniqueBrands.add(brand.brand);
          return (
            <CheckboxGroup
              key={brand.id}
              label={brand.brand}
              name={brand.brand}
              checked={brandStates.includes(brand.brand)}
              onChange={() => toggleBrand(brand.brand)}
            />
          );
        }
        return null;
      })}
    </form>
  );
};

export default FilterForm;
