
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Note {
  id: string;
  title: string;
  description: string;
  week: number;
  downloads: number;
  subject?: string | null;
}

export interface UseIITMBranchNotesResult {
  notes: Note[];
  loading: boolean;
  groupedNotes: Record<string, Note[]>;
  getCurrentSubjects: () => string[];
  reloadNotes: () => void;
}

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

export function useIITMBranchNotes(branch: string, level: string): UseIITMBranchNotesResult {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadFlag, setReloadFlag] = useState(0);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data, error } = await (supabase as any)
          .from("iitm_branch_notes")
          .select("*")
          .eq("is_active", true)
          .eq("branch", branch)
          .eq("level", level)
          .order("subject", { ascending: true })
          .order("week_number", { ascending: true });

        if (error) {
          setLoading(false);
          setNotes([]);
          return;
        }
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
      } catch {
        setNotes([]);
        setLoading(false);
      }
    })();
  }, [branch, level, reloadFlag]);

  const getCurrentSubjects = () => (
    subjectsByBranchLevel[branch as keyof typeof subjectsByBranchLevel]?.[level as keyof typeof subjectsByBranchLevel["data-science"]] || []
  );

  const groupedNotes: Record<string, Note[]> = {};
  getCurrentSubjects().forEach((subject) => {
    groupedNotes[subject] = [];
  });
  notes.forEach((note) => {
    if (note.subject && groupedNotes[note.subject]) {
      groupedNotes[note.subject].push(note);
    }
  });

  const reloadNotes = () => setReloadFlag((x) => x + 1);

  return { notes, loading, groupedNotes, getCurrentSubjects, reloadNotes };
}
