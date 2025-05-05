
import React from "react";
import { Book, GraduationCap, FileVideo } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "JEE",
    description:
      "Comprehensive resources for JEE Main & Advanced preparations, including study materials, mock tests, and previous year papers.",
    icon: Book,
    color: "bg-royal/10 text-royal",
    link: "/exam-preparation/jee",
  },
  {
    title: "NEET",
    description:
      "Complete study materials for NEET aspirants, covering Physics, Chemistry, and Biology with concept-based learning.",
    icon: GraduationCap,
    color: "bg-golden/10 text-golden-dark",
    link: "/exam-preparation/neet",
  },
  {
    title: "IITM BS",
    description:
      "Specialized resources for IIT Madras BS programs in Data Science and Electronic Systems, with mentorship from IITM students.",
    icon: FileVideo,
    color: "bg-teal/10 text-teal-dark",
    link: "/exam-preparation/iitm-bs",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Explore Our Categories</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our specialized programs designed to help you excel in your educational journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link to={category.link} key={index} className="category-card">
              <Card className="h-full border-none shadow-card hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon size={24} />
                  </div>
                  <CardTitle className="text-2xl font-bold">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {category.description}
                  </CardDescription>
                  <div className="mt-6 flex items-center text-royal font-medium">
                    <span>Learn more</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
