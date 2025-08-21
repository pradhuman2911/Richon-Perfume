// /sections/Newsletter.jsx

import React from "react";
import { Mail } from "lucide-react";

const Newsletter = () => {
  return (
    <section className="py-32 bg-[#FDF8EF] text-[#3B2F2F]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Image or Icon */}
          <div className="hidden md:block">
            <img
              src="/newsletter-Image.webp"
              alt="Newsletter Visual"
              className="w-full h-auto rounded-3xl shadow-lg"
            />
          </div>

          {/* Right Content */}
          <div className="bg-white rounded-3xl border border-[#ECD5B2] shadow-[0_6px_20px_rgba(210,166,121,0.1)] p-10">
            <div className="flex items-center mb-6">
              <div className="p-3 bg-[#D2A679]/20 rounded-full mr-4">
                <Mail className="w-6 h-6 text-[#D2A679]" />
              </div>
              <h2 className="text-3xl font-bold text-[#3B2F2F] tracking-tight">
                Join Our Scent Society
              </h2>
            </div>

            <p className="text-[#6D5C4D] mb-8 leading-relaxed">
              Be the first to discover our latest collections, exclusive offers,
              and artisanal releases crafted for fragrance connoisseurs.
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-6 py-4 rounded-full border border-[#ECD5B2] bg-[#FAF8F4] placeholder:text-[#a08c75] text-[#3B2F2F] focus:outline-none focus:ring-2 focus:ring-[#D2A679] transition-all duration-300 shadow-inner"
              />
              <button
                type="submit"
                className="bg-[#D2A679] hover:bg-[#c59a5f] text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-md"
              >
                Subscribe
              </button>
            </form>

            <p className="text-sm text-[#9E8B73] mt-4">
              We respect your inbox. No spam ever. Only the scent of elegance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
