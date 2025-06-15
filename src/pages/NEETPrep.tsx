import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Import NEET components
import NEETSubjectBlock from "@/components/NEETSubjectBlock";
import NEETPYQTab from "@/components/NEETPYQTab";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

const NEETPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  const subjects = ["Physics", "Botany", "Zoology", "Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"];
  const classes = [
    { value: "class11", label: "Class 11" },
    { value: "class12", label: "Class 12" }
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">NEET Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Excel in Biology, Physics, and Chemistry with our comprehensive NEET study materials
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center max-w-md mx-auto">
              <Input
                type="text"
                placeholder="Search resources..."
                className="w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="ml-2 bg-royal hover:bg-royal-dark">
                <Search className="h-4 w-4" />
              </Button>
            </div>
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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Subject-wise Notes</h2>
                </div>

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
                  <NEETSubjectBlock 
                    subject={activeSubject} 
                    downloads={downloads} 
                    onDownload={handleDownload}
                    selectedClass={activeClass}
                  />
                )}
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Previous Year Questions</h2>
                </div>
                {renderTabContent("pyqs", <NEETPYQTab downloads={downloads} onDownload={handleDownload} />)}
              </TabsContent>

              <TabsContent value="study-groups">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Study Groups</h2>
                </div>
                {renderTabContent("study-groups", 
                  <div className="text-center py-8">
                    <p className="text-gray-600">Study groups feature coming soon...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="news-updates">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">News Updates</h2>
                </div>
                {renderTabContent("news-updates", 
                  <div className="text-center py-8">
                    <p className="text-gray-600">News updates feature coming soon...</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="important-dates">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Important Dates</h2>
                </div>
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

export default NEETPrep;
