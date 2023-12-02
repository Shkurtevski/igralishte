import React, { useContext, useState } from "react";
import { ProductContext } from "../../../contexts/useProductDataContext";
import { useFilterContext } from "../../../contexts/useFilterContext";
import ProductCard from "./ProductCard";
import ErrorPage from "../../ErrorPage";
import FilterForm from "./FilterForm";
import { Product } from "../../../interfaces";

const ProductCardContainer: React.FC<{ selectedFilter: string }> = ({
  selectedFilter,
}) => {
  const { data, isLoading, error } = useContext(ProductContext);
  const { selectedCategory, selectedBrand } = useFilterContext();

  const [categoryStates, setCategoryStates] = useState<string[]>([]);
  const [brandStates, setBrandStates] = useState<string[]>([]);
  const [sizeStates, setSizeStates] = useState<string[]>([]);
  const [colorStates, setColorStates] = useState<string[]>([]);
  const [isDiscounting, setIsDiscounting] = useState(false);

  const toggleCategory = (category: string) => {
    setCategoryStates((prevStates) =>
      prevStates.includes(category)
        ? prevStates.filter((cat) => cat !== category)
        : [...prevStates, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setBrandStates((prevStates) =>
      prevStates.includes(brand)
        ? prevStates.filter((br) => br !== brand)
        : [...prevStates, brand]
    );
  };

  const toggleDiscount = () => {
    setIsDiscounting((prev) => !prev);
  };

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const applyFilter = (products: Product[]): Product[] => {
    let filteredProducts = [...products];

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      ) as Product[];
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand === selectedBrand
      ) as Product[];
    }

    if (categoryStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categoryStates.includes(product.category)
      ) as Product[];
    }

    if (brandStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        brandStates.includes(product.brand)
      ) as Product[];
    }

    if (sizeStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.sizes.some(
          (size) =>
            sizeStates.includes(size.name) && parseInt(size.quantity) > 0
        )
      ) as Product[];
    }

    if (colorStates.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.some(
          (color) =>
            colorStates.includes(color.name) && parseInt(color.quantity) > 0
        )
      ) as Product[];
    }

    if (isDiscounting) {
      filteredProducts = filteredProducts.filter(
        (product) => product.isDiscounting
      ) as Product[];
    }

    return filteredProducts;
  };

  const applySorting = (products: Product[]): Product[] => {
    switch (selectedFilter) {
      case "new":
        return products
          .slice()
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
      case "priceHighToLow":
        return products
          .slice()
          .sort((a, b) => parseInt(b.price) - parseInt(a.price));
      case "priceLowToHigh":
        return products
          .slice()
          .sort((a, b) => parseInt(a.price) - parseInt(b.price));
      default:
        return products;
    }
  };

  const filteredAndSortedProducts: Product[] = applySorting(applyFilter(data));

  return (
    <React.Fragment>
      <div className="product-card-container">
        <FilterForm
          data={data}
          categoryStates={categoryStates}
          brandStates={brandStates}
          sizeStates={sizeStates}
          colorStates={colorStates}
          isDiscounting={isDiscounting}
          toggleCategory={toggleCategory}
          toggleBrand={toggleBrand}
          toggleSize={(size: string) =>
            setSizeStates((prevStates) =>
              prevStates.includes(size)
                ? prevStates.filter((s) => s !== size)
                : [...prevStates, size]
            )
          }
          toggleColor={(color: string) =>
            setColorStates((prevStates) =>
              prevStates.includes(color)
                ? prevStates.filter((c) => c !== color)
                : [...prevStates, color]
            )
          }
          toggleDiscount={toggleDiscount}
        />
        {filteredAndSortedProducts.length === 0 ? (
          <p>No products match the selected filters.</p>
        ) : (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </React.Fragment>
  );
};

export default ProductCardContainer;
