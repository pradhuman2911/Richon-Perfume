import React from "react";
import PageBreadcrumb from "../components/PageBreadcrumb";
import AboutSection from "../sections/AboutSection";
import WhyChooseUs from "../sections/WhyChooseUs";
import TestimonialSection from "../sections/TestimonialSection";
import FaqSection from "../sections/FaqSection";

const faqData = [
  {
    question: "How do I choose the right perfume for me?",
    answer:
      "We recommend consulting a fragrance expert or testing a variety of notes to determine what suits your personal scent preferences best.",
  },
  {
    question: "Are your perfumes certified and safe to use?",
    answer:
      "Yes, all our perfumes are lab-tested, IFRA-compliant, and sourced from trusted manufacturers to ensure safety and quality.",
  },
  {
    question: "How long does it take to see results from perfume?",
    answer:
      "Fragrance effect varies by individual. Most users experience a long-lasting scent that evolves beautifully over the course of the day.",
  },
  {
    question: "Do you offer subscription plans for perfume?",
    answer:
      "Yes! We offer flexible subscription plans so you never run out of your signature scent. Subscribe and save 10% on every order!",
  },
];

const About = () => {
  return (
    <>
      {/* <PageBreadcrumb
        links={[
          { path: "/", label: "Home" },
          { path: "/about", label: "About us" },
        ]}
      /> */}
      <AboutSection />
      <TestimonialSection />
      <WhyChooseUs />
      <FaqSection
        faqs={faqData}
        imageUrl="https://arrax-preview.myshopify.com/cdn/shop/files/21615.jpg?v=1740927030&width=1500"
        ctaLink="/contact"
      />
    </>
  );
};

export default About;
