import React from "react";
import { NavbarContentLinks } from "../../../interfaces";
import useFetch from "../../../custom-hooks/useFetch";
import DropdownItem from "./DropdownItem";
import ErrorPage from "../../error-page/ErrorPage";
import { Link } from "react-router-dom";
import { useFilterContext } from "../../../contexts/useFilterContext";
import { useDetailedFilterContext } from "../../../contexts/useDetailedFilterContext";

interface NavbarLinksProps {
  closeHamburgerMenu: () => void;
}

const NavbarLinks: React.FC<NavbarLinksProps> = ({ closeHamburgerMenu }) => {
  const { data, isLoading, error } = useFetch<NavbarContentLinks[]>(
    "https://igralishte-webs.onrender.com/navbar_content"
  );

  const { setLink } = useFilterContext();
  const { resetFilters, enableDiscount, toggleIsNew } =
    useDetailedFilterContext();

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <React.Fragment>
      <Link to="/product-page">
        <p
          className="link-new"
          onClick={() => {
            closeHamburgerMenu();
            setLink("Ново");
            toggleIsNew();
          }}
        >
          Ново
        </p>
      </Link>
      <div className="dropdown">
        {data.map((link, index) => (
          <React.Fragment key={index}>
            {index < 3 ? (
              <DropdownItem
                title={link.title}
                clothingTypes={link.clothingType}
                brands={link.brands}
                onClick={() => {
                  closeHamburgerMenu();
                  setLink(link.title);
                  resetFilters();
                }}
              />
            ) : (
              <Link
                to={
                  link.title === "Подари картичка*"
                    ? "/gift-cards"
                    : link.title === "Vintage облека"
                    ? "/product-page"
                    : link.title === "Попуст"
                    ? "/product-page"
                    : `/product-page`
                }
                onClick={() => {
                  closeHamburgerMenu();
                  if (link.title === "Попуст") {
                    enableDiscount();
                  }
                }}
              >
                <p className="other-links">{link.title}</p>
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default NavbarLinks;
