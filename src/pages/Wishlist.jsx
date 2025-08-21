// /pages/Wishlist.jsx
import React from "react";
import { useWishlist } from "../context/WishlistContext";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { FaHeart } from "react-icons/fa6";
import PageBreadcrumb from "../components/PageBreadcrumb";
import SuggestionsComponent from "../components/SuggestionsComponent";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = (id, name) => {
    removeFromWishlist(id);
    toast.success(`${name} removed from wishlist.`);
  };

  return (
    <>
      {/* <PageBreadcrumb
        links={[
          { path: "/", label: "Home" },
          { path: "/wishlist", label: "Wishlist" },
        ]}
      /> */}

      <section className="min-h-screen bg-[#FAF7F2] py-20 px-4 text-[#3B2F2F]">
        <Toaster position="top-right" />
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-serif font-bold text-center mb-10">
            My Wishlist
          </h1>

          {wishlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-[#5D3754] mb-6"
                viewBox="0 0 511.997 511.997"
                fill="currentColor"
              >
                <path d="M482.04 271.796c-.49-5.754-4.193-10.479-9.664-12.332l-44.39-15.032 43.215-49.58c2.869-3.291 4.069-7.643 3.294-11.939-.776-4.296-3.423-7.953-7.262-10.033l-55.753-30.207c-3.643-1.973-8.193-.621-10.168 3.021-1.973 3.642-.62 8.194 3.021 10.167l54.987 29.792-46.053 52.835-145.461-78.813 26.991-30.965c3.106 1.14 6.46 1.762 9.956 1.762 10.855 0 20.33-6.003 25.293-14.86l41.679 22.582c1.136.615 2.359.907 3.566.907 2.664 0 5.243-1.422 6.602-3.929 1.973-3.642.62-8.194-3.022-10.167l-45.164-24.469c-.509-15.535-13.296-28.018-28.953-28.018-15.978 0-28.977 12.999-28.977 28.977 0 7.035 2.522 13.49 6.706 18.515l-26.484 30.384-46.921-53.829c-4.43-5.083-11.663-6.39-17.594-3.178l-18.341 9.937c-2.149-16.995-16.686-30.185-34.255-30.185-19.044 0-34.538 15.494-34.538 34.539 0 10.53 4.743 19.969 12.198 26.309l-71.784 38.893c-3.838 2.08-6.484 5.736-7.261 10.033-.775 4.296.425 8.648 3.294 11.938l43.214 49.58-44.389 15.031c-5.471 1.853-9.174 6.578-9.664 12.332s2.36 11.038 7.438 13.789l52.127 28.242v28.309c0 4.142 3.357 7.5 7.5 7.5s7.5-3.358 7.5-7.5v-20.182l72.928 39.512c3.111 1.686 6.582 2.543 10.066 2.543 2.278 0 4.563-.367 6.755-1.109l54.228-18.361v149.222l-140.781-76.278c-1.971-1.068-3.195-3.124-3.195-5.366v-32.956c0-4.142-3.357-7.5-7.5-7.5s-7.5 3.358-7.5 7.5v32.956c0 7.752 4.233 14.861 11.049 18.554l145.374 78.767c3.148 1.706 6.601 2.558 10.054 2.558s6.906-.853 10.054-2.558l145.374-78.767c6.815-3.693 11.049-10.802 11.049-18.554v-98.291l52.126-28.242c5.075-2.748 7.926-8.031 7.436-13.786z" />
              </svg>

              <h1 className="text-3xl font-bold font-serif text-[#3B2F2F] mb-4">
                Your wishlist is empty
              </h1>

              <p className="text-[#6D5C4D] mb-8">
                No products were added to the wishlist page.
              </p>

              <Link
                to="/shop"
                className="px-6 py-3 bg-[#5D3754] text-white rounded-lg text-sm font-semibold uppercase tracking-wide hover:bg-[#44293e] transition"
              >
                Back to Shopping
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -8, scale: 1.03 }}
                    className="bg-white rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.05)] border border-[#ECD5B2] overflow-hidden transition-all"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover"
                      />
                      <button
                        onClick={() =>
                          handleRemoveFromWishlist(product.id, product.name)
                        }
                        className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <FaHeart className="w-5 h-5 text-[#D2A679]" />
                      </button>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-serif font-semibold text-[#3B2F2F] mb-2">
                        {product.name}
                      </h2>
                      <p className="text-sm text-[#6D5C4D] mb-2 line-clamp-1">
                        {product.description}
                      </p>

                      {product.topNote &&
                      product.heartNote &&
                      product.baseNote ? (
                        <div className="text-sm text-[#6D5C4D] space-y-1 mb-4">
                          <div>
                            <strong>Top:</strong> {product.topNote}
                          </div>
                          <div>
                            <strong>Heart:</strong> {product.heartNote}
                          </div>
                          <div>
                            <strong>Base:</strong> {product.baseNote}
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-[#6D5C4D] space-y-1 mb-23">

                        </div>
                      )}

                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <span className="text-lg font-bold text-[#3B2F2F]">
                            ${product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-sm text-gray-400 line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-[#6D5C4D]">
                          {product.size}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/product/${product.id}`)}
                          className="flex-1 bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#c59c68] hover:to-[#e1c8a2] text-white font-bold py-2 px-4 rounded-lg transition-all text-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-[#f1e6d9] hover:bg-[#ecd5b2] text-[#3B2F2F] p-2 rounded-lg"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {wishlist.length > 0 && <SuggestionsComponent />}
      </section>
    </>
  );
};

export default Wishlist;
