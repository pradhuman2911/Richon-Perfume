// /sections/OilsDiffusersSection.jsx

import {
  Star,
  ShoppingCart,
  Heart,
  Zap,
  Clock,
  Droplet,
  Wifi,
} from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { oils, diffusers } from "../context/productsData";
import toast, { Toaster } from "react-hot-toast";

const OilsDiffusersSection = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart ,isInCart } = useCart();

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

  // Get featured products (3 oils + 3 diffusers)
  const featuredOils = oils.filter((oil) => oil.featured).slice(0, 3);
  const featuredDiffusers = diffusers
    .filter((diffuser) => diffuser.featured)
    .slice(0, 3);

  const ProductCard = ({ product, type }) => (
    <div className="group bg-white rounded-2xl sm:rounded-3xl border border-[#ECD5B2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[280px] sm:h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
          <button
            onClick={() =>
              isInWishlist(product.id)
                ? handleRemoveFromWishlist(product.id, product.name)
                : handleAddToWishlist(product)
            }
            className="p-2 bg-white/90 rounded-full hover:bg-[#f5e4cc] transition-colors shadow-md"
          >
            {isInWishlist(product.id) ? (
              <FaHeart className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2A679]" />
            ) : (
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#D2A679]" />
            )}
          </button>
        </div>

        {/* Discount Badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#D2A679] text-white text-xs sm:text-sm font-semibold px-2 py-1 sm:px-3 rounded-full shadow-md">
            <span className="hidden sm:inline">Save </span>$
            {product.originalPrice - product.price}
          </div>
        )}

        {/* Product Type Badge */}
        <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {type === "oil" ? "Essential Oil" : "Diffuser"}
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
        <div className="flex items-center text-yellow-400 text-sm space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 sm:w-4 sm:h-4 ${
                i < Math.floor(product.rating) ? "fill-current" : ""
              }`}
            />
          ))}
          <span className="text-[#6D5C4D] ml-2 text-xs sm:text-sm">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-[#3B2F2F] leading-tight">
          {product.name}
        </h3>
        <p className="text-sm text-[#6D5C4D] line-clamp-2">
          {product.description}
        </p>

        {/* Product Specific Info */}
        {type === "oil" ? (
          <div className="text-xs sm:text-sm text-[#4B3A2F] space-y-1 mt-2">
            <p className="flex items-center">
              <span className="font-semibold">Benefits:</span>
              <span className="ml-1 truncate font-extralight">{product.benefits}</span>
            </p>
            <p className="flex">
              <span className="font-semibold mr-1">Origin:</span>
              <span className="truncate font-light">{product.origin}</span>
            </p>
            <p className="flex">
              <span className="font-semibold mr-1">Purity:</span>
              <span className="font-light">{product.purity}</span>
            </p>
          </div>
        ) : (
          <div className="text-xs sm:text-sm text-[#4B3A2F] space-y-1 mt-2">
            <p className="flex items-center">
              {/* <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#D2A679] flex-shrink-0" /> */}
              <span className="font-semibold">Runtime:</span>
              <span className="ml-1 font-light">{product.runtime}</span>
            </p>
            <p className="flex">
              <span className="font-semibold mr-1">Coverage:</span>
              <span>{product.coverage}</span>
            </p>
            <p className="flex items-center">
              {product.subcategory === "smart" && (
                <Wifi className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-[#D2A679] flex-shrink-0" />
              )}
              <span className="font-semibold mr-1">Capacity:</span>
              <span>{product.capacity}</span>
            </p>
          </div>
        )}

        {/* Price + Size/Color */}
        <div className="flex justify-between items-center mt-3 sm:mt-4">
          <div className="space-x-2">
            <span className="text-xl sm:text-2xl font-bold text-[#3B2F2F]">
              ${product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="line-through text-[#aaa] text-sm">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs sm:text-sm text-[#6D5C4D]">
            {type === "oil" ? product.size : product.color}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 sm:mt-5 flex space-x-2 sm:space-x-3">
          <button
            onClick={() => navigate(`/${type}/${product.id}`)}
            className="flex-1 bg-[#D2A679] hover:bg-black text-white py-2.5 sm:py-3 px-4 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Buy Now</span>
            <span className="sm:hidden">Buy Now</span>
          </button>
          <button
            onClick={() => handleAddToCart(product)}
            className={`p-2.5 sm:p-3 rounded-full border transition-all duration-300
                ${
                  isInCart(product.id)
                    ? "bg-[#D2A679] text-white border-[#D2A679]"
                    : "bg-[#FAF8F4] text-[#3B2F2F] hover:bg-[#ECD5B2]/40 border-[#ECD5B2]"
                }`}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-[#FAF7F2] to-[#F5F1E8] text-[#3B2F2F]">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#4B3A2F] mb-3 leading-tight">
            Essential Oils & Diffusers
          </h2>
          <p className="text-base sm:text-lg text-[#6D5C4D] max-w-2xl mx-auto px-4">
            Transform your space with premium essential oils and elegant
            diffusers designed for wellness and ambiance
          </p>
        </div>

        {/* Essential Oils Section */}
        <div className="mb-16 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-10 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#3B2F2F] mb-2">
                Premium Essential Oils
              </h3>
              <p className="text-sm sm:text-base text-[#6D5C4D]">
                Pure, therapeutic-grade oils for wellness and aromatherapy
              </p>
            </div>
            {/* <button
              onClick={() => navigate("/oils")}
              className="bg-[#D2A679] hover:bg-black text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 shadow-lg hover:scale-105 text-sm sm:text-base mx-auto sm:mx-0"
            >
              View All Oils
            </button> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredOils.map((oil) => (
              <ProductCard key={oil.id} product={oil} type="oil" />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center m-8 sm:m-10 space-y-4 sm:space-y-0">
            <button
              onClick={() => navigate("/oils")}
              className="bg-[#D2A679] hover:bg-black text-white font-semibold py-2.5 sm:py-3 px-10 sm:px-12 rounded-full transition-all duration-300 shadow-lg hover:scale-105 text-sm sm:text-base mx-auto sm:mx-0"
            >
              View All Oils
            </button>
          </div>
        </div>

        {/* Diffusers Section */}
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-10 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-[#3B2F2F] mb-2">
                Premium Diffusers
              </h3>
              <p className="text-sm sm:text-base text-[#6D5C4D]">
                Elegant diffusers to enhance your aromatherapy experience
              </p>
            </div>
            {/* <button
              onClick={() => navigate("/diffusers")}
              className="bg-[#D2A679] hover:bg-black text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 shadow-lg hover:scale-105 text-sm sm:text-base mx-auto sm:mx-0"
            >
              View All Diffusers
            </button> */}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredDiffusers.map((diffuser) => (
              <ProductCard
                key={diffuser.id}
                product={diffuser}
                type="diffuser"
              />
            ))}
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center m-8 sm:m-10 space-y-4 sm:space-y-0">
            <button
              onClick={() => navigate("/diffusers")}
              className="bg-[#D2A679] hover:bg-black text-white font-semibold py-2.5 sm:py-3 px-10 sm:px-12 rounded-full transition-all duration-300 shadow-lg hover:scale-105 text-sm sm:text-base mx-auto sm:mx-0"
            >
              View All Diffusers
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OilsDiffusersSection;
