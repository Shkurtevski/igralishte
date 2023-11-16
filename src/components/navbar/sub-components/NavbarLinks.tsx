import React from "react";
import { NavbarContentLinks } from "../../../interfaces";
import useFetch from "../../../custom-hooks/useFetch";
import DropdownItem from "./DropdownItem";

const NavbarLinks: React.FC = () => {
  const { data, isLoading, error } = useFetch<NavbarContentLinks[]>(
    "http://localhost:5001/navbar_content"
  );

   if (!data) {
     return (
       <div>
         <p>Failed to fetch data</p>
       </div>
     );
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
    <div className="dropdown">
      <p className="new-products-title">Ново</p>
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
  );
};

export default NavbarLinks;
