import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';




  const ProductPriceSection = ({ product,onSizeChange  }) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Set default selected size when component mounts or product changes
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      // Find default size or use first available size
      const defaultSize = product.sizes.find(size => size.isDefault) || product.sizes[0];
      setSelectedSize(defaultSize);
      if (onSizeChange) {
      onSizeChange(defaultSize); 
    }
    }
  }, [product]);

  const handleSizeChange = (size) => {
  setSelectedSize(size);
  setIsDropdownOpen(false);
  if (onSizeChange) {
    onSizeChange(size); // 👈 this sends the selected size back to ProductDetails
  }
};

  // Get current price and original price based on selected size
  const getCurrentPrice = () => {
    return selectedSize ? selectedSize.price : product.price;
  };

  const getCurrentOriginalPrice = () => {
    return selectedSize ? selectedSize.originalPrice : product.originalPrice;
  };

  if (!selectedSize) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center gap-4 mb-6 text-[#4B3A2F]">
      <span className="text-4xl font-extrabold">${getCurrentPrice()}</span>
      {getCurrentOriginalPrice() > getCurrentPrice() && (
        <span className="text-xl text-gray-400 line-through">
          ${getCurrentOriginalPrice()}
        </span>
      )}
      
      {/* Size Selector Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
        >
          <span className="text-sm uppercase tracking-wide font-semibold">
            {selectedSize.size}
          </span>
          <ChevronDown 
            size={16} 
            className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[120px]">
            {product.sizes.map((size, index) => (
              <button
                key={index}
                onClick={() => handleSizeChange(size)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  selectedSize.size === size.size 
                    ? 'bg-gray-100 font-semibold' 
                    : ''
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm uppercase tracking-wide font-semibold">
                    {size.size}
                  </span>
                  <span className="text-sm font-bold text-[#4B3A2F]">
                    ${size.price}
                  </span>
                </div>
                {size.originalPrice > size.price && (
                  <div className="text-xs text-gray-400 line-through">
                    ${size.originalPrice}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductPriceSection;