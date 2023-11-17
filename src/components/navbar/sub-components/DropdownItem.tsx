import React, { useState } from "react";

const DropdownItem: React.FC<{ title: string; clothingTypes?: string[] }> = ({
  title,
  clothingTypes,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
                  <li key={i}>{type}</li>
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
