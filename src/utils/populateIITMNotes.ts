
import { supabase } from "@/integrations/supabase/client";

// Comprehensive subject data for all branches and levels
const SUBJECTS_DATA = {
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

export const populateIITMNotes = async () => {
  console.log("Starting to populate IITM notes...");
  
  const branches = Object.keys(SUBJECTS_DATA) as Array<keyof typeof SUBJECTS_DATA>;
  
  for (const branch of branches) {
    const levels = Object.keys(SUBJECTS_DATA[branch]) as Array<keyof typeof SUBJECTS_DATA[typeof branch]>;
    
    for (const level of levels) {
      const subjects = SUBJECTS_DATA[branch][level];
      const maxWeeks = level === "qualifier" ? 4 : 12;
      
      for (const subject of subjects) {
        console.log(`Populating ${branch} - ${level} - ${subject}`);
        
        // Check if notes already exist for this subject/branch/level
        const { data: existingNotes } = await supabase
          .from('iitm_branch_notes')
          .select('id')
          .eq('branch', branch)
          .eq('level', level)
          .eq('subject', subject);
        
        if (existingNotes && existingNotes.length > 0) {
          console.log(`Notes already exist for ${subject}, skipping...`);
          continue;
        }
        
        // Create notes for each week
        const notesToInsert = [];
        for (let week = 1; week <= maxWeeks; week++) {
          notesToInsert.push({
            title: `Week ${week} - ${subject}`,
            description: `Week ${week} lecture notes, assignments, and practice problems for ${subject}`,
            branch,
            level,
            subject,
            week_number: week,
            download_count: Math.floor(Math.random() * 100) + 20,
            is_active: true
          });
        }
        
        // Insert all weeks for this subject at once
        const { error } = await supabase
          .from('iitm_branch_notes')
          .insert(notesToInsert);
        
        if (error) {
          console.error(`Error inserting notes for ${subject}:`, error);
        } else {
          console.log(`Successfully inserted ${maxWeeks} notes for ${subject}`);
        }
        
        // Small delay to avoid overwhelming the database
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
  }
  
  console.log("Finished populating IITM notes!");
};

// Function to run the population (can be called from admin panel or console)
export const runPopulation = async () => {
  try {
    await populateIITMNotes();
    return { success: true, message: "Notes populated successfully!" };
  } catch (error) {
    console.error("Error populating notes:", error);
    return { success: false, message: "Failed to populate notes", error };
  }
};
