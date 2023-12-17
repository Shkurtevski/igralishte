import React, { createContext, useState } from "react";
import useFetch from "../custom-hooks/useFetch";
import { Product } from "../interfaces";

interface ProductType {
  data: Product[] | null;
  isLoading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<Product[] | null>>;
  selectedQuantity: number;
  setSelectedQuantity: React.Dispatch<React.SetStateAction<number>>;
  selectedPrice: string;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string>>;
}

export const ProductContext = createContext<ProductType>({
  data: null,
  isLoading: true,
  error: null,
  setData: () => null,
  selectedQuantity: 1,
  setSelectedQuantity: () => {},
  selectedPrice: "",
  setSelectedPrice: () => {},
});

interface Props {
  children: React.ReactNode;
}

const ProductContextConstructor: React.FC<Props> = ({ children }) => {
  const { data, isLoading, error } = useFetch<Product[]>(
    "http://localhost:5001/products"
  );
  const [dataState, setData] = React.useState<Product[] | null>(data);

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const [selectedPrice, setSelectedPrice] = useState("");

  React.useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <ProductContext.Provider
      value={{
        data: dataState,
        isLoading,
        error,
        setData,
        selectedQuantity,
        setSelectedQuantity,
        selectedPrice,
        setSelectedPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextConstructor;
