import React, { createContext } from "react";
import useFetch from "../custom-hooks/useFetch";
import { Product } from "../interfaces";

interface ProductType {
  data: Product[] | null;
  isLoading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<Product[] | null>>;
}

export const ProductContext = createContext<ProductType>({
  data: null,
  isLoading: true,
  error: null,
  setData: () => null,
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

  return (
    <ProductContext.Provider
      value={{ data: dataState, isLoading, error, setData }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextConstructor;
