
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
  
  // Data Science subjects by level - UPDATED WITH COMPREHENSIVE LIST
  const dsQualifierSubjects = [
    { id: "english-1", title: "English I" },
    { id: "math-ds-1", title: "Mathematics for Data Science I" },
    { id: "stats-ds-1", title: "Statistics for Data Science I" },
    { id: "computational-thinking", title: "Computational Thinking" },
  ];
  
  const dsFoundationSubjects = [
    { id: "math-ds-1", title: "Mathematics for Data Science I" },
    { id: "stats-ds-1", title: "Statistics for Data Science I" },
    { id: "computational-thinking", title: "Computational Thinking" },
    { id: "english-1", title: "English I" },
    { id: "math-ds-2", title: "Mathematics for Data Science II" },
    { id: "stats-ds-2", title: "Statistics for Data Science II" },
    { id: "programming-python", title: "Programming in Python" },
    { id: "english-2", title: "English II" }
  ];
  
  const dsDiplomaSubjects = [
    // Programming Track
    { id: "dbms", title: "Database Management Systems" },
    { id: "python-dsa", title: "Programming, Data Structures and Algorithms using Python" },
    { id: "mad-1", title: "Modern Application Development I" },
    { id: "mad-1-project", title: "Modern Application Development I - Project" },
    { id: "java-programming", title: "Programming Concepts using Java" },
    { id: "mad-2", title: "Modern Application Development II" },
    { id: "mad-2-project", title: "Modern Application Development II - Project" },
    { id: "system-commands", title: "System Commands" },
    // Data Science Track
    { id: "ml-foundations", title: "Machine Learning Foundations" },
    { id: "business-data-mgmt", title: "Business Data Management" },
    { id: "business-data-project", title: "Business Data Management - Project" },
    { id: "ml-techniques", title: "Machine Learning Techniques" },
    { id: "ml-practice", title: "Machine Learning Practice" },
    { id: "ml-practice-project", title: "Machine Learning Practice - Project" },
    { id: "business-analytics", title: "Business Analytics" },
    { id: "tools-data-science", title: "Tools in Data Science" }
  ];
  
  const dsDegreeSubjects = [
    // Core Courses
    { id: "software-engineering", title: "Software Engineering" },
    { id: "software-testing", title: "Software Testing" },
    { id: "ai-search-methods", title: "AI: Search Methods for Problem Solving" },
    { id: "deep-learning", title: "Deep Learning" },
    // Elective Courses
    { id: "professional-growth", title: "Strategies for Professional Growth" },
    { id: "algorithmic-bioinformatics", title: "Algorithmic Thinking in Bioinformatics" },
    { id: "big-data-bio", title: "Big Data and Biological Networks" },
    { id: "data-viz-design", title: "Data Visualization Design" },
    { id: "reinforcement-learning", title: "Special topics in Machine Learning (Reinforcement Learning)" },
    { id: "speech-technology", title: "Speech Technology" },
    { id: "design-thinking", title: "Design Thinking for Data-Driven App Development" },
    { id: "industry-4", title: "Industry 4.0" },
    { id: "sequential-decision", title: "Sequential Decision Making" },
    { id: "market-research", title: "Market Research" },
    { id: "privacy-security", title: "Privacy & Security in Online Social Media" },
    { id: "intro-big-data", title: "Introduction to Big Data" },
    { id: "financial-forensics", title: "Financial Forensics" },
    { id: "linear-statistical", title: "Linear Statistical Models" },
    { id: "advanced-algorithms", title: "Advanced Algorithms" },
    { id: "statistical-computing", title: "Statistical Computing" },
    { id: "computer-systems", title: "Computer Systems Design" },
    { id: "programming-c", title: "Programming in C" },
    { id: "mathematical-thinking", title: "Mathematical Thinking" },
    { id: "large-language-models", title: "Large Language Models" },
    { id: "intro-nlp", title: "Introduction to Natural Language Processing (i-NLP)" },
    { id: "dl-computer-vision", title: "Deep Learning for Computer Vision" },
    { id: "managerial-economics", title: "Managerial Economics" },
    { id: "game-theory", title: "Game Theory and Strategy" },
    { id: "corporate-finance", title: "Corporate Finance" },
    { id: "dl-practice", title: "Deep Learning Practice" },
    { id: "operating-systems", title: "Operating Systems" },
    { id: "math-generative-ai", title: "Mathematical Foundations of Generative AI" },
    { id: "algorithms-data-science", title: "Algorithms for Data Science (ADS)" },
    { id: "mlops", title: "Machine Learning Operations (MLOps)" }
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
