
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubjectChapters from "./SubjectChapters";

interface SubjectBlockProps {
  subject: string;
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

interface Chapter {
  id: string;
  title: string;
  description: string;
}

interface ChapterGroups {
  [key: string]: {
    class11: Chapter[];
    class12: Chapter[];
  }
}

const biologyChapters = {
  "botany": {
    class11: [
      { id: "botany-11-ch1", title: "The Living World", description: "Class 11 Biology Chapter 1" },
      { id: "botany-11-ch2", title: "Biological Classification", description: "Class 11 Biology Chapter 2" },
      { id: "botany-11-ch3", title: "Plant Kingdom", description: "Class 11 Biology Chapter 3" },
      { id: "botany-11-ch4", title: "Morphology of Flowering Plants", description: "Class 11 Biology Chapter 5" },
      { id: "botany-11-ch5", title: "Anatomy of Flowering Plants", description: "Class 11 Biology Chapter 6" },
      { id: "botany-11-ch6", title: "Cell: The Unit of Life", description: "Class 11 Biology Chapter 8" },
      { id: "botany-11-ch7", title: "Biomolecules", description: "Class 11 Biology Chapter 9" },
      { id: "botany-11-ch8", title: "Cell Cycle and Cell Division", description: "Class 11 Biology Chapter 10" },
      { id: "botany-11-ch9", title: "Transport in Plants", description: "Class 11 Biology Chapter 11" },
      { id: "botany-11-ch10", title: "Mineral Nutrition", description: "Class 11 Biology Chapter 12" },
      { id: "botany-11-ch11", title: "Photosynthesis in Higher Plants", description: "Class 11 Biology Chapter 13" },
      { id: "botany-11-ch12", title: "Respiration in Plants", description: "Class 11 Biology Chapter 14" },
      { id: "botany-11-ch13", title: "Plant Growth and Development", description: "Class 11 Biology Chapter 15" },
    ],
    class12: [
      { id: "botany-12-ch1", title: "Reproduction in Flowering Plants", description: "Class 12 Biology Chapter 1" },
      { id: "botany-12-ch2", title: "Sexual Reproduction in Flowering Plants", description: "Class 12 Biology Chapter 2" },
      { id: "botany-12-ch3", title: "Principles of Inheritance and Variation", description: "Class 12 Biology Chapter 5" },
      { id: "botany-12-ch4", title: "Molecular Basis of Inheritance", description: "Class 12 Biology Chapter 6" },
      { id: "botany-12-ch5", title: "Evolution", description: "Class 12 Biology Chapter 7" },
      { id: "botany-12-ch6", title: "Microbes in Human Welfare", description: "Class 12 Biology Chapter 10" },
      { id: "botany-12-ch7", title: "Biotechnology: Principles and Processes", description: "Class 12 Biology Chapter 11" },
      { id: "botany-12-ch8", title: "Biotechnology and its Applications", description: "Class 12 Biology Chapter 12" },
      { id: "botany-12-ch9", title: "Organisms and Populations", description: "Class 12 Biology Chapter 13" },
      { id: "botany-12-ch10", title: "Ecosystem", description: "Class 12 Biology Chapter 14" },
      { id: "botany-12-ch11", title: "Biodiversity and Conservation", description: "Class 12 Biology Chapter 15" },
      { id: "botany-12-ch12", title: "Environmental Issues", description: "Class 12 Biology Chapter 16" },
    ]
  },
  "zoology": {
    class11: [
      { id: "zoology-11-ch1", title: "Animal Kingdom", description: "Class 11 Biology Chapter 4" },
      { id: "zoology-11-ch2", title: "Structural Organisation in Animals", description: "Class 11 Biology Chapter 7" },
      { id: "zoology-11-ch3", title: "Digestion and Absorption", description: "Class 11 Biology Chapter 16" },
      { id: "zoology-11-ch4", title: "Breathing and Exchange of Gases", description: "Class 11 Biology Chapter 17" },
      { id: "zoology-11-ch5", title: "Body Fluids and Circulation", description: "Class 11 Biology Chapter 18" },
      { id: "zoology-11-ch6", title: "Excretory Products and their Elimination", description: "Class 11 Biology Chapter 19" },
      { id: "zoology-11-ch7", title: "Locomotion and Movement", description: "Class 11 Biology Chapter 20" },
      { id: "zoology-11-ch8", title: "Neural Control and Coordination", description: "Class 11 Biology Chapter 21" },
      { id: "zoology-11-ch9", title: "Chemical Coordination and Integration", description: "Class 11 Biology Chapter 22" },
    ],
    class12: [
      { id: "zoology-12-ch1", title: "Human Reproduction", description: "Class 12 Biology Chapter 3" },
      { id: "zoology-12-ch2", title: "Reproductive Health", description: "Class 12 Biology Chapter 4" },
      { id: "zoology-12-ch3", title: "Human Health and Disease", description: "Class 12 Biology Chapter 8" },
      { id: "zoology-12-ch4", title: "Strategies for Enhancement in Food Production", description: "Class 12 Biology Chapter 9" },
    ]
  }
};

const physicsChapters = {
  class11: [
    { id: "physics-11-ch1", title: "Physical World", description: "Class 11 Physics Chapter 1" },
    { id: "physics-11-ch2", title: "Units and Measurements", description: "Class 11 Physics Chapter 2" },
    { id: "physics-11-ch3", title: "Motion in a Straight Line", description: "Class 11 Physics Chapter 3" },
    { id: "physics-11-ch4", title: "Motion in a Plane", description: "Class 11 Physics Chapter 4" },
    { id: "physics-11-ch5", title: "Laws of Motion", description: "Class 11 Physics Chapter 5" },
    { id: "physics-11-ch6", title: "Work, Energy and Power", description: "Class 11 Physics Chapter 6" },
    { id: "physics-11-ch7", title: "System of Particles and Rotational Motion", description: "Class 11 Physics Chapter 7" },
    { id: "physics-11-ch8", title: "Gravitation", description: "Class 11 Physics Chapter 8" },
    { id: "physics-11-ch9", title: "Mechanical Properties of Solids", description: "Class 11 Physics Chapter 9" },
    { id: "physics-11-ch10", title: "Mechanical Properties of Fluids", description: "Class 11 Physics Chapter 10" },
    { id: "physics-11-ch11", title: "Thermal Properties of Matter", description: "Class 11 Physics Chapter 11" },
    { id: "physics-11-ch12", title: "Thermodynamics", description: "Class 11 Physics Chapter 12" },
    { id: "physics-11-ch13", title: "Kinetic Theory", description: "Class 11 Physics Chapter 13" },
    { id: "physics-11-ch14", title: "Oscillations", description: "Class 11 Physics Chapter 14" },
    { id: "physics-11-ch15", title: "Waves", description: "Class 11 Physics Chapter 15" },
  ],
  class12: [
    { id: "physics-12-ch1", title: "Electric Charges and Fields", description: "Class 12 Physics Chapter 1" },
    { id: "physics-12-ch2", title: "Electrostatic Potential and Capacitance", description: "Class 12 Physics Chapter 2" },
    { id: "physics-12-ch3", title: "Current Electricity", description: "Class 12 Physics Chapter 3" },
    { id: "physics-12-ch4", title: "Moving Charges and Magnetism", description: "Class 12 Physics Chapter 4" },
    { id: "physics-12-ch5", title: "Magnetism and Matter", description: "Class 12 Physics Chapter 5" },
    { id: "physics-12-ch6", title: "Electromagnetic Induction", description: "Class 12 Physics Chapter 6" },
    { id: "physics-12-ch7", title: "Alternating Current", description: "Class 12 Physics Chapter 7" },
    { id: "physics-12-ch8", title: "Electromagnetic Waves", description: "Class 12 Physics Chapter 8" },
    { id: "physics-12-ch9", title: "Ray Optics and Optical Instruments", description: "Class 12 Physics Chapter 9" },
    { id: "physics-12-ch10", title: "Wave Optics", description: "Class 12 Physics Chapter 10" },
    { id: "physics-12-ch11", title: "Dual Nature of Radiation and Matter", description: "Class 12 Physics Chapter 11" },
    { id: "physics-12-ch12", title: "Atoms", description: "Class 12 Physics Chapter 12" },
    { id: "physics-12-ch13", title: "Nuclei", description: "Class 12 Physics Chapter 13" },
    { id: "physics-12-ch14", title: "Semiconductor Electronics", description: "Class 12 Physics Chapter 14" },
  ]
};

const chemistryChapters = {
  "organic": {
    class11: [
      { id: "chemistry-organic-11-ch1", title: "Organic Chemistry – Some Basic Principles and Techniques", description: "Class 11 Organic Chemistry Chapter 12" },
      { id: "chemistry-organic-11-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 13" },
    ],
    class12: [
      { id: "chemistry-organic-12-ch1", title: "Haloalkanes and Haloarenes", description: "Class 12 Organic Chemistry Chapter 1" },
      { id: "chemistry-organic-12-ch2", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 2" },
      { id: "chemistry-organic-12-ch3", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 3" },
      { id: "chemistry-organic-12-ch4", title: "Amines", description: "Class 12 Organic Chemistry Chapter 4" },
      { id: "chemistry-organic-12-ch5", title: "Biomolecules", description: "Class 12 Organic Chemistry Chapter 5" },
      { id: "chemistry-organic-12-ch6", title: "Polymers", description: "Class 12 Organic Chemistry Chapter 6" },
      { id: "chemistry-organic-12-ch7", title: "Chemistry in Everyday Life", description: "Class 12 Organic Chemistry Chapter 7" },
    ]
  },
  "inorganic": {
    class11: [
      { id: "chemistry-inorganic-11-ch1", title: "Classification of Elements and Periodicity in Properties", description: "Class 11 Inorganic Chemistry Chapter 3" },
      { id: "chemistry-inorganic-11-ch2", title: "Chemical Bonding and Molecular Structure", description: "Class 11 Inorganic Chemistry Chapter 4" },
      { id: "chemistry-inorganic-11-ch3", title: "Hydrogen", description: "Class 11 Inorganic Chemistry Chapter 9" },
      { id: "chemistry-inorganic-11-ch4", title: "The s-Block Elements", description: "Class 11 Inorganic Chemistry Chapter 10" },
      { id: "chemistry-inorganic-11-ch5", title: "Some p-Block Elements", description: "Class 11 Inorganic Chemistry Chapter 11" },
      { id: "chemistry-inorganic-11-ch6", title: "Environmental Chemistry", description: "Class 11 Inorganic Chemistry Chapter 14" },
    ],
    class12: [
      { id: "chemistry-inorganic-12-ch1", title: "The Solid State", description: "Class 12 Inorganic Chemistry Chapter 1" },
      { id: "chemistry-inorganic-12-ch2", title: "Solutions", description: "Class 12 Inorganic Chemistry Chapter 2" },
      { id: "chemistry-inorganic-12-ch3", title: "The p-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 7" },
      { id: "chemistry-inorganic-12-ch4", title: "The d- and f-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 8" },
      { id: "chemistry-inorganic-12-ch5", title: "Coordination Compounds", description: "Class 12 Inorganic Chemistry Chapter 9" },
    ]
  },
  "physical": {
    class11: [
      { id: "chemistry-physical-11-ch1", title: "Some Basic Concepts of Chemistry", description: "Class 11 Physical Chemistry Chapter 1" },
      { id: "chemistry-physical-11-ch2", title: "Structure of Atom", description: "Class 11 Physical Chemistry Chapter 2" },
      { id: "chemistry-physical-11-ch3", title: "States of Matter: Gases and Liquids", description: "Class 11 Physical Chemistry Chapter 5" },
      { id: "chemistry-physical-11-ch4", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 6" },
      { id: "chemistry-physical-11-ch5", title: "Equilibrium", description: "Class 11 Physical Chemistry Chapter 7" },
      { id: "chemistry-physical-11-ch6", title: "Redox Reactions", description: "Class 11 Physical Chemistry Chapter 8" },
    ],
    class12: [
      { id: "chemistry-physical-12-ch1", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 3" },
      { id: "chemistry-physical-12-ch2", title: "Chemical Kinetics", description: "Class 12 Physical Chemistry Chapter 4" },
      { id: "chemistry-physical-12-ch3", title: "Surface Chemistry", description: "Class 12 Physical Chemistry Chapter 5" },
    ]
  }
};

const NEETSubjectBlock = ({ subject, downloads, onDownload }: SubjectBlockProps) => {
  const [subType, setSubType] = useState(""); // For biology and chemistry
  
  let contentToDisplay;
  
  if (subject === "Biology") {
    contentToDisplay = (
      <div>
        <div className="mb-6 overflow-x-auto pb-2 tabs-mobile">
          <TabsList className="tabs-list">
            <TabsTrigger value="botany" onClick={() => setSubType("botany")}>Botany</TabsTrigger>
            <TabsTrigger value="zoology" onClick={() => setSubType("zoology")}>Zoology</TabsTrigger>
          </TabsList>
        </div>
        
        {subType && <SubjectChapters 
          chapters={biologyChapters[subType]}
          downloads={downloads}
          onDownload={onDownload}
        />}
      </div>
    );
  } else if (subject === "Chemistry") {
    contentToDisplay = (
      <div>
        <div className="mb-6 overflow-x-auto pb-2 tabs-mobile">
          <TabsList className="tabs-list">
            <TabsTrigger value="organic" onClick={() => setSubType("organic")}>Organic</TabsTrigger>
            <TabsTrigger value="inorganic" onClick={() => setSubType("inorganic")}>Inorganic</TabsTrigger>
            <TabsTrigger value="physical" onClick={() => setSubType("physical")}>Physical</TabsTrigger>
          </TabsList>
        </div>
        
        {subType && <SubjectChapters 
          chapters={chemistryChapters[subType]}
          downloads={downloads}
          onDownload={onDownload}
        />}
      </div>
    );
  } else if (subject === "Physics") {
    contentToDisplay = (
      <SubjectChapters 
        chapters={physicsChapters}
        downloads={downloads}
        onDownload={onDownload}
      />
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">{subject}</h2>
      {contentToDisplay}
    </div>
  );
};

export default NEETSubjectBlock;
