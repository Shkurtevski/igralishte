import React, { useContext, useState } from "react";
import ProductCard from "../product-page/sub-components/ProductCard";
import Pagination from "./Pagination";
import { ProductContext } from "../../contexts/useProductDataContext";
import ErrorPage from "../ErrorPage";

const RelatedProducts: React.FC = () => {
  const { data, isLoading, error } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

   const handleClick = () => {
    // Add logic here to handle the click event, e.g., scroll the page up
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!data) {
    return <ErrorPage />;
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

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = data.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <React.Fragment>
      <div className="product-card-container" onClick={handleClick}>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default RelatedProducts;
