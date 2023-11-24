import React from "react";
import Homepage from "./components/Homepage";
import ProductContextConstructor from "./contexts/useProductDataContext";
import "./css/main.scss";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/product-page/ProductPage";
import Container from "./containers/Container";
import ProductDetailPage from "./components/product-detail-page/ProductDetailPage";
import ErrorPage from "./components/ErrorPage";
import FilterContextConstructor from "./contexts/useFilterContext";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ProductContextConstructor>
          <FilterContextConstructor>
            <Navbar />
            <Container>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product-page" element={<ProductPage />} />
                <Route
                  path="/product-page/:id"
                  element={<ProductDetailPage />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Container>
          </FilterContextConstructor>
        </ProductContextConstructor>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
