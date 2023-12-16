import React, { useState, useEffect } from "react";

interface QuantitySelectorProps {
  onQuantityChange: (quantity: number) => void;
  maxQuantity: number;
  selectedQuantity: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  onQuantityChange,
  maxQuantity,
  selectedQuantity,
}) => {
  const [quantity, setQuantity] = useState<number>(selectedQuantity || 1);

  useEffect(() => {
    // Notify the parent component about the initial quantity
    onQuantityChange(quantity);
  }, [onQuantityChange, quantity]);

  const handleIncrement = () => {
    if (quantity < maxQuantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  useEffect(() => {
    // Notify the parent component whenever the quantity changes
    onQuantityChange(quantity);
  }, [onQuantityChange, quantity]);

  return (
    <div className="quantity-selector">
      <h3 className="product-quantity">Количина:</h3>
      <button onClick={handleDecrement} className="increment-decrement-btn">
        -
      </button>
      <span className="quantity">{quantity}</span>
      <button onClick={handleIncrement} className="increment-decrement-btn">
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
