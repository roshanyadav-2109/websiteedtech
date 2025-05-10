
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Note {
  id: string;
  title: string;
  description: string;
  week: number;
  downloads: number;
}

const BranchNotesTab = () => {
  const [branch, setBranch] = useState("data-science");
  const [level, setLevel] = useState("foundation");

  // Add QUALIFIER level
  const levels = [
    { value: "qualifier", label: "Qualifier" },
    { value: "foundation", label: "Foundation" },
    { value: "diploma", label: "Diploma" },
    { value: "degree", label: "Degree" }
  ];
  
  // Data Science subjects by level
  const dsQualifierSubjects = [
    { id: "math-basics", title: "Mathematical Basics" },
    { id: "computing-basics", title: "Basics of Computing" },
    { id: "stats-basics", title: "Statistics Basics" },
  ];
  
  const dsFoundationSubjects = [
    { id: "python", title: "Programming and Data Structures with Python" },
    { id: "stats", title: "Statistics for Data Science" },
    { id: "computational-thinking", title: "Computational Thinking" },
    { id: "discrete-math", title: "Discrete Mathematics" },
    { id: "dbms", title: "Database Management Systems" }
  ];
  
  const dsDiplomaSubjects = [
    { id: "machine-learning", title: "Machine Learning Foundations" },
    { id: "data-viz", title: "Data Visualization" },
    { id: "business-analytics", title: "Business Data Management" },
    { id: "algorithms", title: "Algorithms for Data Science" }
  ];
  
  const dsDegreeSubjects = [
    { id: "deep-learning", title: "Deep Learning" },
    { id: "nlp", title: "Natural Language Processing" },
    { id: "big-data", title: "Big Data Analytics" },
    { id: "reinforcement", title: "Reinforcement Learning" }
  ];
  
  // Electronic Systems subjects by level
  const esQualifierSubjects = [
    { id: "es-math-basics", title: "Mathematical Foundations" },
    { id: "es-computing-basics", title: "Computing Basics" },
    { id: "es-circuits-basics", title: "Basic Circuits" },
  ];
  
  const esFoundationSubjects = [
    { id: "digital-systems", title: "Digital Systems" },
    { id: "signals", title: "Signals and Systems" },
    { id: "circuit-theory", title: "Circuit Theory" },
    { id: "programming", title: "Programming Fundamentals" }
  ];
  
  const esDiplomaSubjects = [
    { id: "microprocessors", title: "Microprocessors and Interfacing" },
    { id: "control-systems", title: "Control Systems" },
    { id: "communication", title: "Communication Systems" },
    { id: "electronics-design", title: "Electronic System Design" }
  ];
  
  const esDegreeSubjects = [
    { id: "vlsi", title: "VLSI Design" },
    { id: "embedded", title: "Embedded Systems" },
    { id: "iot", title: "Internet of Things" },
    { id: "advanced-electronics", title: "Advanced Electronics" }
  ];
  
  // Generate sample notes for a subject (12 weeks)
  const generateSubjectNotes = (subjectId: string, subjectTitle: string) => {
    const notes: Note[] = [];
    for (let week = 1; week <= 12; week++) {
      notes.push({
        id: `${subjectId}-w${week}`,
        title: `Week ${week} - ${subjectTitle}`,
        description: `Week ${week} lecture notes and practice problems`,
        week: week,
        downloads: Math.floor(Math.random() * 100) + 20
      });
    }
    return notes;
  };

  const getSubjectsByBranchAndLevel = () => {
    if (branch === "data-science") {
      switch (level) {
        case "qualifier": return dsQualifierSubjects;
        case "foundation": return dsFoundationSubjects;
        case "diploma": return dsDiplomaSubjects;
        case "degree": return dsDegreeSubjects;
        default: return [];
      }
    } else if (branch === "electronic-systems") {
      switch (level) {
        case "qualifier": return esQualifierSubjects;
        case "foundation": return esFoundationSubjects;
        case "diploma": return esDiplomaSubjects;
        case "degree": return esDegreeSubjects;
        default: return [];
      }
    }
    return [];
  };

  const handleDownload = (noteId: string) => {
    // Actual download logic would go here
    console.log(`Downloading note: ${noteId}`);
  };

  const currentSubjects = getSubjectsByBranchAndLevel();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Tabs value={branch} onValueChange={setBranch} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="data-science">Data Science</TabsTrigger>
              <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {branch.replace('-', ' ')} - {level.charAt(0).toUpperCase() + level.slice(1)} Level Notes
        </h2>
        
        <div className="space-y-6">
          {currentSubjects.map((subject) => {
            const subjectNotes = generateSubjectNotes(subject.id, subject.title);
            return (
              <Accordion type="single" collapsible key={subject.id} className="bg-white rounded-lg shadow-md">
                <AccordionItem value={subject.id}>
                  <AccordionTrigger className="p-4 hover:bg-gray-50">
                    <span className="font-semibold text-lg">{subject.title}</span>
                  </AccordionTrigger>
                  <AccordionContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {subjectNotes.map((note) => (
                        <Card key={note.id} className="border-none shadow-sm hover:shadow-md transition-all">
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <div className="rounded-full bg-royal/10 p-2 mr-3">
                                <FileText className="h-4 w-4 text-royal" />
                              </div>
                              <div>
                                <CardTitle className="text-base">{note.title}</CardTitle>
                                <CardDescription className="text-xs">{note.description}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardFooter className="flex justify-between pt-0">
                            <Button
                              size="sm"
                              onClick={() => handleDownload(note.id)}
                              className="bg-royal hover:bg-royal-dark text-white text-xs"
                            >
                              <Download className="h-3 w-3 mr-1" /> Download
                            </Button>
                            <div className="flex items-center">
                              <span className="text-xs text-gray-500">{note.downloads}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        </div>
        
        {currentSubjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No subjects available for this selection. Please try a different branch or level.
          </div>
        )}
      </div>
    </div>
  );
};

export default BranchNotesTab;
