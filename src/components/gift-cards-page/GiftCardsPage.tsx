import React, { useContext, useState } from "react";
import { ProductContext } from "../../contexts/useProductDataContext";
import { useNavigate } from "react-router-dom";
import giftCardsOne from "../../images/gift-cards1.png";
import giftCardsTwo from "../../images/gift-cards2.png";
import giftCardsThree from "../../images/gift-cards3.png";

interface GiftCard {
  id: string;
  price: string;
  label: string;
}

const GiftCardsPage = () => {
  const { selectedPrice, setSelectedPrice } = useContext(ProductContext);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const navigate = useNavigate();

  const cardData: GiftCard[] = [
    { id: "1", price: "500 ден.", label: "Додај во кошничка" },
    { id: "2", price: "1000 ден.", label: "Додај во кошничка" },
    { id: "3", price: "2000 ден.", label: "Додај во кошничка" },
    { id: "4", price: "2500 ден.", label: "Додај во кошничка" },
    { id: "5", price: "4000 ден.", label: "Додај во кошничка" },
  ];

  const handleCardClick = (card: GiftCard) => {
    setSelectedPrice(card.price);
    console.log(selectedPrice);
    navigate("/added-to-card", { state: { giftCardPrice: card.price } });
  };

  return (
    <React.Fragment>
      <div className="gift-cards-page">
        <h2>Gift картички за подарок</h2>
        <div className="gift-cards-wrapper">
          <img src={giftCardsOne} alt="random" />
          <img src={giftCardsTwo} alt="random" />
          <img src={giftCardsThree} alt="random" />

          <h3>Одбери цена на подарок картичка:</h3>
          {cardData.map((card) => (
            <div
              key={card.id}
              className="gift-card"
              onClick={() => handleCardClick(card)}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-inner">
                <p>{hoveredCard === card.id ? card.label : card.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default GiftCardsPage;
