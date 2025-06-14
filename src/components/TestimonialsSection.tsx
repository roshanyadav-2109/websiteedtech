
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    content: "The NEET resources are exceptionally well-organized. I credit my success in NEET to their comprehensive study materials and mock tests.",
    name: "Rahul Kapoor",
    course: "NEET",
    image: "https://picsum.photos/100/100?random=10"
  },
  {
    content: "The mentorship I received through this platform was invaluable. The personal guidance helped me navigate the complexities of JEE preparation.",
    name: "Priya Sharma",
    course: "JEE",
    image: "https://picsum.photos/100/100?random=11"
  },
  {
    content: "The IITM BS program resources really helped me understand the curriculum better. The community support is amazing!",
    name: "Arjun Mehta",
    course: "IITM BS Data Science",
    image: "https://picsum.photos/100/100?random=12"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Student Voices</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from students who transformed their academic journey with us
          </p>
        </div>

        <Carousel
          className="w-full max-w-5xl mx-auto"
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: false,
              stopOnMouseEnter: true
            })
          ]}
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="px-4">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-start">
                    <div className="mr-6">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover" 
                      />
                    </div>
                    <div>
                      <div className="text-5xl text-gray-300 mb-2">"</div>
                      <p className="text-lg text-gray-700 mb-4">{testimonial.content}</p>
                      <div className="mt-6">
                        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                        <p className="text-royal">{testimonial.course}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-8">
            <CarouselPrevious className="relative transform-none translate-y-0 left-0" />
            <CarouselNext className="relative transform-none translate-y-0 right-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
