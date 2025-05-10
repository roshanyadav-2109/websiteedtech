
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  BookOpen, 
  Users, 
  Calendar, 
  Search, 
  Download,
  GraduationCap
} from "lucide-react";
import IITMBSNotesSection from "@/components/IITMBSNotesSection";

const IITMBSPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  
  const [downloads, setDownloads] = useState({
    "iitm-ds-notes": 156,
    "iitm-fc-notes": 132,
    "iitm-es-notes": 118,
    "iitm-full-syllabus": 226,
    "iitm-ds-foundations": 78,
    "iitm-ds-programming": 65,
    "iitm-ds-ml": 89,
    "iitm-ds-statistics": 72,
    "iitm-fc-mathematics": 68,
    "iitm-fc-physics": 62,
    "iitm-fc-chemistry": 58,
    "iitm-fc-english": 54,
    "iitm-es-electronics": 76,
    "iitm-es-circuits": 64,
    "iitm-es-signals": 59,
    "iitm-es-systems": 52,
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
      id: "data-science", 
      title: "Data Science", 
      description: "Python, Statistics, Machine Learning and more", 
      color: "bg-blue-100 text-blue-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    { 
      id: "foundation-courses", 
      title: "Foundation Courses", 
      description: "Mathematics, Physics, Chemistry, and English", 
      color: "bg-green-100 text-green-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13c-1.168-.775-2.754-1.253-4.5-1.253-1.746 0-3.332.477-4.5 1.253" /></svg>
    },
    { 
      id: "electronic-systems", 
      title: "Electronic Systems", 
      description: "Electronics, Circuits, Signals and Systems", 
      color: "bg-purple-100 text-purple-700",
      icon: <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
    },
  ];

  const subjectNotes = {
    "data-science": [
      { id: "iitm-ds-foundations", title: "Foundations of Data Science", description: "Basic concepts and principles" },
      { id: "iitm-ds-programming", title: "Programming with Python", description: "Python for data science applications" },
      { id: "iitm-ds-ml", title: "Machine Learning Fundamentals", description: "Introduction to machine learning algorithms" },
      { id: "iitm-ds-statistics", title: "Statistical Methods", description: "Statistical analysis for data interpretation" },
    ],
    "foundation-courses": [
      { id: "iitm-fc-mathematics", title: "Mathematics", description: "Calculus, Linear Algebra, and Probability" },
      { id: "iitm-fc-physics", title: "Physics", description: "Mechanics, Thermodynamics, and Electromagnetism" },
      { id: "iitm-fc-chemistry", title: "Chemistry", description: "General Chemistry and Chemical Principles" },
      { id: "iitm-fc-english", title: "English", description: "Technical Communication and Writing Skills" },
    ],
    "electronic-systems": [
      { id: "iitm-es-electronics", title: "Electronics Fundamentals", description: "Basic electronic components and circuits" },
      { id: "iitm-es-circuits", title: "Circuit Analysis", description: "DC and AC circuit analysis techniques" },
      { id: "iitm-es-signals", title: "Signals and Systems", description: "Signal processing and system analysis" },
      { id: "iitm-es-systems", title: "Digital Systems", description: "Digital logic design and microprocessors" },
    ],
  };

  const communityLinks = [
    { title: "IITM BS General Discussion", type: "WhatsApp", link: "https://chat.whatsapp.com/example-iitm1" },
    { title: "IITM BS Data Science", type: "WhatsApp", link: "https://chat.whatsapp.com/example-iitm2" },
    { title: "IITM BS Electronic Systems", type: "WhatsApp", link: "https://chat.whatsapp.com/example-iitm3" },
    { title: "Unknown IITians BS Community", type: "Telegram", link: "https://t.me/example-iitm1" },
  ];

  const studyGuides = [
    { title: "IITM BS Degree Guide", description: "Complete guide to the program structure" },
    { title: "Data Science Career Paths", description: "Career options after the IITM BS program" },
    { title: "Programming Preparation", description: "Resources to prepare for programming courses" },
    { title: "Exam Strategy Guide", description: "How to prepare for IITM exams" },
  ];

  const importantDates = [
    { event: "IITM BS 2025 Registration Opens", date: "December 2024" },
    { event: "IITM BS 2025 Registration Closes", date: "January 2025" },
    { event: "Qualifier Exam", date: "March 2025" },
    { event: "Foundation Level Start", date: "May 2025" },
    { event: "Diploma Level Registration", date: "September 2025" },
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">IITM BS Degree Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive resources to help you excel in your IIT Madras BS program
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
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="subjects" className="rounded-md">Subjects</TabsTrigger>
                <TabsTrigger value="community" className="rounded-md">Padhai Mitra</TabsTrigger>
                <TabsTrigger value="syllabus" className="rounded-md">Program Structure</TabsTrigger>
                <TabsTrigger value="dates" className="rounded-md">Important Dates</TabsTrigger>
                <TabsTrigger value="mock" className="rounded-md">Practice Tests</TabsTrigger>
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
                    
                    <IITMBSNotesSection 
                      subject={activeSubject === "data-science" ? "Data Science" : 
                              activeSubject === "foundation-courses" ? "Foundation Courses" : 
                              "Electronic Systems"}
                      notes={subjectNotes[activeSubject as keyof typeof subjectNotes]}
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
              </TabsContent>

              <TabsContent value="syllabus">
                <Card className="border-none shadow-lg">
                  <CardHeader className="bg-gray-50 border-b">
                    <CardTitle>IITM BS Program Structure</CardTitle>
                    <CardDescription>Overview of the curriculum and learning path</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <GraduationCap className="h-5 w-5 text-royal" />
                          </div>
                          Foundation Level
                        </h3>
                        <p className="text-gray-700">
                          The Foundation Level consists of eight courses that cover the basic concepts in Mathematics, Statistics, Programming, and Domain-specific knowledge. You need to complete this level to qualify for the diploma.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <GraduationCap className="h-5 w-5 text-royal" />
                          </div>
                          Diploma Level
                        </h3>
                        <p className="text-gray-700">
                          The Diploma Level builds on the Foundation Level with more advanced courses in your chosen specialization (Data Science or Electronic Systems). Upon completion, you'll receive a Diploma from IIT Madras.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-3 flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-2">
                            <GraduationCap className="h-5 w-5 text-royal" />
                          </div>
                          Degree Level
                        </h3>
                        <p className="text-gray-700">
                          The Degree Level consists of advanced courses and project work in your specialization. Upon successful completion, you'll be awarded a BS Degree from IIT Madras, which is equivalent to a 4-year undergraduate degree.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between bg-gray-50 border-t">
                    <Button 
                      onClick={() => handleDownload("iitm-full-syllabus")}
                      className="bg-royal hover:bg-royal-dark text-white"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download Full Program Details
                    </Button>
                    <span className="text-sm text-gray-500">{downloads["iitm-full-syllabus"]} downloads</span>
                  </CardFooter>
                </Card>
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
                    <FileText className="h-12 w-12 text-royal" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">IITM BS Practice Tests</h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    Access our comprehensive practice tests to prepare for the IITM BS entrance and qualification exams.
                    These tests are designed to simulate the actual exam experience and help you identify your strengths and weaknesses.
                  </p>
                  <Button className="bg-royal hover:bg-royal-dark text-white px-8 py-6 text-lg">
                    Start Practice Test
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
