import React, { useState } from "react";
import { useFilterContext } from "../../../contexts/useFilterContext";
import { Link } from "react-router-dom";

interface DropdownItemProps {
  title: string;
  clothingTypes?: string[];
  onClick?: () => void;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  title,
  clothingTypes,
  onClick,
}) => {
  const { setCategory, setBrand } = useFilterContext();

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
    console.log(clickedValue);

    if (clickedValue === "Види ги сите") {
      setCategory(null);
      setBrand(null);
    } else {
      // Set either category or brand, not both
      if (title === "Vintage облека") {
        setCategory(clickedValue);
        setBrand(null);
      } else if (title === "Брендови") {
        setBrand(clickedValue);
        setCategory(null);
      }
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
              </ul>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default DropdownItem;
