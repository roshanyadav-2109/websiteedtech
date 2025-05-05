
import React from "react";
import { Check, User, DollarSign, GraduationCap, Star } from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Curated by IIT Students",
    description:
      "Our resources are created and vetted by IIT students who understand what it takes to succeed.",
    color: "bg-royal/10",
    iconColor: "text-royal",
  },
  {
    icon: DollarSign,
    title: "Affordable Education",
    description:
      "Premium quality education at affordable prices, ensuring learning is accessible to all.",
    color: "bg-golden/10",
    iconColor: "text-golden",
  },
  {
    icon: User,
    title: "Expert Mentorship",
    description:
      "Get mentored by experts who guide you through your educational journey and career path.",
    color: "bg-teal/10",
    iconColor: "text-teal",
  },
  {
    icon: Star,
    title: "98% Positive Feedback",
    description:
      "Our students consistently rate our resources and mentorship programs with high satisfaction.",
    color: "bg-royal/10",
    iconColor: "text-royal",
  },
];

const stats = [
  {
    value: "1 Lakh+",
    label: "Benefitted Students",
  },
  {
    value: "5K+",
    label: "Community Network",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Why Choose <span className="text-royal">Unknown</span>{" "}
            <span className="text-golden">IITians</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of students who have transformed their educational journey with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-xl p-6 shadow-card hover:shadow-premium transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <feature.icon size={24} className={feature.iconColor} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-royal/5 to-royal/10 rounded-xl p-8 text-center shadow-card animate-scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <p className="text-4xl font-bold text-royal mb-2">{stat.value}</p>
              <p className="text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
