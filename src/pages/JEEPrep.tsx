
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
  Video,
  Link as LinkIcon,
  FileCheck
} from "lucide-react";

const JEEPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all"); // "all", "11", "12"
  const [subjectFilter, setSubjectFilter] = useState("all"); // "all", "physics", "chemistry", "math"
  const [chapterFilter, setChapterFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("all"); // "all", "session1", "session2"
  const [yearFilter, setYearFilter] = useState("all"); // "all", "2024", "2023", "2022"
  
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
    "physics-11-ch1": 62,
    "physics-11-ch2": 58,
    "chemistry-11-organic-ch1": 76,
    "chemistry-11-inorganic-ch1": 41,
    "chemistry-11-physical-ch1": 38,
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
    { id: "math-notes", title: "Mathematics Complete Notes", description: "Comprehensive notes covering all topics in JEE Mathematics" },
    { id: "physics-notes", title: "Physics Complete Notes", description: "Detailed notes covering all topics in JEE Physics" },
    { id: "chemistry-notes", title: "Chemistry Complete Notes", description: "In-depth notes covering all topics in JEE Chemistry" },
  ];

  const chapters = {
    "math": {
      "11": [
        { id: "math-11-ch1", title: "Sets, Relations and Functions", description: "Class 11 Mathematics Chapter 1" },
        { id: "math-11-ch2", title: "Complex Numbers and Quadratic Equations", description: "Class 11 Mathematics Chapter 2" },
        { id: "math-11-ch3", title: "Matrices and Determinants", description: "Class 11 Mathematics Chapter 3" },
        { id: "math-11-ch4", title: "Permutations and Combinations", description: "Class 11 Mathematics Chapter 4" },
        { id: "math-11-ch5", title: "Mathematical Induction", description: "Class 11 Mathematics Chapter 5" },
        { id: "math-11-ch6", title: "Binomial Theorem", description: "Class 11 Mathematics Chapter 6" },
      ],
      "12": [
        { id: "math-12-ch1", title: "Differential Calculus", description: "Class 12 Mathematics Chapter 1" },
        { id: "math-12-ch2", title: "Integral Calculus", description: "Class 12 Mathematics Chapter 2" },
        { id: "math-12-ch3", title: "Vectors and 3D Geometry", description: "Class 12 Mathematics Chapter 3" },
        { id: "math-12-ch4", title: "Probability", description: "Class 12 Mathematics Chapter 4" },
      ]
    },
    "physics": {
      "11": [
        { id: "physics-11-ch1", title: "Physics and Measurement", description: "Class 11 Physics Chapter 1" },
        { id: "physics-11-ch2", title: "Kinematics", description: "Class 11 Physics Chapter 2" },
        { id: "physics-11-ch3", title: "Laws of Motion", description: "Class 11 Physics Chapter 3" },
      ],
      "12": [
        { id: "physics-12-ch1", title: "Electrostatics", description: "Class 12 Physics Chapter 1" },
        { id: "physics-12-ch2", title: "Current Electricity", description: "Class 12 Physics Chapter 2" },
        { id: "physics-12-ch3", title: "Magnetic Effects", description: "Class 12 Physics Chapter 3" },
      ]
    },
    "chemistry": {
      "organic": {
        "11": [
          { id: "chemistry-11-organic-ch1", title: "Basic Organic Chemistry", description: "Class 11 Organic Chemistry Chapter 1" },
          { id: "chemistry-11-organic-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 2" },
        ],
        "12": [
          { id: "chemistry-12-organic-ch1", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 1" },
          { id: "chemistry-12-organic-ch2", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 2" },
        ]
      },
      "inorganic": {
        "11": [
          { id: "chemistry-11-inorganic-ch1", title: "Periodic Table and Properties", description: "Class 11 Inorganic Chemistry Chapter 1" },
          { id: "chemistry-11-inorganic-ch2", title: "Chemical Bonding", description: "Class 11 Inorganic Chemistry Chapter 2" },
        ],
        "12": [
          { id: "chemistry-12-inorganic-ch1", title: "d and f Block Elements", description: "Class 12 Inorganic Chemistry Chapter 1" },
          { id: "chemistry-12-inorganic-ch2", title: "Coordination Compounds", description: "Class 12 Inorganic Chemistry Chapter 2" },
        ]
      },
      "physical": {
        "11": [
          { id: "chemistry-11-physical-ch1", title: "States of Matter", description: "Class 11 Physical Chemistry Chapter 1" },
          { id: "chemistry-11-physical-ch2", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 2" },
        ],
        "12": [
          { id: "chemistry-12-physical-ch1", title: "Solutions", description: "Class 12 Physical Chemistry Chapter 1" },
          { id: "chemistry-12-physical-ch2", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 2" },
        ]
      }
    }
  };

  const pyqs = {
    "session1": {
      "2024": [
        { id: "jee-s1-2024-paper1", title: "JEE Main 2024 Session 1 - Paper 1", description: "Complete question paper with solutions" },
        { id: "jee-s1-2024-paper2", title: "JEE Main 2024 Session 1 - Paper 2", description: "Complete question paper with solutions" },
      ],
      "2023": [
        { id: "jee-s1-2023-paper1", title: "JEE Main 2023 Session 1 - Paper 1", description: "Complete question paper with solutions" },
        { id: "jee-s1-2023-paper2", title: "JEE Main 2023 Session 1 - Paper 2", description: "Complete question paper with solutions" },
      ],
      "2022": [
        { id: "jee-s1-2022-paper1", title: "JEE Main 2022 Session 1 - Paper 1", description: "Complete question paper with solutions" },
      ]
    },
    "session2": {
      "2024": [
        { id: "jee-s2-2024-paper1", title: "JEE Main 2024 Session 2 - Paper 1", description: "Complete question paper with solutions" },
      ],
      "2023": [
        { id: "jee-s2-2023-paper1", title: "JEE Main 2023 Session 2 - Paper 1", description: "Complete question paper with solutions" },
        { id: "jee-s2-2023-paper2", title: "JEE Main 2023 Session 2 - Paper 2", description: "Complete question paper with solutions" },
      ],
      "2022": [
        { id: "jee-s2-2022-paper1", title: "JEE Main 2022 Session 2 - Paper 1", description: "Complete question paper with solutions" },
      ]
    }
  };

  const communityLinks = [
    { title: "JEE General Discussion", type: "WhatsApp", link: "https://chat.whatsapp.com/example-jee1" },
    { title: "JEE Mathematics Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-jee2" },
    { title: "JEE Chemistry Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-jee3" },
    { title: "JEE Physics Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-jee4" },
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

  // Filter PYQs based on the filters
  const getFilteredPYQs = () => {
    const session = sessionFilter === "all" ? ["session1", "session2"] : [sessionFilter];
    const year = yearFilter === "all" ? ["2024", "2023", "2022"] : [yearFilter];
    
    let filtered: any[] = [];
    
    session.forEach(s => {
      year.forEach(y => {
        if (pyqs[s as keyof typeof pyqs] && pyqs[s as keyof typeof pyqs][y as keyof typeof pyqs["session1"]]) {
          filtered = [...filtered, ...pyqs[s as keyof typeof pyqs][y as keyof typeof pyqs["session1"]]];
        }
      });
    });
    
    return filtered;
  };

  // Get chapters based on the filters
  const getFilteredChapters = () => {
    if (subjectFilter === "all" || classFilter === "all") return [];

    if (subjectFilter === "chemistry") {
      // For chemistry, we need to handle the subchapters
      if (chapterFilter === "organic") {
        return chapters.chemistry.organic[classFilter as keyof typeof chapters.chemistry.organic] || [];
      } else if (chapterFilter === "inorganic") {
        return chapters.chemistry.inorganic[classFilter as keyof typeof chapters.chemistry.inorganic] || [];
      } else if (chapterFilter === "physical") {
        return chapters.chemistry.physical[classFilter as keyof typeof chapters.chemistry.physical] || [];
      } else {
        return [];
      }
    } else {
      // For physics and math
      return chapters[subjectFilter as "math" | "physics"][classFilter as keyof typeof chapters["math"]] || [];
    }
  };

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
            <Tabs defaultValue="notes" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="notes" className="rounded-md">Notes</TabsTrigger>
                <TabsTrigger value="pyqs" className="rounded-md">PYQs</TabsTrigger>
                <TabsTrigger value="community" className="rounded-md">Padhai Mitra</TabsTrigger>
                <TabsTrigger value="syllabus" className="rounded-md">Syllabus</TabsTrigger>
                <TabsTrigger value="news" className="rounded-md">News Updates</TabsTrigger>
                <TabsTrigger value="dates" className="rounded-md">Important Dates</TabsTrigger>
                <TabsTrigger value="mock" className="rounded-md">Mock Tests</TabsTrigger>
              </TabsList>

              <TabsContent value="notes">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4">Filter Notes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
                      <Select 
                        value={classFilter} 
                        onValueChange={(value) => {
                          setClassFilter(value);
                          setChapterFilter("");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Classes</SelectItem>
                          <SelectItem value="11">Class 11</SelectItem>
                          <SelectItem value="12">Class 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                      <Select 
                        value={subjectFilter} 
                        onValueChange={(value) => {
                          setSubjectFilter(value);
                          setChapterFilter("");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                          <SelectItem value="math">Mathematics</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {subjectFilter === "chemistry" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chemistry Type</label>
                        <Select 
                          value={chapterFilter} 
                          onValueChange={setChapterFilter}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Chemistry Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Types</SelectItem>
                            <SelectItem value="organic">Organic</SelectItem>
                            <SelectItem value="inorganic">Inorganic</SelectItem>
                            <SelectItem value="physical">Physical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </div>

                {(classFilter === "all" || subjectFilter === "all") ? (
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
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredChapters().map((chapter) => (
                      <Card key={chapter.id} className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{chapter.title}</CardTitle>
                            <Badge variant="outline" className="ml-2">
                              Class {classFilter}
                            </Badge>
                          </div>
                          <CardDescription>{chapter.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                          <Button 
                            onClick={() => handleDownload(chapter.id)}
                            className="bg-royal hover:bg-royal-dark text-white"
                          >
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                          <span className="text-sm text-gray-500">{downloads[chapter.id] || 0} downloads</span>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4">Filter Previous Year Papers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
                      <Select 
                        value={sessionFilter} 
                        onValueChange={setSessionFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Session" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Sessions</SelectItem>
                          <SelectItem value="session1">Session 1</SelectItem>
                          <SelectItem value="session2">Session 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <Select 
                        value={yearFilter} 
                        onValueChange={setYearFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredPYQs().map((pyq) => (
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
                        <span className="text-sm text-gray-500">{downloads[pyq.id] || 0} downloads</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
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
