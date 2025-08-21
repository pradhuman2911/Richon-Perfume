import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import { products } from '../context/productsData';
import { motion } from 'framer-motion';

// Util: Shuffle once
const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const SuggestionsComponent = () => {
  const location = useLocation();
  const productIdMatch = location.pathname.match(/product\/(\d+)/);
  const currentProductId = productIdMatch ? parseInt(productIdMatch[1]) : null;

  // ✅ Memoized stable suggestions on initial render
  const suggested = useMemo(() => {
    const filtered = products.filter(
      (p) => p.id !== currentProductId && p.inStock
    );
    return shuffleArray(filtered).slice(0, 6);
  }, [currentProductId]);

  return (
    <section className="bg-[#FAF7F2] text-[#3B2F2F] py-12 px-4 md:px-8 lg:px-16 font-serif">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold mb-8 text-[#4B3A2F]"
        >
          You May Also Like
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {suggested.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-[#ECD5B2] rounded-xl shadow-sm overflow-hidden flex flex-col text-sm"
            >
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-44 object-cover transition-transform duration-300 hover:scale-105"
                />
              </Link>

              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-base font-semibold mb-1 text-[#4B3A2F] line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#6D5C4D] text-sm mb-3">
                    <span>${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="line-through text-gray-400">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  className="mt-auto inline-flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#C1A15D] hover:to-[#D8B66B] text-[#3B2F2F] font-medium rounded-xl text-xs shadow-sm transition-all"
                >
                  <Eye className="w-4 h-4" />
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuggestionsComponent;
