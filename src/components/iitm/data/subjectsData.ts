import { Subject } from "../types/gradeTypes";

export const ALL_SUBJECTS: Record<string, Subject[]> = {
  foundation: [
    // Data Science Foundation Subjects
    {
      key: "maths1",
      name: "Mathematics 1",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "english1",
      name: "English 1",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "statistics1",
      name: "Statistics 1",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "Bonus", label: "Bonus Marks (0-5)", min: 0, max: 5 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "english2",
      name: "English 2",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "statistics2",
      name: "Statistics 2",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "computational",
      name: "Computational Thinking",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "python",
      name: "Programming in Python",
      fields: [
        { id: "GAA", label: "GAA (objective assignments)", min: 0, max: 100 },
        { id: "GAAP", label: "GAAP (programming assignments)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1 Score", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "maths2",
      name: "Mathematics 2",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    }
  ],
  "foundation-electronic-systems": [
    // Electronic Systems Foundation Subjects
    {
      key: "english_es1",
      name: "English - I",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "math_electronics1",
      name: "Math for Electronics - I",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "electronic_systems_thinking",
      name: "Electronic Systems Thinking and Circuits",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "intro_c_programming",
      name: "Introduction to C Programming",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1 Score", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "english_es2",
      name: "English - II",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "intro_linux_programming",
      name: "Introduction to Linux Programming",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "NPPE", label: "NPPE Assignments Average", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "OPE", label: "Online Programming Exam", min: 0, max: 100 },
        { id: "BPTA", label: "Biweekly Programming Tests Average", min: 0, max: 100 },
        { id: "VMT", label: "Virtual Machine Tasks Average", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "digital_systems",
      name: "Digital Systems",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "electrical_electronic_circuits",
      name: "Electrical and Electronic Circuits",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "embedded_c_programming",
      name: "Embedded C Programming",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "GRPA", label: "Programming Assignments Average", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    }
  ],
  diploma: [
    {
      key: "programming_python",
      name: "Programming, Data Structures and Algorithms using Python",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "GAAP", label: "Programming Assign. Avg (Best 7/8, GAAP)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "databasems",
      name: "Database Management Systems",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "java_programming",
      name: "Java Programming",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "GAAP", label: "Programming Assign. Avg (Best 7/8, GAAP)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "systemcommands",
      name: "System Commands",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "appdev1",
      name: "Application Development-1",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "GAAP", label: "Programming Assign. Avg (Best 7/8, GAAP)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "appdev2",
      name: "Application Development-2",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "GAAP", label: "Programming Assign. Avg (Best 7/8, GAAP)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "machinelearning",
      name: "Machine Learning Foundations",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "ml_techniques",
      name: "Machine Learning Techniques",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "machinelearning_practice",
      name: "Machine Learning Practice",
      fields: [
        { id: "GA", label: "Assignment Avg (Best 5/7, GA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "Qz3", label: "Quiz 3", min: 0, max: 100 },
        { id: "NPPE1", label: "NPPE 1", min: 0, max: 100 },
        { id: "NPPE2", label: "NPPE 2", min: 0, max: 100 },
        { id: "NPPE3", label: "NPPE 3", min: 0, max: 100 }
      ]
    },
    {
      key: "business_data_management",
      name: "Business Data Management",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "business_analytics",
      name: "Business Analytics",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "tools_data_science",
      name: "Tools in Data Science",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    }
  ],
  "diploma-electronic-systems": [
    {
      key: "math_electronics2",
      name: "Math for Electronics - II",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "signals_systems",
      name: "Signals and Systems",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "GrPA", label: "Programming Assignments Avg (GrPA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
        key: "python_programming_es",
        name: "Python Programming",
        fields: [
            { id: "GAA1", label: "Objective Assignments Avg (GAA1)", min: 0, max: 100 },
            { id: "GAA2", label: "Programming Assignments Avg (GAA2)", min: 0, max: 100 },
            { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
            { id: "PE1", label: "Programming Exam 1 (PE1)", min: 0, max: 100 },
            { id: "PE2", label: "Programming Exam 2 (PE2)", min: 0, max: 100 },
            { id: "F", label: "Final Exam Score", min: 0, max: 100 }
        ]
    },
    {
      key: "analog_electronic_systems",
      name: "Analog Electronic Systems",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
        key: "digital_signal_processing",
        name: "Digital Signal Processing",
        fields: [
            { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
            { id: "LE", label: "Lab Experiments Average (LE)", min: 0, max: 100 },
            { id: "LV", label: "Lab Viva Average (LV)", min: 0, max: 100 },
            { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
            { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
            { id: "F", label: "Final Exam Score", min: 0, max: 100 }
        ]
    },
    {
      key: "sensors_applications",
      name: "Sensors and Applications",
      fields: [
        { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
        key: "digital_system_design",
        name: "Digital System Design",
        fields: [
            { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
            { id: "GRPA", label: "Programming Assignments Avg (GRPA)", min: 0, max: 100 },
            { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
            { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
            { id: "F", label: "Final Exam Score", min: 0, max: 100 }
        ]
    },
    {
        key: "control_engineering",
        name: "Control Engineering",
        fields: [
            { id: "GAA", label: "Assignment Average (GAA)", min: 0, max: 100 },
            { id: "Qz1", label: "Quiz 1 Score", min: 0, max: 100 },
            { id: "Qz2", label: "Quiz 2 Score", min: 0, max: 100 },
            { id: "D", label: "Design Assignment", min: 0, max: 100 },
            { id: "F", label: "Final Exam Score", min: 0, max: 100 }
        ]
    }
  ],
  degree: [
    {
      key: "software_testing",
      name: "Software Testing",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "software_engineering",
      name: "Software Engineering",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "GP1", label: "Group Project 1", min: 0, max: 100 },
        { id: "GP2", label: "Group Project 2", min: 0, max: 100 },
        { id: "PP", label: "Project Presentation", min: 0, max: 100 },
        { id: "CP", label: "Course Participation", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "deep_learning",
      name: "Deep Learning",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "Bonus", label: "Bonus (Programming Activities, max 5)", min: 0, max: 5 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "ai_search",
      name: "AI: Search Methods for Problem Solving",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "Bonus", label: "Bonus (Programming Assignment, max 5)", min: 0, max: 5 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "strat_prof_growth",
      name: "Strategies for Professional Growth",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "GP", label: "Group Project (GP)", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "int_bigdata",
      name: "Introduction to Big Data",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "c_prog",
      name: "Programming in C",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "GAAP", label: "Programming Assign. Avg (Best 7/8, GAAP)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
        { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "deep_learning_cv",
      name: "Deep Learning for Computer Vision (CV)",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "managerial_economics",
      name: "Managerial Economics",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "algo_thinking_bio",
      name: "Algorithmic Thinking in Bioinformatics",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "large_language_models",
      name: "Large Language Models",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "speech_technology",
      name: "Speech Technology",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "design_thinking_app",
      name: "Design Thinking for Data-Driven App Development",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "market_research",
      name: "Market Research",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "statistical_computing",
      name: "Statistical Computing",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "advanced_algorithms",
      name: "Advanced Algorithms",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "game_theory_strategy",
      name: "Game Theory and Strategy",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "computer_system_design",
      name: "Computer System Design",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "deep_learning_practice",
      name: "Deep Learning Practice",
      fields: [
        { id: "GA", label: "Assignment Avg (Best 5/7, GA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "Qz3", label: "Quiz 3", min: 0, max: 100 },
        { id: "NPPE1", label: "NPPE 1", min: 0, max: 100 },
        { id: "NPPE2", label: "NPPE 2", min: 0, max: 100 },
        { id: "NPPE3", label: "NPPE 3", min: 0, max: 100 }
      ]
    },
    {
      key: "math_foundations_genai",
      name: "Mathematical Foundations of Generative AI",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "algorithms_data_science",
      name: "Algorithms for Data Science (ADS)",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "mlops",
      name: "MLOPS",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    }
  ]
};
