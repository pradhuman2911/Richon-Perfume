// /pages/Home.jsx

import HeroSection from "../sections/HeroSection";
import FeaturesSection from "../sections/FeaturesSection";
import FeaturedProducts from "../sections/FeaturedProducts";
import BestSellerSection from "../sections/BestSellerSection";
import VideoSection from "../sections/VideoSection";
import LogoBar from "../sections/LogoBar";
import TestimonialSection from "../sections/TestimonialSection";
import OilsDiffusersSection from "../sections/OilsDiffusersSection";
// import BlogSection from "../sections/BlogSection";

import PerfumeSlide from "../components/PerfumeSlide";
import Newsletter from "../sections/Newsletter";

// const items = [
//   {
//     id: 1,
//     image: "/product-images/1.webp",
//     title: "Luxury Oud",
//     description: "Experience the essence of rich, woody perfection.",
//   },
//   {
//     id: 2,
//     image: "/product-images/2.webp",
//     title: "Floral Bloom",
//     description: "A light-hearted scent with floral top notes.",
//   },
//   {
//     id: 3,
//     image: "/product-images/3.webp",
//     title: "Amber Elegance",
//     description: "Sweet amber wrapped in warm oriental tones.",
//   },
// ];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3B2F2F]">
      {/* <PerfumeSlide  /> */}
      <HeroSection />
      <FeaturesSection />
      <BestSellerSection/>
      <OilsDiffusersSection/>
      <VideoSection/>
      <FeaturedProducts />
      <LogoBar/>
      <TestimonialSection/>
      {/* <BlogSection/> */}
      <Newsletter />
    </div>
  );
};

export default Home;
