import React, { useState } from "react";
import { products, categories } from "../context/productsData";
import { ShoppingCart, Heart, Star, Search } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useWishlist } from "../context/WishlistContext";
import PageBreadcrumb from "../components/PageBreadcrumb";
import toast, { Toaster } from "react-hot-toast";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const withinPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesCategory && matchesSearch && withinPriceRange;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "low-to-high":
        return a.price - b.price;
      case "high-to-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <>
      <Toaster position="top-right" />
      {/* <PageBreadcrumb
        links={[
          { path: "/", label: "Home" },
          { path: "/shop", label: "Shop" },
        ]}
      /> */}
      <section className="min-h-screen bg-[#FAF7F2] text-[#3B2F2F] py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center mb-12 font-serif"
          >
            Explore Our Fragrance Collection
          </motion.h1>

          {/* Category Filters + Sort */}
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-[#ECD5B2]">
            <div className="grid md:grid-cols-4 gap-6">
              {/* 🔍 Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6D5C4D] w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-4.5 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors"
                />
              </div>

              {/* 🗂️ Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors bg-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              {/* 🔃 Sort By */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-3 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679] transition-colors bg-white"
              >
                <option value="default">Default</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>

              {/* 💸 Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#4B3A2F]">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex items-center space-x-2">
                  <label>From</label>
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      const safeMin = Math.min(value, priceRange[1]);
                      setPriceRange([safeMin, priceRange[1]]);
                    }}
                    placeholder="From"
                    className="w-1/2 px-3 py-2 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679]"
                  />
                  <label>To</label>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max="300"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 300;
                      const safeMax = Math.max(value, priceRange[0]);
                      setPriceRange([priceRange[0], safeMax]);
                    }}
                    placeholder="To"
                    className="w-1/2 px-3 py-2 border border-[#ECD5B2] rounded-full focus:outline-none focus:border-[#D2A679]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[#ECD5B2]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() =>
                        isInWishlist(product.id)
                          ? handleRemoveFromWishlist(product.id, product.name)
                          : handleAddToWishlist(product)
                      }
                      className="p-2 bg-white rounded-full shadow-md hover:bg-[#f5e4cc] transition-all"
                    >
                      {isInWishlist(product.id) ? (
                        <FaHeart className="w-5 h-5 text-[#D2A679]" />
                      ) : (
                        <Heart className="w-5 h-5 text-[#D2A679]" />
                      )}
                    </button>
                  </div>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow">
                      Save ${product.originalPrice - product.price}
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating) ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-[#7F6B5B] ml-2">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-[#6D5C4D] mb-3 line-clamp-1">
                    {product.description}
                  </p>

                  <div className="text-sm mb-4 space-y-1">
                    <p>
                      <strong>Top:</strong> {product.topNote}
                    </p>
                    <p>
                      <strong>Heart:</strong> {product.heartNote}
                    </p>
                    <p>
                      <strong>Base:</strong> {product.baseNote}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="space-x-2">
                      <span className="text-xl font-bold text-[#3B2F2F]">
                        ${product.price}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="line-through text-[#aaa]">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <span className="text-sm text-[#6D5C4D]">
                      {product.size}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="flex-1 bg-[#D2A679] hover:bg-[#c59a5f] text-white py-3 rounded-full font-semibold transition-all duration-300"
                    >
                      Buy Now
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`p-3 rounded-full border transition-all duration-300
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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Shop;
