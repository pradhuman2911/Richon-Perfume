import { useNavigate } from "react-router-dom";

const FeaturesSection = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/shop");

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* On mobile: flex-col; on desktop: flex-row as before */}
        <div className="flex flex-col sm:flex-row h-auto sm:h-[400px] gap-6">
          {/* LEFT HALF: Women Perfumes */}
          <div
            onClick={handleClick}
            className="w-full sm:w-1/2 bg-[#faeeed] rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
            style={{ minHeight: '250px' }} // optional min height on mobile
          >
            <div className="h-full overflow-hidden">
              <img
                src="/newsletter-Image.webp"
                alt="Women Perfumes"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-120"
              />
            </div>
            <div className="flex justify-between p-4 text-gray-800">
              <h3 className="font-bold text-lg">Women Perfumes</h3>
              <span>(8 Items)</span>
            </div>
          </div>

          {/* RIGHT HALF: Stack of Men + Gift Sets */}
          {/* On mobile, stack vertically */}
          <div className="w-full sm:w-1/2 flex flex-col sm:flex-row gap-6">
            {/* Men Colognes */}
            <div
              onClick={handleClick}
              className="w-full sm:flex-1 bg-[#faeeed] rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              style={{ minHeight: '250px' }}
            >
              <div className="h-full overflow-hidden">
                <img
                  src="/mens.webp"
                  alt="Men Colognes"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-120"
                />
              </div>
              <div className="flex justify-between p-4 text-gray-800">
                <h3 className="font-bold text-lg">Men Colognes</h3>
                <span>(6 Items)</span>
              </div>
            </div>

            {/* Gift Sets */}
            <div
              onClick={handleClick}
              className="w-full sm:flex-1 bg-[#faeeed] rounded-2xl overflow-hidden cursor-pointer group flex flex-col justify-between"
              style={{ minHeight: '250px' }}
            >
              <div className="h-full overflow-hidden">
                <img
                  src="/gifts.jpg"
                  alt="Gift Sets"
                  className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-120"
                />
              </div>
              <div className="flex justify-between p-4 text-gray-800">
                <h3 className="font-bold text-lg">Gift Sets</h3>
                <span>(6 Items)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
