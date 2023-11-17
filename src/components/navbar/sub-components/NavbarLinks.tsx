import React from "react";
import { NavbarContentLinks } from "../../../interfaces";
import useFetch from "../../../custom-hooks/useFetch";
import DropdownItem from "./DropdownItem";
import ErrorPage from "../../ErrorPage";
import { Link } from "react-router-dom";

const NavbarLinks: React.FC = () => {
  const { data, isLoading, error } = useFetch<NavbarContentLinks[]>(
    "http://localhost:5001/navbar_content"
  );

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
        <Link to={"/product-page"}>
          <p className="new-products-title">Ново</p>
        </Link>
        {data?.map((link, index) => (
          <React.Fragment key={index}>
            {index < 3 ? (
              <DropdownItem
                title={link.title}
                clothingTypes={link.clothingType}
              />
            ) : (
              <p>{link.title}</p>
            )}
          </React.Fragment>
        ))}
      </div>
    </React.Fragment>
  );
};

export default NavbarLinks;
