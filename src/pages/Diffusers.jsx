// pages/Diffusers.jsx

import React, { useState, useEffect } from "react";
import {
  Star,
  ShoppingCart,
  Heart,
  Clock,
  Wifi,
  Filter,
  Search,
  Zap,
} from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { diffusers } from "../context/productsData";
import toast, { Toaster } from "react-hot-toast";
import PageBreadcrumb from "../components/PageBreadcrumb";

const Diffusers = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const [filteredDiffusers, setFilteredDiffusers] = useState(diffusers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [priceRange, setPriceRange] = useState([0, 400]);

  // Get unique subcategories
  const subcategories = [
    { id: "all", name: "All Products", count: diffusers.length },
    ...Array.from(
      new Set(diffusers.map((diffuser) => diffuser.subcategory))
    ).map((sub) => ({
      id: sub,
      name: sub.charAt(0).toUpperCase() + sub.slice(1),
      count: diffusers.filter((diffuser) => diffuser.subcategory === sub)
        .length,
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
    let filtered = diffusers;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (diffuser) =>
          diffuser.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          diffuser.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          diffuser.features.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by subcategory
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter(
        (diffuser) => diffuser.subcategory === selectedSubcategory
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (diffuser) =>
        diffuser.price >= priceRange[0] && diffuser.price <= priceRange[1]
    );

    // Sort diffusers
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

    setFilteredDiffusers(filtered);
  }, [searchTerm, selectedSubcategory, sortBy, priceRange]);

  const ProductCard = ({ diffuser }) => (
    <div className="group bg-white rounded-3xl border border-[#ECD5B2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={diffuser.image}
          alt={diffuser.name}
          className="w-full h-[350px] object-cover transform transition-transform duration-500 group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <div className="absolute top-4 right-4">
          <button
            onClick={() =>
              isInWishlist(diffuser.id)
                ? handleRemoveFromWishlist(diffuser.id, diffuser.name)
                : handleAddToWishlist(diffuser)
            }
            className="p-2 bg-white/90 rounded-full hover:bg-[#f5e4cc] transition-colors shadow-md"
          >
            {isInWishlist(diffuser.id) ? (
              <FaHeart className="w-5 h-5 text-[#D2A679]" />
            ) : (
              <Heart className="w-5 h-5 text-[#D2A679]" />
            )}
          </button>
        </div>

        {/* Discount Badge */}
        {diffuser.originalPrice > diffuser.price && (
          <div className="absolute top-4 left-4 bg-[#D2A679] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
            Save ${diffuser.originalPrice - diffuser.price}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {diffuser.subcategory.charAt(0).toUpperCase() +
            diffuser.subcategory.slice(1)}
        </div>

        {/* Smart Badge */}
        {diffuser.subcategory === "smart" && (
          <div className="absolute bottom-4 right-4 bg-[#D2A679] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center">
            {/* <Wifi className="w-3 h-3 mr-1" /> */}
            Smart
          </div>
        )}
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center text-yellow-400 text-sm space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(diffuser.rating) ? "fill-current" : ""
              }`}
            />
          ))}
          <span className="text-[#6D5C4D] ml-2">
            {diffuser.rating} ({diffuser.reviews})
          </span>
        </div>

        <h3 className="text-xl font-bold text-[#3B2F2F]">{diffuser.name}</h3>
        <p className="text-sm text-[#6D5C4D] line-clamp-2">
          {diffuser.description}
        </p>

        {/* Diffuser Specific Info */}
        <div className="text-sm text-[#4B3A2F] space-y-1 mt-2">
          <p className="flex items-center">
            {/* <Clock className="w-4 h-4 mr-2 text-[#D2A679]" /> */}
            <span className="font-semibold">Runtime:</span> {diffuser.runtime}
          </p>
          <p>
            <span className="font-semibold">Coverage:</span> {diffuser.coverage}
          </p>
          <p className="flex items-center">
            {/* {diffuser.subcategory === "smart" && (
              <Wifi className="w-4 h-4 mr-2 text-[#D2A679]" />
            )} */}
            <span className="font-semibold">Capacity:</span> {diffuser.capacity}
          </p>
        </div>

        {/* Features */}
        <div className="text-xs text-[#6D5C4D] bg-[#FAF8F4] p-2 rounded-lg">
          <span className="font-semibold">Features:</span> {diffuser.features}
        </div>

        {/* Price + Color */}
        <div className="flex justify-between items-center mt-4">
          <div className="space-x-2">
            <span className="text-2xl font-bold text-[#3B2F2F]">
              ${diffuser.price}
            </span>
            {diffuser.originalPrice > diffuser.price && (
              <span className="line-through text-[#aaa] text-sm">
                ${diffuser.originalPrice}
              </span>
            )}
          </div>
          <span className="text-sm text-[#6D5C4D]">{diffuser.color}</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex space-x-3">
          <button
            onClick={() => navigate(`/diffuser/${diffuser.id}`)}
            className="flex-1 bg-[#D2A679] hover:bg-black text-white py-3 rounded-full font-semibold transition-all duration-300"
          >
            Buy Now
          </button>
          <button
            onClick={() => handleAddToCart(diffuser)}
            className={`p-3 rounded-full border transition-all duration-300
    ${
      isInCart(diffuser.id)
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
          { path: "/diffusers", label: "Diffusers" },
        ]}
      /> */}
      <div className="min-h-screen bg-gradient-to-br from-[#FAF7F2] to-[#F5F1E8]">
        <Toaster position="top-right" />

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#D2A679] to-[#C19A6B] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Premium Diffusers
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Enhance your aromatherapy experience with our collection of
              elegant and innovative diffusers
            </p>
            <div className="mt-8 text-lg">
              <span className="bg-white/20 px-4 py-2 rounded-full">
                {/* {diffusers.length} */}
                Premium Diffusers Available
              </span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#ECD5B2]">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D5C4D] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search diffusers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-4.5 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              {/* Type Filter */}
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
              {filteredDiffusers.length} Diffuser
              {filteredDiffusers.length !== 1 ? "s" : ""} Found
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
          {filteredDiffusers.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredDiffusers.map((diffuser) => (
                <ProductCard key={diffuser.id} diffuser={diffuser} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto border border-[#ECD5B2]">
                <Zap className="w-16 h-16 text-[#D2A679] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#3B2F2F] mb-2">
                  No diffusers found
                </h3>
                <p className="text-[#6D5C4D] mb-6">
                  Try adjusting your filters or search terms to find the perfect
                  diffuser.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSubcategory("all");
                    setPriceRange([0, 400]);
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

export default Diffusers;
