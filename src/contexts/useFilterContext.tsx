import { createContext, useContext, useState, ReactNode } from "react";

interface FilterContextType {
  selectedCategory: string | null;
  selectedBrand: string | null;
  selectedLink: string | null;
  setCategory: (category: string | null) => void;
  setBrand: (brand: string | null) => void;
  setLink: (link: string | null) => void;
  isFilterFormVisible: boolean;
  toggleFilterForm: () => void;
  closeFilterForm: () => void;
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
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [isFilterFormVisible, setIsFilterFormVisible] = useState(true);

  const setCategory = (category: string | null) => {
    setSelectedCategory(category);
  };

  const setBrand = (brand: string | null) => {
    setSelectedBrand(brand);
  };

  const setLink = (link: string | null) => {
    setSelectedLink(link);
  };

  const toggleFilterForm = () => {
    setIsFilterFormVisible((prev) => !prev);
  };

  const closeFilterForm = () => {
    setIsFilterFormVisible(true);
  };

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setCategory,
        selectedBrand,
        setBrand,
        selectedLink,
        setLink,
        isFilterFormVisible,
        toggleFilterForm,
        closeFilterForm
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error(
      "useFilterContext must be used within a FilterProvider"
    );
  }
  return context;
};

export default FilterContextConstructor;
