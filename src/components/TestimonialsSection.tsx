import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, Users, GraduationCap } from "lucide-react";

const testimonials = [
  {
    content: "The NEET resources are exceptionally well-organized. I credit my success in NEET to their comprehensive study materials and mock tests. The systematic approach helped me build confidence and achieve my target score.",
    name: "Rahul Kapoor",
    course: "NEET Preparation",
    rating: 5,
    achievement: "AIR 245 in NEET"
  },
  {
    content: "The mentorship I received through this platform was invaluable. The personal guidance helped me navigate the complexities of JEE preparation and develop effective study strategies that made all the difference.",
    name: "Priya Sharma",
    course: "JEE Advanced",
    rating: 5,
    achievement: "IIT Delhi CSE"
  },
  {
    content: "The IITM BS program resources really helped me understand the curriculum better. The community support is amazing and the quality of content is top-notch. It's like having a mentor available 24/7.",
    name: "Arjun Mehta",
    course: "IITM BS Data Science",
    rating: 5,
    achievement: "Dean's List Student"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-royal/10 rounded-full mb-6">
            <Users className="w-8 h-8 text-royal" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Voices</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their academic journey with us and achieved their dreams
          </p>
        </div>

        <Carousel
          className="w-full max-w-6xl mx-auto"
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
              stopOnMouseEnter: true
            })
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-royal/5 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
                  
                  {/* Quote icon */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote className="w-10 h-10 text-royal/20" />
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-golden text-golden" />
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <blockquote className="text-lg text-gray-700 leading-relaxed mb-8 relative">
                    "{testimonial.content}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xl text-gray-900 mb-1">{testimonial.name}</h4>
                      <div className="flex items-center space-x-2 text-royal">
                        <GraduationCap className="w-4 h-4" />
                        <span className="font-medium">{testimonial.course}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-royal to-royal-dark text-white px-4 py-2 rounded-lg text-sm font-semibold">
                        {testimonial.achievement}
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-center gap-2 mt-12">
            <CarouselPrevious className="relative transform-none translate-y-0 left-0 bg-white hover:bg-royal hover:text-white border-2 border-royal/20 hover:border-royal transition-all duration-300" />
            <CarouselNext className="relative transform-none translate-y-0 right-0 bg-white hover:bg-royal hover:text-white border-2 border-royal/20 hover:border-royal transition-all duration-300" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
