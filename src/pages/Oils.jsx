// pages/Oils.jsx

import React, { useState, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Droplet,
  Filter,
  Search,
} from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { oils } from "../context/productsData";
import toast, { Toaster } from "react-hot-toast";
import PageBreadcrumb from "../components/PageBreadcrumb";

const Oils = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const [filteredOils, setFilteredOils] = useState(oils);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 300]);

  // Get unique subcategories
  const subcategories = [
    { id: "all", name: "All Products", count: oils.length },
    ...Array.from(new Set(oils.map((oil) => oil.subcategory))).map((sub) => ({
      id: sub,
      name: sub.charAt(0).toUpperCase() + sub.slice(1),
      count: oils.filter((oil) => oil.subcategory === sub).length,
    })),
  ];

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

  // Filter and sort oils
  useEffect(() => {
    let filtered = oils;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (oil) =>
          oil.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          oil.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          oil.benefits.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subcategory
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter(
        (oil) => oil.subcategory === selectedSubcategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (oil) => oil.price >= priceRange[0] && oil.price <= priceRange[1]
    );

    // Sort oils
    switch (sortBy) {
      case "price-low":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
      default:
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredOils(filtered);
  }, [searchTerm, selectedSubcategory, sortBy, priceRange]);

  const ProductCard = ({ oil }) => (
    <div className="group bg-white rounded-3xl border border-[#ECD5B2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={oil.image}
          alt={oil.name}
          className="w-full h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() =>
              isInWishlist(oil.id)
                ? handleRemoveFromWishlist(oil.id, oil.name)
                : handleAddToWishlist(oil)
            }
            className="p-2 bg-white/90 rounded-full hover:bg-[#f5e4cc] transition-colors shadow-md"
          >
            {isInWishlist(oil.id) ? (
              <FaHeart className="w-5 h-5 text-[#D2A679]" />
            ) : (
              <Heart className="w-5 h-5 text-[#D2A679]" />
            )}
          </button>
        </div>

        {/* Discount Badge */}
        {oil.originalPrice > oil.price && (
          <div className="absolute top-4 left-4 bg-[#D2A679] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            Save ${oil.originalPrice - oil.price}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {oil.subcategory.charAt(0).toUpperCase() + oil.subcategory.slice(1)}
        </div>
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center text-yellow-400 text-sm space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(oil.rating) ? "fill-current" : ""
              }`}
            />
          ))}
          <span className="text-[#6D5C4D] ml-2">
            {oil.rating} ({oil.reviews})
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#3B2F2F]">{oil.name}</h3>
        <p className="text-sm text-[#6D5C4D] line-clamp-2">{oil.description}</p>

        {/* Oil Specific Info */}
        <div className="text-sm text-[#4B3A2F] space-y-1 mt-2">
          <p className="text-sm text-[#4B3A2F] mt-2">
            <span className="inline-flex items-center mr-1">
              {/* <Droplet className="w-4 h-4 text-[#D2A679] mr-1" /> */}
              <span className="font-bold">Benefits:</span>
            </span>
            <span className="font-extralight">{oil.benefits}</span>
          </p>

          <p className="flex items-center">
            <span className="font-semibold mr-1">Origin:</span>
            <span>{oil.origin}</span>
          </p>
          <p className="flex items-center">
            <span className="font-semibold mr-1">Purity:</span>
            <span>{oil.purity}</span>
          </p>
        </div>

        {/* Price + Size */}
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <span className="text-2xl font-bold text-[#3B2F2F]">
              ${oil.price}
            </span>
            {oil.originalPrice > oil.price && (
              <span className="line-through text-[#aaa] text-sm">
                ${oil.originalPrice}
              </span>
            )}
          </div>
          <span className="text-sm text-[#6D5C4D]">{oil.size}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex space-x-3">
          <button
            onClick={() => navigate(`/oil/${oil.id}`)}
            className="flex-1 bg-[#D2A679] hover:bg-black text-white py-3 rounded-full font-semibold transition-all duration-300"
          >
            Buy Now
          </button>
          <button
            onClick={() => handleAddToCart(oil)}
            className={`p-3 rounded-full border transition-all duration-300
    ${
      isInCart(oil.id)
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
    <>
      {/* <PageBreadcrumb
        links={[
          { path: "/", label: "Home" },
          { path: "/oils", label: "Oils" },
        ]}
      /> */}
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F5F1E8]">
        <Toaster position="top-right" />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#D2A679] to-[#C19A6B] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Essential Oils
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Discover our collection of pure, therapeutic-grade essential oils
              sourced from the finest locations around the world
            </p>
            <div className="mt-8 text-lg">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {/* {oils.length}  */}
                Premium Oils Available
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#ECD5B2]">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative ">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D5C4D] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search oils..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-4.5 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="px-4 py-3 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors bg-white"
              >
                {subcategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors bg-white"
              >
                <option value="name">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* Price Range */}
              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#4B3A2F]">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                  {/* <span className="text-xs italic text-[#6D5C4D]">Minimum item value in this section is $49</span> */}

                {/* Range Slider (controls "To" price only) */}
                {/* <input
                  type="range"
                  min="0"
                  max="300"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    const safeMax = Math.max(value, priceRange[0]); // Don't let min > max
                    setPriceRange([priceRange[0], safeMax]);
                  }}
                  className="w-full accent-[#D2A679]"
                /> */}

                {/* From - To Inputs */}
                <div className="flex items-center space-x-2">
                  {/* From Input */}
                  <label>From</label>
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const safeMin = Math.min(value, priceRange[1]); // Don't exceed current max
                      setPriceRange([safeMin, priceRange[1]]);
                    }}
                    placeholder="From"
                    className="w-1/2 px-3 py-2 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679]"
                  />

                  {/* To Input */}
                  <label htmlFor="">To</label>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 300;
                      const safeMax = Math.max(value, priceRange[0]); // Must be ≥ min
                      setPriceRange([priceRange[0], safeMax]);
                    }}
                    placeholder="To"
                    className="w-1/2 px-3 py-2 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#3B2F2F]">
              {filteredOils.length} Essential Oil
              {filteredOils.length !== 1 ? "s" : ""} Found
            </h2>
            <div className="text-sm text-[#6D5C4D]">
              {selectedSubcategory !== "all" && (
                <span className="bg-[#D2A679]/20 text-[#D2A679] px-3 py-1 rounded-full">
                  {
                    subcategories.find((cat) => cat.id === selectedSubcategory)
                      ?.name
                  }
                </span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          {filteredOils.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredOils.map((oil) => (
                <ProductCard key={oil.id} oil={oil} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-[#ECD5B2]">
                {/* <Droplet className="w-16 h-16 text-[#D2A679] mx-auto mb-4" /> */}
                <h3 className="text-xl font-bold text-[#3B2F2F] mb-2">
                  No oils found
                </h3>
                <p className="text-[#6D5C4D] mb-6">
                  Try adjusting your filters or search terms to find the perfect
                  essential oil.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSubcategory("all");
                    setPriceRange([0, 300]);
                  }}
                  className="bg-[#D2A679] hover:bg-black text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Oils;
