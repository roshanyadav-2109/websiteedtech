
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, BookOpen, Users, Calendar, Bell, Download, Search, Filter, Calculator, BookOpen as BookIcon } from "lucide-react";

const IITMBSPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stream, setStream] = useState("data-science");
  const [level, setLevel] = useState("foundation");
  
  const [downloads, setDownloads] = useState({
    "ds-foundation-notes": 156,
    "ds-diploma-notes": 123,
    "ds-degree-notes": 98,
    "es-foundation-notes": 112,
    "es-diploma-notes": 87,
    "es-degree-notes": 65,
    "ds-pyq": 144,
    "es-pyq": 89,
    "qualifier-guide": 210,
  });

  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: prev[id] + 1
    }));
    // Actual download logic would go here
  };

  // Filter resources based on search query, stream and level
  const filterResources = (items: any[]) => {
    let filtered = items;
    
    // Filter by stream if applicable
    if (stream && items[0].stream) {
      filtered = filtered.filter(item => item.stream === stream);
    }
    
    // Filter by level if applicable
    if (level && items[0].level) {
      filtered = filtered.filter(item => item.level === level);
    }
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.subject && item.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    return filtered;
  };

  const dataScienceSubjects = {
    foundation: [
      { id: "ds-math-1", title: "Mathematics for Data Science I", description: "Foundational mathematics concepts for data science" },
      { id: "ds-stats-1", title: "Statistics for Data Science I", description: "Introduction to statistical concepts and methods" },
      { id: "ds-comp-thinking", title: "Computational Thinking", description: "Problem solving using computational approaches" },
      { id: "ds-english-1", title: "English I", description: "Academic writing and communication skills" },
      { id: "ds-math-2", title: "Mathematics for Data Science II", description: "Advanced mathematical concepts for data analysis" },
      { id: "ds-stats-2", title: "Statistics for Data Science II", description: "Statistical inference and hypothesis testing" },
      { id: "ds-python", title: "Programming in Python", description: "Python programming fundamentals for data science" },
      { id: "ds-english-2", title: "English II", description: "Advanced communication and presentation skills" }
    ],
    diploma: [
      { id: "ds-ml-foundations", title: "Machine Learning Foundations", description: "Core concepts of machine learning algorithms" },
      { id: "ds-business-data", title: "Business Data Management", description: "Managing and analyzing business data" },
      { id: "ds-bdm-project", title: "Business Data Management - Project", description: "Practical project on business data" },
      { id: "ds-ml-tech", title: "Machine Learning Techniques", description: "Advanced ML algorithms and implementations" },
      { id: "ds-ml-practice", title: "Machine Learning Practice", description: "Hands-on implementation of ML models" },
      { id: "ds-ml-project", title: "Machine Learning Practice - Project", description: "End-to-end ML project implementation" },
      { id: "ds-business-analytics", title: "Business Analytics", description: "Analytical methods for business decision-making" },
      { id: "ds-tools", title: "Tools in Data Science", description: "Overview of essential data science tools and platforms" }
    ],
    degree: [
      { id: "ds-software-eng", title: "Software Engineering", description: "Principles and practices of software development" },
      { id: "ds-software-testing", title: "Software Testing", description: "Quality assurance and testing methodologies" },
      { id: "ds-ai-search", title: "AI: Search Methods for Problem Solving", description: "AI algorithms for optimization and search" },
      { id: "ds-deep-learning", title: "Deep Learning", description: "Neural networks and deep learning architectures" },
      { id: "ds-prof-growth", title: "Strategies for Professional Growth", description: "Career development and professional skills" },
      { id: "ds-nlp", title: "Natural Language Processing", description: "Processing and analyzing human language data" },
      { id: "ds-computer-vision", title: "Deep Learning for Computer Vision", description: "Image processing and analysis using deep learning" },
      { id: "ds-llm", title: "Large Language Models", description: "Advanced NLP with transformer-based models" }
    ],
    qualifier: [
      { id: "ds-math-1", title: "Mathematics for Data Science I", description: "Foundational mathematics concepts for data science" },
      { id: "ds-stats-1", title: "Statistics for Data Science I", description: "Introduction to statistical concepts and methods" },
      { id: "ds-comp-thinking", title: "Computational Thinking", description: "Problem solving using computational approaches" },
      { id: "ds-english-1", title: "English I", description: "Academic writing and communication skills" }
    ]
  };

  const electronicSystemsSubjects = {
    foundation: [
      { id: "es-math-1", title: "Math for Electronics I", description: "Mathematical foundations for electronic systems" },
      { id: "es-english-1", title: "English I", description: "Academic writing and communication skills" },
      { id: "es-systems", title: "Electronic Systems Thinking and Circuits", description: "Fundamental concepts of electronic systems" },
      { id: "es-systems-lab", title: "Electronic Systems Thinking and Circuits Lab", description: "Practical circuit implementation" },
      { id: "es-c-prog", title: "Introduction to C Programming", description: "Programming fundamentals in C language" },
      { id: "es-c-lab", title: "C Programming Laboratory", description: "Hands-on C programming exercises" },
      { id: "es-linux", title: "Introduction to Linux and Programming", description: "Linux operating system basics" },
      { id: "es-linux-lab", title: "Linux Systems Laboratory", description: "Practical Linux system administration" },
      { id: "es-digital", title: "Digital Systems", description: "Digital logic and system design" },
      { id: "es-circuits", title: "Electrical and Electronic Circuits", description: "Basic circuit theory and analysis" },
      { id: "es-lab", title: "Electronics Laboratory", description: "Practical electronic circuit experiments" },
      { id: "es-embedded-c", title: "Embedded C Programming", description: "Programming microcontrollers with C" },
      { id: "es-embedded-lab", title: "Embedded C Programming Laboratory", description: "Practical embedded systems programming" }
    ],
    diploma: [
      { id: "es-math-2", title: "Math for Electronics II", description: "Advanced mathematics for electronics" },
      { id: "es-signals", title: "Signals and Systems", description: "Analysis of signals and linear systems" },
      { id: "es-analog", title: "Analog Electronic Systems", description: "Analog circuit design and analysis" },
      { id: "es-analog-lab", title: "Analog Electronics Laboratory", description: "Practical analog electronics experiments" },
      { id: "es-python", title: "Python Programming", description: "Programming fundamentals in Python" },
      { id: "es-digital-design", title: "Digital System Design", description: "Advanced digital circuits and systems" },
      { id: "es-digital-lab", title: "Digital System Design Laboratory", description: "Practical digital design experiments" },
      { id: "es-dsp", title: "Digital Signal Processing", description: "Processing and analysis of digital signals" },
      { id: "es-sensors", title: "Sensors and Applications", description: "Various types of sensors and their applications" },
      { id: "es-sensors-lab", title: "Sensors Laboratory", description: "Practical sensor implementation and testing" },
      { id: "es-control", title: "Control Engineering", description: "Control system theory and applications" }
    ],
    degree: [
      { id: "es-embedded-linux", title: "Embedded Linux and FPGAs", description: "Linux for embedded systems and FPGA programming" },
      { id: "es-embedded-linux-lab", title: "Embedded Linux and FPGAs Lab", description: "Hands-on embedded Linux and FPGA development" },
      { id: "es-emf", title: "Electromagnetic Fields and Transmission Lines", description: "Electromagnetic theory for electronics" },
      { id: "es-product-design", title: "Electronic Product Design", description: "End-to-end product development process" },
      { id: "es-prof-growth", title: "Strategies for Professional Growth", description: "Career development and professional skills" },
      { id: "es-iot", title: "Internet of Things (IoT)", description: "Connected devices and IoT ecosystem" },
      { id: "es-vlsi", title: "Semiconductor Devices and VLSI Technology", description: "Semiconductor physics and VLSI design" },
      { id: "es-analog-circuits", title: "Analog Circuits", description: "Advanced analog circuit design" }
    ],
    qualifier: [
      { id: "es-math-1", title: "Math for Electronics I", description: "Mathematical foundations for electronic systems" },
      { id: "es-english-1", title: "English I", description: "Academic writing and communication skills" },
      { id: "es-systems", title: "Electronic Systems Thinking and Circuits", description: "Fundamental concepts of electronic systems" },
      { id: "es-systems-lab", title: "Electronic Systems Thinking and Circuits Lab", description: "Practical circuit implementation" }
    ]
  };

  const notes = [
    { id: "ds-foundation-notes", stream: "data-science", level: "foundation", title: "Foundation Level - Data Science Notes", description: "Comprehensive notes covering all Foundation level Data Science subjects" },
    { id: "ds-diploma-notes", stream: "data-science", level: "diploma", title: "Diploma Level - Data Science Notes", description: "Complete notes for all Diploma level Data Science subjects" },
    { id: "ds-degree-notes", stream: "data-science", level: "degree", title: "BS Degree Level - Data Science Notes", description: "In-depth notes for BS Degree level Data Science subjects" },
    { id: "ds-qualifier-notes", stream: "data-science", level: "qualifier", title: "Qualifier - Data Science Notes", description: "Essential notes for Qualifier Data Science subjects" },
    { id: "es-foundation-notes", stream: "electronic-systems", level: "foundation", title: "Foundation Level - Electronic Systems Notes", description: "Comprehensive notes covering all Foundation level Electronic Systems subjects" },
    { id: "es-diploma-notes", stream: "electronic-systems", level: "diploma", title: "Diploma Level - Electronic Systems Notes", description: "Complete notes for all Diploma level Electronic Systems subjects" },
    { id: "es-degree-notes", stream: "electronic-systems", level: "degree", title: "BS Degree Level - Electronic Systems Notes", description: "In-depth notes for BS Degree level Electronic Systems subjects" },
    { id: "es-qualifier-notes", stream: "electronic-systems", level: "qualifier", title: "Qualifier - Electronic Systems Notes", description: "Essential notes for Qualifier Electronic Systems subjects" },
  ];

  const pyqs = [
    { id: "ds-pyq", stream: "data-science", title: "Data Science PYQs (All Levels)", description: "Previous year questions for all Data Science courses" },
    { id: "es-pyq", stream: "electronic-systems", title: "Electronic Systems PYQs (All Levels)", description: "Previous year questions for all Electronic Systems courses" },
  ];

  const videos = [
    { id: "ds-foundation-videos", stream: "data-science", level: "foundation", title: "Foundation Level - Data Science Video Lectures", description: "Video lectures for all Foundation level Data Science subjects" },
    { id: "ds-diploma-videos", stream: "data-science", level: "diploma", title: "Diploma Level - Data Science Video Lectures", description: "Video lectures for all Diploma level Data Science subjects" },
    { id: "ds-degree-videos", stream: "data-science", level: "degree", title: "BS Degree Level - Data Science Video Lectures", description: "Video lectures for all BS Degree level Data Science subjects" },
  ];

  const tools = [
    { id: "marks-calculator", title: "Marks Calculator", description: "Calculate your expected marks based on your answers" },
    { id: "grade-predictor", title: "Grade Predictor", description: "Predict your grades based on your performance" },
    { id: "cgpa-calculator", title: "CGPA Calculator", description: "Calculate your Cumulative Grade Point Average" },
  ];

  const communityLinks = [
    { title: "IITM BS General Discussion", type: "WhatsApp", stream: "both", link: "https://chat.whatsapp.com/example-iitm1" },
    { title: "Data Science Community", type: "WhatsApp", stream: "data-science", link: "https://chat.whatsapp.com/example-iitm2" },
    { title: "Electronic Systems Community", type: "WhatsApp", stream: "electronic-systems", link: "https://chat.whatsapp.com/example-iitm3" },
    { title: "Qualifier Preparation Group", type: "WhatsApp", stream: "both", level: "qualifier", link: "https://chat.whatsapp.com/example-iitm4" },
    { title: "Unknown IITians IITM BS Community", type: "Telegram", stream: "both", link: "https://t.me/example-iitm1" },
  ];

  const studyGuides = [
    { id: "qualifier-guide", title: "Qualifier Exam Guide", description: "Comprehensive guide to prepare for the qualifier exam", level: "qualifier", stream: "both" },
    { id: "ds-study-path", title: "Data Science Learning Path", description: "Structured learning path for data science program", stream: "data-science" },
    { id: "es-study-path", title: "Electronic Systems Learning Path", description: "Structured learning path for electronic systems program", stream: "electronic-systems" },
  ];

  const importantDates = [
    { event: "Qualifier Exam Registration Opens", date: "January 2025", stream: "both" },
    { event: "Qualifier Exam Registration Closes", date: "February 2025", stream: "both" },
    { event: "Qualifier Exam Date", date: "March 2025", stream: "both" },
    { event: "Foundation Level Programming Exam", date: "April 2025", stream: "both" },
    { event: "Diploma Admissions Open", date: "May 2025", stream: "both" },
    { event: "BS Degree Admissions Open", date: "October 2025", stream: "both" },
  ];

  const newsUpdates = [
    { title: "Changes in Qualifier Exam Pattern for 2025", date: "October 20, 2024", stream: "both" },
    { title: "New Data Science Specializations Announced", date: "October 5, 2024", stream: "data-science" },
    { title: "Electronic Systems Workshop Registration Open", date: "September 28, 2024", stream: "electronic-systems" },
    { title: "IITM BS Program Fee Structure Updated", date: "September 15, 2024", stream: "both" },
  ];

  // Filter news updates based on selected stream
  const filteredNews = newsUpdates.filter(
    news => news.stream === "both" || news.stream === stream
  );

  // Filter important dates based on selected stream
  const filteredDates = importantDates.filter(
    date => date.stream === "both" || date.stream === stream
  );

  // Get subjects based on selected stream and level
  const getSubjects = () => {
    if (stream === "data-science") {
      return dataScienceSubjects[level as keyof typeof dataScienceSubjects] || [];
    } else {
      return electronicSystemsSubjects[level as keyof typeof electronicSystemsSubjects] || [];
    }
  };

  // Filter community links based on selected stream and level
  const filteredCommunityLinks = communityLinks.filter(link => {
    const streamMatch = link.stream === "both" || link.stream === stream;
    const levelMatch = !link.level || link.level === level;
    return streamMatch && levelMatch;
  });

  // Filter study guides based on selected stream and level
  const filteredStudyGuides = studyGuides.filter(guide => {
    const streamMatch = guide.stream === "both" || guide.stream === stream;
    const levelMatch = !guide.level || guide.level === level;
    return streamMatch && levelMatch;
  });

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">IITM BS Degree Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive resources for IIT Madras BS Degree programs
            </p>
          </div>
        </section>

        {/* Stream Selection */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold">Choose Your Stream</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Card 
                className={`cursor-pointer transition-all ${stream === 'data-science' ? 'border-royal shadow-lg ring-2 ring-royal' : 'hover:shadow-md'}`}
                onClick={() => setStream('data-science')}
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div className="rounded-full bg-royal/10 p-4 mb-4">
                    <BookIcon className="h-8 w-8 text-royal" />
                  </div>
                  <CardTitle>Data Science</CardTitle>
                  <CardDescription className="text-center mt-2">
                    BS Degree in Data Science and Applications
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all ${stream === 'electronic-systems' ? 'border-royal shadow-lg ring-2 ring-royal' : 'hover:shadow-md'}`}
                onClick={() => setStream('electronic-systems')}
              >
                <CardContent className="flex flex-col items-center p-6">
                  <div className="rounded-full bg-royal/10 p-4 mb-4">
                    <BookIcon className="h-8 w-8 text-royal" />
                  </div>
                  <CardTitle>Electronic Systems</CardTitle>
                  <CardDescription className="text-center mt-2">
                    BS Degree in Electronic Systems
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Level and Search Filters */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={level === 'qualifier' ? "default" : "outline"} 
                  onClick={() => setLevel('qualifier')}
                  className={level === 'qualifier' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  Qualifier
                </Button>
                <Button 
                  variant={level === 'foundation' ? "default" : "outline"} 
                  onClick={() => setLevel('foundation')}
                  className={level === 'foundation' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  Foundation
                </Button>
                <Button 
                  variant={level === 'diploma' ? "default" : "outline"} 
                  onClick={() => setLevel('diploma')}
                  className={level === 'diploma' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  Diploma
                </Button>
                <Button 
                  variant={level === 'degree' ? "default" : "outline"} 
                  onClick={() => setLevel('degree')}
                  className={level === 'degree' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  BS Degree
                </Button>
              </div>

              <div className="flex items-center w-full md:w-auto">
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button className="ml-2 bg-royal hover:bg-royal-dark">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="subjects" className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 w-full mb-8">
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="pyqs">PYQs</TabsTrigger>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="community">Padhai Mitra</TabsTrigger>
                <TabsTrigger value="news">News & Dates</TabsTrigger>
              </TabsList>

              <TabsContent value="subjects">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-6">
                    {stream === 'data-science' ? 'Data Science' : 'Electronic Systems'} - {level.charAt(0).toUpperCase() + level.slice(1)} Level Subjects
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getSubjects().map((subject) => (
                      <Card key={subject.id} className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                          <CardTitle>{subject.title}</CardTitle>
                          <CardDescription>{subject.description}</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button 
                            className="w-full bg-royal hover:bg-royal-dark text-white"
                            onClick={() => {
                              // In a real implementation, this would navigate to a subject detail page
                              console.log(`Navigating to subject: ${subject.title}`);
                            }}
                          >
                            View Resources
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

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
                        <span className="text-sm text-gray-500">{downloads[note.id] || 0} downloads</span>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pyqs
                    .filter(pyq => pyq.stream === stream)
                    .map((pyq) => (
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
                    ))
                  }
                </div>
              </TabsContent>

              <TabsContent value="lectures">
                <div>
                  {stream === 'data-science' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videos
                        .filter(video => video.stream === stream && video.level === level)
                        .map((video) => (
                          <Card key={video.id} className="border-none shadow-md hover:shadow-lg transition-all">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                              <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">Video Preview</p>
                              </div>
                            </div>
                            <CardHeader>
                              <CardTitle>{video.title}</CardTitle>
                              <CardDescription>{video.description}</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex justify-between space-x-2">
                              <Button 
                                className="flex-1 bg-royal hover:bg-royal-dark text-white"
                              >
                                Watch Lectures
                              </Button>
                              <Button 
                                className="flex-1"
                                variant="outline" 
                                onClick={() => handleDownload(`${video.id}-notes`)}
                              >
                                <Download className="h-4 w-4 mr-2" /> Notes
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
                      <p className="text-gray-600">Video lectures for Electronic Systems will be available soon.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="tools">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tools.map((tool, index) => (
                    <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="rounded-full bg-royal/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                          <Calculator className="text-royal h-6 w-6" />
                        </div>
                        <CardTitle>{tool.title}</CardTitle>
                        <CardDescription>{tool.description}</CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                          Launch Tool
                        </Button>
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
                      {filteredCommunityLinks.map((link, index) => (
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
                      {filteredStudyGuides.map((guide, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-xl">{guide.title}</CardTitle>
                            <CardDescription>{guide.description}</CardDescription>
                          </CardHeader>
                          <CardFooter className="flex justify-between">
                            <Button 
                              onClick={() => handleDownload(guide.id)}
                              className="w-full bg-royal hover:bg-royal-dark text-white"
                            >
                              <Download className="h-4 w-4 mr-2" /> Download Guide
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="news">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-4">Latest News & Updates</h3>
                    {filteredNews.map((news, index) => (
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

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-4">Important Dates & Deadlines</h3>
                    <Card className="border-none shadow-lg">
                      <CardContent className="p-6">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white">
                            <thead>
                              <tr>
                                <th className="py-3 px-6 text-left text-lg font-bold text-gray-900">Event</th>
                                <th className="py-3 px-6 text-left text-lg font-bold text-gray-900">Expected Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {filteredDates.map((item, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="py-4 px-6 text-gray-900">{item.event}</td>
                                  <td className="py-4 px-6 text-gray-900">{item.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
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
