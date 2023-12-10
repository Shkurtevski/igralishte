import React from "react";
import useFetch from "../../custom-hooks/useFetch";
import { Product } from "../../interfaces";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import FavoritesGrouper from "../favorites/sub-components/FavoritesGrouper";
import ProductCard from "../product-page/sub-components/ProductCard";
import RelatedProducts from "../related-products/RelatedProducts";
import addToCardIcon from "../../images/shopping-cart-small.png";
import favoritesIcon from "../../svg-icons/favorites-icon-small.svg";
import AccordionItem from "../product-detail-page/sub-components/AccordionItem";
import qualityIcon from "../../svg-icons/quality-icon.svg";
import returnBox from "../../svg-icons/return-box.svg";
import deliveryTruck from "../../svg-icons/delivery-truck.svg";
import helpIcon from "../../images/help-icon.png";
import { Link } from "react-router-dom";

const AddedToCardPage = () => {
  const { data, isLoading, error } = useFetch<Product[]>(
    "http://localhost:5001/favorites"
  );

  const {
    data: dataAddedToCard,
  } = useFetch<Product[]>("http://localhost:5001/added_to_card");

  const initialBreadcrumbs = ["Почетна", "Кошничка"];

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
            <FavoritesGrouper
              iconSrc={addToCardIcon}
              text="Кошничка"
              count={Number(addedToCardCount)}
            />
            <Link to="/favorites">
              <FavoritesGrouper
                iconSrc={favoritesIcon}
                text="Омилени"
                count={favoritesCount}
              />
            </Link>
          </div>
        </div>
        <div className="favorites-card-container">
          {dataAddedToCard?.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
      <div className="accordion-wrapper">
        <AccordionItem
          icon={qualityIcon}
          title="Контрола на квалитет"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta error quisquam ea eveniet, corrupti asperiores nesciunt quam rerum consectetur iure."
        />
        <AccordionItem
          icon={returnBox}
          title="Полиса на враќање"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta error quisquam ea eveniet, corrupti asperiores nesciunt quam rerum consectetur iure."
        />
        <AccordionItem
          icon={deliveryTruck}
          title="Достава"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta error quisquam ea eveniet, corrupti asperiores nesciunt quam rerum consectetur iure."
        />
        <AccordionItem
          icon={helpIcon}
          title="Помош"
          content="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta error quisquam ea eveniet, corrupti asperiores nesciunt quam rerum consectetur iure."
        />
      </div>
      <div className="content-grouper-seven mb-1">
        <h3 className="related-products mb-1">Други парчиња:</h3>
        <RelatedProducts />
      </div>
    </React.Fragment>
  );
};

export default AddedToCardPage;
