import React from "react";
import useFetch from "../../custom-hooks/useFetch";
import ProductCard from "../product-page/sub-components/ProductCard";
import { Product } from "../../interfaces";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import RelatedProducts from "../related-products/RelatedProducts";
import favoritesIcon from "../../svg-icons/favorites-icon-small.svg";
import addToCardIcon from "../../images/shopping-cart-small.png";
import FavoritesGrouper from "./sub-components/FavoritesGrouper";
import { Link } from "react-router-dom";

const Favorites: React.FC = () => {
  const { data, isLoading, error } = useFetch<Product[]>(
    "http://localhost:5001/favorites"
  );

  const { data: dataAddedToCard } = useFetch<Product[]>(
    "http://localhost:5001/added_to_card"
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

  const favoritesCount = data.length;
  const addedToCardCount = dataAddedToCard?.length;

  return (
    <React.Fragment>
      <div className="favorites">
        <BreadCrumbs crumbs={getBreadCrumbs()} />
        <div className="favorites-wrapper">
          <div className="favorites-add-to-card">
            <Link to={"/added-to-card"}>
              <FavoritesGrouper
                iconSrc={addToCardIcon}
                text="Кошничка"
                count={Number(addedToCardCount)}
              />
            </Link>
            <FavoritesGrouper
              iconSrc={favoritesIcon}
              text="Омилени"
              count={favoritesCount}
            />
          </div>
        </div>
        <div className="favorites-card-container">
          {data.length === 0 ? (
            <div className="added-to-card-empty">
              <h2>Сеуште немате омилени продукти!</h2>
            </div>
          ) : (
            data.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))
          )}
        </div>
      </div>
      <div className="content-grouper-seven mb-1">
        <h3 className="related-products mb-1">Други парчиња:</h3>
        <RelatedProducts />
      </div>
    </React.Fragment>
  );
};

export default Favorites;
