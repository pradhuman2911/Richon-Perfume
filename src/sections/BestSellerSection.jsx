import React, { useState } from "react";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { products } from "../context/productsData";

import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

import toast, { Toaster } from "react-hot-toast";

const BestSellersSection = () => {
  const [activeTab, setActiveTab] = useState("women");

  // Actual hooks implementation
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };
  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    toast.success(`${product.name} added to wishlist!`);
  };
  const handleRemoveFromWishlist = (id, name) => {
    removeFromWishlist(id);
    toast.success(`${name} removed from wishlist.`);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Filter products based on active tab
  const getFilteredProducts = () => {
    switch (activeTab) {
      case "women":
        return products.filter((p) =>
          ["floral", "musk", "amber"].includes(p.category)
        );
      case "men":
        return products.filter((p) =>
          ["oud", "oriental", "attar"].includes(p.category)
        );
      case "kids":
        return products.filter((p) => p.category === "musk");
      default:
        return products;
    }
  };

  const filteredProducts = getFilteredProducts();
  // Ensure exactly 8 products are displayed
  const displayProducts = filteredProducts.slice(0, 8);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <section className="py-8 md:py-16 bg-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 md:mb-8">
            Our Best Sellers
          </h2>

          {/* Tab Navigation */}
          <div className="flex justify-center gap-4 md:gap-8 mb-8 md:mb-12">
            <button
              onClick={() => setActiveTab("women")}
              className={`text-sm md:text-lg font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "women"
                  ? "text-pink-600 border-pink-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Women
            </button>
            <button
              onClick={() => setActiveTab("men")}
              className={`text-sm md:text-lg font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "men"
                  ? "text-pink-600 border-pink-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Men
            </button>
            <button
              onClick={() => setActiveTab("kids")}
              className={`text-sm md:text-lg font-medium pb-2 border-b-2 transition-colors ${
                activeTab === "kids"
                  ? "text-pink-600 border-pink-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
            >
              Kid's
            </button>
          </div>
        </div>

        {/* Products Grid - Responsive Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-pink-50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg"
            >
              {/* Action Buttons */}
              <div className="absolute top-3 md:top-4 right-3 md:right-4 flex flex-col items-center gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    isInWishlist(product.id)
                      ? handleRemoveFromWishlist(product.id, product.name)
                      : handleAddToWishlist(product);
                  }}
                  className="p-1.5 md:p-2 bg-white/90 rounded-full hover:bg-[#f5e4cc] transition-colors shadow-md"
                >
                  {isInWishlist(product.id) ? (
                    <FaHeart className="w-4 h-4 md:w-5 md:h-5 text-[#D2A679]" />
                  ) : (
                    <Heart className="w-4 h-4 md:w-5 md:h-5 text-[#D2A679]" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(product.id);
                  }}
                  className="p-1.5 md:p-2 bg-white/90 rounded-full hover:bg-[#f5e4cc] transition-colors shadow-md"
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-[#D2A679]" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className={`p-2 md:p-3 rounded-full border transition-all duration-300
                    ${
                      isInCart(product.id)
                        ? "bg-[#D2A679] text-white border-[#D2A679]"
                        : "bg-[#FAF8F4] text-[#D2A679] hover:bg-[#ECD5B2]/30 border-[#ECD5B2]"
                    }`}
                >
                  <ShoppingBag className="w-4 h-4 md:w-5 md:h-5 " />
                </button>
              </div>

              {/* Product Image - Full Coverage */}
              <div
                className="h-48 md:h-64 bg-pink-50 overflow-hidden"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain md:object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Product Info */}
              <div className="p-3 md:p-4 text-center">
                {/* Rating */}
                <div className="flex justify-center items-center gap-1 mb-2">
                  {renderStars(product.rating)}
                </div>

                {/* Product Name */}
                <h3
                  className="font-bold text-sm md:text-base text-gray-800 mb-2 hover:text-pink-600 transition-colors cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex justify-center items-center gap-2">
                  <span className="text-base md:text-lg font-bold text-gray-800">
                    From ${product.price}.00
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs md:text-sm text-gray-500 line-through">
                      ${product.originalPrice}.00
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellersSection;
