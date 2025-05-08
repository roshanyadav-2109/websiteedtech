
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=2000&h=600",
    alt: "Educational technology and programming",
  },
  {
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=2000&h=600",
    alt: "Coding and software development education",
  },
  {
    src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000&h=600",
    alt: "Student working on laptop",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
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
    <Carousel className="overflow-hidden" autoPlay>
      <CarouselContent>
        <CarouselItem>
          <div className="relative">
            <img
              src="https://placehold.co/2000x450/4C51BF/FFFFFF?text=Unknown+IITians"
              alt="Unknown IITians"
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4 text-center">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Learn from IIT Students
                </h2>
                <p className="text-md sm:text-lg md:text-xl text-white mb-6">
                  Courses, study materials and guidance from IIT mentors
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-royal hover:bg-royal-dark text-white">
                    Explore Courses
                  </Button>
                  <Button variant="outline" className="bg-white/10 text-white border-white">
                    Join Community
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
        
        <CarouselItem>
          <div className="relative">
            <img
              src="https://placehold.co/2000x450/4C51BF/FFFFFF?text=Exam+Preparation"
              alt="Exam Preparation"
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4 text-center">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Ace Your Entrance Exams
                </h2>
                <p className="text-md sm:text-lg md:text-xl text-white mb-6">
                  NEET, JEE & IITM BS preparation resources crafted by experts
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-royal hover:bg-royal-dark text-white">
                    NEET Resources
                  </Button>
                  <Button variant="outline" className="bg-white/10 text-white border-white">
                    JEE Materials
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
        
        <CarouselItem>
          <div className="relative">
            <img
              src="https://placehold.co/2000x450/4C51BF/FFFFFF?text=IIT+Mentors"
              alt="IIT Mentors"
              className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center p-4 text-center">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  Learn From The Best
                </h2>
                <p className="text-md sm:text-lg md:text-xl text-white mb-6">
                  Direct guidance from top IIT students who've mastered the path
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button className="bg-royal hover:bg-royal-dark text-white">
                    Meet Our Mentors
                  </Button>
                  <Button variant="outline" className="bg-white/10 text-white border-white">
                    Join Mentorship Program
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};

export default HeroCarousel;
