import React from "react";
import useFetch from "../../custom-hooks/useFetch";
import ProductCard from "../product-page/sub-components/ProductCard";
import { Product } from "../../interfaces";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import RelatedProducts from "../related-products/RelatedProducts";

const Favorites: React.FC = () => {
  const { data, isLoading, error } = useFetch<Product[]>(
    "http://localhost:5001/favorites"
  );

  const initialBreadcrumbs = ["Почетна", "Омилени"];

  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];

    return breadcrumbs;
  };

  if (!data) {
    return <div>Сеуште немате омилени продукти!</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <React.Fragment>
      <div className="favorites">
        <BreadCrumbs crumbs={getBreadCrumbs()} />
        <div className="favorites-card-container">
          {data.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
      <div className="content-grouper-seven mb-1">
        <h3 className="related-products mb-1">Други парчиња:</h3>
        <RelatedProducts/>
      </div>
    </React.Fragment>
  );
};

export default Favorites;
