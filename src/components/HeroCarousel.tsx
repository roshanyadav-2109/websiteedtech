
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2000&h=600",
    alt: "Educational technology and programming",
    title: "Master Technology Skills",
    subtitle: "Learn programming, development, and cutting-edge technologies with expert guidance",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000&h=600",
    alt: "Coding and software development education",
    title: "Code Your Future",
    subtitle: "Build real-world projects and gain practical experience in software development",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000&h=600",
    alt: "Student working on laptop",
    title: "Flexible Learning",
    subtitle: "Study at your own pace with our comprehensive online courses and resources",
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

  // Auto-advance the carousel (pause on hover)
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [current, isHovered]);

  if (!carouselImages.length) {
    return null;
  }

  return (
    <div 
      className="relative w-full h-[500px] sm:h-[600px] mt-16 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation buttons */}
      <button
        className="absolute left-6 top-1/2 z-20 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        className="absolute right-6 top-1/2 z-20 transform -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Carousel images with content */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
            index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{ zIndex: index === current ? 1 : 0 }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={image.src}
              alt={image.alt}
              className="object-cover w-full h-full"
            />
            {/* Dark overlay with blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-start z-10">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
              <div className="max-w-2xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="inline-block animate-fade-in">
                    {image.title}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed animate-fade-in animation-delay-200">
                  {image.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in animation-delay-400">
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Get Started
                  </button>
                  <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-pink-600/20 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
        </div>
      ))}

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === current 
                ? "w-12 h-3 bg-white shadow-lg" 
                : "w-3 h-3 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ease-out"
          style={{ width: `${((current + 1) / length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HeroCarousel;
