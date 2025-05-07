
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

const NEETPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [classFilter, setClassFilter] = useState("all"); // "all", "11", "12"
  const [subjectFilter, setSubjectFilter] = useState("all"); // "all", "biology", "physics", "chemistry"
  const [biologyTypeFilter, setbiologyTypeFilter] = useState(""); // For Biology: "zoology", "botany"
  const [chemistryTypeFilter, setChemistryTypeFilter] = useState(""); // For Chemistry: "organic", "inorganic", "physical"
  
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
    "zoology-11-ch1": 52,
    "zoology-11-ch2": 47,
    "physics-11-ch1": 39,
    "physics-11-ch2": 31,
    "chemistry-organic-11-ch1": 42,
    "chemistry-inorganic-11-ch1": 36,
    "chemistry-physical-11-ch1": 29,
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

  const chapters = {
    "biology": {
      "botany": {
        "11": [
          { id: "botany-11-ch1", title: "Cell: The Unit of Life", description: "Class 11 Botany Chapter 1" },
          { id: "botany-11-ch2", title: "Plant Morphology", description: "Class 11 Botany Chapter 2" },
          { id: "botany-11-ch3", title: "Plant Anatomy", description: "Class 11 Botany Chapter 3" },
        ],
        "12": [
          { id: "botany-12-ch1", title: "Reproduction in Plants", description: "Class 12 Botany Chapter 1" },
          { id: "botany-12-ch2", title: "Genetics and Evolution", description: "Class 12 Botany Chapter 2" },
          { id: "botany-12-ch3", title: "Plant Physiology", description: "Class 12 Botany Chapter 3" },
        ]
      },
      "zoology": {
        "11": [
          { id: "zoology-11-ch1", title: "Animal Kingdom", description: "Class 11 Zoology Chapter 1" },
          { id: "zoology-11-ch2", title: "Structural Organization in Animals", description: "Class 11 Zoology Chapter 2" },
          { id: "zoology-11-ch3", title: "Biomolecules", description: "Class 11 Zoology Chapter 3" },
        ],
        "12": [
          { id: "zoology-12-ch1", title: "Human Reproduction", description: "Class 12 Zoology Chapter 1" },
          { id: "zoology-12-ch2", title: "Human Health and Disease", description: "Class 12 Zoology Chapter 2" },
          { id: "zoology-12-ch3", title: "Evolution", description: "Class 12 Zoology Chapter 3" },
        ]
      }
    },
    "physics": {
      "11": [
        { id: "physics-11-ch1", title: "Physical World and Measurement", description: "Class 11 Physics Chapter 1" },
        { id: "physics-11-ch2", title: "Kinematics", description: "Class 11 Physics Chapter 2" },
        { id: "physics-11-ch3", title: "Laws of Motion", description: "Class 11 Physics Chapter 3" },
      ],
      "12": [
        { id: "physics-12-ch1", title: "Electrostatics", description: "Class 12 Physics Chapter 1" },
        { id: "physics-12-ch2", title: "Current Electricity", description: "Class 12 Physics Chapter 2" },
        { id: "physics-12-ch3", title: "Magnetic Effects of Current", description: "Class 12 Physics Chapter 3" },
      ]
    },
    "chemistry": {
      "organic": {
        "11": [
          { id: "chemistry-organic-11-ch1", title: "Basic Organic Chemistry", description: "Class 11 Organic Chemistry Chapter 1" },
          { id: "chemistry-organic-11-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 2" },
        ],
        "12": [
          { id: "chemistry-organic-12-ch1", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 1" },
          { id: "chemistry-organic-12-ch2", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 2" },
        ]
      },
      "inorganic": {
        "11": [
          { id: "chemistry-inorganic-11-ch1", title: "Classification of Elements", description: "Class 11 Inorganic Chemistry Chapter 1" },
          { id: "chemistry-inorganic-11-ch2", title: "Chemical Bonding", description: "Class 11 Inorganic Chemistry Chapter 2" },
        ],
        "12": [
          { id: "chemistry-inorganic-12-ch1", title: "p-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 1" },
          { id: "chemistry-inorganic-12-ch2", title: "d and f Block Elements", description: "Class 12 Inorganic Chemistry Chapter 2" },
        ]
      },
      "physical": {
        "11": [
          { id: "chemistry-physical-11-ch1", title: "States of Matter", description: "Class 11 Physical Chemistry Chapter 1" },
          { id: "chemistry-physical-11-ch2", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 2" },
        ],
        "12": [
          { id: "chemistry-physical-12-ch1", title: "Solutions", description: "Class 12 Physical Chemistry Chapter 1" },
          { id: "chemistry-physical-12-ch2", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 2" },
        ]
      }
    }
  };

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

  // Get chapters based on the filters
  const getFilteredChapters = () => {
    if (subjectFilter === "all" || classFilter === "all") return [];

    if (subjectFilter === "biology") {
      // For biology, we need to handle the subchapters
      if (biologyTypeFilter === "botany") {
        return chapters.biology.botany[classFilter as keyof typeof chapters.biology.botany] || [];
      } else if (biologyTypeFilter === "zoology") {
        return chapters.biology.zoology[classFilter as keyof typeof chapters.biology.zoology] || [];
      } else {
        return [];
      }
    } else if (subjectFilter === "chemistry") {
      // For chemistry, we also need to handle the subchapters
      if (chemistryTypeFilter === "organic") {
        return chapters.chemistry.organic[classFilter as keyof typeof chapters.chemistry.organic] || [];
      } else if (chemistryTypeFilter === "inorganic") {
        return chapters.chemistry.inorganic[classFilter as keyof typeof chapters.chemistry.inorganic] || [];
      } else if (chemistryTypeFilter === "physical") {
        return chapters.chemistry.physical[classFilter as keyof typeof chapters.chemistry.physical] || [];
      } else {
        return [];
      }
    } else {
      // For physics
      return chapters.physics[classFilter as keyof typeof chapters.physics] || [];
    }
  };

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
                          setbiologyTypeFilter("");
                          setChemistryTypeFilter("");
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
                          setbiologyTypeFilter("");
                          setChemistryTypeFilter("");
                        }}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Subjects</SelectItem>
                          <SelectItem value="biology">Biology</SelectItem>
                          <SelectItem value="physics">Physics</SelectItem>
                          <SelectItem value="chemistry">Chemistry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {subjectFilter === "biology" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Biology Type</label>
                        <Select 
                          value={biologyTypeFilter} 
                          onValueChange={setbiologyTypeFilter}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Biology Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">All Types</SelectItem>
                            <SelectItem value="botany">Botany</SelectItem>
                            <SelectItem value="zoology">Zoology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    {subjectFilter === "chemistry" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Chemistry Type</label>
                        <Select 
                          value={chemistryTypeFilter} 
                          onValueChange={setChemistryTypeFilter}
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
