import React from "react";
import Slider from "react-slick";
import { CheckCircle } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Emma Richardson",
    rating: 5,
    text: "Richony supplements have been a game-changer for me! I feel more energized and healthier than ever. Highly recommend!",
  },
  {
    name: "Oliver Brown",
    rating: 4,
    text: "Richony supplements have been a game-changer for me! I feel more energized and healthier than ever. Highly recommend!",
  },
  {
    name: "Sophia Martinez",
    rating: 5,
    text: "Excellent service and top-notch supplements. The loyalty rewards is a great bonus. Will definitely keep ordering!",
  },
  {
    name: "Lucas Johnson",
    rating: 5,
    text: "Great quality and fast delivery. I’ve noticed a real improvement in my wellness!",
  },
  {
    name: "Amelia Clarke",
    rating: 4,
    text: "I love how natural and effective these supplements are. Just what I needed!",
  },
];

const StarRating = ({ count }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className={`${i < count ? "text-purple-900" : "text-gray-300"} text-xl`}>
        ★
      </span>
    );
  }
  return <div className="mb-3">{stars}</div>;
};

const TestimonialSection = () => {
const settings = {
  centerMode: true,
  centerPadding: "10px",
  slidesToShow: 3,
  infinite: true,
  speed: 500,
  arrows: false,
  dots: false,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        centerMode: true,
        centerPadding: "20px",
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        centerPadding: "0px",
      },
    },
  ],
};


  return (
    <section className="bg-[#f8f7f5] py-32 text-center">
      <h2 className="text-2xl md:text-4xl font-bold mb-12 text-zinc-900">
        Trusted by Thousands of <br /> Satisfied Customers.
      </h2>
        <div className="max-w-fit mx-auto px-4">
        <Slider {...settings}>
          {testimonials.map((item, idx) => (
            // <div key={idx} className="px-4">
            <div key={idx} className="px-2 sm:px-4">

              <div className="bg-white rounded-xl shadow-md p-6 min-h-[280px] max-w-lg mx-auto">
                <p className="text-gray-700 mb-4 text-md md:text-lg">“{item.text}”</p>
                <StarRating count={item.rating} />
                <h3 className="text-md md:text-lg font-semibold text-zinc-900">{item.name}</h3>
                <div className="flex justify-center items-center gap-2 mt-1 text-xs md:text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  Verified Buyer
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialSection;
