import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COURSES = [
  {
    key: "ml_foundations",
    name: "Machine Learning Foundations",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
      { id: "F", label: "Final Exam Score (F)", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + max(0.6×F + 0.2×max(Qz1, Qz2), 0.4×F + 0.2×Qz1 + 0.3×Qz2)",
    eligibility: [
      "Assignment average (Best 5/7) ≥ 40/100",
      "Attend at least one quiz"
    ],
    grade_criteria: [
      "Attended end sem exam"
    ]
  },
  {
    key: "ml_techniques",
    name: "Machine Learning Techniques",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
      { id: "F", label: "Final Exam Score (F)", min: 0, max: 100 },
      { id: "progBonus", label: "Bonus for Programming Submission (3 or 0)", min: 0, max: 3 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + Max(0.25×Qz1 + 0.25×Qz2, 0.4×max(Qz1, Qz2)) + 3 Bonus if assignment avg ≥ 40",
    eligibility: [
      "Assignment average (Best 5/7) ≥ 40/100",
      "Attend at least one quiz"
    ],
    grade_criteria: [
      "Attended end sem exam"
    ]
  },
  {
    key: "ml_practice",
    name: "Machine Learning Practice",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "OPPE1", label: "Programming Exam 1 (OPPE1)", min: 0, max: 100 },
      { id: "OPPE2", label: "Programming Exam 2 (OPPE2)", min: 0, max: 100 },
      { id: "KA", label: "Kaggle Assignment (KA)", min: 0, max: 100 },
      { id: "F", label: "Final Exam Score (F)", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.30×F + 0.20×OPPE1 + 0.20×OPPE2 + 0.20×KA",
    eligibility: [
      "Assignment average (Best 5/7) ≥ 40/100"
    ],
    grade_criteria: [
      "Attended end sem exam",
      "At least one programming exam ≥ 40"
    ]
  },
  {
    key: "bdm",
    name: "Business Data Management",
    fields: [
      { id: "GA", label: "Assignment Avg (Best 2/3 for eligibility, Best 3/4 for grading)", min: 0, max: 100 },
      { id: "Q2", label: "Quiz 2 (Q2)", min: 0, max: 100 },
      { id: "ROE", label: "Remote Online Exam (ROE)", min: 0, max: 100 },
      { id: "F", label: "Final Exam Score (F)", min: 0, max: 100 }
    ],
    formula: "T = 0.3×GA + 0.20×Q2 + 0.2×ROE + 0.3×F",
    eligibility: [
      "Submitted at least one of (GA1, GA2)",
      "Best 2/3 of GA avg ≥ 40/100"
    ],
    grade_criteria: [
      "Attended end term exam",
      "Best 3/4 GA avg ≥ 30"
    ]
  },
  {
    key: "ba",
    name: "Business Analytics",
    fields: [
      { id: "Asgn1", label: "Assignment 1", min: 0, max: 100 },
      { id: "Asgn2", label: "Assignment 2", min: 0, max: 100 },
      { id: "Asgn3", label: "Assignment 3", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 (Qz1) (out of 20)", min: 0, max: 20 },
      { id: "Qz2", label: "Quiz 2 (Qz2) (out of 20)", min: 0, max: 20 },
      { id: "F", label: "Final Exam (out of 40)", min: 0, max: 40 }
    ],
    formula: "Quiz(20) + Assignments(40) + End Term(40); Quiz = 0.7×Max(Qz1,Qz2) + 0.3×Min(Qz1,Qz2); Assign = Best 2 of 3 out of 20 each; F = End term(score out of 40)",
    eligibility: [
      "Submitted at least one of (Asgn1, Asgn2)",
      "Quiz score (weighted) ≥ 7/20"
    ],
    grade_criteria: [
      "Attended end term exam",
      "End term score F ≥ 10/40"
    ]
  },
  {
    key: "tools",
    name: "Tools in Data Science",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 4/5, GAA)", min: 0, max: 100 },
      { id: "ROE1", label: "Remote Online Exam 1 (ROE1)", min: 0, max: 100 },
      { id: "P1", label: "Programming 1 (P1)", min: 0, max: 100 },
      { id: "P2", label: "Programming 2 (P2)", min: 0, max: 100 },
      { id: "F", label: "Final Exam Score (F)", min: 0, max: 100 }
    ],
    formula: "T = 0.15×GAA + 0.2×ROE1 + 0.2×P1 + 0.2×P2 + 0.25×F",
    eligibility: [
      "Assignment average (Best 4/5) ≥ 40/100"
    ],
    grade_criteria: [
      "Attended end-term exam"
    ]
  }
];

const GRADE_LEVELS = [
  { letter: "Pass", min: 40 },
  { letter: "D", min: 50 },
  { letter: "C", min: 60 },
  { letter: "B", min: 70 },
  { letter: "A", min: 80 },
  { letter: "S", min: 90 },
];

function parseNumOrZero(val: string | number) {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

// Given courseKey, form values (object without F) and F, calculate T as per rules
const calcScore = (courseKey: string, values: Record<string, number>, F: number) => {
  switch (courseKey) {
    case "ml_foundations": {
      const { GAA = 0, Qz1 = 0, Qz2 = 0 } = values;
      const p1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
      const p2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(p1, p2);
    }
    case "ml_techniques": {
      const { GAA = 0, Qz1 = 0, Qz2 = 0, progBonus = 0 } = values;
      const q_part = Math.max(0.25 * Qz1 + 0.25 * Qz2, 0.4 * Math.max(Qz1, Qz2));
      const bonus = GAA >= 40 ? progBonus : 0;
      return 0.1 * GAA + 0.4 * F + q_part + bonus;
    }
    case "ml_practice": {
      const { GAA = 0, OPPE1 = 0, OPPE2 = 0, KA = 0 } = values;
      return 0.1 * GAA + 0.3 * F + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.2 * KA;
    }
    case "bdm": {
      const { GA = 0, Q2 = 0, ROE = 0 } = values;
      return 0.3 * GA + 0.2 * Q2 + 0.2 * ROE + 0.3 * F;
    }
    case "ba": {
      // Qz1, Qz2 out of 20; Assignments: Best 2 of 3 out of 20 each; F: out of 40
      const { Asgn1 = 0, Asgn2 = 0, Asgn3 = 0, Qz1 = 0, Qz2 = 0 } = values;
      const quiz = 0.7 * Math.max(Qz1, Qz2) + 0.3 * Math.min(Qz1, Qz2);
      const assignments = [Asgn1, Asgn2, Asgn3].sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a + b, 0);
      // assignments sum is out of 40, quiz out of 20, F is out of 40
      return (assignments) + quiz + F;
    }
    case "tools": {
      const { GAA = 0, ROE1 = 0, P1 = 0, P2 = 0 } = values;
      return 0.15 * GAA + 0.2 * ROE1 + 0.2 * P1 + 0.2 * P2 + 0.25 * F;
    }
    default:
      return 0;
  }
};

// For a given course, form values (excluding F), and target T, return minimal integer F [0-100] required to achieve T, OR null if not possible
function requiredF(courseKey: string, values: Record<string, number>, targetT: number): number | null {
  // Search F from 0 to 100, stop at first F where calcScore() >= targetT
  const scoreMax = courseKey === "ba" ? 40 : 100;
  for (let F = 0; F <= scoreMax; F++) {
    const score = calcScore(courseKey, values, F);
    if (score >= targetT) return F;
  }
  return null;
}

// Eligibility Check (all except F, which is what we predict)
const getEligibility = (courseKey: string, values: Record<string, number>): [boolean, string] => {
  switch (courseKey) {
    case "ml_foundations": {
      const { GAA = 0, Qz1 = 0, Qz2 = 0 } = values;
      if (GAA < 40) return [false, "Assignment average must be at least 40/100."];
      if (Qz1 <= 0 && Qz2 <= 0) return [false, "At least one quiz score must be entered (>0)."];
      return [true, "Eligible for Final Exam"];
    }
    case "ml_techniques": {
      const { GAA = 0, Qz1 = 0, Qz2 = 0 } = values;
      if (GAA < 40) return [false, "Assignment average must be at least 40/100."];
      if (Qz1 <= 0 && Qz2 <= 0) return [false, "At least one quiz score must be entered (>0)."];
      return [true, "Eligible for Final Exam"];
    }
    case "ml_practice": {
      const { GAA = 0 } = values;
      if (GAA < 40) return [false, "Assignment average must be at least 40/100."];
      return [true, "Eligible for Final Exam"];
    }
    case "bdm": {
      const { GA = 0 } = values;
      if (GA < 40) return [false, "Best 2 out of 3 GA average must be at least 40/100."];
      return [true, "Eligible for Final Exam"];
    }
    case "ba": {
      const { Asgn1 = 0, Asgn2 = 0, Qz1 = 0, Qz2 = 0 } = values;
      if (Asgn1 === 0 && Asgn2 === 0) return [false, "At least one of Assignment 1 or 2 must be submitted."];
      const quizScore = 0.7 * Math.max(Qz1, Qz2) + 0.3 * Math.min(Qz1, Qz2);
      if (quizScore < 7) return [false, "Weighted Quiz score must be at least 7/20."];
      return [true, "Eligible for Final Exam"];
    }
    case "tools": {
      const { GAA = 0 } = values;
      if (GAA < 40) return [false, "Assignment average (best 4/5) must be at least 40/100."];
      return [true, "Eligible for Final Exam"];
    }
    default:
      return [true, "Eligible"];
  }
};

export default function DiplomaMarksPredictor() {
  const [course, setCourse] = React.useState(COURSES[0].key);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const subjectInfo = COURSES.find(c => c.key === course);

  // Compose values for all form fields except F (which we are predicting)
  const values: Record<string, number> = {};
  (subjectInfo?.fields || []).forEach(f => {
    if (f.id !== "F") values[f.id] = parseNumOrZero(form[f.id]);
  });

  // Eligibility for final exam
  const [eligible, eligMsg] = getEligibility(course, values);

  // For showing in table, calculate required F for each grade and pass
  const allGrades = [
    { letter: "S", min: 90 },
    { letter: "A", min: 80 },
    { letter: "B", min: 70 },
    { letter: "C", min: 60 },
    { letter: "D", min: 50 },
    { letter: "Pass", min: 40 },
  ];
  // Business Analytics subject: F out of 40
  const Fmax = course === "ba" ? 40 : 100;

  // Compute required F for each grade, in a row: [{letter, requiredF}]
  const requiredFTable = allGrades.map(g => ({
    letter: g.letter,
    min: g.min,
    requiredF: requiredF(course, values, g.min),
  }));

  // Extra course grade eligibility info (not Pass/Fail; for higher grade award)
  let courseGradeInfo = "";
  if (course === "ml_practice") {
    const { OPPE1 = 0, OPPE2 = 0 } = values;
    if (OPPE1 < 40 && OPPE2 < 40) courseGradeInfo = "Need at least one programming exam score ≥ 40/100 for course grade.";
    else courseGradeInfo = "Eligible for course grade (if end semester attended).";
  } else if (course === "bdm") {
    const { GA = 0 } = values;
    if (GA < 30) courseGradeInfo = "Best 3/4 GA average must be at least 30 for course grade.";
    else courseGradeInfo = "Eligible for course grade (if end semester attended).";
  } else if (course === "ba") {
    // End term score in F required >= 10/40, but we report required F for each grade as per the table
    // Just a tip to the user
    courseGradeInfo = "Note: Need at least 10/40 in End term exam for course grade.";
  } else {
    courseGradeInfo = "Eligible for course grade (if end semester attended).";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Diploma Final Exam Score Predictor</CardTitle>
        <div className="text-xs mt-2 text-gray-600">{subjectInfo?.formula}</div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Subject selector */}
          <div>
            <Label>Subject</Label>
            <Select value={course} onValueChange={v => { setCourse(v); setForm({}); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COURSES.map(c => (
                  <SelectItem key={c.key} value={c.key}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Inputs except F */}
          {(subjectInfo?.fields || [])
            .filter(f => f.id !== "F")
            .map(f => (
              <div key={f.id}>
                <Label>{f.label}</Label>
                <Input
                  type="number"
                  min={f.min}
                  max={f.max}
                  value={form[f.id] ?? ""}
                  placeholder="0"
                  onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                  inputMode="numeric"
                />
              </div>
            ))}
        </div>
        <div className={`p-3 rounded mb-3 ${eligible ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}`}>{eligMsg}</div>
        <div className="mb-3">
          <div className="font-semibold mb-2">Minimum Final Exam (F) score required for each grade (if eligible):</div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border bg-white rounded shadow">
              <thead>
                <tr className="bg-indigo-100">
                  <th className="py-2 px-3 text-left">Grade</th>
                  <th className="py-2 px-3 text-left">Minimum Total Score</th>
                  <th className="py-2 px-3 text-left">Required F (out of {Fmax})</th>
                </tr>
              </thead>
              <tbody>
                {requiredFTable.map(row => (
                  <tr key={row.letter} className="border-t">
                    <td className="py-2 px-3 font-bold">{row.letter}</td>
                    <td className="py-2 px-3">{row.min}</td>
                    <td className="py-2 px-3">
                      {row.requiredF == null ? <span className="text-red-600 font-semibold">Impossible</span> : `${row.requiredF} /${Fmax}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-xs mt-2 text-gray-500">
            Table shows the <b>minimum Final Exam (F) marks</b> needed to achieve each grade, according to current marks entered above. "Impossible" means it's not attainable.
          </div>
        </div>
        <div className="p-3 rounded bg-indigo-50 text-indigo-800 mb-3">{courseGradeInfo}</div>
        <div className="text-xs text-gray-500">Enter your scores to see the predicted F needed for each grade. Meets official IITM Diploma (DS) calculation rules (2025).</div>
      </CardContent>
    </Card>
  );
}
