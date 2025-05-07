
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import ResourceHubSection from "@/components/ResourceHubSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Star, Calendar, Bell, FileCheck, Users } from "lucide-react";

const JEEPrep = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const importantDates = [
    { event: "JEE Main 2025 Session 1 Registration Opens", date: "November 2024" },
    { event: "JEE Main 2025 Session 1 Registration Closes", date: "December 2024" },
    { event: "JEE Main 2025 Session 1 Exam Date", date: "January 2025" },
    { event: "JEE Main 2025 Session 1 Result", date: "February 2025" },
    { event: "JEE Main 2025 Session 2 Registration", date: "February 2025" },
    { event: "JEE Main 2025 Session 2 Exam Date", date: "April 2025" },
    { event: "JEE Advanced 2025 Registration", date: "May 2025" },
    { event: "JEE Advanced 2025 Exam Date", date: "June 2025" },
  ];

  const newsUpdates = [
    { title: "Changes in JEE Main Pattern for 2025", date: "October 15, 2024" },
    { title: "JEE Advanced to Include More Conceptual Questions", date: "September 28, 2024" },
    { title: "NTA Announces New Exam Centers for JEE 2025", date: "September 20, 2024" },
    { title: "IITs Announce New B.Tech Programs for 2025", date: "September 5, 2024" },
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              JEE Preparation
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Comprehensive resources to help you excel in your JEE examination
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
                    <TabsTrigger value="syllabus" className="flex-shrink-0">Syllabus</TabsTrigger>
                    <TabsTrigger value="news" className="flex-shrink-0">News</TabsTrigger>
                    <TabsTrigger value="dates" className="flex-shrink-0">Important Dates</TabsTrigger>
                    <TabsTrigger value="mock" className="flex-shrink-0">Mock Tests</TabsTrigger>
                  </div>
                </TabsList>
              </div>

              <TabsContent value="notes">
                <ResourceHubSection examType="jee" />
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="py-12 text-center">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <FileCheck className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Previous Year Questions</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access previous year JEE Mains and Advanced question papers with detailed solutions.
                    Practice with these questions to better understand the exam pattern and improve your performance.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-6 py-2">
                    Browse PYQs
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="community">
                <ResourceHubSection examType="jee" />
              </TabsContent>

              <TabsContent value="syllabus">
                <div className="py-8 px-4">
                  <h3 className="text-2xl font-bold mb-6 text-center">JEE Syllabus (2025)</h3>
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="text-xl font-bold mb-3 flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <FileCheck className="h-5 w-5 text-royal" />
                        </div>
                        Mathematics
                      </h4>
                      <p className="text-gray-700">
                        Sets, Relations and Functions, Complex Numbers and Quadratic Equations, Matrices and Determinants, Permutations and Combinations, Mathematical Induction, Binomial Theorem and its Applications, Sequences and Series, Limit, Continuity and Differentiability, Integral Calculus, Differential Equations, Coordinate Geometry, Three Dimensional Geometry, Vector Algebra, Statistics and Probability, Trigonometry, Mathematical Reasoning.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="text-xl font-bold mb-3 flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <FileCheck className="h-5 w-5 text-royal" />
                        </div>
                        Physics
                      </h4>
                      <p className="text-gray-700">
                        Physics and Measurement, Kinematics, Laws of Motion, Work, Energy and Power, Rotational Motion, Gravitation, Properties of Solids and Liquids, Thermodynamics, Kinetic Theory of Gases, Oscillations and Waves, Electrostatics, Current Electricity, Magnetic Effects of Current and Magnetism, Electromagnetic Induction and Alternating Currents, Electromagnetic Waves, Optics, Dual Nature of Matter and Radiation, Atoms and Nuclei, Electronic Devices, Communication Systems, Experimental Skills.
                      </p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <h4 className="text-xl font-bold mb-3 flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <FileCheck className="h-5 w-5 text-royal" />
                        </div>
                        Chemistry
                      </h4>
                      <p className="text-gray-700">
                        Some Basic Concepts of Chemistry, States of Matter, Atomic Structure, Chemical Bonding and Molecular Structure, Chemical Thermodynamics, Solutions, Equilibrium, Redox Reactions and Electrochemistry, Chemical Kinetics, Surface Chemistry, Classification of Elements and Periodicity in Properties, General Principles and Processes of Isolation of Elements, Hydrogen, s-Block Elements, p-Block Elements, d and f Block Elements, Coordination Compounds, Environmental Chemistry, Purification and Characterisation of Organic Compounds, Some Basic Principles of Organic Chemistry, Hydrocarbons, Organic Compounds Containing Halogens, Organic Compounds Containing Oxygen, Organic Compounds Containing Nitrogen, Polymers, Biomolecules, Chemistry in Everyday Life, Principles Related to Practical Chemistry.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="news">
                <div className="py-8 px-4">
                  <h3 className="text-2xl font-bold mb-6 text-center">Latest News & Updates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {newsUpdates.map((news, index) => (
                      <motion.div 
                        key={index}
                        variants={fadeInUp}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white p-6 rounded-lg shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-bold">{news.title}</h4>
                          <span className="text-sm text-royal bg-royal/10 px-2 py-1 rounded-full">
                            {news.date}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at semper magna, in vehicula eros.
                        </p>
                        <Button variant="outline" className="mt-4">
                          Read More
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dates">
                <div className="py-8 px-4">
                  <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
                    <Calendar className="h-6 w-6 mr-2 text-royal" />
                    Important Dates & Deadlines
                  </h3>
                  <div className="overflow-x-auto bg-white rounded-lg shadow-sm max-w-4xl mx-auto">
                    <table className="min-w-full bg-white border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-4 px-6 text-left text-lg font-bold text-gray-900 border-b">Event</th>
                          <th className="py-4 px-6 text-left text-lg font-bold text-gray-900 border-b">Expected Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importantDates.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50 border-b last:border-b-0">
                            <td className="py-4 px-6 text-gray-900">{item.event}</td>
                            <td className="py-4 px-6">
                              <span className="bg-royal/10 text-royal font-medium px-3 py-1 rounded-full">
                                {item.date}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mock">
                <div className="text-center py-12">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <Star className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">JEE Mock Tests</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access our comprehensive JEE mock tests to practice and evaluate your preparation. 
                    Our mock tests are designed to simulate the actual exam experience and help you identify your strengths and weaknesses.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-8 py-3 text-lg">
                    Start Mock Test
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

export default JEEPrep;
