
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const IITMBSPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("branch-notes");
  const isMobile = useIsMobile();

  const dataScienceFoundationCourses = [
    "Mathematics for Data Science I",
    "Statistics for Data Science I",
    "Computational Thinking",
    "English I",
    "Mathematics for Data Science II",
    "Statistics for Data Science II",
    "Programming in Python",
    "English II"
  ];

  const dataScienceDiplomaCourses = [
    "Machine Learning Foundations",
    "Business Data Management",
    "Business Data Management - Project",
    "Machine Learning Techniques",
    "Machine Learning Practice",
    "Machine Learning Practice - Project",
    "Business Analytics",
    "Tools in Data Science"
  ];

  const dataScienceDegreeCourses = [
    "Software Engineering",
    "Software Testing",
    "AI: Search Methods for Problem Solving",
    "Deep Learning",
    "Strategies for Professional Growth"
  ];

  const dataScienceDegreeElectives = [
    "Algorithmic Thinking in Bioinformatics",
    "Big Data and Biological Networks",
    "Data Visualization Design",
    "Special Topics in Machine Learnig (Reinforcement Learning)",
    "Speech Technology",
    "Design Thinking for Data-Driven App Development",
    "Industry 4.0",
    "Sequential Decision Making",
    "Market Research",
    "Privacy & Security in Online Social Media",
    "Introduction to Big Data",
    "Financial Forensics",
    "Linear Statistical Models",
    "Advanced Algorithms",
    "Statistical Computing",
    "Computer Systems Design",
    "Programming in C",
    "Mathematical Thinking",
    "Large Language Models",
    "Introduction to Natural Language Processing (i-NLP)",
    "Deep Learning for Computer Vision",
    "Managerial Economics",
    "Game Theory and Strategy",
    "Corporate Finance",
    "Deep Learning Practice",
    "Operating Systems",
    "Generative AI",
    "Algorithms for Data Science (ADS)",
    "Machine Learning Operations (MLOps)"
  ];

  const dataScienceQualifierCourses = [
    "Mathematics for Data Science I",
    "Statistics for Data Science I",
    "Computational Thinking",
    "English I"
  ];

  const electronicSystemsFoundationCourses = [
    "English I",
    "Math for Electronics I",
    "English II",
    "Electronic Systems Thinking and Circuits",
    "Electronic Systems Thinking and Circuits Lab",
    "Introduction to C Programming",
    "C Programming Laboratory",
    "Introduction to Linux and Programming",
    "Linux Systems Laboratory",
    "Digital Systems",
    "Electrical and Electronic Circuits",
    "Electronics Laboratory",
    "Embedded C Programming",
    "Embedded C Programming Laboratory"
  ];

  const electronicSystemsDiplomaCourses = [
    "Math for Electronics II",
    "Signals and Systems",
    "Analog Electronic Systems",
    "Analog Electronics Laboratory",
    "Python Programming",
    "Digital System Design",
    "Digital System Design Laboratory",
    "Digital Signal Processing",
    "Sensors and Applications",
    "Sensors Laboratory",
    "Control Engineering"
  ];

  const electronicSystemsDegreeCourses = [
    "Embedded Linux and FPGAs",
    "Embedded Linux and FPGAs Lab",
    "Electromagnetic Fields and Transmission Lines",
    "Electronic Product Design",
    "Strategies for Professional Growth"
  ];

  const electronicSystemsDegreeElectives = [
    "Probability and Statistics",
    "Communication Systems",
    "Internet of Things (IoT)",
    "Semiconductor Devices and VLSI Technology",
    "Analog Circuits",
    "Digital IC Design",
    "Power Management for Electronic Systems",
    "Biomedical Electronic Systems",
    "Operating Systems",
    "Database Management Systems (DBMS)",
    "Programming Data Structures and Algorithms using Python",
    "Modern Application Development I",
    "Machine Learning Foundation",
    "Programming Concepts using Java",
    "Modern Application Development II",
    "Machine Learning Techniques",
    "Machine Learning Practice",
    "Deep Learning",
    "Deep Learning for Computer Vision",
    "Speech Technology",
    "Deep Learning Practice",
    "Industry 4.0",
    "Design Thinking for Data-Driven App Development",
    "Financial Forensics",
    "Market Research",
    "Game Theory and Strategy",
    "Managerial Economics",
    "Corporate Finance",
    "Apprenticeship in Electronics Systems 1",
    "Apprenticeship in Electronics Systems 2"
  ];

  const electronicSystemsQualifierCourses = [
    "English I",
    "Math for Electronics I",
    "Electronic Systems Thinking and Circuits",
    "Introduction to C Programming"
  ];

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
              <ScrollArea className="w-full whitespace-nowrap pb-2">
                <TabsList className="inline-flex min-w-max w-full mb-8 bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger value="branch-notes" className="rounded-md">Branch Notes</TabsTrigger>
                  <TabsTrigger value="pyqs" className="rounded-md">PYQs</TabsTrigger>
                  <TabsTrigger value="tools" className="rounded-md">Tools</TabsTrigger>
                  <TabsTrigger value="communities" className="rounded-md">Communities</TabsTrigger>
                  <TabsTrigger 
                    value="paid-courses" 
                    className="rounded-md bg-gradient-to-r from-amber-400 to-amber-600 text-white font-medium shadow-md hover:shadow-amber-200/50">
                    ✨ PAID COURSES
                  </TabsTrigger>
                  <TabsTrigger value="syllabus" className="rounded-md">Syllabus</TabsTrigger>
                  <TabsTrigger value="news" className="rounded-md">News</TabsTrigger>
                  <TabsTrigger value="dates" className="rounded-md">Important Dates</TabsTrigger>
                </TabsList>
              </ScrollArea>

              <TabsContent value="branch-notes">
                <BranchNotesTab 
                  dataScienceFoundationCourses={dataScienceFoundationCourses}
                  dataScienceDiplomaCourses={dataScienceDiplomaCourses}
                  dataScienceDegreeCourses={dataScienceDegreeCourses}
                  dataScienceDegreeElectives={dataScienceDegreeElectives}
                  dataScienceQualifierCourses={dataScienceQualifierCourses}
                  electronicSystemsFoundationCourses={electronicSystemsFoundationCourses}
                  electronicSystemsDiplomaCourses={electronicSystemsDiplomaCourses}
                  electronicSystemsDegreeCourses={electronicSystemsDegreeCourses}
                  electronicSystemsDegreeElectives={electronicSystemsDegreeElectives}
                  electronicSystemsQualifierCourses={electronicSystemsQualifierCourses}
                />
              </TabsContent>

              <TabsContent value="pyqs">
                <PYQsTab />
              </TabsContent>

              <TabsContent value="tools">
                <ToolsTab />
              </TabsContent>

              <TabsContent value="communities">
                <CommunitiesTab />
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
