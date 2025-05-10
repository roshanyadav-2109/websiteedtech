
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import SubjectChapters from "./SubjectChapters";
import SubjectPyqs from "./SubjectPyqs";

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

const jeePyqs = {
  "2024": [
    { id: "jee-2024-jan-shift1", title: "JEE Main 2024 January Shift 1", description: "Complete paper with solutions" },
    { id: "jee-2024-jan-shift2", title: "JEE Main 2024 January Shift 2", description: "Complete paper with solutions" },
    { id: "jee-2024-apr-shift1", title: "JEE Main 2024 April Shift 1", description: "Complete paper with solutions" },
    { id: "jee-2024-apr-shift2", title: "JEE Main 2024 April Shift 2", description: "Complete paper with solutions" },
  ],
  "2023": [
    { id: "jee-2023-jan-shift1", title: "JEE Main 2023 January Shift 1", description: "Complete paper with solutions" },
    { id: "jee-2023-jan-shift2", title: "JEE Main 2023 January Shift 2", description: "Complete paper with solutions" },
    { id: "jee-2023-apr-shift1", title: "JEE Main 2023 April Shift 1", description: "Complete paper with solutions" },
    { id: "jee-2023-apr-shift2", title: "JEE Main 2023 April Shift 2", description: "Complete paper with solutions" },
  ],
  "2022": [
    { id: "jee-2022-jun-shift1", title: "JEE Main 2022 June Shift 1", description: "Complete paper with solutions" },
    { id: "jee-2022-jun-shift2", title: "JEE Main 2022 June Shift 2", description: "Complete paper with solutions" },
    { id: "jee-2022-jul-shift1", title: "JEE Main 2022 July Shift 1", description: "Complete paper with solutions" },
    { id: "jee-2022-jul-shift2", title: "JEE Main 2022 July Shift 2", description: "Complete paper with solutions" },
  ],
};

const JEESubjectBlock = ({ subject, downloads, onDownload }: SubjectBlockProps) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [subType, setSubType] = useState(""); // For chemistry
  
  let contentToDisplay;
  
  if (activeTab === "notes") {
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
          <div className="mb-6">
            <Tabs defaultValue={subType || "organic"} onValueChange={setSubType}>
              <TabsList className="w-full max-w-md">
                <TabsTrigger value="organic">Organic</TabsTrigger>
                <TabsTrigger value="inorganic">Inorganic</TabsTrigger>
                <TabsTrigger value="physical">Physical</TabsTrigger>
              </TabsList>
            </Tabs>
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
  } else if (activeTab === "pyqs") {
    contentToDisplay = (
      <SubjectPyqs
        years={["2024", "2023", "2022"]}
        pyqsByYear={jeePyqs}
        downloads={downloads}
        onDownload={onDownload}
      />
    );
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">{subject}</h2>
      
      <Tabs defaultValue="notes" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="pyqs">Previous Year Papers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notes" className="mt-0">
          {contentToDisplay}
        </TabsContent>
        
        <TabsContent value="pyqs" className="mt-0">
          {contentToDisplay}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JEESubjectBlock;
