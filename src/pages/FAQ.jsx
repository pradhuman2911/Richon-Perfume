import React, { useState } from "react";
import { Link } from "react-router-dom";

import PageBreadcrumb from '../components/PageBreadcrumb';
import FaqSection from "../sections/FaqSection";
import TestimonialSection from "../sections/TestimonialSection";

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

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* <PageBreadcrumb
        links={[
          { path: "/", label: "Home" },
          { path: "/faq", label: "Faq" },
        ]}
      /> */}

      <FaqSection
        faqs={faqData}
        imageUrl="https://arrax-preview.myshopify.com/cdn/shop/files/1443.jpg?v=1740895487&width=1500"
        ctaLink="/contact"
      />
      <TestimonialSection />
      <FaqSection
        faqs={faqData}
        imageUrl="https://arrax-preview.myshopify.com/cdn/shop/files/259.jpg?v=1740817288&width=1500"
        ctaLink="/contact"
        reverse={true}
      />
    </>
  );
};

export default FAQ;
