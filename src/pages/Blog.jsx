import React from "react";
import PageBreadcrumb from '../components/PageBreadcrumb';

const blogPosts = [
  {
    image: "https://arrax-preview.myshopify.com/cdn/shop/articles/10102.jpg?v=1741023599&width=1000",
    title: "Proper way to apply perfumes 2025",
    date: "Feb 28, 2025",
    author: "Team 90Degree",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...",
  },
  {
    image: "https://arrax-preview.myshopify.com/cdn/shop/articles/2119_28378e97-b4eb-4249-a5ae-5857ad6cc40b.jpg?v=1741023446&width=1000",
    title: "Top 5 Timeless & Classic Fragrances",
    date: "Feb 28, 2025",
    author: "Team 90Degree",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...",
  },
  {
    image: "https://arrax-preview.myshopify.com/cdn/shop/articles/2730_4020a7ff-98dc-4bd7-b9f1-3125d94385f6.jpg?v=1741023210&width=1000",
    title: "Our Perfumers' Picks Of The Top 8",
    date: "Feb 28, 2025",
    author: "Team 90Degree",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...",
  },
  {
    image: "https://arrax-preview.myshopify.com/cdn/shop/articles/23370_6a1fd71c-1023-4ecf-a85c-4d0302d183b2.jpg?v=1741023293&width=1000",
    title: "Traveling Through Scent with Botanicae",
    date: "Feb 28, 2025",
    author: "Team 90Degree",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...",
  },
  {
    image: "https://arrax-preview.myshopify.com/cdn/shop/articles/2670_c6b3da53-193e-452a-aef4-a872942f6bc2.jpg?v=1741023368&width=1000",
    title: "Guide to Always Smelling Exquisite",
    date: "Feb 28, 2025",
    author: "Team 90Degree",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...",
  },
  {
    image: "https://arrax-preview.myshopify.com/cdn/shop/articles/4471_b4277c2d-e057-4be7-b6e7-183d0ec9db7a.jpg?v=1741023412&width=1000",
    title: "Arome Rose Incense – new fragrance",
    date: "Feb 28, 2025",
    author: "Team 90Degree",
    excerpt:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in...",
  },
];

const Blog = () => {
  return (
    <>
     {/* <PageBreadcrumb
        links={[
          { path: '/', label: 'Home' },
          { path: '/blog', label: 'Blog' },
        ]}
      /> */}

      <div className="py-12 px-4 md:px-20 bg-white">
      <div className="grid gap-6 md:grid-cols-3">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4">
            <img
              src={post.image}
              alt={post.title}
              className="rounded-xl w-full h-52 object-cover mb-4"
            />
            <div className="text-sm text-gray-600 flex items-center gap-2 mb-1">
              <span>👤 {post.author}</span>
              <span>📅 {post.date}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
            <button className="text-white bg-[#5b2b71] hover:bg-black px-4 py-2 rounded">
              READ MORE
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-2">
        <button className="bg-black text-white px-3 py-1 rounded">1</button>
        <button className="bg-white border border-gray-300 text-black px-3 py-1 rounded hover:bg-black hover:text-white">
          2
        </button>
        <button className="bg-white border border-gray-300 text-black px-3 py-1 rounded hover:bg-black hover:text-white">
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default Blog;
