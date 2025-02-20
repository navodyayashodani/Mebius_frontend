/*import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";


import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";

import { store } from "@/lib/store"
import { Provider } from "react-redux"

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  //</StrictMode>
);*/

import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import HomePage from "./pages/home.page";
import SignInPage from "./pages/sign-in.page";
import SignUpPage from "./pages/sign-up.page";
import CartPage from "./pages/cart.page";
import AccountPage from "./pages/account.page";
import CheckoutPage from "./pages/checkout.page";
import PaymentPage from "./pages/payment.page";
import CompletePage from "./pages/complete.page";
import ShopPage from "./pages/shop.page";
import ProductDetailsPage from "./pages/product-details.page";
import MyOrdersPage from "./pages/my-orders.page";
import ContactPage from "./pages/contact.page";


import Protected from "@/layouts/Protected";
import AdminProtected from "@/layouts/AdminProtected";

import AdminProductCreatePage from "./pages/admin-product-create.page";

import { ClerkProvider } from "@clerk/clerk-react";
import RootLayout from "./layouts/rootLayout/root.layout";
import MainLayout from "./layouts/main.layout";

import { store } from "@/lib/store";
import { Provider } from "react-redux";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  //<StrictMode>
  <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<RootLayout />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/shop/:productId" element={<ProductDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />   
              
              {/* Protected Routes */}
              <Route element={<Protected />}>
                <Route path="/shop/cart" element={<CartPage />} />
                <Route path="/shop/checkout" element={<CheckoutPage />} />
                <Route path="/shop/payment" element={<PaymentPage />} />
                <Route path="/shop/complete" element={<CompletePage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />

                {/* Admin Routes */}
                <Route element={<AdminProtected />}>
                  <Route
                    path="/admin/products/create"
                    element={<AdminProductCreatePage />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>
          
          {/* Auth Routes */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </ClerkProvider>
  //</StrictMode>
);
