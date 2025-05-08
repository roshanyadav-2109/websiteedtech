
import React, { useState } from "react";
import { FileText, BookOpen, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

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
      link: "/exam-preparation/neet",
      requiresAuth: true,
    },
    {
      title: "JEE",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/exam-preparation/jee",
      requiresAuth: true,
    },
    {
      title: "IITM BS Data Science",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/exam-preparation/iitm-bs",
      requiresAuth: true,
    },
    {
      title: "IITM BS Electronic Systems",
      description: "Comprehensive notes covering all topics and concepts.",
      link: "/exam-preparation/iitm-bs",
      requiresAuth: true,
    },
  ],
  lectures: [
    {
      title: "JEE Math Lectures",
      description: "Video lectures covering advanced JEE mathematics topics.",
      link: "/exam-preparation/jee",
      requiresAuth: true,
    },
    {
      title: "NEET Biology Series",
      description: "Comprehensive biology video lectures for NEET preparation.",
      link: "/exam-preparation/neet",
      requiresAuth: true,
    },
    {
      title: "IITM BS Data Science Fundamentals",
      description: "Introduction to data science concepts and programming.",
      link: "/exam-preparation/iitm-bs",
      requiresAuth: true,
    },
  ],
  skill: [
    {
      title: "Web Development",
      description: "Learn front-end and back-end web development technologies.",
      link: "/resources/web-development",
      requiresAuth: true,
    },
    {
      title: "UI/UX Design",
      description: "Master user interface and experience design principles.",
      link: "/resources/ui-ux-design",
      requiresAuth: true,
    },
    {
      title: "Data Science",
      description: "Explore data analysis, visualization, and machine learning.",
      link: "/resources/data-science",
      requiresAuth: true,
    },
    {
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using modern frameworks.",
      link: "/resources/mobile-development",
      requiresAuth: true,
    },
  ],
};

const ResourceHubSection = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const { user, signInWithGoogle } = useAuth();

  const handleResourceClick = (resource: any) => {
    if (resource.requiresAuth && !user) {
      toast({
        title: "Login Required",
        description: "Please login to access this resource",
      });
      return false;
    }
    return true;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Resource Hub</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive study materials designed by top IIT students to excel in your academic journey.
          </p>
        </div>

        {/* Tabs - improved design */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-sm p-1">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-royal text-white shadow-sm"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="mr-2 h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {resourcesData[activeTab as keyof typeof resourcesData].map((resource, index) => (
            <Card key={index} className="h-full border hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{resource.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">{resource.description}</p>
              </CardContent>
              <CardFooter className="pt-2">
                {resource.requiresAuth && !user ? (
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">
                        Login Required
                      </Badge>
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => signInWithGoogle()}
                    >
                      Login to Access
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full" variant="default">
                    <Link to={resource.link}>Access Resources</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSection;
