import React from "react";
import { useCart } from "../context/CartContext";
import { XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SuggestionsComponent from "../components/SuggestionsComponent";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleRemoveFromCart = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart.`);
  };
  return (
    <>
      <section className="min-h-screen bg-[#FAF7F2] py-16 px-4 text-[#3B2F2F]">
        <Toaster position="top-right" />
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-serif font-bold mb-12 text-center">
            Your Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-lg text-[#6D5C4D]">
                Your cart is currently empty.
              </p>
              <button
                onClick={() => navigate("/shop")}
                className="mt-6 bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#c59c68] hover:to-[#e1c8a2] text-white font-bold py-3 px-8 rounded-full transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-8">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row gap-6 bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)]"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-32 h-32 rounded-xl object-cover border border-[#ECD5B2]"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-semibold">{item.name}</h2>
                          <button
                            onClick={() =>
                              handleRemoveFromCart(item.id, item.name)
                            }
                          >
                            <XCircle className="w-6 h-6 text-red-500 hover:text-red-700" />
                          </button>
                        </div>

                        {item?.sizes?.length > 0 ? (
                          <p className="text-sm text-[#6D5C4D]">
                            Size: {item.size}
                          </p>
                        ) : (
                          <p className="text-sm text-[#6D5C4D]">
                            Size options not applicable for this product.
                          </p>
                        )}

                        <div className="flex gap-3 items-center">
                          <label htmlFor={`qty-${item.id}`} className="text-sm">
                            Quantity:
                          </label>
                          <input
                            id={`qty-${item.id}`}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value))
                            }
                            className="w-16 border border-[#ECD5B2] px-2 py-1 rounded-md"
                          />
                        </div>
                        <div className="text-lg font-bold mt-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Summary Section */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(0,0,0,0.05)] h-fit">
                <h3 className="text-2xl font-bold mb-4">Order Summary</h3>
                <div className="space-y-3 text-sm text-[#6D5C4D] border-b pb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span>$4.99</span>
                  </div>
                </div>
                <div className="flex justify-between text-lg font-semibold py-4">
                  <span>Total</span>
                  <span>${(getCartTotal() + 4.99).toFixed(2)}</span>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#c59c68] hover:to-[#e1c8a2] text-white font-bold py-3 rounded-full transition-all"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={() => navigate("/shop")}
                    className="w-full border border-[#ECD5B2] text-[#3B2F2F] hover:bg-[#fdf4e7] font-medium py-3 rounded-full transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {cartItems.length > 0 && <SuggestionsComponent />}
      </section>
    </>
  );
};

export default Cart;
