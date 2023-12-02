import React from "react";
import CheckboxGroup from "./CheckboxGroup";
import { Product } from "../../../interfaces";

interface FilterFormProps {
  data: Product[];
  categoryStates: string[];
  brandStates: string[];
  sizeStates: string[];
  colorStates: string[];
  isDiscounting: boolean;
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  toggleDiscount: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  data,
  categoryStates,
  brandStates,
  sizeStates,
  colorStates,
  isDiscounting,
  toggleCategory,
  toggleBrand,
  toggleSize,
  toggleColor,
  toggleDiscount,
}) => {
  const uniqueCategories = new Set<string>();
  const uniqueBrands = new Set<string>();
  const uniqueSizes = new Set<string>();
  const uniqueColors = new Set<string>();
  const regularCategories = data.filter((category) => !category.isAccessory);

  return (
    <form>
      <h2>Категорија</h2>
      {regularCategories.map((category) => {
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
      <h2>Брендови</h2>
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
      <h2>Аксесоари</h2>
      {data.some((product) => product.isAccessory) && (
        <React.Fragment>
          {data
            .filter((product) => product.isAccessory)
            .map((accessory) => (
              <CheckboxGroup
                key={accessory.id}
                label={accessory.category}
                name={accessory.category}
                checked={categoryStates.includes(accessory.category)}
                onChange={() => toggleCategory(accessory.category)}
              />
            ))}
        </React.Fragment>
      )}
      <h2>Големина</h2>
      {data
        .flatMap((product) => product.sizes)
        .filter(
          (size) => !uniqueSizes.has(size.name) && uniqueSizes.add(size.name)
        )
        .map((size) => (
          <CheckboxGroup
            key={size.name}
            label={size.name}
            name={size.name}
            checked={sizeStates.includes(size.name)}
            onChange={() => toggleSize(size.name)}
          />
        ))}
      <h2>Големина</h2>
      {data
        .flatMap((product) => product.colors)
        .filter(
          (color) =>
            !uniqueColors.has(color.name) && uniqueColors.add(color.name)
        )
        .map((color) => (
          <CheckboxGroup
            key={color.name}
            label={color.name}
            name={color.name}
            checked={colorStates.includes(color.name)}
            onChange={() => toggleColor(color.name)}
          />
        ))}
      <h2>Со Попуст</h2>
      <CheckboxGroup
        label="Со Попуст"
        name="isDiscounting"
        checked={isDiscounting}
        onChange={() => toggleDiscount()}
      />
    </form>
  );
};

export default FilterForm;
