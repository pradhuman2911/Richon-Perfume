import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";

import "./App.css";
// import Newsletter from "./sections/Newsletter";
import ErrorPage from "./pages/ErrorPage";
import FAQ from "./pages/FAQ";
import LoginPage from "./pages/LoginPage";
import Oils from "./pages/Oils";
import Diffusers from "./pages/Diffusers";
import { AuthProvider } from "./context/AuthContext";
import AccountPage from "./pages/AccountPage";

function App() {
  return (
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div
            className="App min-h-screen bg-gradient-to-br from-amber-50 to-orange-50"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            <Navbar />
            <main>
              <Routes>
                <Route path="/account" element={<AccountPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/diffuser/:id" element={<ProductDetails />} />
                <Route path="/oil/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/404" element={<ErrorPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/oils" element={<Oils />} />
                <Route path="/diffusers" element={<Diffusers />} />
                {/* <Route path="/blog" element={<Blog />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>


  );
}

export default App;
