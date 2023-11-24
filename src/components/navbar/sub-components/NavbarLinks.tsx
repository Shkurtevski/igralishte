import React from "react";
import { NavbarContentLinks } from "../../../interfaces";
import useFetch from "../../../custom-hooks/useFetch";
import DropdownItem from "./DropdownItem";
import ErrorPage from "../../ErrorPage";
import { Link } from "react-router-dom";
import { useFilterContext } from "../../../contexts/useFilterContext";

interface NavbarLinksProps {
  closeHamburgerMenu: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ closeHamburgerMenu }) => {
  const { data, isLoading, error } = useFetch<NavbarContentLinks[]>(
    "http://localhost:5001/navbar_content"
  );

  const { setCategory, setBrand } = useFilterContext();

  if (!data) {
    if (!data) {
      return <ErrorPage />;
    }
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="dropdown">
        <Link
          to="/product-page"
          onClick={() => {
            closeHamburgerMenu();
            setCategory(null);
            setBrand(null);
          }}
        >
          <p className="new-products-title">Ново</p>
        </Link>
        {data?.map((link, index) => (
          <React.Fragment key={index}>
            {index < 3 ? (
              <DropdownItem
                title={link.title}
                clothingTypes={link.clothingType}
                onClick={closeHamburgerMenu}
              />
            ) : (
              <p onClick={closeHamburgerMenu}>{link.title}</p>
            )}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default NavbarLinks;
