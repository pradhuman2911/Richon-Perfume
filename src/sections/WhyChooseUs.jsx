import React from 'react';
import { Link } from 'react-router-dom';

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white text-[#1c1c1c]/75">
      <div className="max-w-[1480px] px-4 mx-auto">
        <div className="flex flex-col lg:flex-row-reverse gap-10 items-center">
          {/* Images */}
          <div className="w-full lg:w-7/12 flex gap-6">
            <div className="w-1/2">
              <img
                src="https://arrax-preview.myshopify.com/cdn/shop/files/1443.jpg?v=1740895487&width=1500"
                alt="Why Choose Us 1"
                className="w-full h-[500px] object-cover rounded-xl"
              />
            </div>
            <div className="w-1/2">
              <img
                src="https://arrax-preview.myshopify.com/cdn/shop/files/259.jpg?v=1740817288&width=1500"
                alt="Why Choose Us 2"
                className="w-full h-[620px] object-cover rounded-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-5/12 flex items-center">
            <div className="lg:pr-20">
              <p className="text-[#5D3754] mb-3 uppercase tracking-wide text-sm font-medium">WHY CHOOSE US</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1c1c1c] leading-tight mb-6">
                Fast, Reliable, and Committed to <br /> Your Satisfaction.
              </h2>
              <p className="text-[16px] text-[#1c1c1c]/80 mb-8 leading-relaxed">
                Our team consists of highly skilled professionals with extensive training and certifications, ensuring
                top-quality service. We've been committed to excellence since the very beginning.
              </p>

              <div className="flex items-center gap-5 flex-wrap mt-6">
                <Link
                  // to="/collections/all"
                  to="/shop"
                  className="inline-block bg-[#5D3754] text-white font-semibold text-sm uppercase px-6 py-3 rounded-lg hover:bg-[#44293e] transition"
                >
                  Shop Now
                </Link>
{/* 
                <button
                  type="button"
                  aria-label="Play Video"
                  className="w-12 h-12 rounded-full flex items-center justify-center text-[#1c1c1c] border border-[#1c1c1c]/30 hover:text-[#5D3754] transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button> */}
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
