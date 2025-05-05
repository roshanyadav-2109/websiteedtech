
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Video, Code, CheckCircle } from "lucide-react";

const ResourceHubSection = () => {
  const [activeTab, setActiveTab] = useState("notes");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Your Resource Hub</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Access comprehensive learning materials designed to help you excel in your exams and build valuable skills.
          </p>
        </div>

        <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="notes" className="text-base">Notes</TabsTrigger>
            <TabsTrigger value="lectures" className="text-base">Lectures</TabsTrigger>
            <TabsTrigger value="skills" className="text-base">Skill Enhancement</TabsTrigger>
          </TabsList>

          {/* Notes Content */}
          <TabsContent value="notes" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {["NEET", "JEE", "IITM BS Data Science", "IITM BS Electronic Systems"].map((category, idx) => (
                <Card key={idx} className="shadow-card hover:shadow-premium transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-lg bg-royal/10 text-royal flex items-center justify-center mb-3">
                      <FileText size={20} />
                    </div>
                    <CardTitle>{category} Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Comprehensive study materials, cheat sheets, and exam notes.
                    </CardDescription>
                    <div className="mt-4">
                      <button className="text-royal font-medium flex items-center">
                        Access Notes
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
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Lectures Content */}
          <TabsContent value="lectures" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                "Programming Fundamentals", 
                "Data Structures & Algorithms", 
                "Machine Learning Basics"
              ].map((lecture, idx) => (
                <Card key={idx} className="shadow-card hover:shadow-premium transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-lg bg-golden/10 text-golden flex items-center justify-center mb-3">
                      <Video size={20} />
                    </div>
                    <CardTitle>{lecture}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Video lectures for IITM BS Data Science program with detailed explanations and examples.
                    </CardDescription>
                    <div className="mt-4">
                      <button className="text-golden font-medium flex items-center">
                        Watch Lectures
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
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Skills Content */}
          <TabsContent value="skills" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Web Development",
                  description: "Learn HTML, CSS, JavaScript, React, and more to build modern web applications.",
                  icon: Code,
                },
                {
                  title: "UI/UX Design",
                  description: "Master user interface and experience design to create beautiful and functional products.",
                  icon: CheckCircle,
                },
                {
                  title: "Data Analysis",
                  description: "Learn to analyze and visualize data using Python, SQL, and other tools.",
                  icon: FileText,
                },
              ].map((skill, idx) => (
                <Card key={idx} className="shadow-card hover:shadow-premium transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center mb-3">
                      <skill.icon size={20} />
                    </div>
                    <CardTitle>{skill.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {skill.description}
                    </CardDescription>
                    <div className="mt-4">
                      <button className="text-teal font-medium flex items-center">
                        Start Learning
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
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ResourceHubSection;
