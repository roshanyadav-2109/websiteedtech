
import React, { useState, useEffect } from "react";
import { FileText, BookOpen, Code, ChevronDown, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const tabsData = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
  },
  {
    id: "skill",
    label: "Skill Enhancement",
    icon: Code,
  },
];

// Updated resources data structure
const resourcesData = {
  notes: {
    neet: {
      biology: {
        zoology: {
          11: [
            { title: "Animal Kingdom", description: "Class 11 Zoology Chapter 1", link: "/resources/neet-notes/biology/zoology/11/animal-kingdom" },
            { title: "Structural Organization in Animals", description: "Class 11 Zoology Chapter 2", link: "/resources/neet-notes/biology/zoology/11/structural-organization" },
          ],
          12: [
            { title: "Human Reproduction", description: "Class 12 Zoology Chapter 1", link: "/resources/neet-notes/biology/zoology/12/human-reproduction" },
            { title: "Human Health and Disease", description: "Class 12 Zoology Chapter 2", link: "/resources/neet-notes/biology/zoology/12/human-health" },
          ],
        },
        botany: {
          11: [
            { title: "Cell: The Unit of Life", description: "Class 11 Botany Chapter 1", link: "/resources/neet-notes/biology/botany/11/cell-unit-of-life" },
            { title: "Plant Morphology", description: "Class 11 Botany Chapter 2", link: "/resources/neet-notes/biology/botany/11/plant-morphology" },
          ],
          12: [
            { title: "Reproduction in Plants", description: "Class 12 Botany Chapter 1", link: "/resources/neet-notes/biology/botany/12/reproduction-in-plants" },
            { title: "Genetics and Evolution", description: "Class 12 Botany Chapter 2", link: "/resources/neet-notes/biology/botany/12/genetics-evolution" },
          ],
        },
      },
      physics: {
        11: [
          { title: "Physical World and Measurement", description: "Class 11 Physics Chapter 1", link: "/resources/neet-notes/physics/11/physical-world" },
          { title: "Kinematics", description: "Class 11 Physics Chapter 2", link: "/resources/neet-notes/physics/11/kinematics" },
        ],
        12: [
          { title: "Electrostatics", description: "Class 12 Physics Chapter 1", link: "/resources/neet-notes/physics/12/electrostatics" },
          { title: "Current Electricity", description: "Class 12 Physics Chapter 2", link: "/resources/neet-notes/physics/12/current-electricity" },
        ],
      },
      chemistry: {
        organic: {
          11: [
            { title: "Basic Organic Chemistry", description: "Class 11 Organic Chemistry Chapter 1", link: "/resources/neet-notes/chemistry/organic/11/basic-organic" },
            { title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 2", link: "/resources/neet-notes/chemistry/organic/11/hydrocarbons" },
          ],
          12: [
            { title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 1", link: "/resources/neet-notes/chemistry/organic/12/alcohols-phenols" },
            { title: "Aldehydes, Ketones and Acids", description: "Class 12 Organic Chemistry Chapter 2", link: "/resources/neet-notes/chemistry/organic/12/aldehydes-ketones" },
          ],
        },
        inorganic: {
          11: [
            { title: "Classification of Elements", description: "Class 11 Inorganic Chemistry Chapter 1", link: "/resources/neet-notes/chemistry/inorganic/11/classification" },
            { title: "Chemical Bonding", description: "Class 11 Inorganic Chemistry Chapter 2", link: "/resources/neet-notes/chemistry/inorganic/11/chemical-bonding" },
          ],
          12: [
            { title: "p-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 1", link: "/resources/neet-notes/chemistry/inorganic/12/p-block-elements" },
            { title: "d and f Block Elements", description: "Class 12 Inorganic Chemistry Chapter 2", link: "/resources/neet-notes/chemistry/inorganic/12/d-f-block" },
          ],
        },
        physical: {
          11: [
            { title: "States of Matter", description: "Class 11 Physical Chemistry Chapter 1", link: "/resources/neet-notes/chemistry/physical/11/states-of-matter" },
            { title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 2", link: "/resources/neet-notes/chemistry/physical/11/thermodynamics" },
          ],
          12: [
            { title: "Solutions", description: "Class 12 Physical Chemistry Chapter 1", link: "/resources/neet-notes/chemistry/physical/12/solutions" },
            { title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 2", link: "/resources/neet-notes/chemistry/physical/12/electrochemistry" },
          ],
        },
      },
    },
    jee: {
      mathematics: {
        11: [
          { title: "Sets, Relations and Functions", description: "Class 11 Mathematics Chapter 1", link: "/resources/jee-notes/mathematics/11/sets-relations" },
          { title: "Complex Numbers", description: "Class 11 Mathematics Chapter 2", link: "/resources/jee-notes/mathematics/11/complex-numbers" },
        ],
        12: [
          { title: "Differential Calculus", description: "Class 12 Mathematics Chapter 1", link: "/resources/jee-notes/mathematics/12/differential-calculus" },
          { title: "Integral Calculus", description: "Class 12 Mathematics Chapter 2", link: "/resources/jee-notes/mathematics/12/integral-calculus" },
        ],
      },
      physics: {
        11: [
          { title: "Physics and Measurement", description: "Class 11 Physics Chapter 1", link: "/resources/jee-notes/physics/11/physics-measurement" },
          { title: "Kinematics", description: "Class 11 Physics Chapter 2", link: "/resources/jee-notes/physics/11/kinematics" },
        ],
        12: [
          { title: "Electrostatics", description: "Class 12 Physics Chapter 1", link: "/resources/jee-notes/physics/12/electrostatics" },
          { title: "Current Electricity", description: "Class 12 Physics Chapter 2", link: "/resources/jee-notes/physics/12/current-electricity" },
        ],
      },
      chemistry: {
        organic: {
          11: [
            { title: "Basic Organic Chemistry", description: "Class 11 Organic Chemistry Chapter 1", link: "/resources/jee-notes/chemistry/organic/11/basic-organic" },
            { title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 2", link: "/resources/jee-notes/chemistry/organic/11/hydrocarbons" },
          ],
          12: [
            { title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 1", link: "/resources/jee-notes/chemistry/organic/12/alcohols-phenols" },
            { title: "Aldehydes, Ketones and Acids", description: "Class 12 Organic Chemistry Chapter 2", link: "/resources/jee-notes/chemistry/organic/12/aldehydes-ketones" },
          ],
        },
        inorganic: {
          11: [
            { title: "Periodic Table and Properties", description: "Class 11 Inorganic Chemistry Chapter 1", link: "/resources/jee-notes/chemistry/inorganic/11/periodic-table" },
            { title: "Chemical Bonding", description: "Class 11 Inorganic Chemistry Chapter 2", link: "/resources/jee-notes/chemistry/inorganic/11/chemical-bonding" },
          ],
          12: [
            { title: "d and f Block Elements", description: "Class 12 Inorganic Chemistry Chapter 1", link: "/resources/jee-notes/chemistry/inorganic/12/d-f-block" },
            { title: "Coordination Compounds", description: "Class 12 Inorganic Chemistry Chapter 2", link: "/resources/jee-notes/chemistry/inorganic/12/coordination-compounds" },
          ],
        },
        physical: {
          11: [
            { title: "States of Matter", description: "Class 11 Physical Chemistry Chapter 1", link: "/resources/jee-notes/chemistry/physical/11/states-of-matter" },
            { title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 2", link: "/resources/jee-notes/chemistry/physical/11/thermodynamics" },
          ],
          12: [
            { title: "Solutions", description: "Class 12 Physical Chemistry Chapter 1", link: "/resources/jee-notes/chemistry/physical/12/solutions" },
            { title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 2", link: "/resources/jee-notes/chemistry/physical/12/electrochemistry" },
          ],
        },
      },
    },
    iitmbs: {
      dataScience: [
        { title: "Introduction to Programming", description: "Fundamentals of programming concepts", link: "/resources/iitmbs-notes/data-science/intro-programming" },
        { title: "Data Structures", description: "Essential data structures for efficient programming", link: "/resources/iitmbs-notes/data-science/data-structures" },
      ],
      mathematics: [
        { title: "Calculus", description: "Comprehensive coverage of calculus concepts", link: "/resources/iitmbs-notes/mathematics/calculus" },
        { title: "Linear Algebra", description: "Vectors, matrices and linear transformations", link: "/resources/iitmbs-notes/mathematics/linear-algebra" },
      ],
      statistics: [
        { title: "Probability Theory", description: "Fundamentals of probability theory", link: "/resources/iitmbs-notes/statistics/probability" },
        { title: "Statistical Inference", description: "Methods of drawing conclusions from data", link: "/resources/iitmbs-notes/statistics/inference" },
      ],
    },
  },
  skill: [
    {
      title: "Web Development",
      description: "Learn front-end and back-end web development technologies.",
      link: "/resources/web-development",
    },
    {
      title: "UI/UX Design",
      description: "Master user interface and experience design principles.",
      link: "/resources/ui-ux-design",
    },
    {
      title: "Data Science",
      description: "Explore data analysis, visualization, and machine learning.",
      link: "/resources/data-science",
    },
    {
      title: "Mobile App Development",
      description: "Build cross-platform mobile applications using modern frameworks.",
      link: "/resources/mobile-development",
    },
  ],
};

// Community Links
const communityLinks = {
  neet: {
    whatsapp: "https://chat.whatsapp.com/neet-community",
    telegram: "https://t.me/neet-community",
  },
  jee: {
    whatsapp: "https://chat.whatsapp.com/jee-community",
    telegram: "https://t.me/jee-community",
  },
  iitmbs: {
    whatsapp: "https://chat.whatsapp.com/iitmbs-community",
    telegram: "https://t.me/iitmbs-community",
  }
};

const ResourceHubSection = () => {
  const [activeTab, setActiveTab] = useState("notes");
  const [category, setCategory] = useState("neet");
  const [subject, setSubject] = useState("");
  const [subSubject, setSubSubject] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [iitmSubject, setIITMSubject] = useState("");

  // Reset filters when category changes
  useEffect(() => {
    setSubject("");
    setSubSubject("");
    setClassLevel("");
    setExpandedChapter(null);
    setIITMSubject("");
  }, [category]);

  // Reset sub-filters when subject changes
  useEffect(() => {
    setSubSubject("");
    setClassLevel("");
    setExpandedChapter(null);
  }, [subject]);

  // Reset class level when subSubject changes
  useEffect(() => {
    setClassLevel("");
    setExpandedChapter(null);
  }, [subSubject]);

  // Reset expanded chapter when class level changes
  useEffect(() => {
    setExpandedChapter(null);
  }, [classLevel]);

  const getFilteredSubjects = () => {
    if (category === "neet") {
      return ["biology", "physics", "chemistry"];
    } else if (category === "jee") {
      return ["mathematics", "physics", "chemistry"];
    } else if (category === "iitmbs") {
      return ["dataScience", "mathematics", "statistics"];
    }
    return [];
  };

  const getSubSubjects = () => {
    if (category === "neet") {
      if (subject === "biology") {
        return ["zoology", "botany"];
      } else if (subject === "chemistry") {
        return ["organic", "inorganic", "physical"];
      }
    } else if (category === "jee") {
      if (subject === "chemistry") {
        return ["organic", "inorganic", "physical"];
      }
    }
    return [];
  };

  const getClassLevels = () => {
    if (category === "iitmbs") return [];
    
    if (category === "neet" && subject === "biology") {
      return subSubject ? ["11", "12"] : [];
    } else if (subject) {
      if (category === "jee" && subject === "chemistry" && !subSubject) {
        return [];
      }
      return ["11", "12"];
    }
    return [];
  };

  const renderSubjectFilter = () => {
    const subjects = getFilteredSubjects();
    if (!subjects.length) return null;

    const getDisplayName = (subject) => {
      if (subject === "dataScience") return "Data Science";
      return subject.charAt(0).toUpperCase() + subject.slice(1);
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-4 w-full sm:w-auto">
            <Filter className="w-4 h-4 mr-2" />
            {subject ? getDisplayName(subject) : "Select Subject"}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {subjects.map((subj) => (
            <DropdownMenuItem 
              key={subj}
              onClick={() => setSubject(subj)}
              className="cursor-pointer"
            >
              {getDisplayName(subj)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderSubSubjectFilter = () => {
    const subSubjects = getSubSubjects();
    if (!subSubjects.length) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-4 ml-0 sm:ml-2 mt-2 sm:mt-0 w-full sm:w-auto">
            {subSubject 
              ? subSubject.charAt(0).toUpperCase() + subSubject.slice(1) 
              : `Select ${subject === "biology" ? "Type" : "Branch"}`}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {subSubjects.map((subSubj) => (
            <DropdownMenuItem 
              key={subSubj}
              onClick={() => setSubSubject(subSubj)}
              className="cursor-pointer"
            >
              {subSubj.charAt(0).toUpperCase() + subSubj.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderClassFilter = () => {
    const classes = getClassLevels();
    if (!classes.length) return null;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="mb-4 ml-0 sm:ml-2 mt-2 sm:mt-0 w-full sm:w-auto">
            {classLevel ? `Class ${classLevel}` : "Select Class"}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {classes.map((cls) => (
            <DropdownMenuItem 
              key={cls}
              onClick={() => setClassLevel(cls)}
              className="cursor-pointer"
            >
              Class {cls}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const renderChapters = () => {
    if (category === "iitmbs") {
      if (activeTab === "notes") {
        if (!iitmSubject && subject) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData.notes.iitmbs[subject].map((resource, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
                >
                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-5">{resource.description}</p>
                  <Link to={resource.link}>
                    <Button variant="outline" className="w-full justify-center">
                      View Notes
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          );
        }
        return null;
      }
      return null;
    }

    if (activeTab === "notes") {
      // For NEET Biology
      if (category === "neet" && subject === "biology" && subSubject && classLevel) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.notes.neet.biology[subSubject][classLevel].map((chapter, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${expandedChapter === index ? 'ring-2 ring-royal' : ''}`}
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              >
                <h3 className="text-xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-600 mb-5">{chapter.description}</p>
                <Link to={chapter.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      }
      
      // For NEET Chemistry
      else if (category === "neet" && subject === "chemistry" && subSubject && classLevel) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.notes.neet.chemistry[subSubject][classLevel].map((chapter, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${expandedChapter === index ? 'ring-2 ring-royal' : ''}`}
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              >
                <h3 className="text-xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-600 mb-5">{chapter.description}</p>
                <Link to={chapter.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      }
      
      // For NEET Physics
      else if (category === "neet" && subject === "physics" && classLevel) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.notes.neet.physics[classLevel].map((chapter, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${expandedChapter === index ? 'ring-2 ring-royal' : ''}`}
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              >
                <h3 className="text-xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-600 mb-5">{chapter.description}</p>
                <Link to={chapter.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      }
      
      // For JEE Mathematics
      else if (category === "jee" && subject === "mathematics" && classLevel) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.notes.jee.mathematics[classLevel].map((chapter, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${expandedChapter === index ? 'ring-2 ring-royal' : ''}`}
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              >
                <h3 className="text-xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-600 mb-5">{chapter.description}</p>
                <Link to={chapter.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      }
      
      // For JEE Physics
      else if (category === "jee" && subject === "physics" && classLevel) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.notes.jee.physics[classLevel].map((chapter, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${expandedChapter === index ? 'ring-2 ring-royal' : ''}`}
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              >
                <h3 className="text-xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-600 mb-5">{chapter.description}</p>
                <Link to={chapter.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      }
      
      // For JEE Chemistry
      else if (category === "jee" && subject === "chemistry" && subSubject && classLevel) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resourcesData.notes.jee.chemistry[subSubject][classLevel].map((chapter, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow ${expandedChapter === index ? 'ring-2 ring-royal' : ''}`}
                onClick={() => setExpandedChapter(expandedChapter === index ? null : index)}
              >
                <h3 className="text-xl font-bold mb-3">{chapter.title}</h3>
                <p className="text-gray-600 mb-5">{chapter.description}</p>
                <Link to={chapter.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      }
    }

    return null;
  };

  const renderIITMSubjectFilter = () => {
    if (category !== "iitmbs" || !subject) return null;

    return (
      <div className="flex flex-wrap justify-center mb-6">
        {resourcesData.notes.iitmbs[subject].map((subj, index) => (
          <Button
            key={index}
            variant={iitmSubject === subj.title ? "default" : "outline"}
            className="m-1"
            onClick={() => setIITMSubject(subj.title)}
          >
            {subj.title}
          </Button>
        ))}
      </div>
    );
  };

  const renderCommunitySection = () => {
    if (!category) return null;

    return (
      <div className="mt-10 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-2xl font-bold mb-6 text-center">Join Our Community</h3>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href={communityLinks[category].whatsapp} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-green-600 transition-colors"
          >
            Join WhatsApp Group
          </a>
          <a 
            href={communityLinks[category].telegram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-blue-600 transition-colors"
          >
            Join Telegram Group
          </a>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Your Resource Hub</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive study materials designed by top IIT students to excel in your academic journey.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-sm">
            <button
              onClick={() => setCategory("neet")}
              className={`flex items-center px-6 py-4 ${
                category === "neet"
                  ? "bg-white text-royal font-medium"
                  : "bg-gray-50 text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>NEET</span>
            </button>
            <button
              onClick={() => setCategory("jee")}
              className={`flex items-center px-6 py-4 ${
                category === "jee"
                  ? "bg-white text-royal font-medium"
                  : "bg-gray-50 text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>JEE</span>
            </button>
            <button
              onClick={() => setCategory("iitmbs")}
              className={`flex items-center px-6 py-4 ${
                category === "iitmbs"
                  ? "bg-white text-royal font-medium"
                  : "bg-gray-50 text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>IITM BS</span>
            </button>
          </div>
        </div>

        {/* Main Tabs - Only show Notes and Skill Enhancement */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-lg shadow-sm">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 ${
                  activeTab === tab.id
                    ? "bg-white text-royal font-medium"
                    : "bg-gray-50 text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="mr-2 h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Filters */}
        <div className="flex flex-wrap justify-center mb-8">
          {renderSubjectFilter()}
          {renderSubSubjectFilter()}
          {renderClassFilter()}
        </div>

        {/* IITM Subject Filter */}
        {renderIITMSubjectFilter()}

        {/* Content */}
        <div className="min-h-[300px]">
          {activeTab === "notes" && renderChapters()}
          
          {activeTab === "skill" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resourcesData.skill.map((resource, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                  <p className="text-gray-600 mb-5">{resource.description}</p>
                  <Link to={resource.link}>
                    <Button variant="outline" className="w-full justify-center">
                      View Resources
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Show a message when no content is available */}
          {activeTab === "notes" && !renderChapters() && subject && (
            <div className="text-center py-12">
              <p className="text-gray-600">
                {category === "iitmbs" 
                  ? "Please select a subject to view available notes."
                  : "Please complete your selection to view available chapters."}
              </p>
            </div>
          )}
        </div>

        {/* Community Section */}
        {renderCommunitySection()}
      </div>
    </section>
  );
};

export default ResourceHubSection;

