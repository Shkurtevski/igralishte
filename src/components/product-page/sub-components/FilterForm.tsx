import React, { useEffect } from "react";
import CheckboxGroup from "./CheckboxGroup";
import { Product } from "../../../interfaces";
import { useFilterContext } from "../../../contexts/useFilterContext";

interface FilterFormProps {
  data: Product[];
  categoryStates: string[];
  brandStates: string[];
  sizeStates: string[];
  colorStates: string[];
  isDiscounting: boolean;
  priceRangeStates: string[];
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  toggleDiscount: () => void;
  togglePriceRange: (priceRange: string) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  data,
  categoryStates,
  brandStates,
  sizeStates,
  colorStates,
  isDiscounting,
  priceRangeStates,
  toggleCategory,
  toggleBrand,
  toggleSize,
  toggleColor,
  toggleDiscount,
  togglePriceRange,
}) => {
  const uniqueCategories = new Set<string>();
  const uniqueBrands = new Set<string>();
  const uniqueSizes = new Set<string>();
  const uniqueColors = new Set<string>();
  const regularCategories = data.filter((category) => !category.isAccessory);

  const { setCategory, setBrand, setLink, toggleFilterForm } =
    useFilterContext();

  useEffect(() => {
    setCategory(categoryStates.length > 0 ? categoryStates[0] : null);
    setBrand(brandStates.length > 0 ? brandStates[0] : null);
  }, [categoryStates, brandStates, setCategory, setBrand]);

  
  const handleToggleFilterForm = () => {
    toggleFilterForm();
  };

  const handleResetFilters = () => {
    setCategory(null);
    setBrand(null);
    setLink(null);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
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
      <div className="button-group">
        <button onClick={handleResetFilters}>Филтрирај</button>
        <button onClick={handleToggleFilterForm}>Откажи</button>
      </div>
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
      <h2>Боја</h2>
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
      <h2>Цени</h2>
      <CheckboxGroup
        label="Попуст"
        name="isDiscounting"
        checked={isDiscounting}
        onChange={() => toggleDiscount()}
      />
      <CheckboxGroup
        label="500 - 1000 ден."
        name="priceRange1"
        checked={priceRangeStates.includes("priceRange1")}
        onChange={() => togglePriceRange("priceRange1")}
      />
      <CheckboxGroup
        label="1000 - 2000 ден."
        name="priceRange2"
        checked={priceRangeStates.includes("priceRange2")}
        onChange={() => togglePriceRange("priceRange2")}
      />
      <CheckboxGroup
        label="2000 - 2500 ден."
        name="priceRange3"
        checked={priceRangeStates.includes("priceRange3")}
        onChange={() => togglePriceRange("priceRange3")}
      />
      <CheckboxGroup
        label="2500 ден. и повеќе"
        name="priceRange4"
        checked={priceRangeStates.includes("priceRange4")}
        onChange={() => togglePriceRange("priceRange4")}
      />
    </form>
  );
};

export default FilterForm;
