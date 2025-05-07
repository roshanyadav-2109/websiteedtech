
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import ResourceHubSection from "@/components/ResourceHubSection";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { GraduationCap, FileText, Calendar, Users } from "lucide-react";

const IITMBSPrep = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <NavBar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              IIT Madras BS Degree Preparation
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Comprehensive resources to help you succeed in your IIT Madras BS Degree program
            </motion.p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="notes" className="w-full">
              <div className="mb-8 overflow-x-auto">
                <TabsList className="w-full px-2 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <div className="flex w-full overflow-x-auto space-x-2 p-1">
                    <TabsTrigger value="notes" className="flex-shrink-0">Notes</TabsTrigger>
                    <TabsTrigger value="pyqs" className="flex-shrink-0">PYQs</TabsTrigger>
                    <TabsTrigger value="community" className="flex-shrink-0">Communities</TabsTrigger>
                    <TabsTrigger value="paid" className="flex-shrink-0">Paid Courses</TabsTrigger>
                    <TabsTrigger value="syllabus" className="flex-shrink-0">Syllabus</TabsTrigger>
                    <TabsTrigger value="news" className="flex-shrink-0">News</TabsTrigger>
                    <TabsTrigger value="dates" className="flex-shrink-0">Important Dates</TabsTrigger>
                  </div>
                </TabsList>
              </div>

              <TabsContent value="notes">
                <ResourceHubSection examType="iitm" />
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="py-12 text-center">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <FileText className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Previous Year Questions</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access previous year qualifier and examination questions for IIT Madras BS program.
                    Practice with these questions to better understand the exam pattern and improve your performance.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-6 py-2">
                    Browse PYQs
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="community">
                <ResourceHubSection examType="iitm" />
              </TabsContent>

              <TabsContent value="paid">
                <div className="py-12 text-center">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <GraduationCap className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Premium Courses</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access premium courses designed specifically for IITM BS students.
                    Get in-depth explanations, practice problems, and personalized guidance.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-6 py-2">
                    Browse Courses
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="syllabus">
                <div className="py-12 text-center">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <FileText className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Detailed Syllabus</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access the detailed syllabus for all courses in the IIT Madras BS program.
                    Understand what topics to focus on for your qualifiers and term-end exams.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-6 py-2">
                    View Syllabus
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="news">
                <div className="py-12 text-center">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <Users className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Latest News & Updates</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Stay updated with the latest announcements, events, and news related to the IIT Madras BS program.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-6 py-2">
                    View News
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="dates">
                <div className="py-12 text-center">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <Calendar className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Important Dates</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Keep track of important dates for admissions, registrations, exams, and results for the IIT Madras BS program.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-6 py-2">
                    View Calendar
                  </Button>
                </div>
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
