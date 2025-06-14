
import React from "react";
import { Users, GraduationCap, Heart, Share2 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "1 Lakh+",
    description:
      "Benefitted students who have transformed their academic performance.",
    color: "bg-royal text-white",
    iconColor: "text-white",
  },
  {
    icon: GraduationCap,
    title: "Expert Mentorship",
    description:
      "Curated by IIT students who understand what it takes to succeed.",
    color: "bg-[#10B981] text-white",
    iconColor: "text-white",
  },
  {
    icon: Heart,
    title: "98% Positive",
    description:
      "Feedback from our community of passionate learners.",
    color: "bg-[#8B5CF6] text-white",
    iconColor: "text-white",
  },
  {
    icon: Share2,
    title: "20k+ Network",
    description:
      "Strong community network of students and mentors.",
    color: "bg-[#F59E0B] text-white",
    iconColor: "text-white",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose Unknown IITians
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We combine academic excellence with practical insights to give you an edge in competitive exams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 bg-white border border-gray-100"
            >
              <div className={`w-12 h-12 rounded-md ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon size={24} className={feature.iconColor} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
