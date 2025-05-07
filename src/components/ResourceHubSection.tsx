
import React, { useState } from "react";
import { FileText, BookOpen, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import FilterButton from "@/components/FilterButton";
import FilterGroup from "@/components/FilterGroup";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

// Resources data by type
const notesData = {
  neet: {
    biology: {
      botany: {
        "11": [
          {
            id: "botany-11-ch1",
            title: "Cell: The Unit of Life",
            description: "Class 11 Botany Chapter 1",
            link: "/resources/botany-11-ch1",
          },
          {
            id: "botany-11-ch2",
            title: "Plant Morphology",
            description: "Class 11 Botany Chapter 2",
            link: "/resources/botany-11-ch2",
          },
        ],
        "12": [
          {
            id: "botany-12-ch1",
            title: "Reproduction in Plants",
            description: "Class 12 Botany Chapter 1",
            link: "/resources/botany-12-ch1",
          },
          {
            id: "botany-12-ch2",
            title: "Plant Physiology",
            description: "Class 12 Botany Chapter 2",
            link: "/resources/botany-12-ch2",
          },
        ],
      },
      zoology: {
        "11": [
          {
            id: "zoology-11-ch1",
            title: "Animal Kingdom",
            description: "Class 11 Zoology Chapter 1",
            link: "/resources/zoology-11-ch1",
          },
          {
            id: "zoology-11-ch2",
            title: "Structural Organization in Animals",
            description: "Class 11 Zoology Chapter 2",
            link: "/resources/zoology-11-ch2",
          },
        ],
        "12": [
          {
            id: "zoology-12-ch1",
            title: "Human Reproduction",
            description: "Class 12 Zoology Chapter 1",
            link: "/resources/zoology-12-ch1",
          },
          {
            id: "zoology-12-ch2",
            title: "Human Health and Disease",
            description: "Class 12 Zoology Chapter 2",
            link: "/resources/zoology-12-ch2",
          },
        ],
      },
    },
    physics: {
      "11": [
        {
          id: "physics-11-ch1",
          title: "Physical World and Measurement",
          description: "Class 11 Physics Chapter 1",
          link: "/resources/physics-11-ch1",
        },
        {
          id: "physics-11-ch2",
          title: "Kinematics",
          description: "Class 11 Physics Chapter 2",
          link: "/resources/physics-11-ch2",
        },
      ],
      "12": [
        {
          id: "physics-12-ch1",
          title: "Electrostatics",
          description: "Class 12 Physics Chapter 1",
          link: "/resources/physics-12-ch1",
        },
        {
          id: "physics-12-ch2",
          title: "Current Electricity",
          description: "Class 12 Physics Chapter 2",
          link: "/resources/physics-12-ch2",
        },
      ],
    },
    chemistry: {
      organic: {
        "11": [
          {
            id: "chemistry-organic-11-ch1",
            title: "Basic Organic Chemistry",
            description: "Class 11 Organic Chemistry Chapter 1",
            link: "/resources/chemistry-organic-11-ch1",
          },
          {
            id: "chemistry-organic-11-ch2",
            title: "Hydrocarbons",
            description: "Class 11 Organic Chemistry Chapter 2",
            link: "/resources/chemistry-organic-11-ch2",
          },
        ],
        "12": [
          {
            id: "chemistry-organic-12-ch1",
            title: "Alcohols, Phenols and Ethers",
            description: "Class 12 Organic Chemistry Chapter 1",
            link: "/resources/chemistry-organic-12-ch1",
          },
          {
            id: "chemistry-organic-12-ch2",
            title: "Aldehydes, Ketones and Carboxylic Acids",
            description: "Class 12 Organic Chemistry Chapter 2",
            link: "/resources/chemistry-organic-12-ch2",
          },
        ],
      },
      inorganic: {
        "11": [
          {
            id: "chemistry-inorganic-11-ch1",
            title: "Classification of Elements",
            description: "Class 11 Inorganic Chemistry Chapter 1",
            link: "/resources/chemistry-inorganic-11-ch1",
          },
          {
            id: "chemistry-inorganic-11-ch2",
            title: "Chemical Bonding",
            description: "Class 11 Inorganic Chemistry Chapter 2",
            link: "/resources/chemistry-inorganic-11-ch2",
          },
        ],
        "12": [
          {
            id: "chemistry-inorganic-12-ch1",
            title: "p-Block Elements",
            description: "Class 12 Inorganic Chemistry Chapter 1",
            link: "/resources/chemistry-inorganic-12-ch1",
          },
          {
            id: "chemistry-inorganic-12-ch2",
            title: "d and f Block Elements",
            description: "Class 12 Inorganic Chemistry Chapter 2",
            link: "/resources/chemistry-inorganic-12-ch2",
          },
        ],
      },
      physical: {
        "11": [
          {
            id: "chemistry-physical-11-ch1",
            title: "States of Matter",
            description: "Class 11 Physical Chemistry Chapter 1",
            link: "/resources/chemistry-physical-11-ch1",
          },
          {
            id: "chemistry-physical-11-ch2",
            title: "Thermodynamics",
            description: "Class 11 Physical Chemistry Chapter 2",
            link: "/resources/chemistry-physical-11-ch2",
          },
        ],
        "12": [
          {
            id: "chemistry-physical-12-ch1",
            title: "Solutions",
            description: "Class 12 Physical Chemistry Chapter 1",
            link: "/resources/chemistry-physical-12-ch1",
          },
          {
            id: "chemistry-physical-12-ch2",
            title: "Electrochemistry",
            description: "Class 12 Physical Chemistry Chapter 2",
            link: "/resources/chemistry-physical-12-ch2",
          },
        ],
      },
    },
  },
  jee: {
    math: {
      "11": [
        {
          id: "math-11-ch1",
          title: "Sets, Relations and Functions",
          description: "Class 11 Mathematics Chapter 1",
          link: "/resources/math-11-ch1",
        },
        {
          id: "math-11-ch2",
          title: "Complex Numbers and Quadratic Equations",
          description: "Class 11 Mathematics Chapter 2",
          link: "/resources/math-11-ch2",
        },
      ],
      "12": [
        {
          id: "math-12-ch1",
          title: "Differential Calculus",
          description: "Class 12 Mathematics Chapter 1",
          link: "/resources/math-12-ch1",
        },
        {
          id: "math-12-ch2",
          title: "Integral Calculus",
          description: "Class 12 Mathematics Chapter 2",
          link: "/resources/math-12-ch2",
        },
      ],
    },
    physics: {
      "11": [
        {
          id: "physics-11-ch1",
          title: "Physics and Measurement",
          description: "Class 11 Physics Chapter 1",
          link: "/resources/physics-11-ch1",
        },
        {
          id: "physics-11-ch2",
          title: "Kinematics",
          description: "Class 11 Physics Chapter 2",
          link: "/resources/physics-11-ch2",
        },
      ],
      "12": [
        {
          id: "physics-12-ch1",
          title: "Electrostatics",
          description: "Class 12 Physics Chapter 1",
          link: "/resources/physics-12-ch1",
        },
        {
          id: "physics-12-ch2",
          title: "Current Electricity",
          description: "Class 12 Physics Chapter 2",
          link: "/resources/physics-12-ch2",
        },
      ],
    },
    chemistry: {
      organic: {
        "11": [
          {
            id: "chemistry-organic-11-ch1",
            title: "Basic Organic Chemistry",
            description: "Class 11 Organic Chemistry Chapter 1",
            link: "/resources/chemistry-organic-11-ch1",
          },
          {
            id: "chemistry-organic-11-ch2",
            title: "Hydrocarbons",
            description: "Class 11 Organic Chemistry Chapter 2",
            link: "/resources/chemistry-organic-11-ch2",
          },
        ],
        "12": [
          {
            id: "chemistry-organic-12-ch1",
            title: "Alcohols, Phenols and Ethers",
            description: "Class 12 Organic Chemistry Chapter 1",
            link: "/resources/chemistry-organic-12-ch1",
          },
          {
            id: "chemistry-organic-12-ch2",
            title: "Aldehydes, Ketones and Carboxylic Acids",
            description: "Class 12 Organic Chemistry Chapter 2",
            link: "/resources/chemistry-organic-12-ch2",
          },
        ],
      },
      inorganic: {
        "11": [
          {
            id: "chemistry-inorganic-11-ch1",
            title: "Periodic Table and Properties",
            description: "Class 11 Inorganic Chemistry Chapter 1",
            link: "/resources/chemistry-inorganic-11-ch1",
          },
          {
            id: "chemistry-inorganic-11-ch2",
            title: "Chemical Bonding",
            description: "Class 11 Inorganic Chemistry Chapter 2",
            link: "/resources/chemistry-inorganic-11-ch2",
          },
        ],
        "12": [
          {
            id: "chemistry-inorganic-12-ch1",
            title: "d and f Block Elements",
            description: "Class 12 Inorganic Chemistry Chapter 1",
            link: "/resources/chemistry-inorganic-12-ch1",
          },
          {
            id: "chemistry-inorganic-12-ch2",
            title: "Coordination Compounds",
            description: "Class 12 Inorganic Chemistry Chapter 2",
            link: "/resources/chemistry-inorganic-12-ch2",
          },
        ],
      },
      physical: {
        "11": [
          {
            id: "chemistry-physical-11-ch1",
            title: "States of Matter",
            description: "Class 11 Physical Chemistry Chapter 1",
            link: "/resources/chemistry-physical-11-ch1",
          },
          {
            id: "chemistry-physical-11-ch2",
            title: "Thermodynamics",
            description: "Class 11 Physical Chemistry Chapter 2",
            link: "/resources/chemistry-physical-11-ch2",
          },
        ],
        "12": [
          {
            id: "chemistry-physical-12-ch1",
            title: "Solutions",
            description: "Class 12 Physical Chemistry Chapter 1",
            link: "/resources/chemistry-physical-12-ch1",
          },
          {
            id: "chemistry-physical-12-ch2",
            title: "Electrochemistry",
            description: "Class 12 Physical Chemistry Chapter 2",
            link: "/resources/chemistry-physical-12-ch2",
          },
        ],
      },
    },
  },
  iitm: {
    "data-science": {
      foundation: [
        {
          id: "data-science-foundation-1",
          title: "Programming Basics",
          description: "Introduction to programming concepts and Python",
          link: "/resources/data-science-foundation-1",
        },
        {
          id: "data-science-foundation-2",
          title: "Data Structures",
          description: "Basic data structures implementation in Python",
          link: "/resources/data-science-foundation-2",
        },
      ],
      diploma: [
        {
          id: "data-science-diploma-1",
          title: "Machine Learning Fundamentals",
          description: "Introduction to ML algorithms and frameworks",
          link: "/resources/data-science-diploma-1",
        },
        {
          id: "data-science-diploma-2",
          title: "Data Visualization",
          description: "Tools and techniques for effective data visualization",
          link: "/resources/data-science-diploma-2",
        },
      ],
      "bs-degree": [
        {
          id: "data-science-bs-1",
          title: "Advanced Machine Learning",
          description: "Advanced ML techniques and applications",
          link: "/resources/data-science-bs-1",
        },
        {
          id: "data-science-bs-2",
          title: "Deep Learning",
          description: "Neural networks and deep learning architectures",
          link: "/resources/data-science-bs-2",
        },
      ],
      qualifier: [
        {
          id: "data-science-qualifier-1",
          title: "Qualifier Preparation",
          description: "Resources for Data Science qualifier exams",
          link: "/resources/data-science-qualifier-1",
        },
      ],
    },
    "electronic-systems": {
      foundation: [
        {
          id: "electronic-systems-foundation-1",
          title: "Digital Electronics",
          description: "Introduction to digital systems and logic gates",
          link: "/resources/electronic-systems-foundation-1",
        },
        {
          id: "electronic-systems-foundation-2",
          title: "Circuit Theory",
          description: "Fundamentals of electronic circuits",
          link: "/resources/electronic-systems-foundation-2",
        },
      ],
      diploma: [
        {
          id: "electronic-systems-diploma-1",
          title: "Analog Electronics",
          description: "Operational amplifiers and analog system design",
          link: "/resources/electronic-systems-diploma-1",
        },
        {
          id: "electronic-systems-diploma-2",
          title: "Microcontrollers",
          description: "Introduction to microcontroller architecture and programming",
          link: "/resources/electronic-systems-diploma-2",
        },
      ],
      "bs-degree": [
        {
          id: "electronic-systems-bs-1",
          title: "Embedded Systems",
          description: "Design and implementation of embedded systems",
          link: "/resources/electronic-systems-bs-1",
        },
        {
          id: "electronic-systems-bs-2",
          title: "VLSI Design",
          description: "Very Large Scale Integration design principles",
          link: "/resources/electronic-systems-bs-2",
        },
      ],
      qualifier: [
        {
          id: "electronic-systems-qualifier-1",
          title: "Qualifier Preparation",
          description: "Resources for Electronic Systems qualifier exams",
          link: "/resources/electronic-systems-qualifier-1",
        },
      ],
    },
  },
};

// Community links based on the new rules
const communityLinks = {
  neet: {
    telegram: {
      title: "NEET Main Telegram Group",
      link: "https://t.me/example-neet",
    },
    whatsapp: {
      title: "NEET WhatsApp Community",
      link: "https://chat.whatsapp.com/example1",
    },
  },
  jee: {
    telegram: {
      title: "JEE Main Telegram Group",
      link: "https://t.me/example-jee-main",
    },
    whatsapp: {
      title: "JEE WhatsApp Community",
      link: "https://chat.whatsapp.com/example-jee1",
    },
  },
  iitm: {
    "data-science": {
      telegram: {
        title: "IITM BS Data Science Telegram Group",
        link: "https://t.me/example-ds",
      },
      whatsapp: [
        {
          title: "Programming Fundamentals WhatsApp Group",
          link: "https://chat.whatsapp.com/ds-programming",
        },
        {
          title: "Machine Learning WhatsApp Group",
          link: "https://chat.whatsapp.com/ds-ml",
        },
        {
          title: "Statistics & Math WhatsApp Group",
          link: "https://chat.whatsapp.com/ds-stats",
        },
      ],
    },
    "electronic-systems": {
      telegram: {
        title: "IITM BS Electronic Systems Telegram Group",
        link: "https://t.me/example-es",
      },
      whatsapp: [
        {
          title: "Digital Electronics WhatsApp Group",
          link: "https://chat.whatsapp.com/es-digital",
        },
        {
          title: "Analog Electronics WhatsApp Group",
          link: "https://chat.whatsapp.com/es-analog",
        },
        {
          title: "Embedded Systems WhatsApp Group",
          link: "https://chat.whatsapp.com/es-embedded",
        },
      ],
    },
  },
};

const skillData = [
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
];

const ResourceHubSection = ({ examType = "neet" }) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("data-science");
  const [selectedLevel, setSelectedLevel] = useState("foundation");
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  const resetFilters = () => {
    setSelectedSubject("");
    setSelectedClass("");
    setSelectedSubType("");
  };

  const subjectOptions = {
    neet: ["biology", "physics", "chemistry"],
    jee: ["math", "physics", "chemistry"],
  };

  const classOptions = ["11", "12"];

  const subTypeOptions = {
    biology: ["botany", "zoology"],
    chemistry: ["organic", "inorganic", "physical"],
  };

  const branchOptions = ["data-science", "electronic-systems"];
  const levelOptions = ["foundation", "diploma", "bs-degree", "qualifier"];

  const getSubjectDisplayName = (subject: string) => {
    const nameMap: Record<string, string> = {
      "biology": "Biology",
      "physics": "Physics",
      "chemistry": "Chemistry",
      "math": "Mathematics",
      "data-science": "Data Science",
      "electronic-systems": "Electronic Systems",
    };
    return nameMap[subject] || subject.charAt(0).toUpperCase() + subject.slice(1);
  };

  const getSubTypeDisplayName = (subType: string) => {
    const nameMap: Record<string, string> = {
      "botany": "Botany",
      "zoology": "Zoology",
      "organic": "Organic",
      "inorganic": "Inorganic",
      "physical": "Physical",
    };
    return nameMap[subType] || subType.charAt(0).toUpperCase() + subType.slice(1);
  };

  const getLevelDisplayName = (level: string) => {
    const nameMap: Record<string, string> = {
      "foundation": "Foundation",
      "diploma": "Diploma",
      "bs-degree": "BS Degree",
      "qualifier": "Qualifier",
    };
    return nameMap[level] || level.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };

  const getFilteredNotes = () => {
    if (examType === "iitm") {
      if (selectedBranch && selectedLevel) {
        return notesData.iitm[selectedBranch as keyof typeof notesData.iitm][selectedLevel as keyof typeof notesData.iitm[keyof typeof notesData.iitm]] || [];
      }
      return [];
    }
    
    const examData = notesData[examType as keyof typeof notesData];
    if (!selectedSubject) return [];
    
    if (selectedSubject === "biology" || selectedSubject === "chemistry") {
      if (!selectedSubType || !selectedClass) return [];
      return examData[selectedSubject][selectedSubType as keyof typeof examData[typeof selectedSubject]][selectedClass] || [];
    } else {
      if (!selectedClass) return [];
      return examData[selectedSubject as keyof typeof examData][selectedClass] || [];
    }
  };

  const needsSubTypeFilter = () => {
    return selectedSubject === "biology" || selectedSubject === "chemistry";
  };

  const renderIITMFilters = () => (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FilterGroup
          title="Branch"
          options={branchOptions.map(option => getSubjectDisplayName(option))}
          activeOption={getSubjectDisplayName(selectedBranch)}
          onChange={(option) => setSelectedBranch(branchOptions[branchOptions.map(opt => getSubjectDisplayName(opt)).indexOf(option)])}
        />
        <FilterGroup
          title="Level"
          options={levelOptions.map(option => getLevelDisplayName(option))}
          activeOption={getLevelDisplayName(selectedLevel)}
          onChange={(option) => setSelectedLevel(levelOptions[levelOptions.map(opt => getLevelDisplayName(opt)).indexOf(option)])}
        />
      </div>
    </div>
  );

  const renderExamFilters = () => (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Subject Filter */}
        <div>
          <h3 className="text-xl font-bold mb-3">Subject</h3>
          <div className="flex flex-wrap">
            {(subjectOptions[examType as keyof typeof subjectOptions] || []).map((subject) => (
              <FilterButton
                key={subject}
                label={getSubjectDisplayName(subject)}
                isActive={selectedSubject === subject}
                onClick={() => {
                  setSelectedSubject(subject);
                  setSelectedClass("");
                  setSelectedSubType("");
                }}
              />
            ))}
          </div>
        </div>

        {/* Class Filter - Only show if subject is selected */}
        {selectedSubject && (
          <div>
            <h3 className="text-xl font-bold mb-3">Class</h3>
            <div className="flex flex-wrap">
              {classOptions.map((classOption) => (
                <FilterButton
                  key={classOption}
                  label={`Class ${classOption}`}
                  isActive={selectedClass === classOption}
                  onClick={() => setSelectedClass(classOption)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sub-type Filter - Only show for Biology and Chemistry */}
        {selectedSubject && needsSubTypeFilter() && (
          <div>
            <h3 className="text-xl font-bold mb-3">{selectedSubject === "biology" ? "Type" : "Chemistry Type"}</h3>
            <div className="flex flex-wrap">
              {(subTypeOptions[selectedSubject as keyof typeof subTypeOptions] || []).map((subType) => (
                <FilterButton
                  key={subType}
                  label={getSubTypeDisplayName(subType)}
                  isActive={selectedSubType === subType}
                  onClick={() => setSelectedSubType(subType)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderCommunityLinks = () => {
    if (examType === "iitm") {
      const branchLinks = communityLinks.iitm[selectedBranch as keyof typeof communityLinks.iitm];
      if (!branchLinks) return null;

      return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Telegram Group */}
          <div className="md:col-span-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Telegram Community</h3>
              <p className="text-gray-600 mb-4">
                Join our Telegram group to connect with other {getSubjectDisplayName(selectedBranch)} students.
              </p>
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <a href={branchLinks.telegram.link} target="_blank" rel="noopener noreferrer">
                  Join Telegram Group
                </a>
              </Button>
            </div>
          </div>

          {/* WhatsApp Groups */}
          <div className="md:col-span-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">WhatsApp Subject Groups</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {branchLinks.whatsapp.map((group, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-bold mb-2">{group.title}</h4>
                    <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <a href={group.link} target="_blank" rel="noopener noreferrer">
                        Join Group
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      const examLinks = communityLinks[examType as keyof typeof communityLinks];
      if (!examLinks) return null;

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Telegram Community</h3>
            <p className="text-gray-600 mb-4">
              Join our main Telegram group for {examType.toUpperCase()} preparation discussions and updates.
            </p>
            <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <a href={examLinks.telegram.link} target="_blank" rel="noopener noreferrer">
                Join Telegram Group
              </a>
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">WhatsApp Community</h3>
            <p className="text-gray-600 mb-4">
              Join our WhatsApp community for quick discussions and to connect with fellow students.
            </p>
            <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
              <a href={examLinks.whatsapp.link} target="_blank" rel="noopener noreferrer">
                Join WhatsApp Group
              </a>
            </Button>
          </div>
        </div>
      );
    }
  };

  const toggleChapter = (id: string) => {
    if (expandedChapter === id) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(id);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Your Resource Hub</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive study materials designed by top IIT students to excel in your academic journey.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 overflow-x-auto">
          <ToggleGroup 
            type="single" 
            value={activeTab} 
            onValueChange={(value) => {
              if (value) {
                setActiveTab(value);
                resetFilters();
              }
            }}
            className="justify-start md:justify-center bg-white inline-flex rounded-lg p-1 shadow-sm border border-gray-200 min-w-full md:min-w-0"
          >
            {tabsData.map((tab) => (
              <ToggleGroupItem 
                key={tab.id} 
                value={tab.id}
                className={`flex items-center gap-2 px-4 py-2 rounded-md ${activeTab === tab.id ? "bg-royal text-white" : "bg-transparent text-gray-700 hover:bg-gray-100"}`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === "notes" && (
            <div>
              {examType === "iitm" ? renderIITMFilters() : renderExamFilters()}

              {/* Notes Display */}
              <div className="mt-8">
                {getFilteredNotes().length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getFilteredNotes().map((note) => (
                      <div 
                        key={note.id} 
                        className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300"
                        onClick={() => toggleChapter(note.id)}
                      >
                        <h3 className="text-lg font-bold mb-2 cursor-pointer flex justify-between items-center">
                          {note.title}
                          <span className={`transform transition-transform ${expandedChapter === note.id ? 'rotate-180' : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </h3>
                        <p className="text-gray-600 mb-4">{note.description}</p>
                        
                        {expandedChapter === note.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-gray-700 mb-4">
                              This chapter covers important concepts and formulas that are crucial for your exam preparation.
                            </p>
                            <Button 
                              variant="outline" 
                              className="w-full justify-center"
                              asChild
                            >
                              <Link to={note.link}>
                                View Notes
                              </Link>
                            </Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    {(examType === "iitm" && (!selectedBranch || !selectedLevel)) || 
                     (examType !== "iitm" && (!selectedSubject || !selectedClass || (needsSubTypeFilter() && !selectedSubType))) ? (
                      <p className="text-lg text-gray-600">Please select filters to view available notes.</p>
                    ) : (
                      <p className="text-lg text-gray-600">No notes available for the selected filters.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "skill" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillData.map((resource, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow p-5">
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

          {activeTab === "community" && (
            <div className="pt-4">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">
                  Join the United Community
                </h3>
                <p className="text-lg text-gray-600">
                  Get help, share resources, and connect with other students preparing for {examType.toUpperCase()}
                </p>
              </div>
              
              {renderCommunityLinks()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSection;
