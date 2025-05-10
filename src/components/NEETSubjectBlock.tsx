
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
      { id: "botany-11-ch1", title: "Cell: The Unit of Life", description: "Class 11 Botany Chapter 1" },
      { id: "botany-11-ch2", title: "Plant Morphology", description: "Class 11 Botany Chapter 2" },
      { id: "botany-11-ch3", title: "Plant Anatomy", description: "Class 11 Botany Chapter 3" },
    ],
    class12: [
      { id: "botany-12-ch1", title: "Reproduction in Plants", description: "Class 12 Botany Chapter 1" },
      { id: "botany-12-ch2", title: "Genetics and Evolution", description: "Class 12 Botany Chapter 2" },
      { id: "botany-12-ch3", title: "Plant Physiology", description: "Class 12 Botany Chapter 3" },
    ]
  },
  "zoology": {
    class11: [
      { id: "zoology-11-ch1", title: "Animal Kingdom", description: "Class 11 Zoology Chapter 1" },
      { id: "zoology-11-ch2", title: "Structural Organization in Animals", description: "Class 11 Zoology Chapter 2" },
      { id: "zoology-11-ch3", title: "Biomolecules", description: "Class 11 Zoology Chapter 3" },
    ],
    class12: [
      { id: "zoology-12-ch1", title: "Human Reproduction", description: "Class 12 Zoology Chapter 1" },
      { id: "zoology-12-ch2", title: "Human Health and Disease", description: "Class 12 Zoology Chapter 2" },
      { id: "zoology-12-ch3", title: "Evolution", description: "Class 12 Zoology Chapter 3" },
    ]
  }
};

const physicsChapters = {
  class11: [
    { id: "physics-11-ch1", title: "Physical World and Measurement", description: "Class 11 Physics Chapter 1" },
    { id: "physics-11-ch2", title: "Kinematics", description: "Class 11 Physics Chapter 2" },
    { id: "physics-11-ch3", title: "Laws of Motion", description: "Class 11 Physics Chapter 3" },
  ],
  class12: [
    { id: "physics-12-ch1", title: "Electrostatics", description: "Class 12 Physics Chapter 1" },
    { id: "physics-12-ch2", title: "Current Electricity", description: "Class 12 Physics Chapter 2" },
    { id: "physics-12-ch3", title: "Magnetic Effects of Current", description: "Class 12 Physics Chapter 3" },
  ]
};

const chemistryChapters = {
  "organic": {
    class11: [
      { id: "chemistry-organic-11-ch1", title: "Basic Organic Chemistry", description: "Class 11 Organic Chemistry Chapter 1" },
      { id: "chemistry-organic-11-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 2" },
    ],
    class12: [
      { id: "chemistry-organic-12-ch1", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 1" },
      { id: "chemistry-organic-12-ch2", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 2" },
    ]
  },
  "inorganic": {
    class11: [
      { id: "chemistry-inorganic-11-ch1", title: "Classification of Elements", description: "Class 11 Inorganic Chemistry Chapter 1" },
      { id: "chemistry-inorganic-11-ch2", title: "Chemical Bonding", description: "Class 11 Inorganic Chemistry Chapter 2" },
    ],
    class12: [
      { id: "chemistry-inorganic-12-ch1", title: "p-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 1" },
      { id: "chemistry-inorganic-12-ch2", title: "d and f Block Elements", description: "Class 12 Inorganic Chemistry Chapter 2" },
    ]
  },
  "physical": {
    class11: [
      { id: "chemistry-physical-11-ch1", title: "States of Matter", description: "Class 11 Physical Chemistry Chapter 1" },
      { id: "chemistry-physical-11-ch2", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 2" },
    ],
    class12: [
      { id: "chemistry-physical-12-ch1", title: "Solutions", description: "Class 12 Physical Chemistry Chapter 1" },
      { id: "chemistry-physical-12-ch2", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 2" },
    ]
  }
};

const neetPyqs = {
  "2024": [
    { id: "neet-2024-set-a", title: "NEET 2024 Set A", description: "Complete paper with solutions" },
    { id: "neet-2024-set-b", title: "NEET 2024 Set B", description: "Complete paper with solutions" },
  ],
  "2023": [
    { id: "neet-2023-set-a", title: "NEET 2023 Set A", description: "Complete paper with solutions" },
    { id: "neet-2023-set-b", title: "NEET 2023 Set B", description: "Complete paper with solutions" },
  ],
  "2022": [
    { id: "neet-2022-set-a", title: "NEET 2022 Set A", description: "Complete paper with solutions" },
    { id: "neet-2022-set-b", title: "NEET 2022 Set B", description: "Complete paper with solutions" },
  ],
};

const NEETSubjectBlock = ({ subject, downloads, onDownload }: SubjectBlockProps) => {
  const [activeTab, setActiveTab] = useState("notes");
  const [subType, setSubType] = useState(""); // For biology and chemistry
  
  let contentToDisplay;
  
  if (activeTab === "notes") {
    if (subject === "biology") {
      contentToDisplay = (
        <div>
          <div className="mb-6">
            <Tabs defaultValue={subType || "botany"} onValueChange={setSubType}>
              <TabsList className="w-full max-w-md">
                <TabsTrigger value="botany">Botany</TabsTrigger>
                <TabsTrigger value="zoology">Zoology</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {subType && <SubjectChapters 
            chapters={biologyChapters[subType]}
            downloads={downloads}
            onDownload={onDownload}
          />}
        </div>
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
        pyqsByYear={neetPyqs}
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

export default NEETSubjectBlock;
