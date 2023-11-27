import React, { ChangeEvent, useEffect, useState } from "react";
import filterSearch from "../../../images/filter-search.png";

interface ProductFilteringProps {
  onFilterChange: (selectedOption: string) => void;
  resetFilter: boolean;
}

const ProductFiltering: React.FC<ProductFilteringProps> = ({
  onFilterChange,
  resetFilter,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    onFilterChange(event.target.value);
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
            <img src={filterSearch} alt="search-icon" />
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
