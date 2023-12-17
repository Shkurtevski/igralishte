import React, { useState } from "react";
import useFetch from "../../../custom-hooks/useFetch";
import ProductCard from "../../product-page/sub-components/ProductCard";
import { Product } from "../../../interfaces";
import arrowLeft from "../../../svg-icons/arrow-left-big.svg";
import arrowRight from "../../../svg-icons/arrow-right-big.svg";
import getApiUrl from "../../../apiConfig";

const CardCarousel: React.FC = () => {
  const apiUrl: string = getApiUrl();
  const { data, isLoading, error } = useFetch<Product[]>(`${apiUrl}/products`);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleNext = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === (data?.length || 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentCardIndex((prevIndex) =>
      prevIndex === 0 ? (data?.length || 0) - 1 : prevIndex - 1
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const product = data?.[currentCardIndex] || {
    slug: "",
    id: "",
    title: "",
    images: [],
    price: "",
  };

  return (
    <div className="card-carousel">
      <h2>Тренди парчиња во моментот</h2>
      <div className="card-wrapper">
        <ProductCard product={product} />
      </div>
      <div className="arrow-wrapper">
        <img src={arrowLeft} alt="arrow-left" onClick={handlePrev} />
        <img src={arrowRight} alt="arrow-right" onClick={handleNext} />
      </div>
    </div>
  );
};

export default CardCarousel;
