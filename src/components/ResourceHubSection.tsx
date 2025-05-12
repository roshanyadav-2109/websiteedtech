
import React, { useState, useEffect } from "react";
import { FileText, BookOpen, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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

interface ResourceItem {
  title: string;
  description: string;
  link: string;
}

const ResourceHubSection = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const [userExam, setUserExam] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUserProfile = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        setIsAuthenticated(true);
        
        const { data: profileData } = await supabase
          .from('profiles')
          .select('exam')
          .eq('id', sessionData.session.user.id)
          .single();
          
        if (profileData?.exam) {
          setUserExam(profileData.exam);
        }
      }
    };
    
    checkUserProfile();
  }, []);

  const resourcesData = {
    notes: [
      {
        title: "NEET",
        description: "Comprehensive notes covering all topics and concepts.",
        link: "/exam-preparation/neet",
      },
      {
        title: "JEE",
        description: "Comprehensive notes covering all topics and concepts.",
        link: "/exam-preparation/jee",
      },
      {
        title: "IITM BS Data Science",
        description: "Comprehensive notes covering all topics and concepts.",
        link: "/exam-preparation/iitm-bs",
      },
      {
        title: "IITM BS Electronic Systems",
        description: "Comprehensive notes covering all topics and concepts.",
        link: "/exam-preparation/iitm-bs",
      },
    ],
    lectures: [
      {
        title: "IITM BS Data Science Fundamentals",
        description: "Introduction to data science concepts and programming.",
        link: "/exam-preparation/iitm-bs",
      },
    ],
    skill: [
      {
        title: "Coming Soon",
        description: "Our skill enhancement section is under development. Check back for updates!",
        link: "#",
      },
    ],
  };

  const getCardByExam = (exam: string | null) => {
    if (!exam) return null;
    
    let matchingResource: ResourceItem | null = null;
    
    if (exam.includes("NEET")) {
      matchingResource = {
        title: "NEET Resources",
        description: "Continue where you left off with NEET preparation resources.",
        link: "/exam-preparation/neet"
      };
    } else if (exam.includes("JEE")) {
      matchingResource = {
        title: "JEE Resources",
        description: "Continue where you left off with JEE preparation resources.",
        link: "/exam-preparation/jee"
      };
    } else if (exam.includes("IITM BS")) {
      matchingResource = {
        title: "IITM BS Resources",
        description: "Continue where you left off with IITM BS preparation resources.",
        link: "/exam-preparation/iitm-bs"
      };
    }
    
    if (matchingResource) {
      return (
        <Card key="user-exam" className="col-span-1 md:col-span-4 bg-gradient-to-r from-royal/10 to-purple-100 border-none shadow-md p-6">
          <CardHeader>
            <CardTitle className="text-2xl">Your Resources</CardTitle>
            <CardDescription>Based on your profile preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <h3 className="text-xl font-bold mb-3">{matchingResource.title}</h3>
            <p className="text-gray-600 mb-5">{matchingResource.description}</p>
          </CardContent>
          <CardFooter>
            <Link to={matchingResource.link}>
              <Button className="bg-royal hover:bg-royal-dark text-white">
                Continue Learning
              </Button>
            </Link>
          </CardFooter>
        </Card>
      );
    }
    
    return null;
  };

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
          {/* Show user-specific card if authenticated and has exam preference */}
          {isAuthenticated && userExam && activeTab === "notes" && getCardByExam(userExam)}

          {/* Show regular resource cards */}
          {activeTab === "skill" ? (
            <Card className="col-span-full bg-gradient-to-r from-indigo-50 to-purple-50 border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-xl text-center">Skill Enhancement Coming Soon!</CardTitle>
                <CardDescription className="text-center">
                  We're currently developing an exciting range of skill enhancement courses.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="py-8">
                  <Code className="h-16 w-16 mx-auto text-royal mb-4" />
                  <p className="text-gray-600 max-w-xl mx-auto">
                    Our team is working on comprehensive skill enhancement courses including web development, UI/UX design, 
                    data science, and mobile app development. Check back soon for updates!
                  </p>
                </div>
              </CardContent>
              <CardFooter className="justify-center">
                <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                  Get Notified When Available
                </Button>
              </CardFooter>
            </Card>
          ) : (
            resourcesData[activeTab as keyof typeof resourcesData].map((resource, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-5">{resource.description}</p>
                <Link to={resource.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSection;
