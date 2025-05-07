
import React, { useState, useEffect } from "react";
import { FileText, BookOpen, Code } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useIsMobile } from "@/hooks/use-mobile";

const tabsData = [
  {
    id: "notes",
    label: "Notes",
    icon: FileText,
  },
];

interface NoteItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface SubjectNotes {
  "11": NoteItem[];
  "12": NoteItem[];
}

interface BiologySubtype {
  botany: SubjectNotes;
  zoology: SubjectNotes;
}

interface ChemistrySubtype {
  organic: SubjectNotes;
  inorganic: SubjectNotes;
  physical: SubjectNotes;
}

interface CommunityLink {
  title: string;
  link: string;
}

interface GroupLinks {
  telegram: CommunityLink;
  whatsapp: CommunityLink;
}

interface IITMBranchCommunityLinks {
  telegram: CommunityLink;
  whatsapp: CommunityLink[];
}

type NEETJEECommunityLinks = GroupLinks;

type IITMCommunityLinks = {
  "data-science": IITMBranchCommunityLinks;
  "electronic-systems": IITMBranchCommunityLinks;
};

interface NEETNotesData {
  biology: BiologySubtype;
  physics: SubjectNotes;
  chemistry: ChemistrySubtype;
}

interface JEENotesData {
  math: SubjectNotes;
  physics: SubjectNotes;
  chemistry: ChemistrySubtype;
}

interface IITMNotesItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface IITMNotesLevel {
  foundation: IITMNotesItem[];
  diploma: IITMNotesItem[];
  "bs-degree": IITMNotesItem[];
  qualifier: IITMNotesItem[];
}

interface IITMBranch {
  "data-science": IITMNotesLevel;
  "electronic-systems": IITMNotesLevel;
}

type NotesData = {
  neet: NEETNotesData;
  jee: JEENotesData;
  "iitm-bs": IITMBranch;
};

type CommunityData = {
  neet: NEETJEECommunityLinks;
  jee: NEETJEECommunityLinks;
  "iitm-bs": IITMCommunityLinks;
};

// Sample data structure
const notesData: NotesData = {
  neet: {
    biology: {
      botany: {
        "11": [
          {
            id: "botany-11-1",
            title: "Plant Kingdom",
            description: "Classification and characteristics of plant kingdom",
            link: "/resources/neet/biology/botany/11/plant-kingdom",
          },
          {
            id: "botany-11-2",
            title: "Cell Structure",
            description: "Structure and functions of plant cell",
            link: "/resources/neet/biology/botany/11/cell-structure",
          },
        ],
        "12": [
          {
            id: "botany-12-1",
            title: "Genetics",
            description: "Principles of inheritance and variation",
            link: "/resources/neet/biology/botany/12/genetics",
          },
          {
            id: "botany-12-2",
            title: "Reproduction in Plants",
            description: "Sexual and asexual reproduction in plants",
            link: "/resources/neet/biology/botany/12/reproduction",
          },
        ],
      },
      zoology: {
        "11": [
          {
            id: "zoology-11-1",
            title: "Animal Kingdom",
            description: "Classification and characteristics of animal kingdom",
            link: "/resources/neet/biology/zoology/11/animal-kingdom",
          },
          {
            id: "zoology-11-2",
            title: "Human Physiology",
            description: "Functions of different human body systems",
            link: "/resources/neet/biology/zoology/11/human-physiology",
          },
        ],
        "12": [
          {
            id: "zoology-12-1",
            title: "Human Reproduction",
            description: "Reproductive system and process in humans",
            link: "/resources/neet/biology/zoology/12/human-reproduction",
          },
          {
            id: "zoology-12-2",
            title: "Evolution",
            description: "Theories and evidences of evolution",
            link: "/resources/neet/biology/zoology/12/evolution",
          },
        ],
      },
    },
    physics: {
      "11": [
        {
          id: "physics-11-1",
          title: "Mechanics",
          description: "Laws of motion, work, energy and power",
          link: "/resources/neet/physics/11/mechanics",
        },
        {
          id: "physics-11-2",
          title: "Thermodynamics",
          description: "Heat, temperature and laws of thermodynamics",
          link: "/resources/neet/physics/11/thermodynamics",
        },
      ],
      "12": [
        {
          id: "physics-12-1",
          title: "Electrostatics",
          description: "Electric charges, fields and potentials",
          link: "/resources/neet/physics/12/electrostatics",
        },
        {
          id: "physics-12-2",
          title: "Optics",
          description: "Ray optics and wave optics",
          link: "/resources/neet/physics/12/optics",
        },
      ],
    },
    chemistry: {
      organic: {
        "11": [
          {
            id: "chemistry-organic-11-1",
            title: "Basic Organic Chemistry",
            description: "Fundamental concepts of organic chemistry",
            link: "/resources/neet/chemistry/organic/11/basics",
          },
        ],
        "12": [
          {
            id: "chemistry-organic-12-1",
            title: "Biomolecules",
            description: "Proteins, carbohydrates, nucleic acids",
            link: "/resources/neet/chemistry/organic/12/biomolecules",
          },
        ],
      },
      inorganic: {
        "11": [
          {
            id: "chemistry-inorganic-11-1",
            title: "Periodic Table",
            description: "Classification of elements and periodicity",
            link: "/resources/neet/chemistry/inorganic/11/periodic-table",
          },
        ],
        "12": [
          {
            id: "chemistry-inorganic-12-1",
            title: "Coordination Compounds",
            description: "Coordination complexes and their properties",
            link: "/resources/neet/chemistry/inorganic/12/coordination",
          },
        ],
      },
      physical: {
        "11": [
          {
            id: "chemistry-physical-11-1",
            title: "States of Matter",
            description: "Gas laws, liquid state and solid state",
            link: "/resources/neet/chemistry/physical/11/states",
          },
        ],
        "12": [
          {
            id: "chemistry-physical-12-1",
            title: "Chemical Kinetics",
            description: "Rate of reactions and factors affecting them",
            link: "/resources/neet/chemistry/physical/12/kinetics",
          },
        ],
      },
    },
  },
  jee: {
    math: {
      "11": [
        {
          id: "math-11-1",
          title: "Trigonometry",
          description: "Trigonometric functions, equations and identities",
          link: "/resources/jee/math/11/trigonometry",
        },
        {
          id: "math-11-2",
          title: "Coordinate Geometry",
          description: "Points, lines and circles in coordinate plane",
          link: "/resources/jee/math/11/coordinate-geometry",
        },
      ],
      "12": [
        {
          id: "math-12-1",
          title: "Calculus",
          description: "Limits, continuity, differentiation and integration",
          link: "/resources/jee/math/12/calculus",
        },
        {
          id: "math-12-2",
          title: "Probability",
          description: "Random variables, distributions and theorems",
          link: "/resources/jee/math/12/probability",
        },
      ],
    },
    physics: {
      "11": [
        {
          id: "physics-11-1",
          title: "Mechanics",
          description: "Laws of motion, work, energy and power",
          link: "/resources/jee/physics/11/mechanics",
        },
        {
          id: "physics-11-2",
          title: "Thermodynamics",
          description: "Heat, temperature and laws of thermodynamics",
          link: "/resources/jee/physics/11/thermodynamics",
        },
      ],
      "12": [
        {
          id: "physics-12-1",
          title: "Electrostatics",
          description: "Electric charges, fields and potentials",
          link: "/resources/jee/physics/12/electrostatics",
        },
        {
          id: "physics-12-2",
          title: "Optics",
          description: "Ray optics and wave optics",
          link: "/resources/jee/physics/12/optics",
        },
      ],
    },
    chemistry: {
      organic: {
        "11": [
          {
            id: "chemistry-organic-11-1",
            title: "Basic Organic Chemistry",
            description: "Fundamental concepts of organic chemistry",
            link: "/resources/jee/chemistry/organic/11/basics",
          },
        ],
        "12": [
          {
            id: "chemistry-organic-12-1",
            title: "Biomolecules",
            description: "Proteins, carbohydrates, nucleic acids",
            link: "/resources/jee/chemistry/organic/12/biomolecules",
          },
        ],
      },
      inorganic: {
        "11": [
          {
            id: "chemistry-inorganic-11-1",
            title: "Periodic Table",
            description: "Classification of elements and periodicity",
            link: "/resources/jee/chemistry/inorganic/11/periodic-table",
          },
        ],
        "12": [
          {
            id: "chemistry-inorganic-12-1",
            title: "Coordination Compounds",
            description: "Coordination complexes and their properties",
            link: "/resources/jee/chemistry/inorganic/12/coordination",
          },
        ],
      },
      physical: {
        "11": [
          {
            id: "chemistry-physical-11-1",
            title: "States of Matter",
            description: "Gas laws, liquid state and solid state",
            link: "/resources/jee/chemistry/physical/11/states",
          },
        ],
        "12": [
          {
            id: "chemistry-physical-12-1",
            title: "Chemical Kinetics",
            description: "Rate of reactions and factors affecting them",
            link: "/resources/jee/chemistry/physical/12/kinetics",
          },
        ],
      },
    },
  },
  "iitm-bs": {
    "data-science": {
      foundation: [
        {
          id: "ds-foundation-1",
          title: "Programming Basics",
          description: "Introduction to programming concepts and Python",
          link: "/resources/iitm-bs/data-science/foundation/programming-basics",
        },
        {
          id: "ds-foundation-2",
          title: "Statistics Fundamentals",
          description: "Basic statistical concepts and probability",
          link: "/resources/iitm-bs/data-science/foundation/statistics",
        },
      ],
      diploma: [
        {
          id: "ds-diploma-1",
          title: "Data Structures",
          description: "Arrays, linked lists, trees, and algorithms",
          link: "/resources/iitm-bs/data-science/diploma/data-structures",
        },
        {
          id: "ds-diploma-2",
          title: "Machine Learning Basics",
          description: "Introduction to supervised and unsupervised learning",
          link: "/resources/iitm-bs/data-science/diploma/ml-basics",
        },
      ],
      "bs-degree": [
        {
          id: "ds-bs-1",
          title: "Deep Learning",
          description: "Neural networks, CNN, RNN and transformers",
          link: "/resources/iitm-bs/data-science/bs-degree/deep-learning",
        },
        {
          id: "ds-bs-2",
          title: "Natural Language Processing",
          description: "Text processing, sentiment analysis and language models",
          link: "/resources/iitm-bs/data-science/bs-degree/nlp",
        },
      ],
      qualifier: [
        {
          id: "ds-qualifier-1",
          title: "Advanced Machine Learning",
          description: "Complex ML algorithms and optimization techniques",
          link: "/resources/iitm-bs/data-science/qualifier/advanced-ml",
        },
        {
          id: "ds-qualifier-2",
          title: "Big Data Systems",
          description: "Hadoop, Spark and distributed computing",
          link: "/resources/iitm-bs/data-science/qualifier/big-data",
        },
      ],
    },
    "electronic-systems": {
      foundation: [
        {
          id: "es-foundation-1",
          title: "Basic Electronics",
          description: "Fundamental electronic components and circuits",
          link: "/resources/iitm-bs/electronic-systems/foundation/basic-electronics",
        },
        {
          id: "es-foundation-2",
          title: "Digital Logic",
          description: "Boolean algebra and digital circuit design",
          link: "/resources/iitm-bs/electronic-systems/foundation/digital-logic",
        },
      ],
      diploma: [
        {
          id: "es-diploma-1",
          title: "Analog Circuits",
          description: "Op-amps, filters and signal processing circuits",
          link: "/resources/iitm-bs/electronic-systems/diploma/analog-circuits",
        },
        {
          id: "es-diploma-2",
          title: "Microprocessors",
          description: "Architecture, programming and interfacing",
          link: "/resources/iitm-bs/electronic-systems/diploma/microprocessors",
        },
      ],
      "bs-degree": [
        {
          id: "es-bs-1",
          title: "Communication Systems",
          description: "Analog and digital communication techniques",
          link: "/resources/iitm-bs/electronic-systems/bs-degree/communication",
        },
        {
          id: "es-bs-2",
          title: "VLSI Design",
          description: "Integrated circuit design and fabrication",
          link: "/resources/iitm-bs/electronic-systems/bs-degree/vlsi",
        },
      ],
      qualifier: [
        {
          id: "es-qualifier-1",
          title: "Embedded Systems",
          description: "Real-time operating systems and embedded programming",
          link: "/resources/iitm-bs/electronic-systems/qualifier/embedded",
        },
        {
          id: "es-qualifier-2",
          title: "Signal Processing",
          description: "Advanced digital signal processing techniques",
          link: "/resources/iitm-bs/electronic-systems/qualifier/signal-processing",
        },
      ],
    },
  },
};

const communityData: CommunityData = {
  neet: {
    telegram: {
      title: "NEET Community",
      link: "https://t.me/unknowniitiansneet",
    },
    whatsapp: {
      title: "NEET Discussion Group",
      link: "https://chat.whatsapp.com/neet",
    },
  },
  jee: {
    telegram: {
      title: "JEE Community",
      link: "https://t.me/unknowniitiansjee",
    },
    whatsapp: {
      title: "JEE Discussion Group",
      link: "https://chat.whatsapp.com/jee",
    },
  },
  "iitm-bs": {
    "data-science": {
      telegram: {
        title: "Data Science Community",
        link: "https://t.me/unknowniitiansiitmdsbs",
      },
      whatsapp: [
        {
          title: "Programming Fundamentals",
          link: "https://chat.whatsapp.com/ds-programming",
        },
        {
          title: "Statistics & Math",
          link: "https://chat.whatsapp.com/ds-stats",
        },
        {
          title: "Machine Learning",
          link: "https://chat.whatsapp.com/ds-ml",
        },
      ],
    },
    "electronic-systems": {
      telegram: {
        title: "Electronic Systems Community",
        link: "https://t.me/unknowniitiansiitmes",
      },
      whatsapp: [
        {
          title: "Circuit Design",
          link: "https://chat.whatsapp.com/es-circuits",
        },
        {
          title: "Digital Electronics",
          link: "https://chat.whatsapp.com/es-digital",
        },
        {
          title: "Embedded Systems",
          link: "https://chat.whatsapp.com/es-embedded",
        },
      ],
    },
  },
};

function isNEETJEEData(data: any, examType: string): data is NEETNotesData | JEENotesData {
  return examType === "neet" || examType === "jee";
}

function isIITMData(data: any, examType: string): data is IITMBranch {
  return examType === "iitm-bs";
}

function isNEETData(data: any, examType: string): data is NEETNotesData {
  return examType === "neet";
}

function isJEEData(data: any, examType: string): data is JEENotesData {
  return examType === "jee";
}

function isNEETJEECommunityData(data: any, examType: string): data is NEETJEECommunityLinks {
  return examType === "neet" || examType === "jee";
}

function isIITMCommunityData(data: any, examType: string): data is IITMCommunityLinks {
  return examType === "iitm-bs";
}

const ResourceHubSection = () => {
  const [activeTab] = useState("notes");
  const [examType, setExamType] = useState<"neet" | "jee" | "iitm-bs">("neet");
  const [selectedBranch, setSelectedBranch] = useState<"data-science" | "electronic-systems">("data-science");
  const [selectedLevel, setSelectedLevel] = useState<"foundation" | "diploma" | "bs-degree" | "qualifier">("foundation");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<"11" | "12">("11");
  const [selectedSubSubject, setSelectedSubSubject] = useState<string>("");
  const isMobile = useIsMobile();

  // Reset selected options when exam type changes
  useEffect(() => {
    setSelectedSubject("");
    setSelectedClass("11");
    setSelectedSubSubject("");
  }, [examType]);

  // Reset selected sub-subject when subject changes
  useEffect(() => {
    setSelectedSubSubject("");
  }, [selectedSubject]);

  const renderSubjectButtons = () => {
    if (examType === "neet") {
      return (
        <ToggleGroup 
          type="single" 
          value={selectedSubject}
          onValueChange={(value) => value && setSelectedSubject(value)}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem value="biology" className="px-5 py-2 rounded-full">Biology</ToggleGroupItem>
          <ToggleGroupItem value="physics" className="px-5 py-2 rounded-full">Physics</ToggleGroupItem>
          <ToggleGroupItem value="chemistry" className="px-5 py-2 rounded-full">Chemistry</ToggleGroupItem>
        </ToggleGroup>
      );
    } else if (examType === "jee") {
      return (
        <ToggleGroup 
          type="single" 
          value={selectedSubject}
          onValueChange={(value) => value && setSelectedSubject(value)}
          className="flex flex-wrap gap-2"
        >
          <ToggleGroupItem value="math" className="px-5 py-2 rounded-full">Mathematics</ToggleGroupItem>
          <ToggleGroupItem value="physics" className="px-5 py-2 rounded-full">Physics</ToggleGroupItem>
          <ToggleGroupItem value="chemistry" className="px-5 py-2 rounded-full">Chemistry</ToggleGroupItem>
        </ToggleGroup>
      );
    }
    return null;
  };

  const renderClassButtons = () => {
    if ((examType === "neet" || examType === "jee") && selectedSubject) {
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Class</h3>
          <div className="flex gap-2">
            <Button
              variant={selectedClass === "11" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedClass("11")}
            >
              Class 11
            </Button>
            <Button
              variant={selectedClass === "12" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedClass("12")}
            >
              Class 12
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderSubSubjectButtons = () => {
    if (!selectedSubject) return null;

    if (examType === "neet" && selectedSubject === "biology") {
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Subject Area</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubSubject === "botany" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedSubSubject("botany")}
            >
              Botany
            </Button>
            <Button
              variant={selectedSubSubject === "zoology" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedSubSubject("zoology")}
            >
              Zoology
            </Button>
          </div>
        </div>
      );
    } else if ((examType === "neet" || examType === "jee") && selectedSubject === "chemistry") {
      return (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Subject Area</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubSubject === "organic" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedSubSubject("organic")}
            >
              Organic
            </Button>
            <Button
              variant={selectedSubSubject === "inorganic" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedSubSubject("inorganic")}
            >
              Inorganic
            </Button>
            <Button
              variant={selectedSubSubject === "physical" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedSubSubject("physical")}
            >
              Physical
            </Button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderIITMBSFilters = () => {
    return (
      <>
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Branch</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedBranch === "data-science" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedBranch("data-science")}
            >
              Data Science
            </Button>
            <Button
              variant={selectedBranch === "electronic-systems" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedBranch("electronic-systems")}
            >
              Electronic Systems
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Level</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLevel === "foundation" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedLevel("foundation")}
            >
              Foundation
            </Button>
            <Button
              variant={selectedLevel === "diploma" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedLevel("diploma")}
            >
              Diploma
            </Button>
            <Button
              variant={selectedLevel === "bs-degree" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedLevel("bs-degree")}
            >
              BS Degree
            </Button>
            <Button
              variant={selectedLevel === "qualifier" ? "filter-active" : "filter"}
              size="filter"
              onClick={() => setSelectedLevel("qualifier")}
            >
              Qualifier
            </Button>
          </div>
        </div>
      </>
    );
  };

  const renderResourceCards = () => {
    const data = notesData[examType];

    if (examType === "iitm-bs" && isIITMData(data, examType)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data[selectedBranch][selectedLevel].map((item, index) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-5">{item.description}</p>
              <Link to={item.link}>
                <Button variant="outline" className="w-full justify-center">
                  View Notes
                </Button>
              </Link>
            </div>
          ))}
        </div>
      );
    } else if (isNEETJEEData(data, examType)) {
      if (!selectedSubject) return <p className="text-center text-gray-500 mt-4">Select a subject to view available notes.</p>;

      if (isNEETData(data, examType) && selectedSubject === "biology") {
        if (!selectedSubSubject) return <p className="text-center text-gray-500 mt-4">Select a subject area to view available notes.</p>;
        
        const notesToRender = data.biology[selectedSubSubject as keyof BiologySubtype][selectedClass];
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {notesToRender.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-5">{item.description}</p>
                <Link to={item.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      } else if (selectedSubject === "chemistry") {
        if (!selectedSubSubject) return <p className="text-center text-gray-500 mt-4">Select a subject area to view available notes.</p>;
        
        const notesToRender = data.chemistry[selectedSubSubject as keyof ChemistrySubtype][selectedClass];
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {notesToRender.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-5">{item.description}</p>
                <Link to={item.link}>
                  <Button variant="outline" className="w-full justify-center">
                    View Notes
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        );
      } else if (selectedSubject === "physics" || (isJEEData(data, examType) && selectedSubject === "math")) {
        const subjectKey = selectedSubject as keyof JEENotesData;
        const notesToRender = data[subjectKey][selectedClass];
        
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {notesToRender.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-5">{item.description}</p>
                <Link to={item.link}>
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

    return <p className="text-center text-gray-500 mt-4">Select options to view available notes.</p>;
  };

  const renderCommunitySection = () => {
    const data = communityData[examType];

    if (examType === "iitm-bs" && isIITMCommunityData(data, examType)) {
      return (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Community Groups</h3>
          
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h4 className="font-medium text-lg mb-2">{selectedBranch === "data-science" ? "Data Science" : "Electronic Systems"} Community</h4>
              
              <div className="flex flex-col gap-3">
                <a 
                  href={data[selectedBranch].telegram.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-royal hover:underline"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.375 16.875h-2.25v-6.75h2.25v6.75zm-1.125-7.875a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zm8.625 7.875h-2.25v-3.938c0-.75-.75-1.312-1.5-1.312s-1.5.563-1.5 1.313v3.938h-2.25v-6.75h2.25v.938c.563-.563 1.5-.938 2.25-.938 1.5 0 3 1.125 3 3.375v3.375z"/>
                  </svg>
                  {data[selectedBranch].telegram.title}
                </a>
                
                <h5 className="font-medium mt-2">WhatsApp Groups:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {data[selectedBranch].whatsapp.map((group, index) => (
                    <a 
                      key={index} 
                      href={group.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-royal hover:underline"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M12.031 6.172a5.785 5.785 0 00-5.785 5.785 5.739 5.739 0 00.8 2.996l-1.07 3.348 3.35-1.06a5.78 5.78 0 003.705.812 5.785 5.785 0 00-.001-11.883zm0 10.582a4.797 4.797 0 01-2.465-.676l-2.18.7.7-2.174a4.752 4.752 0 01-.68-2.465 4.798 4.798 0 019.595 0 4.797 4.797 0 01-4.957 4.614h-.014z"/>
                        <path d="M17.816 3.504H6.185a5.37 5.37 0 00-5.369 5.369v6.266c0 2.964 2.405 5.37 5.369 5.37h1.152l.269 1.467c.034.18.15.341.315.438a.55.55 0 00.554-.018l2.709-1.887h6.63a5.37 5.37 0 005.369-5.37V8.874a5.37 5.37 0 00-5.367-5.37zM6.185 4.9h11.63a3.975 3.975 0 013.97 3.975v6.266a3.975 3.975 0 01-3.97 3.975h-6.834a.7.7 0 00-.401.126l-2.07 1.444-.18-.982a.697.697 0 00-.686-.588h-1.34a3.975 3.975 0 01-3.97-3.975V8.873A3.975 3.975 0 016.186 4.9z"/>
                      </svg>
                      {group.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isNEETJEECommunityData(data, examType)) {
      return (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-4">{examType.toUpperCase()} Community Groups</h3>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href={data.telegram.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm text-royal hover:underline"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.375 16.875h-2.25v-6.75h2.25v6.75zm-1.125-7.875a1.125 1.125 0 110-2.25 1.125 1.125 0 010 2.25zm8.625 7.875h-2.25v-3.938c0-.75-.75-1.312-1.5-1.312s-1.5.563-1.5 1.313v3.938h-2.25v-6.75h2.25v.938c.563-.563 1.5-.938 2.25-.938 1.5 0 3 1.125 3 3.375v3.375z"/>
              </svg>
              {data.telegram.title}
            </a>
            
            <a 
              href={data.whatsapp.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-md shadow-sm text-royal hover:underline"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="#25D366">
                <path d="M12.031 6.172a5.785 5.785 0 00-5.785 5.785 5.739 5.739 0 00.8 2.996l-1.07 3.348 3.35-1.06a5.78 5.78 0 003.705.812 5.785 5.785 0 00-.001-11.883zm0 10.582a4.797 4.797 0 01-2.465-.676l-2.18.7.7-2.174a4.752 4.752 0 01-.68-2.465 4.798 4.798 0 019.595 0 4.797 4.797 0 01-4.957 4.614h-.014z"/>
                <path d="M17.816 3.504H6.185a5.37 5.37 0 00-5.369 5.369v6.266c0 2.964 2.405 5.37 5.369 5.37h1.152l.269 1.467c.034.18.15.341.315.438a.55.55 0 00.554-.018l2.709-1.887h6.63a5.37 5.37 0 005.369-5.37V8.874a5.37 5.37 0 00-5.367-5.37zM6.185 4.9h11.63a3.975 3.975 0 013.97 3.975v6.266a3.975 3.975 0 01-3.97 3.975h-6.834a.7.7 0 00-.401.126l-2.07 1.444-.18-.982a.697.697 0 00-.686-.588h-1.34a3.975 3.975 0 01-3.97-3.975V8.873A3.975 3.975 0 016.186 4.9z"/>
              </svg>
              {data.whatsapp.title}
            </a>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Your Resource Hub</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Access comprehensive study materials designed by top IIT students to excel in your academic journey.
          </p>
        </div>

        {/* Exam Type Selection */}
        <div className="mb-8">
          <ToggleGroup 
            type="single" 
            value={examType}
            onValueChange={(value) => value && setExamType(value as "neet" | "jee" | "iitm-bs")}
            className="flex justify-center"
          >
            <ToggleGroupItem value="neet" className="px-5 py-2 rounded-md">NEET</ToggleGroupItem>
            <ToggleGroupItem value="jee" className="px-5 py-2 rounded-md">JEE</ToggleGroupItem>
            <ToggleGroupItem value="iitm-bs" className="px-5 py-2 rounded-md">IITM BS</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Filters Section */}
        <div className={`mb-8 ${examType === "iitm-bs" ? "block" : "hidden"}`}>
          {renderIITMBSFilters()}
        </div>

        <div className={`mb-8 ${examType !== "iitm-bs" ? "block" : "hidden"}`}>
          <div className="space-y-4">
            {renderSubjectButtons()}
            {renderClassButtons()}
            {renderSubSubjectButtons()}
          </div>
        </div>

        {/* Content */}
        <div className={activeTab === "notes" ? "block" : "hidden"}>
          {renderResourceCards()}
        </div>

        {/* Community Section */}
        {renderCommunitySection()}
      </div>
    </section>
  );
};

export default ResourceHubSection;
