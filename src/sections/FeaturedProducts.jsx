// /sections/FeaturedProducts.jsx

import { Star, ShoppingCart, Heart } from "lucide-react";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { featuredProducts } from "../context/productsData";

import toast, { Toaster } from "react-hot-toast";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

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

  return (
    <section className="py-24 bg-[#FAF7F2] text-[#3B2F2F]">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#4B3A2F] mb-3">
            Popular Perfumes
          </h2>
          <p className="text-lg text-[#6D5C4D] max-w-xl mx-auto">
            Each fragrance crafted to complement unique essence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-3xl border border-[#ECD5B2] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-105"
                />

                {/* Wishlist Button */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() =>
                      isInWishlist(product.id)
                        ? handleRemoveFromWishlist(product.id, product.name)
                        : handleAddToWishlist(product)
                    }
                    className="p-2 bg-white/90 rounded-full hover:bg-[#f5e4cc] transition-colors shadow-md"
                  >
                    {isInWishlist(product.id) ? (
                      <FaHeart className="w-5 h-5 text-[#D2A679] " />
                    ) : (
                      <Heart className="w-5 h-5 text-[#D2A679]" />
                    )}
                  </button>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-[#D2A679] text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    Save ${product.originalPrice - product.price}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center text-yellow-400 text-sm space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                  <span className="text-[#6D5C4D] ml-2">
                    {product.rating} ({product.reviews})
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#3B2F2F]">
                  {product.name}
                </h3>
                <p className="text-sm text-[#6D5C4D] line-clamp-1">
                  {product.description}
                </p>

                {/* Fragrance Notes */}
                <div className="text-sm text-[#4B3A2F] space-y-1 mt-2">
                  <p>
                    <span className="font-semibold">Top:</span>{" "}
                    <span className="font-light">{product.topNote}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Heart:</span>{" "}
                    <span className="font-light">{product.heartNote}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Base:</span>{" "}
                    <span className="font-light">{product.baseNote}</span>
                  </p>
                </div>

                {/* Price + Size */}
                <div className="flex justify-between items-center mt-4">
                  <div className="space-x-2">
                    <span className="text-2xl font-bold text-[#3B2F2F]">
                      ${product.price}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="line-through text-[#aaa] text-sm">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-[#6D5C4D]">{product.size}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-5 flex space-x-3">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex-1 bg-[#D2A679] hover:bg-black text-white py-3 rounded-full font-semibold transition-all duration-300"
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
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate("/shop")}
            className="inline-block bg-[#D2A679] hover:bg-black text-white font-semibold py-4 px-10 rounded-full text-lg transition-all duration-300 shadow-lg hover:scale-105"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
