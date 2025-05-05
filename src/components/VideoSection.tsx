
import React, { useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Hear From Us</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Listen to our founders share the vision behind Unknown IITians and how we're transforming education.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-premium bg-gradient-to-r from-royal/5 to-royal/10 p-1">
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
            {!isPlaying ? (
              <div className="relative w-full h-0 pb-[56.25%] bg-gray-900 rounded-xl overflow-hidden">
                {/* Thumbnail image (placeholder) */}
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=1920"
                  alt="Video thumbnail"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 bg-royal/80 hover:bg-royal rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  >
                    <Play size={36} className="text-white ml-1" />
                  </button>
                </div>
              </div>
            ) : (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Unknown IITians Introduction"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
          
          <div className="flex justify-center mt-6 mb-2">
            <Button 
              onClick={() => setIsPlaying(true)}
              className="btn-premium"
            >
              Watch Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
