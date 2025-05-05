
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "JEE Advanced - AIR 345",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Unknown IITians played a crucial role in my JEE preparation. Their structured approach and detailed notes helped me tackle complex topics with ease.",
  },
  {
    name: "Priya Patel",
    role: "NEET - AIR 512",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "The mentorship I received was invaluable. The mentors understood my weak areas and provided personalized guidance that helped me improve dramatically.",
  },
  {
    name: "Arjun Singh",
    role: "IITM BS Data Science Student",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "The resources provided for the IITM BS program are incredibly well-curated. They've made online learning accessible and effective for me.",
  },
  {
    name: "Neha Kumar",
    role: "JEE Mains - AIR 1245",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "What sets Unknown IITians apart is their approach to teaching concepts. They focus on understanding rather than rote learning, which helped me excel.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const [displayCount, setDisplayCount] = useState(1);
  const length = testimonials.length;

  // Determine how many testimonials to show based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setDisplayCount(3);
      } else if (window.innerWidth >= 768) {
        setDisplayCount(2);
      } else {
        setDisplayCount(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrent((current + 1) % length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + length) % length);
  };

  // Get the testimonials to display
  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < displayCount; i++) {
      visible.push(testimonials[(current + i) % length]);
    }
    return visible;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from students who have transformed their academic journey with us.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={prevSlide}
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronLeft size={24} className="text-royal" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <ChevronRight size={24} className="text-royal" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-full shadow-card hover:shadow-premium transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-golden"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === current ? "bg-royal w-8" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
