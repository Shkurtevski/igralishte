import { useContext } from "react";
import { ProductContext } from "../contexts/useProductDataContext";
import Navbar from "./Navbar";
import React from "react";

const Homepage = () => {
  const { data, isLoading, error } = useContext(ProductContext);

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
      <div className="homepage">
        <Navbar />
        <ul>
          {data?.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
