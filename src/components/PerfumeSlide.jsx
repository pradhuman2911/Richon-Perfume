import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Sparkles, Star } from "lucide-react";

const PerfumeSlide = ({ items = [] }) => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(1);

  // Enhanced sample data if items is empty
  const defaultItems = [
    {
      id: 1,
      title: "Elegance Éternelle",
      subtitle: "Signature Collection",
      description: "A timeless fragrance that captures the essence of sophistication with notes of bergamot, white jasmine, and sandalwood. Perfect for the modern connoisseur.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop",
      price: "$129",
      originalPrice: "$159",
      topNote: "Bergamot, Pink Pepper",
      heartNote: "White Jasmine, Rose",
      baseNote: "Sandalwood, Vanilla",
      intensity: "Moderate",
      longevity: "8-10 hours",
      category: "Floral Oriental"
    },
    {
      id: 2,
      title: "Mystique Noir",
      subtitle: "Limited Edition",
      description: "An enigmatic blend of dark chocolate, amber, and exotic spices that creates an aura of mystery and allure for the sophisticated individual.",
      image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=500&h=600&fit=crop",
      price: "$179",
      originalPrice: "$220",
      topNote: "Black Pepper, Cardamom",
      heartNote: "Dark Chocolate, Amber",
      baseNote: "Oud, Musk",
      intensity: "Intense",
      longevity: "12+ hours",
      category: "Oriental Woody"
    },
    {
      id: 3,
      title: "Aurora Dreams",
      subtitle: "Spring Collection",
      description: "Fresh and luminous, this fragrance embodies the first light of dawn with citrus bursts, peony petals, and a whisper of white tea.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500&h=600&fit=crop",
      price: "$95",
      originalPrice: "$115",
      topNote: "Lemon, Grapefruit",
      heartNote: "Peony, White Tea",
      baseNote: "Cedar, Light Musk",
      intensity: "Light",
      longevity: "6-8 hours",
      category: "Fresh Floral"
    }
  ];

  const slideItems = items.length > 0 ? items : defaultItems;

  useEffect(() => {
    if (!isAutoPlay || slideItems.length <= 1) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slideItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slideItems.length]);

  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slideItems.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slideItems.length) % slideItems.length);
  };

  const goToSlide = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const currentItem = slideItems[current];

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[#FAF7F2] via-[#F5F0E8] to-[#ECD5B2] overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#D2A679]/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-8">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Left Content */}
              <div className="space-y-8 text-center lg:text-left">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-[#ECD5B2]/50 shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#D2A679]" />
                  <span className="text-sm font-medium text-[#4B3A2F]">
                    {currentItem.subtitle}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#3B2F2F] leading-tight"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {currentItem.title}
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl text-[#6D5C4D] leading-relaxed max-w-2xl"
                >
                  {currentItem.description}
                </motion.p>

                {/* Fragrance Details */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm"
                >
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-[#ECD5B2]/30">
                    <h4 className="font-semibold text-[#4B3A2F] mb-1">Top Notes</h4>
                    <p className="text-[#6D5C4D]">{currentItem.topNote}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-[#ECD5B2]/30">
                    <h4 className="font-semibold text-[#4B3A2F] mb-1">Heart Notes</h4>
                    <p className="text-[#6D5C4D]">{currentItem.heartNote}</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-[#ECD5B2]/30">
                    <h4 className="font-semibold text-[#4B3A2F] mb-1">Base Notes</h4>
                    <p className="text-[#6D5C4D]">{currentItem.baseNote}</p>
                  </div>
                </motion.div>

                {/* Price and CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl font-bold text-[#3B2F2F]">
                      {currentItem.price}
                    </span>
                    {currentItem.originalPrice && (
                      <span className="text-lg text-[#6D5C4D] line-through">
                        {currentItem.originalPrice}
                      </span>
                    )}
                  </div>
                  <button className="bg-[#D2A679] hover:bg-[#3B2F2F] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Discover Fragrance
                  </button>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-[#6D5C4D]"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-[#D2A679]" />
                    <span>{currentItem.intensity} Intensity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#D2A679]/20 rounded-full"></div>
                    <span>{currentItem.longevity}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-[#D2A679]/30 rounded-full"></div>
                    <span>{currentItem.category}</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Content - Product Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -20, 0] 
                }}
                transition={{ 
                  y: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="relative flex justify-center lg:justify-end"
              >
                {/* Product Image with Enhanced Effects */}
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D2A679]/30 via-transparent to-[#D2A679]/20 rounded-3xl blur-3xl scale-110"></div>
                  
                  {/* Main Image Container */}
                  <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-[#ECD5B2]/50 shadow-2xl">
                    <img
                      src={currentItem.image}
                      alt={currentItem.title}
                      className="w-full max-w-sm h-[500px] object-cover rounded-2xl shadow-lg"
                    />
                    
                    {/* Floating Elements */}
                    <div className="absolute -top-4 -right-4 bg-[#D2A679] text-white p-3 rounded-full shadow-lg">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    
                    {currentItem.originalPrice && (
                      <div className="absolute -top-4 -left-4 bg-[#3B2F2F] text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
                        Save {Math.round(((parseInt(currentItem.originalPrice.slice(1)) - parseInt(currentItem.price.slice(1))) / parseInt(currentItem.originalPrice.slice(1))) * 100)}%
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-[#3B2F2F] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#ECD5B2]/50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-3">
            {slideItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === current
                    ? 'bg-[#D2A679] scale-125'
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-[#3B2F2F] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#ECD5B2]/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Auto-play Control */}
      <button
        onClick={() => setIsAutoPlay(!isAutoPlay)}
        className="absolute top-8 right-8 z-20 p-3 bg-white/80 backdrop-blur-sm hover:bg-white text-[#3B2F2F] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-[#ECD5B2]/50"
      >
        <Play className={`w-5 h-5 ${isAutoPlay ? 'opacity-100' : 'opacity-50'}`} />
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ECD5B2]/30">
        <motion.div
          className="h-full bg-[#D2A679]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={current}
        />
      </div>
    </section>
  );
};

export default PerfumeSlide;