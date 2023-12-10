import React, { createContext } from "react";
import useFetch from "../custom-hooks/useFetch";
import { Product } from "../interfaces";

interface ProductType {
  data: Product[] | null;
  isLoading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<Product[] | null>>;
  updateFavoriteStatus: (productId: string, isFavorite: boolean) => void;
  updateAddedToCardStatus: (productId: string, isFavorite: boolean) => void;
}

export const ProductContext = createContext<ProductType>({
  data: null,
  isLoading: true,
  error: null,
  setData: () => null,
  updateFavoriteStatus: () => {},
  updateAddedToCardStatus: () => {},
});

interface Props {
  children: React.ReactNode;
}

const ProductContextConstructor: React.FC<Props> = ({ children }) => {
  const { data, isLoading, error } = useFetch<Product[]>(
    "http://localhost:5001/products"
  );
  const [dataState, setData] = React.useState<Product[] | null>(data);

  React.useEffect(() => {
    setData(data);
  }, [data]);

  const updateFavoriteStatus = async (
    productId: string,
    isFavorite: boolean
  ) => {
    try {
      if (data) {
        const updatedData = data.map((product) =>
          product.id === productId ? { ...product, isFavorite } : product
        );
        setData(updatedData);

        await fetch(`http://localhost:5001/products/${productId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isFavorite }),
        });
      }
    } catch (error) {
      console.error("Failed to update favorite status:", error);
    }
  };

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

  return (
    <ProductContext.Provider
      value={{
        data: dataState,
        isLoading,
        error,
        setData,
        updateFavoriteStatus,
        updateAddedToCardStatus,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextConstructor;
