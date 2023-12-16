import React, { useContext, useState, useEffect } from "react";
import ProductCard from "../product-page/sub-components/ProductCard";
import Pagination from "./Pagination";
import { ProductContext } from "../../contexts/useProductDataContext";
import ErrorPage from "../error-page/ErrorPage";
import { Product } from "../../interfaces";

interface RelatedProductsProps {
  brand?: string;
  itemsToShow?: number;
  searchQuery?: string;
  showPagination?: boolean;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  brand,
  itemsToShow = 6,
  searchQuery,
  showPagination = true,
}) => {
  const { data, isLoading, error } = useContext(ProductContext);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = itemsToShow;
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      const brandProducts = brand
        ? data.filter((product) => product.brand === brand)
        : data;
      setFilteredProducts(brandProducts);
      setCurrentPage(1);
    }
  }, [data, brand]);

  useEffect(() => {
    if (data) {
      let brandProducts = brand
        ? data.filter((product) => product.brand === brand)
        : data;

      if (searchQuery) {
        brandProducts = brandProducts.filter((product) =>
          [
            product.slug,
            product.price,
            product.title,
            product.category,
            product.brand,
          ].some((property) =>
            property.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }

      setFilteredProducts(brandProducts);
      setCurrentPage(1);
    }
  }, [data, brand, searchQuery]);

  const handleClick = () => {
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
  const displayedProducts = filteredProducts.slice(startIndex, endIndex);

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
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredProducts.length / productsPerPage)}
          onPageChange={handlePageChange}
        />
      )}
    </React.Fragment>
  );
};

export default RelatedProducts;

