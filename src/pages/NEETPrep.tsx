import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Users, 
  Calendar, 
  Bell, 
  Download, 
  Search, 
  Filter, 
  Star,
  Link as LinkIcon,
  FileCheck 
} from "lucide-react";
import NEETSubjectBlock from "@/components/NEETSubjectBlock";

const NEETPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  const [downloads, setDownloads] = useState({
    "biology-notes": 124,
    "physics-notes": 87,
    "chemistry-notes": 95,
    "full-syllabus": 203,
    "biology-pyq": 78,
    "physics-pyq": 64,
    "chemistry-pyq": 71,
    "botany-11-ch1": 45,
    "botany-11-ch2": 38,
    "botany-11-ch3": 42,
    "botany-12-ch1": 36,
    "botany-12-ch2": 33,
    "botany-12-ch3": 30,
    "zoology-11-ch1": 52,
    "zoology-11-ch2": 47,
    "zoology-11-ch3": 43,
    "zoology-12-ch1": 39,
    "zoology-12-ch2": 37,
    "zoology-12-ch3": 34,
    "physics-11-ch1": 39,
    "physics-11-ch2": 31,
    "physics-11-ch3": 28,
    "physics-12-ch1": 35,
    "physics-12-ch2": 30,
    "physics-12-ch3": 27,
    "chemistry-organic-11-ch1": 42,
    "chemistry-organic-11-ch2": 38,
    "chemistry-organic-12-ch1": 36,
    "chemistry-organic-12-ch2": 33,
    "chemistry-inorganic-11-ch1": 36,
    "chemistry-inorganic-11-ch2": 32,
    "chemistry-inorganic-12-ch1": 30,
    "chemistry-inorganic-12-ch2": 27,
    "chemistry-physical-11-ch1": 29,
    "chemistry-physical-11-ch2": 25,
    "chemistry-physical-12-ch1": 28,
    "chemistry-physical-12-ch2": 23,
    "neet-2024-set-a": 58,
    "neet-2024-set-b": 46,
    "neet-2023-set-a": 72,
    "neet-2023-set-b": 65,
    "neet-2022-set-a": 89,
    "neet-2022-set-b": 83,
  });

  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
    // Actual download logic would go here
  };
  
  const subjectCards = [
    { 
      id: "physics", 
      title: "Physics", 
      description: "Comprehensive notes and previous year papers", 
      color: "bg-blue-100 text-blue-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    },
    { 
      id: "chemistry", 
      title: "Chemistry", 
      description: "Organic, Inorganic, and Physical Chemistry resources", 
      color: "bg-green-100 text-green-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    },
    { 
      id: "biology", 
      title: "Biology", 
      description: "Botany and Zoology study materials", 
      color: "bg-purple-100 text-purple-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
    },
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
            <Tabs defaultValue="subjects" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="subjects" className="rounded-md">Subjects</TabsTrigger>
                <TabsTrigger value="community" className="rounded-md">Padhai Mitra</TabsTrigger>
                <TabsTrigger value="syllabus" className="rounded-md">Syllabus</TabsTrigger>
                <TabsTrigger value="news" className="rounded-md">News Updates</TabsTrigger>
                <TabsTrigger value="dates" className="rounded-md">Important Dates</TabsTrigger>
                <TabsTrigger value="mock" className="rounded-md">Mock Tests</TabsTrigger>
              </TabsList>

              <TabsContent value="subjects">
                {activeSubject ? (
                  <div>
                    <Button 
                      variant="outline" 
                      className="mb-6"
                      onClick={() => setActiveSubject(null)}
                    >
                      &larr; Back to Subjects
                    </Button>
                    
                    <NEETSubjectBlock 
                      subject={activeSubject}
                      downloads={downloads}
                      onDownload={handleDownload}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subjectCards.map((subject) => (
                      <Card 
                        key={subject.id} 
                        className="border-none shadow-md hover:shadow-xl transition-all cursor-pointer"
                        onClick={() => setActiveSubject(subject.id)}
                      >
                        <CardHeader>
                          <div className={`rounded-full ${subject.color} p-3 w-14 h-14 flex items-center justify-center mb-4`}>
                            {subject.icon}
                          </div>
                          <CardTitle>{subject.title}</CardTitle>
                          <CardDescription>{subject.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                            Explore Resources
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="community">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <h3 className="text-2xl font-bold mb-6">Community Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {communityLinks.map((link, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <div className="rounded-full bg-royal/10 p-2 mr-3">
                                <Users className="h-5 w-5 text-royal" />
                              </div>
                              <div>
                                <CardTitle className="text-lg">{link.title}</CardTitle>
                                <CardDescription>{link.type} Group</CardDescription>
                              </div>
                            </div>
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

                  <div className="lg:col-span-4">
                    <h3 className="text-2xl font-bold mb-6">NEET Telegram Community</h3>
                    <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-blue-50 to-indigo-50">
                      <CardHeader>
                        <div className="flex items-center">
                          <div className="rounded-full bg-blue-500 p-3 mr-4">
                            <LinkIcon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <CardTitle>Official Telegram Group</CardTitle>
                            <CardDescription>Join our main community channel</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Connect with fellow NEET aspirants, share resources, and get your doubts resolved in our official Telegram community
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          <a href="https://t.me/example-neet" target="_blank" rel="noopener noreferrer">
                            Join Telegram Group
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>

                    <div className="mt-6">
                      <h3 className="text-2xl font-bold mb-6">Study Guides</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {studyGuides.map((guide, index) => (
                          <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                            <CardHeader className="pb-2">
                              <div className="flex items-center">
                                <div className="rounded-full bg-royal/10 p-2 mr-3">
                                  <BookOpen className="h-5 w-5 text-royal" />
                                </div>
                                <div>
                                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                                  <CardDescription>{guide.description}</CardDescription>
                                </div>
                              </div>
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
                </div>
              </TabsContent>

              <TabsContent value="syllabus">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle>NEET Syllabus (2025)</CardTitle>
                    <CardDescription>Complete syllabus for all subjects in NEET examination</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <FileCheck className="h-5 w-5 text-royal" />
                          </div>
                          Physics
                        </h3>
                        <p className="text-gray-700"><span className="font-semibold">Class 11:</span> Physical world and measurement, Kinematics, Laws of Motion, Work, Energy and Power, Motion of System of Particles and Rigid Body, Gravitation, Properties of Bulk Matter, Thermodynamics, Behaviour of Perfect Gas and Kinetic Theory, Oscillations and Waves.</p>
                        <p className="text-gray-700 mt-2"><span className="font-semibold">Class 12:</span> Electrostatics, Current Electricity, Magnetic Effects of Current and Magnetism, Electromagnetic Induction and Alternating Currents, Electromagnetic Waves, Optics, Dual Nature of Matter and Radiation, Atoms and Nuclei, Electronic Devices.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <FileCheck className="h-5 w-5 text-royal" />
                          </div>
                          Chemistry
                        </h3>
                        <p className="text-gray-700"><span className="font-semibold">Class 11:</span> Some Basic Concepts of Chemistry, Structure of Atom, Classification of Elements and Periodicity in Properties, Chemical Bonding and Molecular Structure, States of Matter, Thermodynamics, Equilibrium, Redox Reactions, Hydrogen, s-Block Elements, p-Block Elements, Organic Chemistry – Basic Principles, Hydrocarbons, Environmental Chemistry.</p>
                        <p className="text-gray-700 mt-2"><span className="font-semibold">Class 12:</span> Solid State, Solutions, Electrochemistry, Chemical Kinetics, Surface Chemistry, Isolation of Elements, p-Block Elements, d and f Block Elements, Coordination Compounds, Haloalkanes and Haloarenes, Alcohols, Phenols and Ethers, Aldehydes, Ketones and Carboxylic Acids, Amines, Biomolecules, Polymers, Chemistry in Everyday Life.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <FileCheck className="h-5 w-5 text-royal" />
                          </div>
                          Biology
                        </h3>
                        <p className="text-gray-700"><span className="font-semibold">Class 11:</span> Diversity in Living World, Structural Organization in Animals and Plants, Cell Structure and Function, Plant Physiology, Human Physiology.</p>
                        <p className="text-gray-700 mt-2"><span className="font-semibold">Class 12:</span> Reproduction, Genetics and Evolution, Biology and Human Welfare, Biotechnology and its Applications, Ecology and Environment.</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-gray-50 border-t">
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
                      <CardHeader className="pb-2 bg-gray-50 border-b">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{news.title}</CardTitle>
                          <Badge variant="outline" className="bg-royal/5 text-royal">
                            {news.date}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <p className="text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at semper magna, in vehicula eros. Nullam non justo rhoncus, vestibulum arcu vel, lobortis orci.
                        </p>
                      </CardContent>
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
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Calendar className="h-6 w-6 mr-2 text-royal" />
                    Important Dates & Deadlines
                  </h3>
                  <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
                              <Badge variant="outline" className="bg-royal/5 text-royal font-medium">
                                {item.date}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mock">
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <div className="rounded-full bg-royal/10 p-6 inline-flex mb-6">
                    <Star className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">NEET Mock Tests</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access our comprehensive NEET mock tests to practice and evaluate your preparation. 
                    Our mock tests are designed to simulate the actual exam experience and help you identify your strengths and weaknesses.
                  </p>
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
