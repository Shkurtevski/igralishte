import { useContext } from "react";
import { ProductContext } from "../contexts/useProductDataContext";
import React, { useEffect } from "react";

const Homepage = () => {
  const { data, isLoading, error } = useContext(ProductContext);

  useEffect(() => {
    console.log("data:", data);
    console.log("isLoading:", isLoading);
    console.log("error:", error);
  }, [data, isLoading, error]);

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
        
      </div>
    </React.Fragment>
  );
};

export default Homepage;
