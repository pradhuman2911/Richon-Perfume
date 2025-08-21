import React from "react";

const logos = [
  "//arrax-preview.myshopify.com/cdn/shop/files/1_1a75a670-d20b-4c32-9a4a-0b1bb6765be3.png?v=1740911436&width=550",
  "//arrax-preview.myshopify.com/cdn/shop/files/2_81cd4fee-ddb0-41d0-8daf-a6234a2bf0d3.png?v=1740911459&width=550",
  "//arrax-preview.myshopify.com/cdn/shop/files/3_6eafa36f-77f8-4d13-a1fd-bc848acf2935.png?v=1740911460&width=550",
  "//arrax-preview.myshopify.com/cdn/shop/files/4_89e55b27-e895-4dd6-aace-f0a2e7189a46.png?v=1740911460&width=550",
  "//arrax-preview.myshopify.com/cdn/shop/files/1_1a75a670-d20b-4c32-9a4a-0b1bb6765be3.png?v=1740911436&width=550",
  "//arrax-preview.myshopify.com/cdn/shop/files/6.png?v=1740911460&width=550",
];

export default function LogoBar() {
  return (
    <div className="bg-[#ecf5e3] py-[45px] sm:py-[35px] xs:py-[25px] text-[#1c1c1c]/75">
      <div className="max-w-[1480.5px] px-[15.75px] sm:px-[12px] xs:px-[8px] mx-auto w-full">
        {/* Desktop & Tablet View (md and up) */}
        <div className="hidden md:flex flex-wrap justify-center gap-[20px]">
          {logos.map((src, index) => (
            <div
              key={index}
              className="relative w-[calc(16.66%-16.66px)] max-w-[157.5px] flex-grow transition-opacity duration-300 opacity-40 hover:opacity-100"
            >
              <div className="pt-[126px] relative bg-transparent">
                <img
                  src={src}
                  alt={`Logo ${index + 1}`}
                  loading="lazy"
                  className="max-w-[80%] h-auto absolute top-1/2 left-1/2 transition duration-300 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tablet View (sm to md) */}
        <div className="hidden sm:grid md:hidden grid-cols-3 gap-[16px] place-items-center">
          {logos.map((src, index) => (
            <div
              key={index}
              className="relative w-full max-w-[140px] transition-opacity duration-300 opacity-50 hover:opacity-100"
            >
              <div className="aspect-square relative bg-transparent">
                <img
                  src={src}
                  alt={`Logo ${index + 1}`}
                  loading="lazy"
                  className="max-w-[75%] h-auto absolute top-1/2 left-1/2 transition duration-300 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View (xs to sm) - Continuous Horizontal Slider */}
        <div className="sm:hidden overflow-hidden">
          <div className="flex animate-scroll">
            {/* First set of logos */}
            {logos.map((src, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[100px] h-[80px] mx-[8px] relative transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <div className="w-full h-full relative bg-transparent rounded-lg hover:bg-white/20 transition-colors duration-300 flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Logo ${index + 1}`}
                    loading="lazy"
                    className="max-w-[70px] max-h-[50px] w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {logos.map((src, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex-shrink-0 w-[100px] h-[80px] mx-[8px] relative transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <div className="w-full h-full relative bg-transparent rounded-lg hover:bg-white/20 transition-colors duration-300 flex items-center justify-center">
                  <img
                    src={src}
                    alt={`Logo ${index + 1}`}
                    loading="lazy"
                    className="max-w-[70px] max-h-[50px] w-auto h-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style >{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
