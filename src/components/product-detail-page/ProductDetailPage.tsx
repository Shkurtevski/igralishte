import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
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

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams();
  const { data, isLoading, error } = useContext(ProductContext);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [isSizeDropdownOpen, setIsSizeDropdownOpen] = useState(false);
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

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

  const handleQuantityChange = (newQuantity: number) => {
    setSelectedQuantity(newQuantity);
  };

  const toggleSizeDropdown = () => {
    setIsSizeDropdownOpen(!isSizeDropdownOpen);
  };

  const toggleColorDropdown = () => {
    setIsColorDropdownOpen(!isColorDropdownOpen);
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
              src={favoritesIcon}
              alt="favorites-icon"
              className="favorites-icon"
            />
            <img src={cartIcon} alt="cart-icon" className="cart-icon" />
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
              <button className="btn btn-pink">Додај во Кошничка</button>
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
