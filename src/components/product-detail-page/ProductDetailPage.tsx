import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductContext } from "../../contexts/useProductDataContext";
import ErrorPage from "../ErrorPage";
import QuantitySelector from "./sub-components/QuantitySelector";
import RelatedProducts from "../related-products/RelatedProducts";
import DropdownDetailPage from "./sub-components/DropdownDetailPage";
import ImageSection from "./sub-components/ImageSection";
import ProductDetails from "./sub-components/ProductDetails";
import favoritesIcon from "../../images/favorites-icon.png";
import cartIcon from "../../images/cart-icon.png";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import AccordionItem from "./sub-components/AccordionItem";
import qualityIcon from "../../svg-icons/quality-icon.svg";
import returnBox from "../../svg-icons/return-box.svg";
import deliveryTruck from "../../svg-icons/delivery-truck.svg";
import helpIcon from "../../images/help-icon.png";
import cartCheckIcon from "../../images/cart-check-icon.png";
import usePost from "../../custom-hooks/usePost";
import fullHeartIcon from "../../svg-icons/full-heart.svg";
import favoritesIconSmall from "../../svg-icons/favorites-icon-small.svg";
import starButtonOne from "../../svg-icons/start1.svg";
import starButtonTwo from "../../svg-icons/star2.svg";

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const {
    data,
    isLoading,
    error,
    updateFavoriteStatus,
    updateAddedToCardStatus,
  } = useContext(ProductContext);
  const { postData } = usePost();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCard, setIsAddedToCard] = useState(false);

  const [productName, setProductName] = useState<string | undefined>();

  useEffect(() => {
    if (data) {
      const product = data.find((p) => p.slug === slug);
      if (product) {
        setProductName(product.title);
      }
    }
  }, [data, slug]);

  const initialBreadcrumbs = [
    "Почетна",
    "Vintage облека",
    `${productName || "Производ"}`,
  ];

  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];

    return breadcrumbs;
  };

  console.log(selectedQuantity);
  console.log(selectedQuantity);

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const toggleColorDropdown = () => {
    setIsColorDropdownOpen(!isColorDropdownOpen);
  };

  useEffect(() => {
    const currentProduct = data?.find((product) => product.slug === slug);
    setIsFavorite(currentProduct?.isFavorite || false);
  }, [data, slug]);

  useEffect(() => {
    const currentProduct = data?.find((product) => product.slug === slug);
    setIsAddedToCard(currentProduct?.isAddedToCard || false);
  }, [data, slug]);

  const handleFavoriteAndCartClick = async (
    actionType: "favorite" | "cart"
  ) => {
    try {
      const product = data?.find((p) => p.slug === slug);

      if (product) {
        let isCurrentlyStatus;
        let endpoint;

        if (actionType === "favorite") {
          isCurrentlyStatus = product.isFavorite;
          endpoint = "favorites";
        } else {
          isCurrentlyStatus = product.isAddedToCard;
          endpoint = "added_to_card";
        }

        const updatedProduct = {
          ...product,
          [actionType === "favorite" ? "isFavorite" : "isAddedToCard"]:
            !isCurrentlyStatus,
        };

        if (!isCurrentlyStatus) {
          await postData(`http://localhost:5001/${endpoint}`, updatedProduct);
        } else {
          await fetch(`http://localhost:5001/${endpoint}/${product.id}`, {
            method: "DELETE",
          });
        }

        if (actionType === "favorite") {
          updateFavoriteStatus(product.id, !isCurrentlyStatus);
        } else {
          updateAddedToCardStatus(product.id, !isCurrentlyStatus);
        }

        console.log(
          `Product ${
            isCurrentlyStatus ? "removed from" : "added to"
          } ${actionType} successfully!`
        );
      } else {
        console.error("Product not found");
      }
    } catch (err) {
      console.error(
        `Failed to ${
          product?.isFavorite ? "remove from" : "add to"
        } ${actionType}`,
        err
      );
    }
  };

  const handleAddToCart = async (actionType: string) => {
    try {
      const product = data?.find((p) => p.slug === slug);

      if (product) {
        const updatedProduct = {
          ...product,
          isAddedToCard: true,
        };

        await postData("http://localhost:5001/added_to_card", updatedProduct);

        updateAddedToCardStatus(product.id, true);

        console.log("Product added to cart successfully!");
      } else {
        console.error("Product not found");
      }
    } catch (err) {
      console.error("Failed to add product to cart", err);
    }
  };

  const product = data?.find((p) => p.slug === slug);

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <div className="is-loading-wrapper">
        <p>Loading..</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-wrapper">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return <ErrorPage />;
  }

  const handleLeftArrowClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleRightArrowClick = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  return (
    <React.Fragment>
      <div className="product-detail-page">
        <div className="product-detail-wrapper">
          <BreadCrumbs crumbs={getBreadCrumbs()} />
          <div className="cart-favorites-wrapper">
            <img
              src={isFavorite ? fullHeartIcon : favoritesIcon}
              alt="favorites-icon"
              className="favorites-icon"
              onClick={() => handleFavoriteAndCartClick("favorite")}
            />
            <img
              src={isAddedToCard ? cartCheckIcon : cartIcon}
              alt="cart-icon"
              className="cart-icon"
              onClick={() => handleFavoriteAndCartClick("cart")}
            />
          </div>
          <ImageSection
            images={product.images}
            currentImageIndex={currentImageIndex}
            handleLeftArrowClick={handleLeftArrowClick}
            handleRightArrowClick={handleRightArrowClick}
            productTitle={product.title}
          />
          <div className="content-grouper-three mb-1">
            <h3 className="product-price mb-1">{product.price} ден.</h3>
            <p className="product-description mb-1">{product.description}</p>
            <QuantitySelector onQuantityChange={handleQuantityChange} />
            <div className="content-wrapper mb-1">
              <button
                className={`btn ${
                  isAddedToCard ? "btn-light-ribbon" : "btn-pink"
                }`}
                onClick={() => handleAddToCart("cart")}
              >
                {isAddedToCard ? (
                  <React.Fragment>
                    <span className="added-to-card-button">
                      <img src={starButtonOne} alt="star-icon" />
                      Додадено
                      <img src={starButtonTwo} alt="star-icon" />
                    </span>
                    <Link to="/added-to-card">
                      <span className="cart-button">кон кошничката &rarr;</span>
                    </Link>
                  </React.Fragment>
                ) : (
                  <React.Fragment>Додај во Кошничка</React.Fragment>
                )}
              </button>
              <img
                src={favoritesIconSmall}
                alt="favorites-icon-small"
                onClick={() => handleFavoriteAndCartClick("favorite")}
              />
            </div>
          </div>
          <div className="content-grouper-four mb-1">
            <div className="content-grouper-four-wrapper">
              <h3 className="product-sizes mr-0_5">Величини:</h3>
              <DropdownDetailPage
                items={product.sizes}
                isOpen={isSizeDropdownOpen}
                toggleDropdown={toggleSizeDropdown}
              />
            </div>
            <p className="size-description mb-1">{product.sizesDescription}</p>
            <p>Види ги димензиите</p>
          </div>
          <div className="content-grouper-five">
            <div className="content-grouper-five-wrapper">
              <h3 className="product-colors mr-0_5">Бои: </h3>
              <DropdownDetailPage
                items={product.colors}
                isOpen={isColorDropdownOpen}
                toggleDropdown={toggleColorDropdown}
              />
            </div>
            <ProductDetails
              material={product.material}
              lining={product.lining}
              condition={product.condition}
              maintenance={product.maintenance}
            />
          </div>
          <div className="content-grouper-six">
            <div className="content-grouper-six-wrapper">
              <h3>Ознаки:</h3>
              <div className="product-tags">
                {product.isNew ? <div>Ново</div> : null}
                <div>{product.category}</div>
                <div>{product.brand}</div>
                <div>{product.clothingType}</div>
              </div>
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetailPage;
