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
    { id: "math-11-ch1", title: "Sets, Relations and Functions", description: "Class 11 Mathematics Chapter 1" },
    { id: "math-11-ch2", title: "Complex Numbers and Quadratic Equations", description: "Class 11 Mathematics Chapter 2" },
    { id: "math-11-ch3", title: "Matrices and Determinants", description: "Class 11 Mathematics Chapter 3" },
    { id: "math-11-ch4", title: "Permutations and Combinations", description: "Class 11 Mathematics Chapter 4" },
    { id: "math-11-ch5", title: "Mathematical Induction", description: "Class 11 Mathematics Chapter 5" },
    { id: "math-11-ch6", title: "Binomial Theorem", description: "Class 11 Mathematics Chapter 6" },
  ],
  class12: [
    { id: "math-12-ch1", title: "Differential Calculus", description: "Class 12 Mathematics Chapter 1" },
    { id: "math-12-ch2", title: "Integral Calculus", description: "Class 12 Mathematics Chapter 2" },
    { id: "math-12-ch3", title: "Vectors and 3D Geometry", description: "Class 12 Mathematics Chapter 3" },
    { id: "math-12-ch4", title: "Probability", description: "Class 12 Mathematics Chapter 4" },
  ]
};

const physicsChapters = {
  class11: [
    { id: "physics-11-ch1", title: "Physics and Measurement", description: "Class 11 Physics Chapter 1" },
    { id: "physics-11-ch2", title: "Kinematics", description: "Class 11 Physics Chapter 2" },
    { id: "physics-11-ch3", title: "Laws of Motion", description: "Class 11 Physics Chapter 3" },
  ],
  class12: [
    { id: "physics-12-ch1", title: "Electrostatics", description: "Class 12 Physics Chapter 1" },
    { id: "physics-12-ch2", title: "Current Electricity", description: "Class 12 Physics Chapter 2" },
    { id: "physics-12-ch3", title: "Magnetic Effects", description: "Class 12 Physics Chapter 3" },
  ]
};

const chemistryChapters = {
  "organic": {
    class11: [
      { id: "chemistry-11-organic-ch1", title: "Basic Organic Chemistry", description: "Class 11 Organic Chemistry Chapter 1" },
      { id: "chemistry-11-organic-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 2" },
    ],
    class12: [
      { id: "chemistry-12-organic-ch1", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 1" },
      { id: "chemistry-12-organic-ch2", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 2" },
    ]
  },
  "inorganic": {
    class11: [
      { id: "chemistry-11-inorganic-ch1", title: "Periodic Table and Properties", description: "Class 11 Inorganic Chemistry Chapter 1" },
      { id: "chemistry-11-inorganic-ch2", title: "Chemical Bonding", description: "Class 11 Inorganic Chemistry Chapter 2" },
    ],
    class12: [
      { id: "chemistry-12-inorganic-ch1", title: "d and f Block Elements", description: "Class 12 Inorganic Chemistry Chapter 1" },
      { id: "chemistry-12-inorganic-ch2", title: "Coordination Compounds", description: "Class 12 Inorganic Chemistry Chapter 2" },
    ]
  },
  "physical": {
    class11: [
      { id: "chemistry-11-physical-ch1", title: "States of Matter", description: "Class 11 Physical Chemistry Chapter 1" },
      { id: "chemistry-11-physical-ch2", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 2" },
    ],
    class12: [
      { id: "chemistry-12-physical-ch1", title: "Solutions", description: "Class 12 Physical Chemistry Chapter 1" },
      { id: "chemistry-12-physical-ch2", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 2" },
    ]
  }
};

const JEESubjectBlock = ({ subject, downloads, onDownload }: SubjectBlockProps) => {
  const [subType, setSubType] = useState(""); // For chemistry
  
  let contentToDisplay;
  
  if (subject === "math") {
    contentToDisplay = (
      <SubjectChapters 
        chapters={mathChapters}
        downloads={downloads}
        onDownload={onDownload}
      />
    );
  } else if (subject === "chemistry") {
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
  } else if (subject === "physics") {
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
