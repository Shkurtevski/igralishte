import React from "react";
import arrowUp from "../../../svg-icons/arrow-up.svg";
import arrowDown from "../../../svg-icons/arrow-down.svg";

interface DropdownProps {
  items: { name: string; quantity: string }[];
  isOpen: boolean;
  toggleDropdown: () => void;
}

const DropdownDetailPage: React.FC<DropdownProps> = ({
  items,
  isOpen,
  toggleDropdown,
}) => {
  return (
    <React.Fragment>
      <div className="dropdown">
        <button className="dropdown-btn-details mb-1" onClick={toggleDropdown}>
          <img
            src={isOpen ? arrowUp : arrowDown}
            alt="arrows"
            style={{
              margin: isOpen ? "0.4rem 0.1rem 0 0.1rem" : "0 0 0.4rem 0.1rem",
            }}
          />
        </button>
        {isOpen && (
          <div className="dropdown-content">
            <ul className="size-list color-list">
              {items.map((size) => (
                <li key={size.name} className="size-item">
                  <p className="mr-0_5 size-name">{size.name}</p>
                  <p className="mr-0_5 size-quantity">
                    {parseInt(size.quantity, 10) > 0
                      ? parseInt(size.quantity, 10) === 1
                        ? `само ${size.quantity} парче`
                        : `${size.quantity} парчиња`
                      : "Продадено"}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default DropdownDetailPage;
