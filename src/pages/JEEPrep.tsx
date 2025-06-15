
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectBlock from "@/components/SubjectBlock";
import JEEPYQTab from "@/components/JEEPYQTab";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

const JEEPrep = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [activeClass, setActiveClass] = useState("class11");
  const [downloads, setDownloads] = useState<Record<string, number>>({});

  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    console.log(`Downloading: ${id}`);
    // Here you would implement the actual download logic
  };

  const renderTabContent = (tab: string, content: React.ReactNode) => {
    const protectedTabs = ["study-groups", "pyqs"];
    
    if (protectedTabs.includes(tab)) {
      return <OptimizedAuthWrapper>{content}</OptimizedAuthWrapper>;
    }
    
    return content;
  };

  const subjects = ["Physics", "Mathematics", "Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"];
  const classes = [
    { value: "class11", label: "Class 11" },
    { value: "class12", label: "Class 12" }
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">JEE Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Master Physics, Chemistry, and Mathematics with our comprehensive JEE study materials
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full min-w-fit">
                  <TabsTrigger value="notes" className="rounded-md flex-shrink-0">
                    Notes
                  </TabsTrigger>
                  <TabsTrigger value="pyqs" className="rounded-md flex-shrink-0">
                    Previous Year Papers
                  </TabsTrigger>
                  <TabsTrigger value="study-groups" className="rounded-md flex-shrink-0">
                    Study Groups
                  </TabsTrigger>
                  <TabsTrigger value="news-updates" className="rounded-md flex-shrink-0">
                    News Updates
                  </TabsTrigger>
                  <TabsTrigger value="important-dates" className="rounded-md flex-shrink-0">
                    Important Dates
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="notes">
                <h2 className="text-2xl font-bold mb-4">Subject-wise Notes</h2>
                
                {/* Subject Filter Tabs */}
                <div className="mb-6">
                  <Tabs value={activeSubject} onValueChange={setActiveSubject}>
                    <div className="overflow-x-auto pb-2">
                      <TabsList className="w-full min-w-fit">
                        {subjects.map((subject) => (
                          <TabsTrigger key={subject} value={subject} className="rounded-md flex-shrink-0">
                            {subject}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </Tabs>
                </div>

                {/* Class Filter */}
                <div className="mb-6">
                  <Tabs value={activeClass} onValueChange={setActiveClass}>
                    <div className="overflow-x-auto pb-2">
                      <TabsList className="w-full min-w-fit">
                        {classes.map((classItem) => (
                          <TabsTrigger key={classItem.value} value={classItem.value} className="rounded-md flex-shrink-0">
                            {classItem.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>
                  </Tabs>
                </div>

                {renderTabContent("notes", 
                  <SubjectBlock 
                    subject={activeSubject} 
                    selectedClass={activeClass}
                    examType="JEE"
                  />
                )}
              </TabsContent>

              <TabsContent value="pyqs">
                <h2 className="text-2xl font-bold mb-4">Previous Year Questions</h2>
                {renderTabContent("pyqs", <JEEPYQTab downloads={downloads} onDownload={handleDownload} />)}
              </TabsContent>

              <TabsContent value="study-groups">
                <h2 className="text-2xl font-bold mb-4">Study Groups</h2>
                {renderTabContent("study-groups", 
                  <div className="text-center py-8">
                    <p className="text-gray-600">Study groups feature coming soon...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="news-updates">
                <h2 className="text-2xl font-bold mb-4">News Updates</h2>
                {renderTabContent("news-updates", 
                  <div className="text-center py-8">
                    <p className="text-gray-600">News updates feature coming soon...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="important-dates">
                <h2 className="text-2xl font-bold mb-4">Important Dates</h2>
                {renderTabContent("important-dates", 
                  <div className="text-center py-8">
                    <p className="text-gray-600">Important dates feature coming soon...</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default JEEPrep;
