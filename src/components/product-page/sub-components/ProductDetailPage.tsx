import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../../contexts/useProductDataContext";
import ErrorPage from "../../ErrorPage";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useContext(ProductContext);

  const product = data?.find((p) => p.id === id);

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

  return (
    <div className="product-detail-page">
      <div className="product-detail-wrapper">
        <div className="content-grouper-one">
          <h3>{product.title}</h3>
          <img src={product.images[0]} alt={`${product.title} - fashion`} />
        </div>
        <div className="content-grouper-two">
          <div className="images-wrapper">
            <div className="image">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} - fashion`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="content-grouper-three">
          <p>{product.price} ден.</p>
          <p>{product.description}</p>
          <p>Количина: </p>
          <div className="content-wrapper">
            <button>Додај во Кошничка</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
