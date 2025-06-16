
import React, { useState, useEffect } from "react";
import { FileText, BookOpen, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

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
        name: "NEET",
        description: "Comprehensive notes covering all medical entrance topics and concepts for thorough preparation.",
        href: "/exam-preparation/neet",
        cta: "View Notes",
        Icon: FileText,
        className: "lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-2",
        background: <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 opacity-30" />,
      },
      {
        name: "JEE",
        description: "Advanced preparation materials for engineering entrance exams with detailed explanations.",
        href: "/exam-preparation/jee",
        cta: "View Notes",
        Icon: FileText,
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-2 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-30" />,
      },
      {
        name: "IITM BS Data Science",
        description: "Comprehensive study materials for IIT Madras BS Data Science program.",
        href: "/exam-preparation/iitm-bs",
        cta: "View Notes",
        Icon: FileText,
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-2 lg:col-end-3",
        background: <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-emerald-100 opacity-30" />,
      },
      {
        name: "IITM BS Electronic Systems",
        description: "Specialized content for Electronic Systems branch of IIT Madras BS degree.",
        href: "/exam-preparation/iitm-bs",
        cta: "View Notes",
        Icon: FileText,
        className: "lg:row-start-2 lg:row-end-3 lg:col-start-3 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-30" />,
      },
      {
        name: "IITM BS Fundamentals",
        description: "Foundation courses and qualifier preparation for IIT Madras BS program.",
        href: "/exam-preparation/iitm-bs",
        cta: "View Notes", 
        Icon: BookOpen,
        className: "lg:row-start-3 lg:row-end-4 lg:col-start-1 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 opacity-30" />,
      },
    ],
    lectures: [
      {
        name: "IITM BS Data Science Fundamentals",
        description: "Introduction to data science concepts and programming with comprehensive video lectures.",
        href: "/exam-preparation/iitm-bs",
        cta: "Watch Lectures",
        Icon: BookOpen,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 opacity-30" />,
      },
    ],
    skill: [
      {
        name: "Coming Soon",
        description: "Our skill enhancement section is under development. Check back for exciting updates!",
        href: "#",
        cta: "Get Notified",
        Icon: Code,
        className: "lg:row-start-1 lg:row-end-4 lg:col-start-1 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-slate-100 opacity-30" />,
      },
    ],
  };

  const getPersonalizedCard = (exam: string | null) => {
    if (!exam) return null;
    
    let matchingResource = null;
    
    if (exam.includes("NEET")) {
      matchingResource = {
        name: "Your NEET Resources",
        description: "Continue where you left off with personalized NEET preparation resources.",
        href: "/exam-preparation/neet",
        cta: "Continue Learning",
        Icon: FileText,
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-royal/20 to-purple-200 opacity-60" />,
      };
    } else if (exam.includes("JEE")) {
      matchingResource = {
        name: "Your JEE Resources", 
        description: "Continue where you left off with personalized JEE preparation resources.",
        href: "/exam-preparation/jee",
        cta: "Continue Learning",
        Icon: FileText,
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-royal/20 to-blue-200 opacity-60" />,
      };
    } else if (exam.includes("IITM BS")) {
      matchingResource = {
        name: "Your IITM BS Resources",
        description: "Continue where you left off with personalized IITM BS preparation resources.",
        href: "/exam-preparation/iitm-bs", 
        cta: "Continue Learning",
        Icon: FileText,
        className: "lg:row-start-1 lg:row-end-2 lg:col-start-1 lg:col-end-4",
        background: <div className="absolute inset-0 bg-gradient-to-br from-royal/20 to-green-200 opacity-60" />,
      };
    }
    
    return matchingResource;
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
        <div className="max-w-6xl mx-auto">
          {activeTab === "skill" ? (
            <div className="text-center py-16">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-12 border-none shadow-md">
                <Code className="h-16 w-16 mx-auto text-royal mb-6" />
                <h3 className="text-2xl font-bold mb-4">Skill Enhancement Coming Soon!</h3>
                <p className="text-gray-600 max-w-xl mx-auto mb-8">
                  We're currently developing an exciting range of skill enhancement courses including web development, 
                  UI/UX design, data science, and mobile app development. Check back soon for updates!
                </p>
                <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                  Get Notified When Available
                </Button>
              </div>
            </div>
          ) : (
            <BentoGrid className="lg:grid-rows-3">
              {/* Show personalized card first if authenticated */}
              {isAuthenticated && userExam && activeTab === "notes" && getPersonalizedCard(userExam) && (
                <BentoCard {...getPersonalizedCard(userExam)!} />
              )}
              
              {/* Show regular resource cards */}
              {resourcesData[activeTab as keyof typeof resourcesData]
                .filter((_, index) => !(isAuthenticated && userExam && activeTab === "notes" && index === 0))
                .map((resource) => (
                  <BentoCard key={resource.name} {...resource} />
                ))}
            </BentoGrid>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSection;
