import React, { useState } from "react";
import { useFilterContext } from "../../../contexts/useFilterContext";
import { Link } from "react-router-dom";
import { useDetailedFilterContext } from "../../../contexts/useDetailedFilterContext";

interface DropdownItemProps {
  title: string;
  clothingTypes?: string[];
  brands?: string[]; // Add brands prop
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  title,
  clothingTypes,
  brands,
  onClick,
}) => {
  const { setCategory, setBrand } = useFilterContext(); // Add setBrand
  const { toggleCategory } = useDetailedFilterContext();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (e: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (e: React.MouseEvent) => {
    setIsOpen(false);
    if (onClick) {
      onClick();
    }

    const clickedValue = (e.currentTarget as HTMLElement).getAttribute(
      "data-value"
    );

    if (clickedValue === "Види ги сите") {
      setCategory(null);
      setBrand(null);
    } else if (brands && brands.includes(clickedValue || "")) {
      setBrand(clickedValue || "");
      toggleCategory("");
    } else {
      toggleCategory(clickedValue || "");
      setBrand(null);
    }
    
  };

  
  return (
    <React.Fragment>
      <div className="dropdown-item">
        <div className="dropdown-item-wrapper">
          <p onClick={toggleDropdown}>{title}</p>
          {isOpen && (
            <div className="dropdown-content">
              <ul>
                {clothingTypes?.map((type, i) => (
                  <Link to={"/product-page"} key={i}>
                    <li onClick={handleItemClick} data-value={type}>
                      {type}
                    </li>
                  </Link>
                ))}
                {brands?.map((brand, i) => (
                  <Link to={`/brand-page/${brand}`} key={i}>
                    <li onClick={handleItemClick} data-value={brand}>
                      {brand}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropdownItem;
