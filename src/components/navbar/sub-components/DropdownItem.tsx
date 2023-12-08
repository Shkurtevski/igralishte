import React, { useState } from "react";
import { useFilterContext } from "../../../contexts/useFilterContext";
import { Link } from "react-router-dom";
import { useDetailedFilterContext } from "../../../contexts/useDetailedFilterContext";
import arrowUp from "../../../svg-icons/arrow-up.svg";
import arrowDown from "../../../svg-icons/arrow-down.svg";

interface DropdownItemProps {
  title: string;
  clothingTypes?: string[];
  brands?: string[];
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  title,
  clothingTypes,
  brands,
  onClick,
}) => {
  const { setCategory, setBrand } = useFilterContext();
  const { toggleCategory } = useDetailedFilterContext();

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (clickedValue: string | null) => {
    setIsOpen(false);
    if (onClick) {
      onClick();
    }

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
    <div className="dropdown-item">
      <div className="dropdown-item-wrapper">
        <p onClick={toggleDropdown} className="toggle-dropdown">
          {title}
          {isOpen ? (
            <img src={arrowUp} alt="Up Arrow" />
          ) : (
            <img src={arrowDown} alt="Down Arrow" />
          )}
        </p>
        {isOpen && (
          <div className="dropdown-content">
            <ul>
              {clothingTypes?.map((type, i) => (
                <Link to={"/product-page"} key={i}>
                  <li onClick={() => handleItemClick(type)} data-value={type}>
                    {type}
                  </li>
                </Link>
              ))}
              {brands?.map((brand, i) => (
                <Link to={`/brand-page/${brand}`} key={i}>
                  <li onClick={() => handleItemClick(brand)} data-value={brand}>
                    {brand}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropdownItem;
