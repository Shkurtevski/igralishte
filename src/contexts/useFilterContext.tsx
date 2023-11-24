import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  selectedCategory: string | null;
  selectedBrand: string | null;
  setCategory: (category: string | null) => void;
  setBrand: (brand: string | null) => void;
}

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContextConstructor: React.FC<FilterProviderProps> = ({
  children,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const setCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  const setBrand = (brand: string | null) => {
    setSelectedBrand(brand);
  };

  return (
    <FilterContext.Provider value={{ selectedCategory, setCategory, selectedBrand, setBrand }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContextConstructor must be used within a FilterProvider"
    );
  }
  return context;
};

export default FilterContextConstructor;
