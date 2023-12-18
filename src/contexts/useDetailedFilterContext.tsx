import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Product } from "../interfaces";
import useFetch from "../custom-hooks/useFetch";

interface DetailedFilterFormType {
  data: Product[];
  categoryStates: string[];
  brandStates: string[];
  sizeStates: string[];
  colorStates: string[];
  isDiscounting: boolean;
  isNew: boolean;
  priceRangeStates: string[];
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  toggleCategory: (category: string) => void;
  toggleBrand: (brand: string) => void;
  toggleSize: (size: string) => void;
  toggleColor: (color: string) => void;
  toggleDiscount: () => void;
  toggleIsNew: () => void;
  togglePriceRange: (priceRange: string) => void;
  resetFilters: () => void;
  enableDiscount: () => void;
}

export const DetailedFilterContext = createContext<
  DetailedFilterFormType | undefined
>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const DetailedFilterContextConstructor: React.FC<
  FilterProviderProps
> = ({ children }) => {
  const [categoryStates, setCategoryStates] = useState<string[]>([]);
  const [brandStates, setBrandStates] = useState<string[]>([]);
  const [sizeStates, setSizeStates] = useState<string[]>([]);
  const [colorStates, setColorStates] = useState<string[]>([]);
  const [isDiscounting, setIsDiscounting] = useState(false);
  const [isNew, setIsNew] = useState<boolean>(false);
  const [priceRangeStates, setPriceRangeStates] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data } = useFetch<Product[]>(
    "https://igralishte-webs.onrender.com/products"
  );

  useEffect(() => {
    if (!data) return;

    const sizes = data.flatMap((product) => product.sizes);
    const colors = data.flatMap((product) => product.colors);

    setSizeStates([...sizes.map((size) => size.name)]);
    setColorStates([...colors.map((color) => color.name)]);

    setSizeStates([]);
    setColorStates([]);
  }, [data]);

  const toggleCategory = (category: string) => {
    setCategoryStates((prevStates) => {
      const updatedStates = prevStates.includes(category)
        ? prevStates.filter((cat) => cat !== category)
        : [...prevStates, category];
      return updatedStates;
    });
  };

  const toggleBrand = (brand: string) => {
    setBrandStates((prevStates) => {
      const updatedStates = prevStates.includes(brand)
        ? prevStates.filter((br) => br !== brand)
        : [...prevStates, brand];
      return updatedStates;
    });
  };

  const toggleSize = (size: string) => {
    setSizeStates((prevStates) => {
      const updatedStates = prevStates.includes(size)
        ? prevStates.filter((s) => s !== size)
        : [...prevStates, size];
      return updatedStates;
    });
  };

  const toggleColor = (color: string) => {
    setColorStates((prevStates) => {
      const updatedStates = prevStates.includes(color)
        ? prevStates.filter((c) => c !== color)
        : [...prevStates, color];
      return updatedStates;
    });
  };

  const toggleDiscount = () => {
    setIsDiscounting((prev) => !prev);
  };

  const toggleIsNew = () => {
    setIsNew((prev) => !prev);
  };

  const enableDiscount = () => {
    setIsDiscounting(true);
  };

  const togglePriceRange = (priceRange: string) => {
    setPriceRangeStates((prevStates) => {
      if (prevStates.includes(priceRange)) {
        return [];
      } else {
        return [priceRange];
      }
    });
  };

  const resetFilters = () => {
    setCategoryStates([]);
    setBrandStates([]);
    setSizeStates([]);
    setColorStates([]);
    setIsDiscounting(false);
    setPriceRangeStates([]);
    setSearchQuery("");
    setIsNew(false);
  };

  const contextValue: DetailedFilterFormType = {
    data: data || [],
    categoryStates,
    brandStates,
    sizeStates,
    colorStates,
    isDiscounting,
    isNew,
    priceRangeStates,
    searchQuery,
    setSearchQuery,
    toggleCategory,
    toggleBrand,
    toggleSize,
    toggleColor,
    toggleDiscount,
    toggleIsNew,
    togglePriceRange,
    resetFilters,
    enableDiscount,
  };

  return (
    <DetailedFilterContext.Provider value={contextValue}>
      {children}
    </DetailedFilterContext.Provider>
  );
};

export const useDetailedFilterContext = () => {
  const context = useContext(DetailedFilterContext);
  if (!context) {
    throw new Error(
      "useDetailedFilterContext must be used within a DetailedFilterContextProvider"
    );
  }
  return context;
};

export default DetailedFilterContextConstructor;
