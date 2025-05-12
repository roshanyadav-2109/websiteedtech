
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Import IITM BS components
import BranchNotesTab from "@/components/iitm/BranchNotesTab";
import ToolsTab from "@/components/iitm/ToolsTab";
import PYQsTab from "@/components/iitm/PYQsTab";
import CommunitiesTab from "@/components/iitm/CommunitiesTab";
import SyllabusTab from "@/components/iitm/SyllabusTab";
import NewsTab from "@/components/iitm/NewsTab";
import ImportantDatesTab from "@/components/iitm/ImportantDatesTab";
import PaidCoursesTab from "@/components/iitm/PaidCoursesTab";
import { useIsMobile } from "@/hooks/use-mobile";
import AuthWrapper from "@/components/AuthWrapper";

const IITMBSPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("branch-notes");
  const isMobile = useIsMobile();

  const renderTabContent = (tab: string, content: React.ReactNode) => {
    const protectedTabs = ["branch-notes", "pyqs", "communities"];
    
    if (protectedTabs.includes(tab)) {
      return <AuthWrapper>{content}</AuthWrapper>;
    }
    
    return content;
  };

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">IIT Madras BS Degree Program</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive resources to help you excel in your IIT Madras BS online degree program
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
            <Tabs defaultValue="branch-notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2 tabs-mobile">
                <TabsList className="tabs-list w-full">
                  <TabsTrigger value="branch-notes" className="rounded-md">Branch Notes</TabsTrigger>
                  <TabsTrigger value="pyqs" className="rounded-md">PYQs</TabsTrigger>
                  <TabsTrigger value="tools" className="rounded-md">Tools</TabsTrigger>
                  <TabsTrigger value="communities" className="rounded-md">Communities</TabsTrigger>
                  <TabsTrigger value="paid-courses" 
                    className="rounded-md bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium shadow-md hover:shadow-amber-200/50">
                    ✨ PAID COURSES
                  </TabsTrigger>
                  <TabsTrigger value="syllabus" className="rounded-md">Syllabus</TabsTrigger>
                  <TabsTrigger value="news" className="rounded-md">News</TabsTrigger>
                  <TabsTrigger value="dates" className="rounded-md">Important Dates</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="branch-notes">
                {renderTabContent("branch-notes", <BranchNotesTab />)}
              </TabsContent>

              <TabsContent value="pyqs">
                {renderTabContent("pyqs", <PYQsTab />)}
              </TabsContent>

              <TabsContent value="tools">
                <ToolsTab />
              </TabsContent>

              <TabsContent value="communities">
                {renderTabContent("communities", <CommunitiesTab />)}
              </TabsContent>
              
              <TabsContent value="paid-courses">
                <PaidCoursesTab />
              </TabsContent>

              <TabsContent value="syllabus">
                <SyllabusTab />
              </TabsContent>

              <TabsContent value="news">
                <NewsTab />
              </TabsContent>

              <TabsContent value="dates">
                <ImportantDatesTab />
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

export default IITMBSPrep;
