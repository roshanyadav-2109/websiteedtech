
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import JEESubjectBlock from "@/components/JEESubjectBlock";
import JEEPYQTab from "@/components/JEEPYQTab";

const JEEPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  const [downloads, setDownloads] = useState({
    "math-notes": 145,
    "physics-notes": 132,
    "chemistry-notes": 118,
    "full-syllabus": 226,
    "math-pyq": 98,
    "physics-pyq": 87,
    "chemistry-pyq": 92,
    "math-11-ch1": 53,
    "math-11-ch2": 47,
    "math-11-ch3": 42,
    "math-11-ch4": 38,
    "math-11-ch5": 35,
    "math-11-ch6": 32,
    "math-12-ch1": 49,
    "math-12-ch2": 45,
    "math-12-ch3": 41,
    "math-12-ch4": 37,
    "physics-11-ch1": 62,
    "physics-11-ch2": 58,
    "physics-11-ch3": 54,
    "physics-12-ch1": 60,
    "physics-12-ch2": 56,
    "physics-12-ch3": 52,
    "chemistry-11-organic-ch1": 76,
    "chemistry-11-organic-ch2": 72,
    "chemistry-12-organic-ch1": 74,
    "chemistry-12-organic-ch2": 70,
    "chemistry-11-inorganic-ch1": 41,
    "chemistry-11-inorganic-ch2": 37,
    "chemistry-12-inorganic-ch1": 39,
    "chemistry-12-inorganic-ch2": 35,
    "chemistry-11-physical-ch1": 38,
    "chemistry-11-physical-ch2": 34,
    "chemistry-12-physical-ch1": 36,
    "chemistry-12-physical-ch2": 32,
    "jee-2024-jan-shift1": 68,
    "jee-2024-jan-shift2": 65,
    "jee-2024-apr-shift1": 62,
    "jee-2024-apr-shift2": 59,
    "jee-2023-jan-shift1": 78,
    "jee-2023-jan-shift2": 75,
    "jee-2023-apr-shift1": 72,
    "jee-2023-apr-shift2": 69,
    "jee-2022-jun-shift1": 88,
    "jee-2022-jun-shift2": 85,
    "jee-2022-jul-shift1": 82,
    "jee-2022-jul-shift2": 79,
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
      id: "math", 
      title: "Mathematics", 
      description: "Complete mathematics materials for JEE preparation", 
      color: "bg-purple-100 text-purple-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    },
  ];

  // Updated community links - only 1 Whatsapp and 1 Telegram
  const communityLinks = [
    { title: "JEE General Discussion", type: "WhatsApp", link: "https://chat.whatsapp.com/example-jee1" },
    { title: "Unknown IITians JEE Community", type: "Telegram", link: "https://t.me/example-jee1" },
  ];

  const studyGuides = [
    { title: "Mathematics Problem Solving Strategy", description: "Effective approaches to solve JEE Math problems" },
    { title: "Physics Formula Handbook", description: "Quick reference guide for all important formulas" },
    { title: "Chemistry Reaction Guide", description: "Master all important reactions for JEE Chemistry" },
    { title: "60-Day JEE Revision Plan", description: "Structured revision plan for the final two months" },
  ];

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
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">JEE Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive resources to help you excel in your JEE examination
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
              <ScrollArea className="w-full pb-2">
                <div className="flex w-max p-1">
                  <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full">
                    <TabsTrigger value="subjects" className="rounded-md">Subjects</TabsTrigger>
                    <TabsTrigger value="pyqs" className="rounded-md">PYQs</TabsTrigger>
                    <TabsTrigger value="community" className="rounded-md">Padhai Mitra</TabsTrigger>
                    <TabsTrigger value="syllabus" className="rounded-md">Syllabus</TabsTrigger>
                    <TabsTrigger value="news" className="rounded-md">News Updates</TabsTrigger>
                    <TabsTrigger value="dates" className="rounded-md">Important Dates</TabsTrigger>
                    <TabsTrigger value="mock" className="rounded-md">Mock Tests</TabsTrigger>
                  </TabsList>
                </div>
              </ScrollArea>

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
                    
                    <JEESubjectBlock 
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
              
              <TabsContent value="pyqs">
                <JEEPYQTab 
                  downloads={downloads}
                  onDownload={handleDownload}
                />
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
                    <h3 className="text-2xl font-bold mb-6">JEE Telegram Community</h3>
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
                          Connect with fellow JEE aspirants, share resources, and get your doubts resolved in our official Telegram community
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          <a href="https://t.me/example-jee-main" target="_blank" rel="noopener noreferrer">
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
                    <CardTitle>JEE Syllabus (2025)</CardTitle>
                    <CardDescription>Complete syllabus for all subjects in JEE examination</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <FileCheck className="h-5 w-5 text-royal" />
                          </div>
                          Mathematics
                        </h3>
                        <p className="text-gray-700">Sets, Relations and Functions, Complex Numbers and Quadratic Equations, Matrices and Determinants, Permutations and Combinations, Mathematical Induction, Binomial Theorem and its Applications, Sequences and Series, Limit, Continuity and Differentiability, Integral Calculus, Differential Equations, Coordinate Geometry, Three Dimensional Geometry, Vector Algebra, Statistics and Probability, Trigonometry, Mathematical Reasoning.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <FileCheck className="h-5 w-5 text-royal" />
                          </div>
                          Physics
                        </h3>
                        <p className="text-gray-700">Physics and Measurement, Kinematics, Laws of Motion, Work, Energy and Power, Rotational Motion, Gravitation, Properties of Solids and Liquids, Thermodynamics, Kinetic Theory of Gases, Oscillations and Waves, Electrostatics, Current Electricity, Magnetic Effects of Current and Magnetism, Electromagnetic Induction and Alternating Currents, Electromagnetic Waves, Optics, Dual Nature of Matter and Radiation, Atoms and Nuclei, Electronic Devices, Communication Systems, Experimental Skills.</p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <FileCheck className="h-5 w-5 text-royal" />
                          </div>
                          Chemistry
                        </h3>
                        <p className="text-gray-700">Some Basic Concepts of Chemistry, States of Matter, Atomic Structure, Chemical Bonding and Molecular Structure, Chemical Thermodynamics, Solutions, Equilibrium, Redox Reactions and Electrochemistry, Chemical Kinetics, Surface Chemistry, Classification of Elements and Periodicity in Properties, General Principles and Processes of Isolation of Elements, Hydrogen, s-Block Elements, p-Block Elements, d and f Block Elements, Coordination Compounds, Environmental Chemistry, Purification and Characterisation of Organic Compounds, Some Basic Principles of Organic Chemistry, Hydrocarbons, Organic Compounds Containing Halogens, Organic Compounds Containing Oxygen, Organic Compounds Containing Nitrogen, Polymers, Biomolecules, Chemistry in Everyday Life, Principles Related to Practical Chemistry.</p>
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
                  <h3 className="text-2xl font-bold mb-4">JEE Mock Tests</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access our comprehensive JEE mock tests to practice and evaluate your preparation. 
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

export default JEEPrep;
