
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2000&h=500",
    alt: "Educational technology and programming",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000&h=500",
    alt: "Coding and software development education",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000&h=500",
    alt: "Student working on laptop",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const length = carouselImages.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  if (!carouselImages.length) {
    return null;
  }

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[350px] mt-16 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation buttons */}
      <button
        className={`absolute left-4 top-1/2 z-10 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        }`}
        onClick={prevSlide}
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className={`absolute right-4 top-1/2 z-10 transform -translate-y-1/2 bg-white/30 backdrop-blur-sm hover:bg-white/50 rounded-full p-2 transition-all duration-500 ${
          isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
        }`}
        onClick={nextSlide}
      >
        <ChevronRight size={24} />
      </button>

      {/* Carousel images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-1000 ease-in-out transform ${
            index === current 
              ? "opacity-100 translate-x-0 scale-100" 
              : index < current 
                ? "opacity-0 -translate-x-full scale-95" 
                : "opacity-0 translate-x-full scale-95"
          }`}
          style={{ zIndex: index === current ? 1 : 0 }}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="object-cover w-full h-full transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-white scale-125" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
