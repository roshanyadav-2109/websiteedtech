
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface SubjectBlockProps {
  subject: string;
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
  selectedClass: string;
}

const JEESubjectBlock = ({ subject, downloads, onDownload, selectedClass }: SubjectBlockProps) => {
  const getChaptersForSubject = (subjectName: string, classType: string) => {
    const chaptersData = {
      "Physics": {
        "class11": [
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
        "class12": [
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
      },
      "Mathematics": {
        "class11": [
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
        "class12": [
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
      },
      "Organic Chemistry": {
        "class11": [
          { id: "organic-11-ch1", title: "Organic Chemistry – Some Basic Principles and Techniques", description: "Class 11 Organic Chemistry Chapter 12" },
          { id: "organic-11-ch2", title: "Hydrocarbons", description: "Class 11 Organic Chemistry Chapter 13" },
        ],
        "class12": [
          { id: "organic-12-ch1", title: "Haloalkanes and Haloarenes", description: "Class 12 Organic Chemistry Chapter 1" },
          { id: "organic-12-ch2", title: "Alcohols, Phenols and Ethers", description: "Class 12 Organic Chemistry Chapter 2" },
          { id: "organic-12-ch3", title: "Aldehydes, Ketones and Carboxylic Acids", description: "Class 12 Organic Chemistry Chapter 3" },
          { id: "organic-12-ch4", title: "Amines", description: "Class 12 Organic Chemistry Chapter 4" },
          { id: "organic-12-ch5", title: "Biomolecules", description: "Class 12 Organic Chemistry Chapter 5" },
          { id: "organic-12-ch6", title: "Polymers", description: "Class 12 Organic Chemistry Chapter 6" },
          { id: "organic-12-ch7", title: "Chemistry in Everyday Life", description: "Class 12 Organic Chemistry Chapter 7" },
        ]
      },
      "Inorganic Chemistry": {
        "class11": [
          { id: "inorganic-11-ch1", title: "Classification of Elements and Periodicity in Properties", description: "Class 11 Inorganic Chemistry Chapter 3" },
          { id: "inorganic-11-ch2", title: "Chemical Bonding and Molecular Structure", description: "Class 11 Inorganic Chemistry Chapter 4" },
          { id: "inorganic-11-ch3", title: "Hydrogen", description: "Class 11 Inorganic Chemistry Chapter 9" },
          { id: "inorganic-11-ch4", title: "The s-Block Elements", description: "Class 11 Inorganic Chemistry Chapter 10" },
          { id: "inorganic-11-ch5", title: "Some p-Block Elements", description: "Class 11 Inorganic Chemistry Chapter 11" },
          { id: "inorganic-11-ch6", title: "Environmental Chemistry", description: "Class 11 Inorganic Chemistry Chapter 14" },
        ],
        "class12": [
          { id: "inorganic-12-ch1", title: "The Solid State", description: "Class 12 Inorganic Chemistry Chapter 1" },
          { id: "inorganic-12-ch2", title: "Solutions", description: "Class 12 Inorganic Chemistry Chapter 2" },
          { id: "inorganic-12-ch3", title: "The p-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 7" },
          { id: "inorganic-12-ch4", title: "The d- and f-Block Elements", description: "Class 12 Inorganic Chemistry Chapter 8" },
          { id: "inorganic-12-ch5", title: "Coordination Compounds", description: "Class 12 Inorganic Chemistry Chapter 9" },
        ]
      },
      "Physical Chemistry": {
        "class11": [
          { id: "physical-11-ch1", title: "Some Basic Concepts of Chemistry", description: "Class 11 Physical Chemistry Chapter 1" },
          { id: "physical-11-ch2", title: "Structure of Atom", description: "Class 11 Physical Chemistry Chapter 2" },
          { id: "physical-11-ch3", title: "States of Matter: Gases and Liquids", description: "Class 11 Physical Chemistry Chapter 5" },
          { id: "physical-11-ch4", title: "Thermodynamics", description: "Class 11 Physical Chemistry Chapter 6" },
          { id: "physical-11-ch5", title: "Equilibrium", description: "Class 11 Physical Chemistry Chapter 7" },
          { id: "physical-11-ch6", title: "Redox Reactions", description: "Class 11 Physical Chemistry Chapter 8" },
        ],
        "class12": [
          { id: "physical-12-ch1", title: "Electrochemistry", description: "Class 12 Physical Chemistry Chapter 3" },
          { id: "physical-12-ch2", title: "Chemical Kinetics", description: "Class 12 Physical Chemistry Chapter 4" },
          { id: "physical-12-ch3", title: "Surface Chemistry", description: "Class 12 Physical Chemistry Chapter 5" },
        ]
      }
    };

    return chaptersData[subjectName]?.[classType] || [];
  };

  const chapters = getChaptersForSubject(subject, selectedClass);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-lg">{chapter.title}</CardTitle>
              <CardDescription>{chapter.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => onDownload(chapter.id)}
                className="bg-royal hover:bg-royal-dark text-white"
              >
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{downloads[chapter.id] || 0}</span>
                <div className="ml-2 bg-gray-200 h-1.5 w-16 rounded-full overflow-hidden">
                  <div 
                    className="bg-royal h-full rounded-full" 
                    style={{ width: `${Math.min(100, ((downloads[chapter.id] || 0) / 100) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {chapters.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No chapters available for this selection. Please try a different subject or class.
        </div>
      )}
    </div>
  );
};

export default JEESubjectBlock;
