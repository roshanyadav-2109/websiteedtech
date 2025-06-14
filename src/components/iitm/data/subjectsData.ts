
import { Subject } from "../types/gradeTypes";

export const ALL_SUBJECTS: Record<string, Subject[]> = {
  foundation: [
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
  diploma: [
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
      key: "maths3",
      name: "Mathematics 3",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
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
      key: "machinelearning_practice",
      name: "Machine Learning Practice",
      fields: [
        { id: "GA", label: "Assignment Avg (Best 5/7, GA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "Qz3", label: "Quiz 3", min: 0, max: 100 },
        { id: "NPPE1", label: "NPPE 1", min: 0, max: 100 },
        { id: "NPPE2", label: "NPPE 2", min: 0, max: 100 },
        { id: "NPPE3", label: "NPPE 3", min: 0, max: 100 },
        { id: "F", label: "Final Exam Score", min: 0, max: 100 }
      ]
    },
    {
      key: "statistics3",
      name: "Statistics 3",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
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
      key: "mlf_practice",
      name: "Machine Learning Foundations Practice",
      fields: [
        { id: "GA", label: "Assignment Avg (Best 5/7, GA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
        { id: "Qz3", label: "Quiz 3", min: 0, max: 100 },
        { id: "NPPE1", label: "NPPE 1", min: 0, max: 100 },
        { id: "NPPE2", label: "NPPE 2", min: 0, max: 100 },
        { id: "NPPE3", label: "NPPE 3", min: 0, max: 100 },
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
      key: "tools_techniques",
      name: "Tools and Techniques for Data Science",
      fields: [
        { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
        { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
        { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
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
    }
  ]
};
