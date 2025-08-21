// /sections/HeroSection

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const heroSlides = [
    {
      title: "Explore Our Signature Scent",
      subtitle: "Discover the Essence of Arabian Luxury",
      description: "Immerse yourself in centuries-old perfumery tradition",
      image: "/sliderImages/s1.webp",
      M_image: "/sliderImages/smx1.webp",
      cta: "Shop Now",
      gradient:
        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,240,200,0.15) 35%, rgba(255,240,200,0.1) 100%)",
    },
    {
      title: "Oud Collection",
      subtitle: "Crafted by Master Perfumers",
      description: "Experience the mystique of authentic Arabian oud",
      image: "/sliderImages/s2.webp",
      M_image: "/sliderImages/smx2.webp",
      cta: "Shop Now",
      gradient:
        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,220,180,0.15) 35%, rgba(255,220,180,0.1) 100%)",
    },
    {
      title: "Exclusive Attar Range",
      subtitle: "Traditional Oil-Based Perfumes",
      description: "Pure essence captured in precious bottles",
      image: "/sliderImages/s3.webp",
      M_image: "/sliderImages/smx3.webp",
      cta: "Shop Now",
      gradient:
        "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,200,230,0.15) 35%, rgba(255,200,230,0.1) 100%)",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2, // 0.2s delay between children
      },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.5 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Hero Section with Slider */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Desktop Image */}
              <div
                className="hidden md:block h-full w-full bg-cover bg-no-repeat bg-center"
                style={{
                  backgroundImage: `${slide.gradient}, url(${slide.image})`,
                }}
              />
              
              {/* Mobile Image with Enhanced Styling */}
              <div
                className="block md:hidden h-full w-full relative"
                style={{
                  background: `${slide.gradient}`,
                }}
              >
                <img
                  src={slide.M_image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                />
                {/* Enhanced mobile overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
              </div>
              
            </div>
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="max-w-4xl text-center md:text-left lg:ml-8 xl:ml-12"
              >
                <motion.h1
                  variants={childVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 leading-tight"
                  style={{
                    textShadow: isMobile 
                      ? '2px 2px 4px rgba(0,0,0,0.8), 0 0 8px rgba(0,0,0,0.5)' 
                      : '0 1px 2px rgba(0,0,0,0.4)'
                  }}
                >
                  <span className={`bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text ${
                    isMobile ? 'text-white' : 'text-black'
                  }`}>
                    {heroSlides[currentSlide].title}
                  </span>
                </motion.h1>

                <motion.p
                  variants={childVariants}
                  className={`text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4 font-light ${
                    isMobile ? 'text-white' : 'text-black'
                  }`}
                  style={{
                    textShadow: isMobile 
                      ? '1px 1px 3px rgba(0,0,0,0.8)' 
                      : '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>

                <motion.p
                  variants={childVariants}
                  className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 px-2 sm:px-0 ${
                    isMobile ? 'text-white/90' : 'text-black'
                  }`}
                  style={{
                    textShadow: isMobile 
                      ? '1px 1px 2px rgba(0,0,0,0.7)' 
                      : '0 1px 2px rgba(0,0,0,0.2)'
                  }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                <motion.button
                  variants={childVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/shop")}
                  className={`inline-block font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 shadow-2xl ${
                    isMobile 
                      ? 'bg-white text-black hover:bg-gray-100 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]'
                      : 'bg-black hover:brightness-110 hover:shadow-[0_0_20px_rgba(255,200,100,0.6)] text-white'
                  }`}
                >
                  {heroSlides[currentSlide].cta}
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className={`absolute left-3 sm:left-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full transition-colors ${
            isMobile 
              ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm' 
              : 'bg-black/30 hover:bg-black/50'
          }`}
        >
          <ChevronLeft className={`w-6 h-6 sm:w-8 sm:h-8 ${
            isMobile ? 'text-white' : 'text-white'
          }`} />
        </button>
        <button
          onClick={nextSlide}
          className={`absolute right-3 sm:right-6 top-1/2 transform -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full transition-colors ${
            isMobile 
              ? 'bg-white/20 hover:bg-white/30 backdrop-blur-sm' 
              : 'bg-black/30 hover:bg-black/50'
          }`}
        >
          <ChevronRight className={`w-6 h-6 sm:w-8 sm:h-8 ${
            isMobile ? 'text-white' : 'text-white'
          }`} />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 sm:space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                index === currentSlide 
                  ? (isMobile ? "bg-white" : "bg-yellow-400")
                  : (isMobile ? "bg-white/50" : "bg-white/50")
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HeroSection;