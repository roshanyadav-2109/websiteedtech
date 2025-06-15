import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import IITM BS components
import BranchNotesTab from "@/components/iitm/BranchNotesTab";
import IITMToolsTab from "@/components/iitm/IITMToolsTab";
import PYQsTab from "@/components/iitm/PYQsTab";
import CommunitiesTab from "@/components/iitm/CommunitiesTab";
import SyllabusTab from "@/components/iitm/SyllabusTab";
import NewsTab from "@/components/iitm/NewsTab";
import ImportantDatesTab from "@/components/iitm/ImportantDatesTab";
import PaidCoursesTab from "@/components/iitm/PaidCoursesTab";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

const IITMBSPrep = () => {
  const [activeTab, setActiveTab] = useState("branch-notes");

  const renderTabContent = (tab: string, content: React.ReactNode) => {
    const protectedTabs = ["communities"];
    if (protectedTabs.includes(tab)) {
      return <OptimizedAuthWrapper>{content}</OptimizedAuthWrapper>;
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
        {/* Main Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="branch-notes" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="overflow-x-auto pb-2">
                <TabsList className="w-full min-w-fit">
                  <TabsTrigger value="branch-notes" className="rounded-md flex-shrink-0">
                    Branch Notes
                  </TabsTrigger>
                  <TabsTrigger value="pyqs" className="rounded-md flex-shrink-0">
                    PYQs
                  </TabsTrigger>
                  <TabsTrigger value="tools" className="rounded-md flex-shrink-0">
                    Tools
                  </TabsTrigger>
                  <TabsTrigger value="communities" className="rounded-md flex-shrink-0">
                    Communities
                  </TabsTrigger>
                  <TabsTrigger value="paid-courses" className="rounded-md bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium shadow-md hover:shadow-amber-200/50 flex-shrink-0">
                    ✨ PAID COURSES
                  </TabsTrigger>
                  <TabsTrigger value="syllabus" className="rounded-md flex-shrink-0">
                    Syllabus
                  </TabsTrigger>
                  <TabsTrigger value="news" className="rounded-md flex-shrink-0">
                    News
                  </TabsTrigger>
                  <TabsTrigger value="dates" className="rounded-md flex-shrink-0">
                    Important Dates
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="branch-notes">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Branch Notes</h2>
                </div>
                {renderTabContent("branch-notes", <BranchNotesTab />)}
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Previous Year Questions</h2>
                </div>
                {renderTabContent("pyqs", <PYQsTab />)}
              </TabsContent>

              <TabsContent value="tools">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Academic Tools</h2>
                </div>
                <IITMToolsTab />
              </TabsContent>

              <TabsContent value="communities">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Communities</h2>
                </div>
                {renderTabContent("communities", <CommunitiesTab />)}
              </TabsContent>
              
              <TabsContent value="paid-courses">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Premium Courses</h2>
                </div>
                <PaidCoursesTab />
              </TabsContent>

              <TabsContent value="syllabus">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Syllabus</h2>
                </div>
                <SyllabusTab />
              </TabsContent>

              <TabsContent value="news">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">News & Updates</h2>
                </div>
                <NewsTab />
              </TabsContent>

              <TabsContent value="dates">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Important Dates</h2>
                </div>
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
