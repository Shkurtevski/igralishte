import React from "react";
import { Link } from "react-router-dom";
import { Card } from "../../../interfaces";

const ProductCard: React.FC<Card> = ({ product }) => (
  <React.Fragment>
    <div className="product-card" key={product.id}>
      <div className="product-card-wrapper">
        <Link to={`/product-page/${product.id}`}>
          {product.images.length > 0 && (
            <img src={product.images[0]} alt={`${product.title} - fashion`} />
          )}
          <div className="product-card-inner">
            <p className="product-title">{product.title}</p>
            <p className="product-price">{product.price} ден</p>
          </div>
        </Link>
      </div>
    </div>
  </React.Fragment>
);

export default ProductCard;
