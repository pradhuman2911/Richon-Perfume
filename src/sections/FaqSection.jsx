import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FaqSection = ({ faqs = [], imageUrl, ctaLink = '/', reverse = false }) => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-24 bg-white text-[#1c1c1c]/75">
      <div className="max-w-[1480px] px-4 mx-auto">
        <div
          className={`flex flex-col-reverse lg:flex-row gap-12 items-center ${
            reverse ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image Section */}
          <div className="w-full lg:w-1/2 relative">
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[630px] rounded-2xl bg-[#1c1c1c]/10 overflow-hidden relative">
              <img
                src={imageUrl}
                alt="FAQ"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity"
              />
            </div>

            {/* CTA Card */}
            <div className="mt-6 lg:mt-0 absolute lg:bottom-10 left-1/2 -translate-x-1/2 w-[90%] bg-white p-6 rounded-xl shadow-md z-10 flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center max-w-md mx-auto lg:static lg:translate-x-0 lg:-translate-y-1/2">
              <div className="w-full sm:w-[60%] text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#1c1c1c] mb-1">
                  Still Have Questions?
                </h3>
                <p className="text-sm text-[#1c1c1c]/80">Feel free to ask any questions you have!</p>
              </div>
              <Link
                to={ctaLink}
                className="text-sm font-semibold uppercase bg-[#5D3754] text-white px-5 py-2.5 rounded-lg hover:bg-[#44293e] transition"
              >
                Here to Help
              </Link>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="w-full lg:w-1/2">
            <div className="lg:pr-24">
              <p className="text-[#5D3754] uppercase mb-2 text-sm">Frequently Asked Questions</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1c1c1c] mb-10 leading-snug">
                You've Got Any Questions?
              </h2>

              {faqs.map((faq, index) => (
                <div key={index} className="mb-6 border-b border-[#1c1c1c]/30 pb-6">
                  <button
                    className="w-full text-left font-serif text-lg sm:text-xl font-bold text-[#1c1c1c] relative pr-10"
                    onClick={() => toggleFAQ(index)}
                  >
                    {faq.question}
                    <span className="absolute top-1/2 -translate-y-1/2 right-0">
                      {openIndex === index ? (
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[#1c1c1c]"
                          viewBox="0 0 10 2"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 1a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[#1c1c1c]"
                          viewBox="0 0 10 10"
                          fill="currentColor"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5 0a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2H6v3a1 1 0 1 1-2 0V6H1a1 1 0 1 1 0-2h3V1a1 1 0 0 1 1-1z" />
                        </svg>
                      )}
                    </span>
                  </button>
                  {openIndex === index && (
                    <div className="pt-4 text-sm text-[#1c1c1c]/80">
                      <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
