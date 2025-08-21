import { useState } from 'react';
import { PlayCircle } from 'lucide-react';

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="bg-[#f5ece4] py-16 px-6 md:px-24">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          Your Signature Scent
        </h2>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2 mb-8 max-w-xl mx-auto text-base md:text-lg">
          Find The Perfect Perfume To Express Your Unique Style.
        </p>

        {/* Video Block */}
        <div className="relative w-full aspect-[16/6] rounded-xl overflow-hidden shadow-lg mx-auto max-w-7xl">
          {!isPlaying ? (
            <>
              {/* Thumbnail with smoke gradient overlay */}
              <img
                src="/thumbnail.png"
                alt="Video Thumbnail"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#4a2c4900] via-[#845082aa] to-[#6b406a] blur-lg pointer-events-none" />


              {/* Play Button Overlay */}
              <button
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition duration-300"
              >
                <PlayCircle className="w-20 h-20 text-white transition-transform duration-300 hover:scale-125 hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </button>
            </>
          ) : (
            // Embedded YouTube Video with autoplay
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/_9VUPq3SxOc?autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </section>
  );
}
