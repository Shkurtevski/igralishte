import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../custom-hooks/useFetch";
import { Brand } from "../../../interfaces";

import RelatedProducts from "../../related-products/RelatedProducts";
import BreadCrumbs from "../../product-page/sub-components/BreadCrumbs";
import ErrorPage from "../../error-page/ErrorPage";
import sparksElements from "../../../images/sparks-elements.png";

const BrandPage = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useFetch<Brand[]>(
    "https://igralishte-webs.onrender.com/brand_page"
  );

  const initialBreadcrumbs = ["Почетна", "Локални брендови", `${id}`];

  const getBreadCrumbs = (): string[] => {
    let breadcrumbs = [...initialBreadcrumbs];

    return breadcrumbs;
  };

  if (!data) {
    return <ErrorPage />;
  }

  if (isLoading) {
    console.log("Loading...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error:", error);
    return <div>Error: {error}</div>;
  }

  const brandProducts = data?.filter((product) => product.brand === id) || [];

  return (
    <React.Fragment>
      <div className="brand-page">
        <div className="brand-page-wrapper">
          <BreadCrumbs crumbs={getBreadCrumbs()} />
          <div className="text-content-wrapper mb-1">
            <img src={sparksElements} alt={id} />
            <h2>{id}</h2>
          </div>
          {brandProducts.map((brand) => (
            <div key={brand.id} className="content-wrapper">
              <img src={brand.image} alt={brand.brand} className="mb-1" />
              <p>{brand.firstContent}</p>
              <ul>
                <li>{brand.secondContent}</li>
                <li>{brand.thirdContent}</li>
                <li>{brand.fourthContent}</li>
                <li>{brand.fifthContent}</li>
              </ul>
              <p>{brand.sixthContent}</p>
              <p>{brand.seventhContent}</p>
            </div>
          ))}
          <div className="content-grouper-seven mb-1">
            <h3 className="related-products mb-1">Парчиња од брендот:</h3>
            <RelatedProducts brand={id || "defaultBrand"} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BrandPage;
