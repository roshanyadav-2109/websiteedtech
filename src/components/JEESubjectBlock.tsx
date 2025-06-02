
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SubjectChapters from "./SubjectChapters";

interface SubjectBlockProps {
  subject: string;
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

const mathChapters = {
  class11: [
    { id: "math-11-ch1", title: "Sets", description: "Class 11 Mathematics Chapter 1" },
    { id: "math-11-ch2", title: "Relations and Functions", description: "Class 11 Mathematics Chapter 2" },
    { id: "math-11-ch3", title: "Trigonometric Functions", description: "Class 11 Mathematics Chapter 3" },
    { id: "math-11-ch4", title: "Principle of Mathematical Induction", description: "Class 11 Mathematics Chapter 4" },
    { id: "math-11-ch5", title: "Complex Numbers and Quadratic Equations", description: "Class 11 Mathematics Chapter 5" },
    { id: "math-11-ch6", title: "Linear Inequalities", description: "Class 11 Mathematics Chapter 6" },
    { id: "math-11-ch7", title: "Permutations and Combinations", description: "Class 11 Mathematics Chapter 7" },
    { id: "math-11-ch8", title: "Binomial Theorem", description: "Class 11 Mathematics Chapter 8" },
    { id: "math-11-ch9", title: "Sequences and Series", description: "Class 11 Mathematics Chapter 9" },
    { id: "math-11-ch10", title: "Straight Lines", description: "Class 11 Mathematics Chapter 10" },
    { id: "math-11-ch11", title: "Conic Sections", description: "Class 11 Mathematics Chapter 11" },
    { id: "math-11-ch12", title: "Introduction to Three-dimensional Geometry", description: "Class 11 Mathematics Chapter 12" },
    { id: "math-11-ch13", title: "Limits and Derivatives", description: "Class 11 Mathematics Chapter 13" },
    { id: "math-11-ch14", title: "Mathematical Reasoning", description: "Class 11 Mathematics Chapter 14" },
    { id: "math-11-ch15", title: "Statistics", description: "Class 11 Mathematics Chapter 15" },
    { id: "math-11-ch16", title: "Probability", description: "Class 11 Mathematics Chapter 16" },
  ],
  class12: [
    { id: "math-12-ch1", title: "Relations and Functions", description: "Class 12 Mathematics Chapter 1" },
    { id: "math-12-ch2", title: "Inverse Trigonometric Functions", description: "Class 12 Mathematics Chapter 2" },
    { id: "math-12-ch3", title: "Matrices", description: "Class 12 Mathematics Chapter 3" },
    { id: "math-12-ch4", title: "Determinants", description: "Class 12 Mathematics Chapter 4" },
    { id: "math-12-ch5", title: "Continuity and Differentiability", description: "Class 12 Mathematics Chapter 5" },
    { id: "math-12-ch6", title: "Application of Derivatives", description: "Class 12 Mathematics Chapter 6" },
    { id: "math-12-ch7", title: "Integrals", description: "Class 12 Mathematics Chapter 7" },
    { id: "math-12-ch8", title: "Application of Integrals", description: "Class 12 Mathematics Chapter 8" },
    { id: "math-12-ch9", title: "Differential Equations", description: "Class 12 Mathematics Chapter 9" },
    { id: "math-12-ch10", title: "Vector Algebra", description: "Class 12 Mathematics Chapter 10" },
    { id: "math-12-ch11", title: "Three Dimensional Geometry", description: "Class 12 Mathematics Chapter 11" },
    { id: "math-12-ch12", title: "Linear Programming", description: "Class 12 Mathematics Chapter 12" },
    { id: "math-12-ch13", title: "Probability", description: "Class 12 Mathematics Chapter 13" },
  ]
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
      { id: "chemistry-11-organic-ch1", title: "Organic Chemistry – Some Basic Principles and Techniques", description: "Class 11 Organic Chemistry Chapter 12" },
      { id: "chemistry-11-organic-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 13" },
    ],
    class12: [
      { id: "chemistry-12-organic-ch1", title: "Haloalkanes and Haloarenes", description: "Class 12 Organic Chemistry Chapter 1" },
      { id: "chemistry-12-organic-ch2", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 2" },
      { id: "chemistry-12-organic-ch3", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 3" },
      { id: "chemistry-12-organic-ch4", title: "Amines", description: "Class 12 Organic Chemistry Chapter 4" },
      { id: "chemistry-12-organic-ch5", title: "Biomolecules", description: "Class 12 Organic Chemistry Chapter 5" },
      { id: "chemistry-12-organic-ch6", title: "Polymers", description: "Class 12 Organic Chemistry Chapter 6" },
      { id: "chemistry-12-organic-ch7", title: "Chemistry in Everyday Life", description: "Class 12 Organic Chemistry Chapter 7" },
    ]
  },
  "inorganic": {
    class11: [
      { id: "chemistry-11-inorganic-ch1", title: "Classification of Elements and Periodicity in Properties", description: "Class 11 Inorganic Chemistry Chapter 3" },
      { id: "chemistry-11-inorganic-ch2", title: "Chemical Bonding and Molecular Structure", description: "Class 11 Inorganic Chemistry Chapter 4" },
      { id: "chemistry-11-inorganic-ch3", title: "Hydrogen", description: "Class 11 Inorganic Chemistry Chapter 9" },
      { id: "chemistry-11-inorganic-ch4", title: "The s-Block Elements", description: "Class 11 Inorganic Chemistry Chapter 10" },
      { id: "chemistry-11-inorganic-ch5", title: "Some p-Block Elements", description: "Class 11 Inorganic Chemistry Chapter 11" },
      { id: "chemistry-11-inorganic-ch6", title: "Environmental Chemistry", description: "Class 11 Inorganic Chemistry Chapter 14" },
    ],
    class12: [
      { id: "chemistry-12-inorganic-ch1", title: "The Solid State", description: "Class 12 Inorganic Chemistry Chapter 1" },
      { id: "chemistry-12-inorganic-ch2", title: "Solutions", description: "Class 12 Inorganic Chemistry Chapter 2" },
      { id: "chemistry-12-inorganic-ch3", title: "The p-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 7" },
      { id: "chemistry-12-inorganic-ch4", title: "The d- and f-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 8" },
      { id: "chemistry-12-inorganic-ch5", title: "Coordination Compounds", description: "Class 12 Inorganic Chemistry Chapter 9" },
    ]
  },
  "physical": {
    class11: [
      { id: "chemistry-11-physical-ch1", title: "Some Basic Concepts of Chemistry", description: "Class 11 Physical Chemistry Chapter 1" },
      { id: "chemistry-11-physical-ch2", title: "Structure of Atom", description: "Class 11 Physical Chemistry Chapter 2" },
      { id: "chemistry-11-physical-ch3", title: "States of Matter: Gases and Liquids", description: "Class 11 Physical Chemistry Chapter 5" },
      { id: "chemistry-11-physical-ch4", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 6" },
      { id: "chemistry-11-physical-ch5", title: "Equilibrium", description: "Class 11 Physical Chemistry Chapter 7" },
      { id: "chemistry-11-physical-ch6", title: "Redox Reactions", description: "Class 11 Physical Chemistry Chapter 8" },
    ],
    class12: [
      { id: "chemistry-12-physical-ch1", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 3" },
      { id: "chemistry-12-physical-ch2", title: "Chemical Kinetics", description: "Class 12 Physical Chemistry Chapter 4" },
      { id: "chemistry-12-physical-ch3", title: "Surface Chemistry", description: "Class 12 Physical Chemistry Chapter 5" },
    ]
  }
};

const JEESubjectBlock = ({ subject, downloads, onDownload }: SubjectBlockProps) => {
  const [subType, setSubType] = useState(""); // For chemistry
  
  let contentToDisplay;
  
  if (subject === "Mathematics") {
    contentToDisplay = (
      <SubjectChapters 
        chapters={mathChapters}
        downloads={downloads}
        onDownload={onDownload}
      />
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

export default JEESubjectBlock;
