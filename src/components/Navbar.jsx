import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState("");
  const location = useLocation();
  const { getCartItemsCount } = useCart();
  const { getWishlistItemsCount } = useWishlist();
  const wishlistCount = getWishlistItemsCount();

  const isActive = (path) => location.pathname === path;

  const handleDropdownToggle = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? "" : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown("");
  };

  const openDropdown = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 z-10"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left Navigation */}
          <nav className="hidden lg:flex items-start space-x-8">
            <Link
              to="/"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/") ? "text-black" : "text-gray-700 hover:text-black"
              }`}
            >
              HOME
            </Link>

            <div
              className="relative"
              onMouseEnter={() => openDropdown("shop")}
              onMouseLeave={closeDropdown}
            >
              <button
                className="flex items-center text-sm font-bold text-gray-700 hover:text-black tracking-wide transition-colors"
                onClick={() => handleDropdownToggle("shop")}
              >
                <Link to="/shop">SHOP</Link>
                <ChevronDown size={14} className="ml-1" />
              </button>

              {/* Shop Dropdown */}
              {activeDropdown === "shop" && (
                <div className="absolute top-full left-0 mt-2 w-[600px] bg-white shadow-lg border border-gray-100 rounded-lg p-8 z-50">
                  <div className="grid grid-cols-4 gap-8">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-sm">
                        Categories
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Eau de Parfum
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Eau de Toilette
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Body Mists
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Travel Sizes
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-sm">
                        All Perfumes
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Men's Fragrances
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Women's Fragrances
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Unisex Perfumes
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            New Arrivals
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-sm">
                        Offers & Discounts
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Limited Editions
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Best Sellers
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Seasonal Sales
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/shop"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Clearance Sale
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-4 text-sm">
                        Support
                      </h3>
                      <ul className="space-y-3">
                        <li>
                          <Link
                            to="#"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Customer Service
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Track Your Order
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="#"
                            className="text-sm text-gray-600 hover:text-black transition-colors"
                            onClick={closeDropdown}
                          >
                            Shipping & Returns
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/oils"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/about")
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              OILS
            </Link>
            <Link
              to="/diffusers"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/about")
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              DIFFUSERS
            </Link>
            <Link
              to="/about"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/about")
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              ABOUT US
            </Link>

            <Link
              to="/faq"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/faq")
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              FAQ
            </Link>

            {/* <Link
              to="/blog"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/blog")
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              BLOG
            </Link> */}

            <Link
              to="/contact"
              className={`text-sm font-bold tracking-wide transition-colors ${
                isActive("/contact")
                  ? "text-black"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              CONTACT
            </Link>
          </nav>

          {/* Logo - Centered on mobile, positioned normally on desktop */}
          <div className="absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none flex items-center">
            <Link to="/" className="flex items-center">
              <div className="flex items-center">
                <img
                  src="/richony-logo.png"
                  alt="Richony Logo"
                  className="max-w-[140px] h-auto "
                  loading="lazy"
                  width="353"
                  height="707"
                />
              </div>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-1 lg:space-x-4">
            {/* Search - Desktop only */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search our store"
                  className="w-64 px-4 py-2 pr-10 text-sm bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-1 focus:ring-gray-300 focus:bg-white transition-colors"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* User Account */}
            <Link to={(user)?`/account` : `login`} className="relative p-1">
              <User className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
            </Link>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-1">
              <Heart className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
              {wishlistCount >= 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-1">
              <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center leading-none">
                {getCartItemsCount()}
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="px-4 py-6">
              {/* Mobile Search */}
              <div className="border-b border-gray-200 pb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search our store"
                    className="w-full px-4 py-3 pr-12 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:bg-white transition-colors"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col space-y-1 mb-8">
                <Link
                  to="/"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  to="/shop"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SHOP
                </Link>
                <Link
                  to="/oils"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  OILS
                </Link>
                <Link
                  to="/diffusers"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  DIFFUSERS
                </Link>
                <Link
                  to="/about"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ABOUT US
                </Link>
                <Link
                  to="/faq"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ PAGE
                </Link>
                {/* <Link
                  to="/blog"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  BLOG
                </Link> */}
                <Link
                  to="/contact"
                  className="px-4 py-3 text-base font-bold text-gray-800 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </nav>

              {/* Mobile Quick Links */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    My Account
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Heart className="w-4 h-4 mr-3" />
                    Wishlist {wishlistCount >= 0 && `(${wishlistCount})`}
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-3" />
                    Cart ({getCartItemsCount()})
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
