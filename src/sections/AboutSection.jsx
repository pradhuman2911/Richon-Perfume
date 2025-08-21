import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <>
      {/* About Content */}
      <section className="py-24 bg-white text-[#1c1c1c]/75">
        <div className="max-w-6xl px-4 mx-auto flex flex-col lg:flex-row gap-12 items-center">
          {/* Image & Metrics */}
          <div className="relative w-full lg:w-1/2">
            <div className="aspect-[3/2] rounded-xl overflow-hidden">
              <img
                src="https://arrax-preview.myshopify.com/cdn/shop/files/2151623430_copy.jpg?v=1741022028&width=1500"
                alt="About Richony"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute right-0 bottom-[-78px] w-[90%] max-w-sm bg-white p-5 rounded-lg shadow-md z-10 hidden sm:block">
              {/* Happy Customers */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-[#5D3754] text-white px-3 py-1 rounded-full text-sm font-bold">98%</span>
                  <span className="text-base font-semibold">HAPPY CUSTOMERS</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white shadow-inner">
                  <div className="h-full w-[98%] bg-[#5D3754] rounded-full transition-all duration-1000"></div>
                </div>
              </div>
              {/* Experience */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="bg-[#5D3754] text-white px-3 py-1 rounded-full text-sm font-bold">85%</span>
                  <span className="text-base font-semibold">12 YEARS OF EXPERIENCE</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white shadow-inner">
                  <div className="h-full w-[85%] bg-[#5D3754] rounded-full transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 w-full flex flex-col justify-center items-start text-left">
            <p className="text-[#5D3754] mb-2 text-sm sm:text-base">WHO WE ARE</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1c1c1c] leading-snug mb-6">
              Richony® was founded on the belief that Perfect Perfume is more than just a necessity.
            </h2>
            <p className="text-[15px] sm:text-[15.75px] text-[#1c1c1c]/80 mb-6 leading-relaxed">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book.
            </p>
            <Link
              to="/shop"
              className="mt-2 inline-block bg-[#5D3754] text-white font-semibold text-sm uppercase px-6 py-3 rounded-lg hover:bg-[#44293e] transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-[1480px] px-4 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8">
          {[
            { label: 'RETAIL OUTLETS', value: '1.5K' },
            { label: 'PRODUCTS', value: '5.0K' },
            { label: 'CUSTOMERS', value: '1.3 MILLION' },
            { label: 'PHARMACISTS', value: '2.5K' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#1c1c1c]">{stat.value}</div>
              <div className="uppercase tracking-wide text-[#1c1c1c] mt-1 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutSection;
