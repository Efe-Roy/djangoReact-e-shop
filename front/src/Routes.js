import React from "react";
import Layout from "./Layout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./store/context";
import { CartContext } from "./store/cartContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import ProductList from "./pages/ProductList";
import OrderSummary from "./pages/OrderSummary";
import CheckoutPage from "./pages/CheckoutPage";
import ProdDetailPage from "./pages/ProdDetailPage";
import Profile from "./pages/Profile";
import { AddressContext } from "./store/AddressContext";
import Showhidetab from "./pages/Showhidetab";

export const RoutesH = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
        <GlobalContext>
          <CartContext>
            <AddressContext>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProdDetailPage />} />
                  <Route path="/order-summary" element={<OrderSummary />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/test" element={<Showhidetab />} />
                </Routes>
              </Layout>
            </AddressContext>
          </CartContext>
        </GlobalContext>
      </BrowserRouter>
    </React.Fragment>
  );
};
