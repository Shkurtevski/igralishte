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
import DetailedFilterContextConstructor from "./contexts/useDetailedFilterContext";
import BrandPage from "./components/BrandPage";
import GiftCardsPage from "./components/GiftCardsPage";
import Footer from "./components/footer/Footer";
import Favorites from "./components/favorites/Favorites";


function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ProductContextConstructor>
          <FilterContextConstructor>
            <DetailedFilterContextConstructor>
              <Navbar />
              <Container>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="/product-page" element={<ProductPage />} />
                  <Route
                    path="/product-page/:slug"
                    element={<ProductDetailPage />}
                  />
                  <Route path="/favorites" element={<Favorites/>}/>
                  <Route path="/brand-page/:id" element={<BrandPage />} />
                  <Route path="/gift-cards" element={<GiftCardsPage />} />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
              </Container>
              <Footer />
            </DetailedFilterContextConstructor>
          </FilterContextConstructor>
        </ProductContextConstructor>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
