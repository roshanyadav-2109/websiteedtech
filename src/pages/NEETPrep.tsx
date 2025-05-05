
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, BookOpen, Users, Calendar, Bell, Download, Search } from "lucide-react";

const NEETPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [downloads, setDownloads] = useState({
    "biology-notes": 124,
    "physics-notes": 87,
    "chemistry-notes": 95,
    "full-syllabus": 203,
    "biology-pyq": 78,
    "physics-pyq": 64,
    "chemistry-pyq": 71,
  });

  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
    // Actual download logic would go here
  };

  // Filter resources based on search query
  const filterResources = (items: any[]) => {
    if (!searchQuery) return items;
    return items.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const notes = [
    { id: "biology-notes", title: "Biology Complete Notes", description: "Comprehensive notes covering all topics in NEET Biology" },
    { id: "physics-notes", title: "Physics Complete Notes", description: "Detailed notes covering all topics in NEET Physics" },
    { id: "chemistry-notes", title: "Chemistry Complete Notes", description: "In-depth notes covering all topics in NEET Chemistry" },
  ];

  const pyqs = [
    { id: "biology-pyq", title: "Biology Previous Year Questions (2015-2024)", description: "Compiled PYQs with solutions" },
    { id: "physics-pyq", title: "Physics Previous Year Questions (2015-2024)", description: "Compiled PYQs with solutions" },
    { id: "chemistry-pyq", title: "Chemistry Previous Year Questions (2015-2024)", description: "Compiled PYQs with solutions" },
  ];

  const communityLinks = [
    { title: "NEET General Discussion", type: "WhatsApp", link: "https://chat.whatsapp.com/example1" },
    { title: "NEET Biology Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example2" },
    { title: "NEET Chemistry Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example3" },
    { title: "NEET Physics Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example4" },
    { title: "Unknown IITians NEET Community", type: "Telegram", link: "https://t.me/example1" },
  ];

  const studyGuides = [
    { title: "Biology Study Strategy", description: "Effective approaches to master NEET Biology" },
    { title: "Physics Formula Handbook", description: "Quick reference guide for all important formulas" },
    { title: "Chemistry Reaction Guide", description: "Master all important reactions for NEET Chemistry" },
    { title: "30-Day NEET Revision Plan", description: "Structured revision plan for the final month" },
  ];

  const importantDates = [
    { event: "NEET 2025 Registration Opens", date: "December 2024" },
    { event: "NEET 2025 Registration Closes", date: "January 2025" },
    { event: "NEET 2025 Admit Card Release", date: "April 2025" },
    { event: "NEET 2025 Exam Date", date: "May 2025" },
    { event: "NEET 2025 Result Declaration", date: "June 2025" },
  ];

  const newsUpdates = [
    { title: "NEET 2025 Pattern Change Announced", date: "October 10, 2024" },
    { title: "Supreme Court Decision on NEET Counselling", date: "September 28, 2024" },
    { title: "NMC Releases New Guidelines for MBBS Admissions", date: "September 15, 2024" },
    { title: "Changes in NEET Syllabus for 2025", date: "August 30, 2024" },
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">NEET Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive resources to help you excel in your NEET examination
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
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="pyqs">PYQs</TabsTrigger>
                <TabsTrigger value="community">Padhai Mitra</TabsTrigger>
                <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
                <TabsTrigger value="news">News Updates</TabsTrigger>
                <TabsTrigger value="dates">Important Dates</TabsTrigger>
                <TabsTrigger value="mock">Mock Tests</TabsTrigger>
              </TabsList>

              <TabsContent value="notes">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterResources(notes).map((note) => (
                    <Card key={note.id} className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle>{note.title}</CardTitle>
                        <CardDescription>{note.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Button 
                          onClick={() => handleDownload(note.id)}
                          className="bg-royal hover:bg-royal-dark text-white"
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                        <span className="text-sm text-gray-500">{downloads[note.id]} downloads</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterResources(pyqs).map((pyq) => (
                    <Card key={pyq.id} className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader>
                        <CardTitle>{pyq.title}</CardTitle>
                        <CardDescription>{pyq.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex justify-between">
                        <Button 
                          onClick={() => handleDownload(pyq.id)}
                          className="bg-royal hover:bg-royal-dark text-white"
                        >
                          <Download className="h-4 w-4 mr-2" /> Download
                        </Button>
                        <span className="text-sm text-gray-500">{downloads[pyq.id]} downloads</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="community">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-6">Community Links</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {communityLinks.map((link, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{link.title}</CardTitle>
                            <CardDescription>{link.type} Group</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button asChild className="w-full bg-royal hover:bg-royal-dark text-white">
                              <a href={link.link} target="_blank" rel="noopener noreferrer">
                                Join Group
                              </a>
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold mb-6">Study Guides</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {studyGuides.map((guide, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{guide.title}</CardTitle>
                            <CardDescription>{guide.description}</CardDescription>
                          </CardHeader>
                          <CardFooter>
                            <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                              <Download className="h-4 w-4 mr-2" /> Download Guide
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="syllabus">
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle>NEET Syllabus (2025)</CardTitle>
                    <CardDescription>Complete syllabus for all subjects in NEET examination</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-2">Physics</h3>
                        <p className="text-gray-700">Class 11: Physical world and measurement, Kinematics, Laws of Motion, Work, Energy and Power, Motion of System of Particles and Rigid Body, Gravitation, Properties of Bulk Matter, Thermodynamics, Behaviour of Perfect Gas and Kinetic Theory, Oscillations and Waves.</p>
                        <p className="text-gray-700 mt-2">Class 12: Electrostatics, Current Electricity, Magnetic Effects of Current and Magnetism, Electromagnetic Induction and Alternating Currents, Electromagnetic Waves, Optics, Dual Nature of Matter and Radiation, Atoms and Nuclei, Electronic Devices.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">Chemistry</h3>
                        <p className="text-gray-700">Class 11: Some Basic Concepts of Chemistry, Structure of Atom, Classification of Elements and Periodicity in Properties, Chemical Bonding and Molecular Structure, States of Matter, Thermodynamics, Equilibrium, Redox Reactions, Hydrogen, s-Block Elements, p-Block Elements, Organic Chemistry – Basic Principles, Hydrocarbons, Environmental Chemistry.</p>
                        <p className="text-gray-700 mt-2">Class 12: Solid State, Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, Isolation of Elements, p-Block Elements, d and f Block Elements, Coordination Compounds, Haloalkanes and Haloarenes, Alcohols, Phenols and Ethers, Aldehydes, Ketones and Carboxylic Acids, Amines, Biomolecules, Polymers, Chemistry in Everyday Life.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">Biology</h3>
                        <p className="text-gray-700">Class 11: Diversity in Living World, Structural Organization in Animals and Plants, Cell Structure and Function, Plant Physiology, Human Physiology.</p>
                        <p className="text-gray-700 mt-2">Class 12: Reproduction, Genetics and Evolution, Biology and Human Welfare, Biotechnology and its Applications, Ecology and Environment.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      onClick={() => handleDownload("full-syllabus")}
                      className="bg-royal hover:bg-royal-dark text-white"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download Full Syllabus
                    </Button>
                    <span className="text-sm text-gray-500">{downloads["full-syllabus"]} downloads</span>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="news">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">Latest News & Updates</h3>
                  {newsUpdates.map((news, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{news.title}</CardTitle>
                          <span className="text-sm text-gray-500">{news.date}</span>
                        </div>
                      </CardHeader>
                      <CardFooter>
                        <Button className="bg-royal hover:bg-royal-dark text-white">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="dates">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold mb-4">Important Dates & Deadlines</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-3 px-6 text-left text-lg font-bold text-gray-900">Event</th>
                          <th className="py-3 px-6 text-left text-lg font-bold text-gray-900">Expected Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {importantDates.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-4 px-6 text-gray-900">{item.event}</td>
                            <td className="py-4 px-6 text-gray-900">{item.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mock">
                <div className="text-center py-8">
                  <h3 className="text-2xl font-bold mb-4">NEET Mock Tests</h3>
                  <p className="text-gray-600 mb-6">Access our comprehensive NEET mock tests to practice and evaluate your preparation.</p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-8 py-6 text-lg">
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

export default NEETPrep;
