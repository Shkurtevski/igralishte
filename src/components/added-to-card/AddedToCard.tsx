import React, { useContext } from "react";
import useFetch from "../../custom-hooks/useFetch";
import { Product } from "../../interfaces";
import BreadCrumbs from "../product-page/sub-components/BreadCrumbs";
import FavoritesGrouper from "../favorites/sub-components/FavoritesGrouper";
import ProductCard from "../product-page/sub-components/ProductCard";
import RelatedProducts from "../related-products/RelatedProducts";
import addToCardIcon from "../../images/shopping-cart-small.png";
import favoritesIcon from "../../svg-icons/favorites-icon-small.svg";
import AccordionItem from "../sub-components/AccordionItem";
import qualityIcon from "../../svg-icons/quality-icon.svg";
import returnBox from "../../svg-icons/return-box.svg";
import deliveryTruck from "../../svg-icons/delivery-truck.svg";
import helpIcon from "../../images/help-icon.png";
import trashBin from "../../svg-icons/trash-bin.svg";
import { ProductContext } from "../../contexts/useProductDataContext";
import { Link } from "react-router-dom";
import Container from "../../containers/Container";

const AddedToCardPage: React.FC = () => {
  const { data, isLoading, error } = useFetch<Product[]>(
    "http://localhost:5001/favorites"
  );

  const { data: dataAddedToCard } = useFetch<Product[]>(
    "http://localhost:5001/added_to_card"
  );

  const { setData } = useContext(ProductContext);

  console.log(dataAddedToCard);

  const updateAddedToCardStatus = async (
    productId: string,
    isAddedToCard: boolean
  ) => {
    try {
      if (data) {
        const updatedData = data.map((product) =>
          product.id === productId ? { ...product, isAddedToCard } : product
        );
        setData(updatedData);

        await fetch(`http://localhost:5001/products/${productId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isAddedToCard }),
        });
      }
    } catch (error) {
      console.error("Failed to update added to card status:", error);
    }
  };

  const deleteDataFromServer = async (productIds: any) => {
    try {
      for (const productId of productIds) {
        const response = await fetch(
          `http://localhost:5001/added_to_card/${productId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        updateAddedToCardStatus(productId, false);

        console.log(`Data with ID ${productId} deleted successfully`);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleDeleteClick = () => {
    const productIdsToDelete = dataAddedToCard?.map((product) => product.id);

    deleteDataFromServer(productIdsToDelete);
  };

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

  const calculateTotalDiscount = (products: Product[]) => {
    const discountPercentage = 20;
    const totalDiscount = products.reduce((total, product) => {
      if (product.isDiscounting) {
        return (
          total +
          (Number(product.price) *
            Number(product.quantity) *
            discountPercentage) /
            100
        );
      }
      return total;
    }, 0);

    return totalDiscount.toFixed(2);
  };

  const calculateTotalPrice = (products: Product[]) => {
    const discountPercentage = 20;
    const deliveryCost = 150;

    const totalOriginalPrice = products.reduce(
      (total, product) =>
        total + Number(product.price) * Number(product.quantity),
      0
    );

    const totalDiscount = products.reduce((total, product) => {
      if (product.isDiscounting) {
        return (
          total +
          (Number(product.price) *
            Number(product.quantity) *
            discountPercentage) /
            100
        );
      }
      return total;
    }, 0);

    const totalPrice = totalOriginalPrice - totalDiscount + deliveryCost;

    return totalPrice.toFixed(2);
  };

  const favoritesCount = data.length;
  const addedToCardCount = dataAddedToCard?.length;

  const itemsOnDiscountCount =
    dataAddedToCard?.filter((product) => product.isDiscounting)?.length || 0;

  return (
    <React.Fragment>
      <Container>
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
              <React.Fragment key={product.slug}>
                <ProductCard product={product} />
              </React.Fragment>
            ))}
          </div>
          {dataAddedToCard?.length ?? 0 ? (
            <React.Fragment>
              <div className="price">
                {dataAddedToCard?.map((product) => (
                  <div key={product.slug} className="price-wrapper">
                    <p>
                      {product.quantity} x {product.title}
                    </p>
                    <p>
                      {Number(product.price) * Number(product.quantity)} ден.
                    </p>
                  </div>
                ))}
              </div>
              <div className="delivery">
                <p>
                  <span>+</span>
                  <span>Достава до адреса</span>
                </p>
                <p>150 ден.</p>
              </div>
              <div className="discount">
                <div className="discount-wrapper">
                  <p>
                    <span>{itemsOnDiscountCount}x -20% попуст!</span>
                  </p>
                  <p>
                    -{" "}
                    {calculateTotalDiscount(
                      dataAddedToCard?.filter(
                        (product) => product.isDiscounting
                      ) || []
                    )}
                    <span> ден.</span>
                  </p>
                </div>
              </div>
              <div className="total-price">
                <div className="total-price-wrapper">
                  <p>
                    <span>Вкупно</span>
                  </p>
                  <p>
                    {calculateTotalPrice(dataAddedToCard || [])}{" "}
                    <span>ден.</span>
                  </p>
                </div>
              </div>
              <div className="continue-or-erase">
                <button className="btn btn-gold-gradient">Продолжи</button>
                <img
                  src={trashBin}
                  alt="icon-trash-bin"
                  onClick={handleDeleteClick}
                />
              </div>
            </React.Fragment>
          ) : (
            <div className="added-to-card-empty">
              <h2>Вашата кошничка е празна!</h2>
            </div>
          )}
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
      </Container>
    </React.Fragment>
  );
};

export default AddedToCardPage;
