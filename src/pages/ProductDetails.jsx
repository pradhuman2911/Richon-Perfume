// /pages/ProductDetails.jsx

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  getProductById,
  getOilById,
  getDiffuserById,
} from "../context/productsData"; // adjust path if needed

import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import SuggestionsComponent from "../components/SuggestionsComponent";
import ProductPriceSection from "../sections/ProductPriceSection";
import ProductReviewSection from "../sections/ProductReviewSection";
import toast, { Toaster } from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const product = getProductById(id) || getOilById(id) || getDiffuserById(id);

  const { addToCart } = useCart();

  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProductSize, setSelectedProductSize] = useState(null);

  if (!product)
    return (
      <div className="text-center py-20 text-[#3B2F2F] text-xl font-serif">
        Product not found.
      </div>
    );

  return (
    <>
      <Toaster position="top-right" />
      <section className="min-h-screen bg-[#FAF7F2] text-[#3B2F2F] py-16 px-4 md:px-12 lg:px-24 select-none font-serif">
        {/* Background subtle layered gradients removed for simplicity */}

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col"
          >
            <div className="rounded-3xl bg-white shadow-md overflow-hidden border border-[#ECD5B2]">
              {/* Gallery */}
              <div className="relative h-[480px] md:h-[600px] bg-white">
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <img
                    src={product.images[activeGalleryIndex]}
                    alt={`${product.name} gallery ${
                      activeGalleryIndex + 1
                    }`}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-lg"
                  />
                  {/* Left / Right arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        aria-label="Previous image"
                        onClick={() =>
                          setActiveGalleryIndex((i) =>
                            i === 0 ? product.images.length - 1 : i - 1
                          )
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#FDF8EF] hover:bg-[#ECD5B2] rounded-full p-2 shadow transition-colors"
                      >
                        ‹
                      </button>
                      <button
                        aria-label="Next image"
                        onClick={() =>
                          setActiveGalleryIndex((i) =>
                            i === product.images.length - 1 ? 0 : i + 1
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#FDF8EF] hover:bg-[#ECD5B2] rounded-full p-2 shadow transition-colors"
                      >
                        ›
                      </button>
                    </>
                  )}
                  {/* Gallery thumbnails below */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-4">
                    {product.images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveGalleryIndex(i)}
                        className={`w-16 h-16 rounded-lg border-2 shadow overflow-hidden transition-all duration-300
                        ${
                          activeGalleryIndex === i
                            ? "border-[#D2A679] ring-[#D2A679] ring-2 shadow-[#D2A679]/50 scale-110"
                            : "border-[#ECD5B2] hover:border-[#D2A679]"
                        }
                      `}
                        aria-label={`View gallery image ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-tr from-white/30 via-white/10 to-transparent mix-blend-screen"
                        />
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Product Info & Scent Notes (static, no floating) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 max-w-lg"
          >
            <h1 className="text-5xl font-bold tracking-wide leading-tight mb-6 text-[#4B3A2F]">
              {product.name}
            </h1>

            <p className="text-lg text-[#6D5C4D] mb-8 leading-relaxed">
              {product.longDescription}
            </p>

            {product?.sizes?.length > 0 ? (
              <ProductPriceSection
                product={product}
                onSizeChange={(size) => setSelectedProductSize(size)}
              />
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                Size options not applicable for this product.
              </p>
            )}

            {product.topNote && product.heartNote && product.baseNote && (
              <div className="bg-[#FDF8EF] border border-[#ECD5B2] rounded-2xl p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-[#4B3A2F] mb-4 tracking-wide">
                  Fragrance Notes
                </h2>
                <div className="space-y-3 text-[#6D5C4D] text-base font-medium leading-relaxed">
                  <div>
                    <span className="font-semibold">Top Note: </span>
                    {product.topNote}
                  </div>
                  <div>
                    <span className="font-semibold">Heart Note: </span>
                    {product.heartNote}
                  </div>
                  <div>
                    <span className="font-semibold">Base Note: </span>
                    {product.baseNote}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4">
              <label
                htmlFor="quantity"
                className="block mb-2 text-md font-medium text-[#4B3A2F]"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-24 p-2 border border-[#ECD5B2] rounded-lg text-[#4B3A2F] bg-[#FDF8EF] focus:outline-none focus:ring-2 focus:ring-[#D2A679]"
              />
            </div>

            {/* Add to Cart button static below content */}
            <button
              onClick={() => {
                const hasSizes = product?.sizes?.length > 0;

                if (hasSizes && !selectedProductSize) {
                  alert("Please select a size.");
                  return;
                }

                const productWithSize = hasSizes
                  ? {
                      ...product,
                      price: selectedProductSize.price,
                      originalPrice: selectedProductSize.originalPrice,
                      size: selectedProductSize.size,
                      id: `${product.id}_${selectedProductSize.size}`, // Unique per size
                    }
                  : {
                      ...product,
                      id: product.id, // No size, so use plain ID
                    };

                addToCart(productWithSize, quantity);
                toast.success(`${product.name} added to cart!`);
              }}
              className="mt-10 w-full bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#C1A15D] hover:to-[#D8B66B] text-[#3B2F2F] font-semibold text-xl py-4 rounded-3xl shadow-lg transition-colors select-none"
              aria-label={`Add ${product.name} to cart`}
            >
              <div className="flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </div>
            </button>
          </motion.div>
        </div>
        <ProductReviewSection
          onSubmitReview={(review) => console.log("Review submitted:", review)}
        />
      </section>
      <SuggestionsComponent />
    </>
  );
};

export default ProductDetails;