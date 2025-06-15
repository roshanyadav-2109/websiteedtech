import React, { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

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
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // NEW: Fetch notes from supabase (for this branch/level)
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      let { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('is_active', true)
        .eq('branch', branch)
        .eq('level', level)
        .order('created_at', { ascending: true });

      if (error) {
        setLoading(false);
        setNotes([]);
        return;
      }
      setNotes(data || []);
      setLoading(false);
    };
    fetchNotes();
  }, [branch, level]);

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
  
  // Electronic Systems subjects by level - UPDATED WITH COMPREHENSIVE LIST
  const esQualifierSubjects = [
    { id: "english-1-es", title: "English I" },
    { id: "math-electronics-1", title: "Math for Electronics I" },
    { id: "es-thinking-circuits", title: "Electronic Systems Thinking and Circuits" },
    { id: "intro-c-programming", title: "Introduction to C Programming" },
  ];
  
  const esFoundationSubjects = [
    { id: "english-1-es", title: "English I" },
    { id: "math-electronics-1", title: "Math for Electronics I" },
    { id: "english-2-es", title: "English II" },
    { id: "es-thinking-circuits", title: "Electronic Systems Thinking and Circuits" },
    { id: "es-thinking-circuits-lab", title: "Electronic Systems Thinking and Circuits Lab" },
    { id: "intro-c-programming", title: "Introduction to C Programming" },
    { id: "c-programming-lab", title: "C Programming Laboratory" },
    { id: "intro-linux-programming", title: "Introduction to Linux and Programming" },
    { id: "linux-systems-lab", title: "Linux Systems Laboratory" },
    { id: "digital-systems-es", title: "Digital Systems" },
    { id: "electrical-electronic-circuits", title: "Electrical and Electronic Circuits" },
    { id: "electronics-lab", title: "Electronics Laboratory" },
    { id: "embedded-c-programming", title: "Embedded C Programming" },
    { id: "embedded-c-lab", title: "Embedded C Programming Laboratory" }
  ];
  
  const esDiplomaSubjects = [
    { id: "math-electronics-2", title: "Math for Electronics II" },
    { id: "signals-systems-es", title: "Signals and Systems" },
    { id: "analog-electronic-systems", title: "Analog Electronic Systems" },
    { id: "analog-electronics-lab", title: "Analog Electronics Laboratory" },
    { id: "python-programming-es", title: "Python Programming" },
    { id: "digital-system-design", title: "Digital System Design" },
    { id: "digital-system-design-lab", title: "Digital System Design Laboratory" },
    { id: "digital-signal-processing", title: "Digital Signal Processing" },
    { id: "sensors-applications", title: "Sensors and Applications" },
    { id: "sensors-lab", title: "Sensors Laboratory" },
    { id: "control-engineering", title: "Control Engineering" },
    { id: "electronics-system-project", title: "Electronics System Project" }
  ];
  
  const esDegreeSubjects = [
    // Core Courses
    { id: "embedded-linux-fpgas", title: "Embedded Linux and FPGAs" },
    { id: "embedded-linux-fpgas-lab", title: "Embedded Linux and FPGAs Lab" },
    { id: "electromagnetic-fields", title: "Electromagnetic Fields and Transmission Lines" },
    { id: "electronic-product-design", title: "Electronic Product Design" },
    { id: "computer-organisation", title: "Computer Organisation" },
    { id: "professional-growth-es", title: "Strategies for Professional Growth" },
    // Department Electives
    { id: "probability-statistics-es", title: "Probability and Statistics" },
    { id: "communication-systems-es", title: "Communication Systems" },
    { id: "iot-es", title: "Internet of Things (IoT)" },
    { id: "semiconductor-devices-vlsi", title: "Semiconductor Devices and VLSI Technology" },
    { id: "analog-circuits", title: "Analog Circuits" },
    { id: "digital-ic-design", title: "Digital IC Design" },
    { id: "power-management", title: "Power Management for Electronic Systems" },
    { id: "biomedical-electronic", title: "Biomedical Electronic Systems" },
    // Open Electives
    { id: "operating-systems-es", title: "Operating Systems" },
    { id: "dbms-es", title: "Database Management Systems" },
    { id: "python-dsa-es", title: "Programming Data Structures and Algorithms using Python" },
    { id: "mad-1-es", title: "Modern Application Development I" },
    { id: "ml-foundation-es", title: "Machine Learning Foundation" },
    { id: "java-programming-es", title: "Programming Concepts using Java" },
    { id: "mad-2-es", title: "Modern Application Development II" },
    { id: "ml-techniques-es", title: "Machine Learning Techniques" },
    { id: "ml-practice-es", title: "Machine Learning Practice" },
    { id: "deep-learning-es", title: "Deep Learning" },
    { id: "dl-computer-vision-es", title: "Deep Learning for Computer Vision" },
    { id: "speech-technology-es", title: "Speech Technology" },
    { id: "dl-practice-es", title: "Deep Learning Practice" },
    { id: "industry-4-es", title: "Industry 4.0" },
    { id: "design-thinking-es", title: "Design Thinking for Data-Driven App Development" },
    { id: "financial-forensics-es", title: "Financial Forensics" },
    { id: "market-research-es", title: "Market Research" },
    { id: "game-theory-es", title: "Game Theory and Strategy" },
    { id: "managerial-economics-es", title: "Managerial Economics" },
    { id: "corporate-finance-es", title: "Corporate Finance" },
    { id: "apprenticeship-es-1", title: "Apprenticeship in Electronics Systems 1" },
    { id: "apprenticeship-es-2", title: "Apprenticeship in Electronics Systems 2" }
  ];
  
  // Generate sample notes for a subject (variable weeks based on level)
  const generateSubjectNotes = (subjectId: string, subjectTitle: string) => {
    const notes: Note[] = [];
    // Qualifier level only has weeks 1-4, others have full 12 weeks
    const maxWeeks = level === "qualifier" ? 4 : 12;
    
    for (let week = 1; week <= maxWeeks; week++) {
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

  const getNotesForSubject = (subjectId: string, subjectTitle: string) => {
    // Prefer Supabase data for this subject if present
    let subjectNotes = notes.filter(
      n => (n.subject?.toLowerCase() === subjectTitle.toLowerCase())
    );
    if (subjectNotes.length > 0) {
      // Use downloaded week property or try to extract via title
      return subjectNotes.map(n => ({
        id: n.id,
        title: n.title,
        description: n.description || `${subjectTitle} study materials`,
        week: n.title.match(/week (\d+)/i)
          ? parseInt(n.title.match(/week (\d+)/i)[1], 10)
          : 1,
        downloads: n.download_count || 0,
      }));
    }
    // fallback to old generated data
    return generateSubjectNotes(subjectId, subjectTitle);
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
          {level === "qualifier" && (
            <span className="text-sm font-normal text-gray-600 ml-2">(Weeks 1-4 only)</span>
          )}
        </h2>
        
        <div className="space-y-6">
          {currentSubjects.map((subject) => {
            const subjectNotes = getNotesForSubject(subject.id, subject.title);
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
