
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
  Calculator, 
  BookOpen as BookIcon, 
  Star,
  Link as LinkIcon,
  Video,
  FileImage,
  FileCheck,
  Sparkles
} from "lucide-react";

const IITMBSPrep = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stream, setStream] = useState("data-science");
  const [level, setLevel] = useState("foundation");
  const [examType, setExamType] = useState("quiz1");
  const [year, setYear] = useState("2024");
  const [term, setTerm] = useState("january");
  const [subjectFilter, setSubjectFilter] = useState("");
  
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
    "math1-w1": 87,
    "math1-w2": 65,
    "stats1-w1": 92,
    "ct-w1": 78,
    "eng1-w1": 45,
  });

  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: prev[id] + 1 || 1
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
    qualifier: [
      { id: "math1", title: "Mathematics for Data Science I", description: "Foundational mathematics concepts for data science" },
      { id: "stats1", title: "Statistics for Data Science I", description: "Introduction to statistical concepts and methods" },
      { id: "ct", title: "Computational Thinking", description: "Problem solving using computational approaches" },
      { id: "eng1", title: "English I", description: "Academic writing and communication skills" }
    ],
    foundation: [
      { id: "math1", title: "Mathematics for Data Science I", description: "Foundational mathematics concepts for data science" },
      { id: "stats1", title: "Statistics for Data Science I", description: "Introduction to statistical concepts and methods" },
      { id: "ct", title: "Computational Thinking", description: "Problem solving using computational approaches" },
      { id: "eng1", title: "English I", description: "Academic writing and communication skills" },
      { id: "math2", title: "Mathematics for Data Science II", description: "Advanced mathematical concepts for data analysis" },
      { id: "stats2", title: "Statistics for Data Science II", description: "Statistical inference and hypothesis testing" },
      { id: "python", title: "Programming in Python", description: "Python programming fundamentals for data science" },
      { id: "eng2", title: "English II", description: "Advanced communication and presentation skills" }
    ],
    diploma: [
      { id: "ml-foundations", title: "Machine Learning Foundations", description: "Core concepts of machine learning algorithms" },
      { id: "business-data", title: "Business Data Management", description: "Managing and analyzing business data" },
      { id: "bdm-project", title: "Business Data Management - Project", description: "Practical project on business data" },
      { id: "ml-tech", title: "Machine Learning Techniques", description: "Advanced ML algorithms and implementations" },
      { id: "ml-practice", title: "Machine Learning Practice", description: "Hands-on implementation of ML models" },
      { id: "ml-project", title: "Machine Learning Practice - Project", description: "End-to-end ML project implementation" },
      { id: "business-analytics", title: "Business Analytics", description: "Analytical methods for business decision-making" },
      { id: "tools", title: "Tools in Data Science", description: "Overview of essential data science tools and platforms" }
    ],
    degree: [
      { id: "software-eng", title: "Software Engineering", description: "Principles and practices of software development" },
      { id: "software-testing", title: "Software Testing", description: "Quality assurance and testing methodologies" },
      { id: "ai-search", title: "AI: Search Methods for Problem Solving", description: "AI algorithms for optimization and search" },
      { id: "deep-learning", title: "Deep Learning", description: "Neural networks and deep learning architectures" },
      { id: "prof-growth", title: "Strategies for Professional Growth", description: "Career development and professional skills" },
      { id: "nlp", title: "Natural Language Processing", description: "Processing and analyzing human language data" },
      { id: "computer-vision", title: "Deep Learning for Computer Vision", description: "Image processing and analysis using deep learning" },
      { id: "llm", title: "Large Language Models", description: "Advanced NLP with transformer-based models" }
    ]
  };

  const electronicSystemsSubjects = {
    qualifier: [
      { id: "math1-es", title: "Math for Electronics I", description: "Mathematical foundations for electronic systems" },
      { id: "eng1-es", title: "English I", description: "Academic writing and communication skills" },
      { id: "systems", title: "Electronic Systems Thinking and Circuits", description: "Fundamental concepts of electronic systems" },
      { id: "systems-lab", title: "Electronic Systems Thinking and Circuits Lab", description: "Practical circuit implementation" }
    ],
    foundation: [
      { id: "math1-es", title: "Math for Electronics I", description: "Mathematical foundations for electronic systems" },
      { id: "eng1-es", title: "English I", description: "Academic writing and communication skills" },
      { id: "systems", title: "Electronic Systems Thinking and Circuits", description: "Fundamental concepts of electronic systems" },
      { id: "systems-lab", title: "Electronic Systems Thinking and Circuits Lab", description: "Practical circuit implementation" },
      { id: "c-prog", title: "Introduction to C Programming", description: "Programming fundamentals in C language" },
      { id: "c-lab", title: "C Programming Laboratory", description: "Hands-on C programming exercises" },
      { id: "linux", title: "Introduction to Linux and Programming", description: "Linux operating system basics" },
      { id: "linux-lab", title: "Linux Systems Laboratory", description: "Practical Linux system administration" },
      { id: "digital", title: "Digital Systems", description: "Digital logic and system design" },
      { id: "circuits", title: "Electrical and Electronic Circuits", description: "Basic circuit theory and analysis" },
      { id: "lab", title: "Electronics Laboratory", description: "Practical electronic circuit experiments" },
      { id: "embedded-c", title: "Embedded C Programming", description: "Programming microcontrollers with C" },
      { id: "embedded-lab", title: "Embedded C Programming Laboratory", description: "Practical embedded systems programming" }
    ],
    diploma: [
      { id: "math2-es", title: "Math for Electronics II", description: "Advanced mathematics for electronics" },
      { id: "signals", title: "Signals and Systems", description: "Analysis of signals and linear systems" },
      { id: "analog", title: "Analog Electronic Systems", description: "Analog circuit design and analysis" },
      { id: "analog-lab", title: "Analog Electronics Laboratory", description: "Practical analog electronics experiments" },
      { id: "python-es", title: "Python Programming", description: "Programming fundamentals in Python" },
      { id: "digital-design", title: "Digital System Design", description: "Advanced digital circuits and systems" },
      { id: "digital-lab", title: "Digital System Design Laboratory", description: "Practical digital design experiments" },
      { id: "dsp", title: "Digital Signal Processing", description: "Processing and analysis of digital signals" },
      { id: "sensors", title: "Sensors and Applications", description: "Various types of sensors and their applications" },
      { id: "sensors-lab", title: "Sensors Laboratory", description: "Practical sensor implementation and testing" },
      { id: "control", title: "Control Engineering", description: "Control system theory and applications" }
    ],
    degree: [
      { id: "embedded-linux", title: "Embedded Linux and FPGAs", description: "Linux for embedded systems and FPGA programming" },
      { id: "embedded-linux-lab", title: "Embedded Linux and FPGAs Lab", description: "Hands-on embedded Linux and FPGA development" },
      { id: "emf", title: "Electromagnetic Fields and Transmission Lines", description: "Electromagnetic theory for electronics" },
      { id: "product-design", title: "Electronic Product Design", description: "End-to-end product development process" },
      { id: "prof-growth-es", title: "Strategies for Professional Growth", description: "Career development and professional skills" },
      { id: "iot", title: "Internet of Things (IoT)", description: "Connected devices and IoT ecosystem" },
      { id: "vlsi", title: "Semiconductor Devices and VLSI Technology", description: "Semiconductor physics and VLSI design" },
      { id: "analog-circuits", title: "Analog Circuits", description: "Advanced analog circuit design" }
    ]
  };

  const subjectLectureNotes = {
    "math1": [
      { id: "math1-w1", title: "Week 1: Introduction to Functions and Limits", description: "Basic concepts of mathematical functions and limits" },
      { id: "math1-w2", title: "Week 2: Derivatives and Applications", description: "Concepts of derivatives and their applications" },
      { id: "math1-w3", title: "Week 3: Integration Techniques", description: "Various methods of integration" },
      { id: "math1-w4", title: "Week 4: Matrices and Determinants", description: "Introduction to matrix operations" },
    ],
    "stats1": [
      { id: "stats1-w1", title: "Week 1: Descriptive Statistics", description: "Measures of central tendency and dispersion" },
      { id: "stats1-w2", title: "Week 2: Probability Theory", description: "Basic concepts of probability" },
      { id: "stats1-w3", title: "Week 3: Random Variables", description: "Discrete and continuous random variables" },
    ],
    "ct": [
      { id: "ct-w1", title: "Week 1: Algorithms and Flowcharts", description: "Introduction to algorithmic thinking" },
      { id: "ct-w2", title: "Week 2: Problem Decomposition", description: "Breaking down complex problems" },
    ],
    "eng1": [
      { id: "eng1-w1", title: "Week 1: Academic Writing", description: "Principles of effective academic writing" },
      { id: "eng1-w2", title: "Week 2: Critical Reading", description: "Strategies for critical analysis of texts" },
    ]
  };

  const videoNotes = {
    "math1": [
      { 
        id: "math1-v1", 
        title: "Functions and Their Properties", 
        videoLink: "https://www.youtube.com/watch?v=example1",
        notesId: "math1-v1-notes", 
        duration: "45:22",
        instructor: "Prof. Sharma"
      },
      { 
        id: "math1-v2", 
        title: "Limits and Continuity", 
        videoLink: "https://www.youtube.com/watch?v=example2",
        notesId: "math1-v2-notes", 
        duration: "52:14",
        instructor: "Prof. Sharma"
      },
    ],
    "stats1": [
      { 
        id: "stats1-v1", 
        title: "Introduction to Statistics", 
        videoLink: "https://www.youtube.com/watch?v=example3",
        notesId: "stats1-v1-notes", 
        duration: "48:36",
        instructor: "Prof. Gupta"
      },
    ],
  };

  const paidCourses = {
    "data-science": {
      "qualifier": [
        { 
          id: "ds-qualifier-course", 
          title: "IITM BS Data Science Qualifier Preparation", 
          description: "Comprehensive course to crack the qualifier exam with high scores",
          price: "₹4,999",
          discountedPrice: "₹2,999",
          duration: "2 months",
          features: ["Live Classes", "Study Material", "Doubt Sessions", "Mock Tests"]
        }
      ],
      "foundation": [
        { 
          id: "ds-foundation-course", 
          title: "Data Science Foundation Level Mastery", 
          description: "Master all foundation level subjects with expert guidance",
          price: "₹6,999",
          discountedPrice: "₹4,999",
          duration: "4 months",
          features: ["Live Classes", "Assignments", "Doubt Sessions", "Mock Tests"]
        }
      ],
      "diploma": [
        { 
          id: "ds-diploma-course", 
          title: "Machine Learning Specialization", 
          description: "In-depth course on machine learning algorithms and techniques",
          price: "₹8,999",
          discountedPrice: "₹5,999",
          duration: "3 months",
          features: ["Live Classes", "Projects", "Industry Mentorship", "Certificate"]
        }
      ],
      "degree": [
        { 
          id: "ds-degree-course", 
          title: "Advanced Deep Learning & AI", 
          description: "Expert-level course on advanced deep learning and AI techniques",
          price: "₹12,999",
          discountedPrice: "₹7,999",
          duration: "4 months",
          features: ["Live Classes", "Research Projects", "Industry Connections", "Certification"]
        }
      ]
    },
    "electronic-systems": {
      "qualifier": [
        { 
          id: "es-qualifier-course", 
          title: "IITM BS Electronic Systems Qualifier Prep", 
          description: "Comprehensive preparation for the qualifier examination",
          price: "₹4,999",
          discountedPrice: "₹2,999",
          duration: "2 months",
          features: ["Live Classes", "Study Material", "Doubt Sessions", "Mock Tests"]
        }
      ],
      "foundation": [
        { 
          id: "es-foundation-course", 
          title: "Electronic Systems Fundamentals", 
          description: "Master the basics of electronic systems with practical knowledge",
          price: "₹5,999",
          discountedPrice: "₹3,999",
          duration: "3 months",
          features: ["Live Classes", "Lab Sessions", "Doubt Clearing", "Projects"]
        }
      ]
    }
  };

  const communityGroups = {
    "data-science": {
      "qualifier": [
        { title: "Mathematics for Data Science I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-math1" },
        { title: "Statistics for Data Science I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-stats1" },
        { title: "Computational Thinking Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ct" },
        { title: "English I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-eng1" },
        { title: "DS Qualifier Batch 2025", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-qualifier2025" },
      ],
      "foundation": [
        { title: "Mathematics for Data Science I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-math1" },
        { title: "Statistics for Data Science I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-stats1" },
        { title: "Computational Thinking Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ct" },
        { title: "English I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-eng1" },
        { title: "Mathematics for Data Science II Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-math2" },
        { title: "Statistics for Data Science II Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-stats2" },
        { title: "Programming in Python Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-python" },
        { title: "English II Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-eng2" },
      ],
      "diploma": [
        { title: "Machine Learning Foundations Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ml-foundations" },
        { title: "Business Data Management Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-bdm" },
        { title: "Machine Learning Techniques Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ml-tech" },
        { title: "Machine Learning Practice Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ml-practice" },
        { title: "Business Analytics Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ba" },
        { title: "Tools in Data Science Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-tools" },
      ],
      "degree": [
        { title: "Software Engineering Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-se" },
        { title: "Software Testing Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-st" },
        { title: "AI: Search Methods Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-ai-search" },
        { title: "Deep Learning Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-dl" },
        { title: "NLP Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-nlp" },
        { title: "Computer Vision Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-cv" },
        { title: "LLM Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-ds-llm" },
      ]
    },
    "electronic-systems": {
      "qualifier": [
        { title: "Math for Electronics I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-math1" },
        { title: "English I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-eng1" },
        { title: "Electronic Systems Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-systems" },
        { title: "ES Lab Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-systems-lab" },
        { title: "ES Qualifier Batch 2025", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-qualifier2025" },
      ],
      "foundation": [
        { title: "Math for Electronics I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-math1" },
        { title: "English I Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-eng1" },
        { title: "Electronic Systems Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-systems" },
        { title: "ES Lab Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-systems-lab" },
        { title: "C Programming Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-c-prog" },
        { title: "C Lab Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-c-lab" },
        { title: "Linux Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-linux" },
        { title: "Linux Lab Group", type: "WhatsApp", link: "https://chat.whatsapp.com/example-es-linux-lab" },
      ]
    }
  };

  const pyqs = {
    "data-science": {
      "quiz1": {
        "2024": {
          "january": [
            { id: "ds-q1-2024-jan-math1", title: "Mathematics for Data Science I - Quiz 1", description: "January 2024 term" },
            { id: "ds-q1-2024-jan-stats1", title: "Statistics for Data Science I - Quiz 1", description: "January 2024 term" },
            { id: "ds-q1-2024-jan-ct", title: "Computational Thinking - Quiz 1", description: "January 2024 term" },
          ],
          "may": [
            { id: "ds-q1-2024-may-math1", title: "Mathematics for Data Science I - Quiz 1", description: "May 2024 term" },
            { id: "ds-q1-2024-may-stats1", title: "Statistics for Data Science I - Quiz 1", description: "May 2024 term" },
            { id: "ds-q1-2024-may-ct", title: "Computational Thinking - Quiz 1", description: "May 2024 term" },
          ],
          "september": [
            { id: "ds-q1-2024-sep-math1", title: "Mathematics for Data Science I - Quiz 1", description: "September 2024 term" },
            { id: "ds-q1-2024-sep-stats1", title: "Statistics for Data Science I - Quiz 1", description: "September 2024 term" },
            { id: "ds-q1-2024-sep-ct", title: "Computational Thinking - Quiz 1", description: "September 2024 term" },
          ]
        },
        "2023": {
          "january": [
            { id: "ds-q1-2023-jan-math1", title: "Mathematics for Data Science I - Quiz 1", description: "January 2023 term" },
            { id: "ds-q1-2023-jan-stats1", title: "Statistics for Data Science I - Quiz 1", description: "January 2023 term" },
            { id: "ds-q1-2023-jan-ct", title: "Computational Thinking - Quiz 1", description: "January 2023 term" },
          ],
          "may": [
            { id: "ds-q1-2023-may-math1", title: "Mathematics for Data Science I - Quiz 1", description: "May 2023 term" },
            { id: "ds-q1-2023-may-stats1", title: "Statistics for Data Science I - Quiz 1", description: "May 2023 term" },
            { id: "ds-q1-2023-may-ct", title: "Computational Thinking - Quiz 1", description: "May 2023 term" },
          ],
          "september": [
            { id: "ds-q1-2023-sep-math1", title: "Mathematics for Data Science I - Quiz 1", description: "September 2023 term" },
            { id: "ds-q1-2023-sep-stats1", title: "Statistics for Data Science I - Quiz 1", description: "September 2023 term" },
            { id: "ds-q1-2023-sep-ct", title: "Computational Thinking - Quiz 1", description: "September 2023 term" },
          ]
        }
      },
      "quiz2": {
        "2024": {
          "january": [
            { id: "ds-q2-2024-jan-math1", title: "Mathematics for Data Science I - Quiz 2", description: "January 2024 term" },
            { id: "ds-q2-2024-jan-stats1", title: "Statistics for Data Science I - Quiz 2", description: "January 2024 term" },
            { id: "ds-q2-2024-jan-ct", title: "Computational Thinking - Quiz 2", description: "January 2024 term" },
          ]
        }
      },
      "endterm": {
        "2023": {
          "may": [
            { id: "ds-et-2023-may-math1", title: "Mathematics for Data Science I - End Term", description: "May 2023 term" },
            { id: "ds-et-2023-may-stats1", title: "Statistics for Data Science I - End Term", description: "May 2023 term" },
            { id: "ds-et-2023-may-ct", title: "Computational Thinking - End Term", description: "May 2023 term" },
          ]
        }
      }
    },
    "electronic-systems": {
      "quiz1": {
        "2024": {
          "january": [
            { id: "es-q1-2024-jan-math1", title: "Math for Electronics I - Quiz 1", description: "January 2024 term" },
            { id: "es-q1-2024-jan-systems", title: "Electronic Systems Thinking - Quiz 1", description: "January 2024 term" },
          ]
        }
      }
    }
  };

  const tools = [
    { id: "marks-calculator", title: "Marks Calculator", description: "Calculate your expected marks based on your answers", icon: Calculator },
    { id: "grade-predictor", title: "Grade Predictor", description: "Predict your grades based on your performance", icon: FileCheck },
    { id: "cgpa-calculator", title: "CGPA Calculator", description: "Calculate your Cumulative Grade Point Average", icon: Calculator },
  ];

  const getSubjects = () => {
    if (stream === "data-science") {
      return dataScienceSubjects[level as keyof typeof dataScienceSubjects] || [];
    } else {
      return electronicSystemsSubjects[level as keyof typeof electronicSystemsSubjects] || [];
    }
  };

  const getSelectedSubject = () => {
    const subjects = getSubjects();
    return subjects.find(sub => sub.id === subjectFilter);
  };

  const getLectureNotes = () => {
    if (!subjectFilter) return [];
    return subjectLectureNotes[subjectFilter as keyof typeof subjectLectureNotes] || [];
  };

  const getVideoNotes = () => {
    if (!subjectFilter) return [];
    return videoNotes[subjectFilter as keyof typeof videoNotes] || [];
  };

  const getPaidCourses = () => {
    return paidCourses[stream as keyof typeof paidCourses]?.[level as keyof (typeof paidCourses)["data-science"]] || [];
  };

  const getCommunityGroups = () => {
    return communityGroups[stream as keyof typeof communityGroups]?.[level as keyof (typeof communityGroups)["data-science"]] || [];
  };

  const getPYQs = () => {
    return pyqs[stream as keyof typeof pyqs]?.[examType as keyof typeof pyqs["data-science"]]?.[year as keyof typeof pyqs["data-science"]["quiz1"]]?.[term as keyof typeof pyqs["data-science"]["quiz1"]["2024"]] || [];
  };

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
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white rounded-xl shadow-md p-4">
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={level === 'qualifier' ? "default" : "outline"} 
                  onClick={() => {
                    setLevel('qualifier');
                    setSubjectFilter("");
                  }}
                  className={level === 'qualifier' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  Qualifier
                </Button>
                <Button 
                  variant={level === 'foundation' ? "default" : "outline"} 
                  onClick={() => {
                    setLevel('foundation');
                    setSubjectFilter("");
                  }}
                  className={level === 'foundation' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  Foundation
                </Button>
                <Button 
                  variant={level === 'diploma' ? "default" : "outline"} 
                  onClick={() => {
                    setLevel('diploma');
                    setSubjectFilter("");
                  }}
                  className={level === 'diploma' ? "bg-royal hover:bg-royal-dark" : ""}
                >
                  Diploma
                </Button>
                <Button 
                  variant={level === 'degree' ? "default" : "outline"} 
                  onClick={() => {
                    setLevel('degree');
                    setSubjectFilter("");
                  }}
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
              <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 w-full mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="subjects" className="rounded-md">Subjects</TabsTrigger>
                <TabsTrigger value="notes" className="rounded-md">Notes</TabsTrigger>
                <TabsTrigger value="pyqs" className="rounded-md">PYQs</TabsTrigger>
                <TabsTrigger value="lectures" className="rounded-md">Lectures</TabsTrigger>
                {level !== 'qualifier' && (
                  <TabsTrigger value="tools" className="rounded-md">Tools</TabsTrigger>
                )}
                <TabsTrigger value="community" className="rounded-md">Padhai Mitra</TabsTrigger>
                <TabsTrigger value="news" className="rounded-md">News & Dates</TabsTrigger>
                <TabsTrigger value="paid-courses" className="rounded-md bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:text-white">
                  <Sparkles className="h-4 w-4 mr-1 text-white" />
                  Premium
                </TabsTrigger>
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
                              setSubjectFilter(subject.id);
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
                {!subjectFilter ? (
                  <div className="text-center py-8">
                    <h3 className="text-2xl font-bold mb-4">Select a Subject</h3>
                    <p className="text-gray-600 mb-6">Please select a subject from the Subjects tab to view its notes</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {getSubjects().map((subject) => (
                        <Button 
                          key={subject.id}
                          variant="outline"
                          className="text-left h-auto py-3"
                          onClick={() => setSubjectFilter(subject.id)}
                        >
                          <FileText className="h-4 w-4 mr-2" /> {subject.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">
                        {getSelectedSubject()?.title} - Lecture Notes
                      </h3>
                      <Button variant="outline" onClick={() => setSubjectFilter("")}>
                        Back to Subjects
                      </Button>
                    </div>

                    <Tabs defaultValue="lecture-notes">
                      <TabsList className="mb-6">
                        <TabsTrigger value="lecture-notes">Lecture Notes</TabsTrigger>
                        <TabsTrigger value="video-notes">Video Notes</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="lecture-notes">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {getLectureNotes().length > 0 ? (
                            getLectureNotes().map((note) => (
                              <Card key={note.id} className="border-none shadow-md hover:shadow-lg transition-all">
                                <CardHeader>
                                  <CardTitle className="text-lg">{note.title}</CardTitle>
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
                            ))
                          ) : (
                            <div className="col-span-full text-center py-8">
                              <p className="text-gray-600">No lecture notes available for this subject yet.</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="video-notes">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {getVideoNotes().length > 0 ? (
                            getVideoNotes().map((video) => (
                              <Card key={video.id} className="border-none shadow-md hover:shadow-lg transition-all">
                                <div className="aspect-video bg-gray-100 relative">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <Video className="h-12 w-12 text-gray-400" />
                                  </div>
                                </div>
                                <CardHeader>
                                  <CardTitle className="text-lg">{video.title}</CardTitle>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" /> 
                                    {video.duration}
                                    <Users className="h-4 w-4 ml-4 mr-1" /> 
                                    {video.instructor}
                                  </div>
                                </CardHeader>
                                <CardFooter className="flex flex-col sm:flex-row gap-2">
                                  <Button 
                                    className="w-full sm:w-auto bg-royal hover:bg-royal-dark text-white"
                                    asChild
                                  >
                                    <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                                      <Video className="h-4 w-4 mr-2" /> Watch Video
                                    </a>
                                  </Button>
                                  <Button 
                                    className="w-full sm:w-auto"
                                    variant="outline"
                                    onClick={() => handleDownload(video.notesId)}
                                  >
                                    <Download className="h-4 w-4 mr-2" /> Notes
                                  </Button>
                                </CardFooter>
                              </Card>
                            ))
                          ) : (
                            <div className="col-span-full text-center py-8">
                              <p className="text-gray-600">No video notes available for this subject yet.</p>
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pyqs">
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                  <h3 className="text-xl font-bold mb-4">Filter PYQs</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                      <Select 
                        value={examType} 
                        onValueChange={(value) => setExamType(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Exam Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quiz1">Quiz 1</SelectItem>
                          <SelectItem value="quiz2">Quiz 2</SelectItem>
                          <SelectItem value="endterm">End Term</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <Select 
                        value={year} 
                        onValueChange={(value) => setYear(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2023">2023</SelectItem>
                          <SelectItem value="2022">2022</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Term</label>
                      <Select 
                        value={term} 
                        onValueChange={(value) => setTerm(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="january">January</SelectItem>
                          <SelectItem value="may">May</SelectItem>
                          <SelectItem value="september">September</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getPYQs().length > 0 ? (
                    getPYQs().map((pyq, index) => (
                      <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
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
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-600">No PYQs available for the selected filters.</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="lectures">
                {!subjectFilter ? (
                  <div className="text-center py-8">
                    <h3 className="text-2xl font-bold mb-4">Select a Subject</h3>
                    <p className="text-gray-600 mb-6">Please select a subject from the Subjects tab to view its video lectures</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                      {getSubjects().map((subject) => (
                        <Button 
                          key={subject.id}
                          variant="outline"
                          className="text-left h-auto py-3"
                          onClick={() => setSubjectFilter(subject.id)}
                        >
                          <Video className="h-4 w-4 mr-2" /> {subject.title}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-bold">
                        {getSelectedSubject()?.title} - Video Lectures
                      </h3>
                      <Button variant="outline" onClick={() => setSubjectFilter("")}>
                        Back to Subjects
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getVideoNotes().length > 0 ? (
                        getVideoNotes().map((video) => (
                          <Card key={video.id} className="border-none shadow-md hover:shadow-lg transition-all">
                            <div className="aspect-video bg-gray-100 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Video className="h-12 w-12 text-gray-400" />
                              </div>
                            </div>
                            <CardHeader>
                              <CardTitle className="text-lg">{video.title}</CardTitle>
                              <div className="flex items-center text-sm text-gray-500">
                                <Calendar className="h-4 w-4 mr-1" /> 
                                {video.duration}
                                <Users className="h-4 w-4 ml-4 mr-1" /> 
                                {video.instructor}
                              </div>
                            </CardHeader>
                            <CardFooter className="flex flex-col sm:flex-row gap-2">
                              <Button 
                                className="w-full sm:w-auto bg-royal hover:bg-royal-dark text-white"
                                asChild
                              >
                                <a href={video.videoLink} target="_blank" rel="noopener noreferrer">
                                  <Video className="h-4 w-4 mr-2" /> Watch Video
                                </a>
                              </Button>
                              <Button 
                                className="w-full sm:w-auto"
                                variant="outline"
                                onClick={() => handleDownload(video.notesId)}
                              >
                                <Download className="h-4 w-4 mr-2" /> Notes
                              </Button>
                            </CardFooter>
                          </Card>
                        ))
                      ) : (
                        <div className="col-span-full text-center py-8">
                          <p className="text-gray-600">No video lectures available for this subject yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>

              {level !== 'qualifier' && (
                <TabsContent value="tools">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tools.map((tool, index) => (
                      <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="rounded-full bg-royal/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                            <tool.icon className="text-royal h-6 w-6" />
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
              )}

              <TabsContent value="community">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8">
                    <h3 className="text-2xl font-bold mb-6">Subject Community Groups</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getCommunityGroups().map((link, index) => (
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
                    <h3 className="text-2xl font-bold mb-6">IITM BS Telegram Community</h3>
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
                          Connect with fellow students, share resources, and get your doubts resolved in our official Telegram community
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                          <a href="https://t.me/example-iitm-bs" target="_blank" rel="noopener noreferrer">
                            Join Telegram Group
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>

                    <div className="mt-6">
                      <h3 className="text-2xl font-bold mb-4">Study Guides</h3>
                      <Card className="border-none shadow-md hover:shadow-lg transition-all">
                        <CardHeader>
                          <CardTitle>Qualifier Exam Guide</CardTitle>
                          <CardDescription>Comprehensive guide to prepare for the qualifier exam</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-between">
                          <Button 
                            onClick={() => handleDownload("qualifier-guide")}
                            className="bg-royal hover:bg-royal-dark text-white"
                          >
                            <Download className="h-4 w-4 mr-2" /> Download
                          </Button>
                          <span className="text-sm text-gray-500">{downloads["qualifier-guide"]} downloads</span>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="news">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold mb-4">Latest News & Updates</h3>
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">IITM BS 2025 Admissions Open</CardTitle>
                          <span className="text-sm text-gray-500">May 10, 2025</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          The IIT Madras BS Degree program has opened applications for the 2025 batch. Apply before June 30, 2025.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-royal hover:bg-royal-dark text-white">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">New AI Specialization Announced</CardTitle>
                          <span className="text-sm text-gray-500">April 28, 2025</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          IIT Madras introduces a new AI specialization for BS Data Science students starting from the upcoming term.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-royal hover:bg-royal-dark text-white">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-none shadow-md hover:shadow-lg transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">Qualifier Exam Pattern Update</CardTitle>
                          <span className="text-sm text-gray-500">April 15, 2025</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">
                          Important changes to the qualifier examination pattern have been announced for the upcoming batch.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button className="bg-royal hover:bg-royal-dark text-white">
                          Read More
                        </Button>
                      </CardFooter>
                    </Card>
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
                                <th className="py-3 px-6 text-left text-lg font-bold text-gray-900">Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-900">Qualifier Exam Registration Opens</td>
                                <td className="py-4 px-6 text-gray-900">January 15, 2025</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-900">Qualifier Exam Registration Closes</td>
                                <td className="py-4 px-6 text-gray-900">February 25, 2025</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-900">Qualifier Exam Date</td>
                                <td className="py-4 px-6 text-gray-900">March 20, 2025</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-900">Foundation Level Programming Exam</td>
                                <td className="py-4 px-6 text-gray-900">April 10, 2025</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-900">Diploma Admissions Open</td>
                                <td className="py-4 px-6 text-gray-900">May 15, 2025</td>
                              </tr>
                              <tr className="hover:bg-gray-50">
                                <td className="py-4 px-6 text-gray-900">BS Degree Admissions Open</td>
                                <td className="py-4 px-6 text-gray-900">October 5, 2025</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paid-courses">
                <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg shadow-md mb-8">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="rounded-full bg-gradient-to-r from-amber-400 to-amber-600 p-3">
                        <Star className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-amber-800">Premium Courses</h3>
                      <p className="text-amber-700">
                        Accelerate your journey with our expert-led premium courses designed for maximizing your potential
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getPaidCourses().length > 0 ? (
                    getPaidCourses().map((course, index) => (
                      <Card key={index} className="border-none shadow-lg overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
                        <CardHeader>
                          <CardTitle>{course.title}</CardTitle>
                          <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {course.features.map((feature, i) => (
                              <div key={i} className="flex items-center text-sm">
                                <Star className="h-3 w-3 mr-1 text-amber-500" /> 
                                {feature}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center">
                            <div className="rounded-full bg-amber-100 px-3 py-1 text-amber-800 font-medium">
                              Duration: {course.duration}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="mb-3 sm:mb-0">
                            <span className="text-xl font-bold text-amber-600">{course.discountedPrice}</span>
                            <span className="ml-2 text-gray-500 line-through">{course.price}</span>
                          </div>
                          <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white">
                            Enroll Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-600">No premium courses available for the selected stream and level at this time.</p>
                    </div>
                  )}
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
