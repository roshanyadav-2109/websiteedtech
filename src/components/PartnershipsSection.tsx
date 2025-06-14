
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const partners = [
  {
    name: "EduTech Solutions",
    description: "Educational technology for interactive learning",
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "CodeMentor",
    description: "Programming mentorship platform",
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "MedPrep Institute",
    description: "Specialized medical entrance coaching",
    image: "https://picsum.photos/100/100?random=3"
  },
  {
    name: "EngineeringHub",
    description: "Resources for engineering aspirants",
    image: "https://picsum.photos/100/100?random=4"
  },
  {
    name: "DataScience.ai",
    description: "Data science learning platform",
    image: "https://picsum.photos/100/100?random=5"
  }
];

const PartnershipsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Initiative Companies</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Student-founded and partnered companies working to transform education
          </p>
        </div>
        <Carousel
          className="w-full max-w-4xl mx-auto"
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true
            })
          ]}
        >
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem key={index} className="px-4">
                <div className="flex-none w-full border rounded-lg p-6 bg-white shadow-sm h-full flex flex-col items-center">
                  <div className="flex justify-center mb-4">
                    <img 
                      src={partner.image} 
                      alt={partner.name} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2">{partner.name}</h3>
                  <p className="text-gray-600 text-center text-sm">{partner.description}</p>
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

export default PartnershipsSection;
