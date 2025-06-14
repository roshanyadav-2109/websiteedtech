import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Award } from "lucide-react";

// All subjects across all levels
const ALL_SUBJECTS = {
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

// Grade calculation functions for each level
function calculateFoundationGrade(subjectKey: string, values: Record<string, number>): number {
  const { GAA = 0, Qz1 = 0, Qz2 = 0, F = 0, Bonus = 0, GAAP = 0, OPPE1 = 0, OPPE2 = 0 } = values;
  
  switch (subjectKey) {
    case "maths1": {
      const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(part1, part2);
    }
    case "english1": {
      const part1 = 0.1 * GAA + 0.5 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(part1, part2);
    }
    case "statistics1": {
      const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2) + Bonus;
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2 + Bonus;
      return Math.max(part1, part2);
    }
    case "python":
      return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;
    default:
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
  }
}

function calculateDiplomaGrade(subjectKey: string, values: Record<string, number>): number {
  const { GAA = 0, GA = 0, Qz1 = 0, Qz2 = 0, Qz3 = 0, F = 0, GAAP = 0, OPPE1 = 0, OPPE2 = 0, NPPE1 = 0, NPPE2 = 0, NPPE3 = 0 } = values;
  
  switch (subjectKey) {
    case "appdev1":
    case "appdev2":
      return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;
    case "machinelearning_practice":
    case "mlf_practice": {
      const nppeScores = [NPPE1, NPPE2, NPPE3].sort((a, b) => b - a);
      return 0.2 * GA + 0.15 * Qz1 + 0.15 * Qz2 + 0.15 * Qz3 + 0.15 * nppeScores[0] + 0.1 * nppeScores[1] + 0.1 * nppeScores[2];
    }
    default:
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
  }
}

function calculateDegreeGrade(subjectKey: string, values: Record<string, number>): number {
  const { GAA = 0, Qz1 = 0, Qz2 = 0, F = 0, Bonus = 0, GP1 = 0, GP2 = 0, PP = 0, CP = 0, GP = 0, OPPE1 = 0, OPPE2 = 0, GAAP = 0 } = values;
  
  switch (subjectKey) {
    case "software_engineering":
      return 0.05 * GAA + 0.2 * Qz2 + 0.4 * F + 0.1 * GP1 + 0.1 * GP2 + 0.1 * PP + 0.05 * CP;
    case "deep_learning":
    case "ai_search":
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2 + Bonus;
    case "strat_prof_growth":
      return 0.15 * GAA + 0.25 * GP + 0.25 * Qz2 + 0.35 * F;
    case "int_bigdata":
      return 0.1 * GAA + 0.3 * F + 0.2 * OPPE1 + 0.4 * OPPE2;
    case "c_prog":
      return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;
    default:
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
  }
}

function getGradeLetter(score: number): string {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  if (score >= 40) return "Pass";
  return "Fail";
}

function getGradePoints(score: number): number {
  if (score >= 90) return 10;
  if (score >= 80) return 9;
  if (score >= 70) return 8;
  if (score >= 60) return 7;
  if (score >= 50) return 6;
  if (score >= 40) return 5;
  return 0;
}

interface GradeCalculatorProps {
  level: "foundation" | "diploma" | "degree";
}

export default function GradeCalculator({ level }: GradeCalculatorProps) {
  const [subject, setSubject] = useState("");
  const [values, setValues] = useState<Record<string, string>>({});
  const [calculatedGrade, setCalculatedGrade] = useState<{
    score: number;
    letter: string;
    points: number;
  } | null>(null);

  const subjects = ALL_SUBJECTS[level];
  const currentSubject = subjects.find(s => s.key === subject);

  const handleSubjectChange = (newSubject: string) => {
    setSubject(newSubject);
    setValues({});
    setCalculatedGrade(null);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    setValues(prev => ({ ...prev, [fieldId]: value }));
  };

  const calculateGrade = () => {
    if (!currentSubject) return;

    const numericValues: Record<string, number> = {};
    currentSubject.fields.forEach(field => {
      numericValues[field.id] = parseFloat(values[field.id]) || 0;
    });

    let totalScore = 0;
    switch (level) {
      case "foundation":
        totalScore = calculateFoundationGrade(subject, numericValues);
        break;
      case "diploma":
        totalScore = calculateDiplomaGrade(subject, numericValues);
        break;
      case "degree":
        totalScore = calculateDegreeGrade(subject, numericValues);
        break;
    }

    const clampedScore = Math.min(Math.max(totalScore, 0), 100);
    setCalculatedGrade({
      score: Math.round(clampedScore * 100) / 100,
      letter: getGradeLetter(clampedScore),
      points: getGradePoints(clampedScore)
    });
  };

  const resetCalculator = () => {
    setValues({});
    setCalculatedGrade(null);
  };

  return (
    <div className="space-y-6">
      {/* Subject Selection */}
      <div>
        <Label>Subject</Label>
        <Select value={subject} onValueChange={handleSubjectChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map(subj => (
              <SelectItem key={subj.key} value={subj.key}>
                {subj.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Input Fields */}
      {currentSubject && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentSubject.fields.map(field => (
            <div key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                type="number"
                min={field.min}
                max={field.max}
                value={values[field.id] || ""}
                onChange={(e) => handleInputChange(field.id, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      {currentSubject && (
        <div className="flex gap-2">
          <Button onClick={calculateGrade} className="bg-green-600 hover:bg-green-700">
            Calculate Grade
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      )}

      {/* Results */}
      {calculatedGrade && (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200">
          <h3 className="text-lg font-bold mb-4 text-green-800">Your Grade Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{calculatedGrade.score}</div>
              <div className="text-sm text-gray-600">Total Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{calculatedGrade.letter}</div>
              <div className="text-sm text-gray-600">Grade Letter</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{calculatedGrade.points}</div>
              <div className="text-sm text-gray-600">Grade Points</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
