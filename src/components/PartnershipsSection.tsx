
import React from "react";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

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
  },
  {
    name: "LearnFast",
    description: "Accelerated learning programs",
    image: "https://picsum.photos/100/100?random=6"
  },
  {
    name: "FutureMinds",
    description: "Nurturing innovation in young learners",
    image: "https://picsum.photos/100/100?random=7"
  },
  {
    name: "SkillUp",
    description: "Platform for practical skills development",
    image: "https://picsum.photos/100/100?random=8"
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
        <InfiniteSlider
          gap={40}
          duration={60}
          reverse
          className="w-full"
        >
          {partners.map((partner, index) => (
            <div key={index} className="flex-none w-72 border rounded-lg p-6 bg-white shadow-sm h-full flex flex-col items-center hover:shadow-md transition-shadow">
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
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};

export default PartnershipsSection;
