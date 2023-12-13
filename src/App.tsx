import React from "react";
import Homepage from "./components/homepage/Homepage";
import ProductContextConstructor from "./contexts/useProductDataContext";
import "./css/main.scss";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/product-page/ProductPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ErrorPage from "./components/ErrorPage";
import FilterContextConstructor from "./contexts/useFilterContext";
import DetailedFilterContextConstructor from "./contexts/useDetailedFilterContext";
import BrandPage from "./components/BrandPage";
import GiftCardsPage from "./components/GiftCardsPage";
import Footer from "./components/footer/Footer";
import Favorites from "./components/favorites/Favorites";
import AddedToCardPage from "./components/added-to-card/AddedToCard";
import AboutUs from "./components/about-us/AboutUs";
import Contact from "./components/contact/Contact";
import FaqPage from "./components/faq/FaqPage";
import Location from "./components/location/Location";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ProductContextConstructor>
          <FilterContextConstructor>
            <DetailedFilterContextConstructor>
              <Navbar />

              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/product-page" element={<ProductPage />} />
                <Route
                  path="/product-page/:slug"
                  element={<ProductDetailPage />}
                />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/added-to-card" element={<AddedToCardPage />} />
                <Route path="/brand-page/:id" element={<BrandPage />} />
                <Route path="/gift-cards" element={<GiftCardsPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/location" element={<Location />} />
                <Route path="/faq" element={<FaqPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>

              <Footer />
            </DetailedFilterContextConstructor>
          </FilterContextConstructor>
        </ProductContextConstructor>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
