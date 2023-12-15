import React from "react";
import Homepage from "./components/homepage/Homepage";
import ProductContextConstructor from "./contexts/useProductDataContext";
import "./css/main.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./components/product-page/ProductPage";
import ProductDetailPage from "./components/ProductDetailPage";
import ErrorPage from "./components/error-page/ErrorPage";
import FilterContextConstructor from "./contexts/useFilterContext";
import DetailedFilterContextConstructor from "./contexts/useDetailedFilterContext";
import BrandPage from "./components/brand-page/BrandPage";
import GiftCardsPage from "./components/gift-cards-page/GiftCardsPage";
import Favorites from "./components/favorites/Favorites";
import AddedToCardPage from "./components/added-to-card/AddedToCard";
import AboutUs from "./components/about-us/AboutUs";
import Contact from "./components/contact/Contact";
import FaqPage from "./components/faq/FaqPage";
import Location from "./components/location/Location";
import PreRegister from "./components/login-register/PreRegister";
import RegisterTwo from "./components/login-register/RegisterTwo";
import Layout from "./components/login-register/Layout";
import Login from "./components/login-register/Login";
import Profile from "./components/login-register/Profile";
import ChangePassword from "./components/login-register/ChangePassword";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <ProductContextConstructor>
          <FilterContextConstructor>
            <DetailedFilterContextConstructor>
              <React.Fragment>
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route
                    path="/product-page"
                    element={
                      <Layout>
                        <ProductPage />
                      </Layout>
                    }
                  />
                  <Route
                    path="/product-page/:slug"
                    element={
                      <Layout>
                        <ProductDetailPage />
                      </Layout>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <Layout>
                        <Favorites />
                      </Layout>
                    }
                  />
                  <Route
                    path="/added-to-card"
                    element={
                      <Layout>
                        <AddedToCardPage />
                      </Layout>
                    }
                  />
                  <Route
                    path="/brand-page/:id"
                    element={
                      <Layout>
                        <BrandPage />
                      </Layout>
                    }
                  />
                  <Route
                    path="/gift-cards"
                    element={
                      <Layout>
                        <GiftCardsPage />
                      </Layout>
                    }
                  />
                  <Route
                    path="/about-us"
                    element={
                      <Layout>
                        <AboutUs />
                      </Layout>
                    }
                  />
                  <Route
                    path="/contact"
                    element={
                      <Layout>
                        <Contact />
                      </Layout>
                    }
                  />
                  <Route
                    path="/location"
                    element={
                      <Layout>
                        <Location />
                      </Layout>
                    }
                  />
                  <Route
                    path="/faq"
                    element={
                      <Layout>
                        <FaqPage />
                      </Layout>
                    }
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/pre-register" element={<PreRegister />} />
                  <Route path="/register" element={<RegisterTwo />} />
                  <Route path="/login/:id" element={<Profile />} />
                  <Route
                    path="/login/:id/change-password"
                    element={<ChangePassword />}
                  />
                  <Route
                    path="*"
                    element={
                      <Layout>
                        <ErrorPage />
                      </Layout>
                    }
                  />
                </Routes>
              </React.Fragment>
            </DetailedFilterContextConstructor>
          </FilterContextConstructor>
        </ProductContextConstructor>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
