
import React, { useState } from "react";
import { FileText, BookOpen, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tabsData = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
  },
  {
    id: "lectures",
    label: "Lectures",
    icon: BookOpen,
  },
  {
    id: "skill",
    label: "Skill Enhancement",
    icon: Code,
  },
];

const resourcesData = {
  notes: [
    {
      title: "NEET",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/resources/neet-notes",
    },
    {
      title: "JEE",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/resources/jee-notes",
    },
    {
      title: "IITM BS Data Science",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/resources/iitm-bs-data-science-notes",
    },
    {
      title: "IITM BS Electronic Systems",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/resources/iitm-bs-electronic-systems-notes",
    },
  ],
  lectures: [
    {
      title: "JEE Math Lectures",
      description: "Video lectures covering advanced JEE mathematics topics.",
      link: "/resources/jee-math-lectures",
    },
    {
      title: "NEET Biology Series",
      description: "Comprehensive biology video lectures for NEET preparation.",
      link: "/resources/neet-biology-lectures",
    },
    {
      title: "IITM BS Data Science Fundamentals",
      description: "Introduction to data science concepts and programming.",
      link: "/resources/iitm-bs-ds-lectures",
    },
  ],
  skill: [
    {
      title: "Web Development",
      description: "Learn front-end and back-end web development technologies.",
      link: "/resources/web-development",
    },
    {
      title: "UI/UX Design",
      description: "Master user interface and experience design principles.",
      link: "/resources/ui-ux-design",
    },
    {
      title: "Data Science",
      description: "Explore data analysis, visualization, and machine learning.",
      link: "/resources/data-science",
    },
    {
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using modern frameworks.",
      link: "/resources/mobile-development",
    },
  ],
};

const ResourceHubSection = () => {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Your Resource Hub</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive study materials designed by top IIT students to excel in your academic journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-sm">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 ${
                  activeTab === tab.id
                    ? "bg-white text-royal font-medium"
                    : "bg-gray-50 text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourcesData[activeTab as keyof typeof resourcesData].map((resource, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
              <p className="text-gray-600 mb-5">{resource.description}</p>
              <Link to={resource.link}>
                <Button variant="outline" className="w-full justify-center">
                  View Notes
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSection;
