import React from 'react';
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const blogPosts = [
    {
      image: "/blogSection-images/1.webp",
      author: "Team 90Degree",
      date: "Feb 28, 2025",
      title: "Proper way to apply perfumes 2025"
    },
    {
      image: "/blogSection-images/2.webp", 
      author: "Team 90Degree",
      date: "Feb 28, 2025",
      title: "Top 5 Timeless & Classic Fragrances"
    },
    {
      image: "/blogSection-images/3.webp",
      author: "Team 90Degree", 
      date: "Feb 28, 2025",
      title: "Our Perfumers' Picks Of The Top 8"
    }
  ];
  const navigate = useNavigate();
  const handleClick = () => navigate("/blog");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-fit mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 mb-2 tracking-wider uppercase">
            OUR BLOG
          </p>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-black">
              News & Blog Updates
            </h2>
            <button
            onClick={handleClick}
            className="text-sm text-gray-600 hover:text-black transition-colors underline">
              View All
            </button>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ">
              {/* Image */}
              <div className="aspect-[2/1] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-115 transition-transform duration-300 cursor-pointer"
                  onClick={handleClick}
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Author and Date */}
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span>{post.date}</span>
                  </div>
                </div>
                
                {/* Title */}
                <h3 onClick={handleClick} className="text-lg font-semibold text-black leading-tight hover:text-gray-700 transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;