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
import { toast } from "@/components/ui/use-toast";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import { runPopulation } from "@/utils/populateIITMNotes";

interface Note {
  id: string;
  title: string;
  description: string;
  week: number;
  downloads: number;
  subject?: string | null;
}

const BranchNotesTab = () => {
  const [branch, setBranch] = useState("data-science");
  const [level, setLevel] = useState("foundation");
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useBackend();

  // Fetch notes from the dedicated iitm_branch_notes table
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        // Use type assertion to bypass TypeScript checking for the new table
        const { data, error } = await (supabase as any)
          .from('iitm_branch_notes')
          .select('*')
          .eq('is_active', true)
          .eq('branch', branch)
          .eq('level', level)
          .order('subject', { ascending: true })
          .order('week_number', { ascending: true });

        if (error) {
          console.error('Error fetching notes:', error);
          setLoading(false);
          setNotes([]);
          return;
        }

        // Map data to the Note interface
        const mappedNotes: Note[] = (data || []).map((n: any) => ({
          id: n.id,
          title: n.title,
          description: n.description || "",
          week: n.week_number || 1,
          downloads: n.download_count ?? 0,
          subject: n.subject || null,
        }));

        setNotes(mappedNotes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching notes:', err);
        setNotes([]);
        setLoading(false);
      }
    };
    fetchNotes();
  }, [branch, level]);

  // Levels with proper capitalization
  const levels = [
    { value: "qualifier", label: "Qualifier" },
    { value: "foundation", label: "Foundation" },
    { value: "diploma", label: "Diploma" },
    { value: "degree", label: "Degree" }
  ];
  
  // Subject definitions by branch and level
  const subjectsByBranchLevel = {
    "data-science": {
      qualifier: [
        "English I",
        "Mathematics for Data Science I", 
        "Statistics for Data Science I",
        "Computational Thinking"
      ],
      foundation: [
        "Mathematics for Data Science I",
        "Statistics for Data Science I", 
        "Computational Thinking",
        "English I",
        "Mathematics for Data Science II",
        "Statistics for Data Science II",
        "Programming in Python",
        "English II"
      ],
      diploma: [
        "Database Management Systems",
        "Programming, Data Structures and Algorithms using Python",
        "Modern Application Development I",
        "Modern Application Development I - Project",
        "Programming Concepts using Java",
        "Modern Application Development II", 
        "Modern Application Development II - Project",
        "System Commands",
        "Machine Learning Foundations",
        "Business Data Management",
        "Business Data Management - Project",
        "Machine Learning Techniques",
        "Machine Learning Practice",
        "Machine Learning Practice - Project",
        "Business Analytics",
        "Tools in Data Science"
      ],
      degree: [
        "Software Engineering",
        "Software Testing", 
        "AI: Search Methods for Problem Solving",
        "Deep Learning",
        "Strategies for Professional Growth",
        "Algorithmic Thinking in Bioinformatics",
        "Big Data and Biological Networks",
        "Data Visualization Design",
        "Special topics in Machine Learning (Reinforcement Learning)",
        "Speech Technology",
        "Design Thinking for Data-Driven App Development",
        "Industry 4.0",
        "Sequential Decision Making",
        "Market Research",
        "Privacy & Security in Online Social Media",
        "Introduction to Big Data",
        "Financial Forensics",
        "Linear Statistical Models",
        "Advanced Algorithms",
        "Statistical Computing",
        "Computer Systems Design",
        "Programming in C",
        "Mathematical Thinking",
        "Large Language Models",
        "Introduction to Natural Language Processing (i-NLP)",
        "Deep Learning for Computer Vision",
        "Managerial Economics",
        "Game Theory and Strategy",
        "Corporate Finance",
        "Deep Learning Practice",
        "Operating Systems",
        "Mathematical Foundations of Generative AI",
        "Algorithms for Data Science (ADS)",
        "Machine Learning Operations (MLOps)"
      ]
    },
    "electronic-systems": {
      qualifier: [
        "English I",
        "Math for Electronics I",
        "Electronic Systems Thinking and Circuits",
        "Introduction to C Programming"
      ],
      foundation: [
        "English I",
        "Math for Electronics I",
        "English II", 
        "Electronic Systems Thinking and Circuits",
        "Electronic Systems Thinking and Circuits Lab",
        "Introduction to C Programming",
        "C Programming Laboratory",
        "Introduction to Linux and Programming",
        "Linux Systems Laboratory",
        "Digital Systems",
        "Electrical and Electronic Circuits",
        "Electronics Laboratory",
        "Embedded C Programming",
        "Embedded C Programming Laboratory"
      ],
      diploma: [
        "Math for Electronics II",
        "Signals and Systems",
        "Analog Electronic Systems",
        "Analog Electronics Laboratory",
        "Python Programming",
        "Digital System Design",
        "Digital System Design Laboratory",
        "Digital Signal Processing",
        "Sensors and Applications",
        "Sensors Laboratory",
        "Control Engineering",
        "Electronics System Project"
      ],
      degree: [
        "Embedded Linux and FPGAs",
        "Embedded Linux and FPGAs Lab",
        "Electromagnetic Fields and Transmission Lines",
        "Electronic Product Design",
        "Computer Organisation",
        "Strategies for Professional Growth",
        "Probability and Statistics",
        "Communication Systems",
        "Internet of Things (IoT)",
        "Semiconductor Devices and VLSI Technology",
        "Analog Circuits",
        "Digital IC Design",
        "Power Management for Electronic Systems",
        "Biomedical Electronic Systems",
        "Operating Systems",
        "Database Management Systems",
        "Programming Data Structures and Algorithms using Python",
        "Modern Application Development I",
        "Machine Learning Foundation",
        "Programming Concepts using Java",
        "Modern Application Development II",
        "Machine Learning Techniques",
        "Machine Learning Practice",
        "Deep Learning",
        "Deep Learning for Computer Vision",
        "Speech Technology",
        "Deep Learning Practice",
        "Industry 4.0",
        "Design Thinking for Data-Driven App Development",
        "Financial Forensics",
        "Market Research",
        "Game Theory and Strategy",
        "Managerial Economics",
        "Corporate Finance",
        "Apprenticeship in Electronics Systems 1",
        "Apprenticeship in Electronics Systems 2"
      ]
    }
  };

  // Get subjects for current branch and level
  const getCurrentSubjects = () => {
    return subjectsByBranchLevel[branch as keyof typeof subjectsByBranchLevel]?.[level as keyof typeof subjectsByBranchLevel["data-science"]] || [];
  };

  // Group notes by subject
  const groupNotesBySubject = () => {
    const currentSubjects = getCurrentSubjects();
    const groupedNotes: Record<string, Note[]> = {};
    
    // Initialize all subjects with empty arrays
    currentSubjects.forEach(subject => {
      groupedNotes[subject] = [];
    });
    
    // Group actual notes by subject
    notes.forEach(note => {
      if (note.subject && groupedNotes[note.subject]) {
        groupedNotes[note.subject].push(note);
      }
    });
    
    return groupedNotes;
  };

  // Generate placeholder notes for subjects with no data
  const generatePlaceholderNotes = (subject: string): Note[] => {
    const maxWeeks = level === "qualifier" ? 4 : 12;
    const placeholderNotes: Note[] = [];
    
    for (let week = 1; week <= maxWeeks; week++) {
      placeholderNotes.push({
        id: `placeholder-${subject}-w${week}`,
        title: `Week ${week} - ${subject}`,
        description: `Week ${week} lecture notes and practice problems`,
        week: week,
        downloads: Math.floor(Math.random() * 50) + 10,
        subject: subject
      });
    }
    
    return placeholderNotes;
  };

  const handleDownload = (noteId: string) => {
    console.log(`Downloading note: ${noteId}`);
    // Actual download logic would go here
  };

  const groupedNotes = groupNotesBySubject();
  const currentSubjects = getCurrentSubjects();

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
        
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
            <span className="ml-2 text-gray-600">Loading notes...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {currentSubjects.map((subject) => {
              // Use actual notes if available, otherwise generate placeholders
              const subjectNotes = groupedNotes[subject]?.length > 0 
                ? groupedNotes[subject] 
                : generatePlaceholderNotes(subject);

              return (
                <Accordion type="single" collapsible key={subject} className="bg-white rounded-lg shadow-md">
                  <AccordionItem value={subject}>
                    <AccordionTrigger className="p-4 hover:bg-gray-50">
                      <span className="font-semibold text-lg">{subject}</span>
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
        )}
        
        {!loading && currentSubjects.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No subjects available for this selection. Please try a different branch or level.
          </div>
        )}
      </div>
      {/* Add admin trigger button */}
      {isAdmin && (
        <div className="flex justify-end mb-2">
          <Button variant="outline" onClick={handlePopulateClick}>Populate All Notes (Admin)</Button>
        </div>
      )}
    </div>
  );
};

export default BranchNotesTab;
