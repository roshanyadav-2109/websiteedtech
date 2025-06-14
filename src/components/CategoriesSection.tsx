
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    title: "NEET",
    description: "Comprehensive resources for medical aspirants",
    color: "bg-gradient-to-br from-[#D946EF] to-[#8B5CF6]",
    link: "/neet-prep",
  },
  {
    title: "JEE",
    description: "Advanced preparation for engineering entrance",
    color: "bg-gradient-to-br from-[#3B82F6] to-[#2563EB]",
    link: "/jee-prep",
  },
  {
    title: "IITM BS",
    description: "Specialized content for Data Science & Electronic Systems",
    color: "bg-gradient-to-br from-[#10B981] to-[#059669]",
    link: "/iitm-bs-prep",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Explore Our Categories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Find specialized resources designed for your specific exam preparation needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="block h-full">
              <div 
                className={`${category.color} text-white rounded-2xl p-8 h-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col`}
              >
                <h3 className="text-3xl font-bold mb-4">{category.title}</h3>
                <p className="text-white/90 text-lg mb-6 flex-grow">{category.description}</p>
                <div className="flex items-center text-white font-medium mt-auto">
                  <span>Explore Resources</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
