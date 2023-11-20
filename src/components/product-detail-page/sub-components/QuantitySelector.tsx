import React, { useState } from "react";

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    onQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <React.Fragment>
      <div className="quantity-selector">
        <span className="product-quantity">Количина:</span>
        <button onClick={handleDecrement} className="increment-decrement-btn">
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button onClick={handleIncrement} className="increment-decrement-btn">
          +
        </button>
      </div>
    </React.Fragment>
  );
};

export default QuantitySelector;
