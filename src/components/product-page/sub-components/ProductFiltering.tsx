import React, { ChangeEvent, useEffect, useState } from "react";
import filterSearch from "../../../images/filter-search.png";
import { useFilterContext } from "../../../contexts/useFilterContext";

interface ProductFilteringProps {
  onFilterChange: (selectedOption: string) => void;
  resetFilter: boolean;
}

const ProductFiltering: React.FC<ProductFilteringProps> = ({
  onFilterChange,
  resetFilter,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const {toggleFilterForm} = useFilterContext();

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onFilterChange(event.target.value);
  };

  const handleToggleFilterForm = () => {
    toggleFilterForm();
  };

  useEffect(() => {
    if (resetFilter) {
      setSelectedOption("");
    }
  }, [resetFilter]);

  return (
    <React.Fragment>
      <div className="product-filtering mb-1">
        <div className="product-filtering-wrapper">
          <div className="content-one">
            <img
              src={filterSearch}
              alt="search-icon"
              onClick={handleToggleFilterForm}
            />
          </div>
          <div className="content-two">
            <form>
              <label htmlFor="filterOptions" className="sort-by">
                Подреди според:
              </label>
              <select
                id="filterOptions"
                name="filterOptions"
                value={selectedOption}
                onChange={handleFilterChange}
              >
                <option value="">Сите</option>
                <option value="new">Најново</option>
                <option value="priceHighToLow">Цена висока кон ниска</option>
                <option value="priceLowToHigh">Цена ниска кон висока</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductFiltering;
