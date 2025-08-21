// /components/ProductReviewSection.jsx

import React, { useState } from 'react';
import { Star } from 'lucide-react';

const ProductReviewSection = ({ onSubmitReview }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmit = () => {
    if (rating === 0 || comment.trim() === '') {
      alert('Please enter a comment and select a rating.');
      return;
    }

    const reviewData = {
      comment,
      rating,
      date: new Date().toISOString(),
    };

    if (onSubmitReview) onSubmitReview(reviewData);

    setComment('');
    setRating(0);
    setHoveredStar(0);
  };

  return (
    <div className="bg-[#FDF8EF] border border-[#ECD5B2] rounded-2xl p-6 mt-12 shadow-sm font-serif text-[#4B3A2F]">
      <h2 className="text-2xl font-semibold mb-4 tracking-wide">Leave a Review</h2>

      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStar(star)}
            onMouseLeave={() => setHoveredStar(0)}
            onClick={() => setRating(star)}
            className="text-yellow-400 hover:scale-110 transition-transform"
          >
            <Star
              size={28}
              fill={star <= (hoveredStar || rating) ? '#D2A679' : 'none'}
              stroke="#D2A679"
            />
          </button>
        ))}
      </div>

      {/* Comment Textarea */}
      <textarea
        rows="4"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your thoughts about the product..."
        className="w-full p-4 text-base text-[#4B3A2F] bg-white border border-[#ECD5B2] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D2A679] resize-none"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-gradient-to-r from-[#D2A679] to-[#ECD5B2] hover:from-[#C1A15D] hover:to-[#D8B66B] text-[#3B2F2F] font-semibold text-lg py-3 px-6 rounded-2xl shadow-md transition-colors"
      >
        Submit Review
      </button>
    </div>
  );
};

export default ProductReviewSection;
