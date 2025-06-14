
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type SubjectKey =
  | "maths1"
  | "english1"
  | "statistics1"
  | "english2"
  | "statistics2"
  | "computational"
  | "python"
  | "maths2";

const SUBJECTS: {
  key: SubjectKey;
  name: string;
  formula: string;
  inputFields: {
    id: string;
    label: string;
    min: number;
    max: number;
    type?: string;
  }[];
}[] = [
  {
    key: "maths1",
    name: "Mathematics 1",
    formula: "T = 0.1 × GAA + max(0.6 × F + 0.2 × max(Qz1, Qz2), 0.4 × F + 0.2 × Qz1 + 0.3 × Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "english1",
    name: "English 1",
    formula: "T = 0.1 × GAA + max(0.5 × F + 0.2 × max(Qz1, Qz2), 0.4 × F + 0.2 × Qz1 + 0.3 × Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "statistics1",
    name: "Statistics 1",
    formula: "T = 0.1 × GAA + max(0.6 × F + 0.2 × max(Qz1, Qz2), . . .) + Bonus",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
      { id: "Bonus", label: "Bonus Marks (0-5)", min: 0, max: 5 },
    ],
  },
  {
    key: "english2",
    name: "English 2",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "statistics2",
    name: "Statistics 2",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "computational",
    name: "Computational Thinking",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "python",
    name: "Programming in Python",
    formula: "T = 0.05 × GAA (objective) + 0.1 × GAAP + 0.15 × Qz1 + 0.2 × OPPE1 + 0.2 × OPPE2 + 0.3 × F",
    inputFields: [
      { id: "GAA", label: "GAA (Objective)", min: 0, max: 100 },
      { id: "GAAP", label: "GAAP (Programming)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "OPPE1", label: "OPPE1 Score", min: 0, max: 100 },
      { id: "OPPE2", label: "OPPE2 Score", min: 0, max: 100 },
    ],
  },
  {
    key: "maths2",
    name: "Mathematics 2",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
];

// Grade thresholds
const GRADES: [string, number][] = [
  ["Pass", 40],
  ["D", 50],
  ["C", 60],
  ["B", 70],
  ["A", 80],
  ["S", 90],
];

// Calculation logic
function calcRequiredF(subjKey: SubjectKey, inputs: Record<string, number>, targetT: number): number|null {
  // Clamp helpers
  const clamp = (x: number, minv = 0, maxv = 100) => Math.max(minv, Math.min(maxv, x));
  // Convert undefined/NaN/null to 0 and clamp
  const n = (x: unknown, minv=0, maxv=100) => clamp(typeof x === "number" && !isNaN(x) ? x : 0, minv, maxv);

  switch (subjKey) {
    case "maths1":
      {
        const GAA = n(inputs.GAA), Qz1 = n(inputs.Qz1), Qz2 = n(inputs.Qz2);
        for(let F=0; F<=100; F++) {
          const p1 = 0.1*GAA + 0.6*F + 0.2*Math.max(Qz1, Qz2);
          const p2 = 0.1*GAA + 0.4*F + 0.2*Qz1 + 0.3*Qz2;
          if(Math.max(p1,p2) >= targetT) return F;
        }
      }
      return null;
    case "english1":
      {
        const GAA = n(inputs.GAA), Qz1 = n(inputs.Qz1), Qz2 = n(inputs.Qz2);
        for(let F=0; F<=100; F++) {
          const p1 = 0.1*GAA + 0.5*F + 0.2*Math.max(Qz1, Qz2);
          const p2 = 0.1*GAA + 0.4*F + 0.2*Qz1 + 0.3*Qz2;
          if(Math.max(p1,p2) >= targetT) return F;
        }
      }
      return null;
    case "statistics1":
      {
        const GAA = n(inputs.GAA), Qz1 = n(inputs.Qz1), Qz2 = n(inputs.Qz2), Bonus = n(inputs.Bonus,0,5);
        for(let F=0; F<=100; F++) {
          const p1 = 0.1*GAA + 0.6*F + 0.2*Math.max(Qz1,Qz2) + Bonus;
          const p2 = 0.1*GAA + 0.4*F + 0.2*Qz1 + 0.3*Qz2 + Bonus;
          if(Math.max(p1,p2) >= targetT) return F;
        }
      }
      return null;
    case "python":
      {
        const GAA = n(inputs.GAA), GAAP = n(inputs.GAAP), Qz1 = n(inputs.Qz1), OPPE1 = n(inputs.OPPE1), OPPE2 = n(inputs.OPPE2);
        const reqF = (targetT - 0.05*GAA - 0.1*GAAP - 0.15*Qz1 - 0.2*OPPE1 - 0.2*OPPE2)/0.3;
        if (reqF <= 100 && reqF >= 0) return reqF;
        return null;
      }
    default:
      {
        // Formula: 0.1*GAA + 0.4*F + 0.25*Qz1 + 0.25*Qz2
        const GAA = n(inputs.GAA), Qz1 = n(inputs.Qz1), Qz2 = n(inputs.Qz2);
        const reqF = (targetT - 0.1*GAA - 0.25*Qz1 - 0.25*Qz2)/0.4;
        if (reqF <= 100 && reqF >= 0) return reqF;
        return null;
      }
  }
}

// Eligibility check
function checkEligibility(subjKey: SubjectKey, inputs: Record<string, number>): string | null {
  switch (subjKey) {
    case "python":
      if ((inputs.OPPE1 ?? 0) < 40 && (inputs.OPPE2 ?? 0) < 40)
        return "Eligibility: At least one of OPPE1 or OPPE2 must be ≥ 40.";
      return null;
    default:
      // All other: must have Qz1 > 0 or Qz2 > 0
      if((inputs.Qz1 ?? 0) === 0 && (inputs.Qz2 ?? 0) === 0)
        return "Eligibility: At least one quiz (Qz1 or Qz2) must be attempted (>0).";
      return null;
  }
}

const initialInputValues: Record<string, number> = {
  GAA: 0, Qz1: 0, Qz2: 0, Bonus: 0, GAAP: 0, OPPE1: 0, OPPE2: 0,
};

export default function FoundationMarksPredictor() {
  const [subjectKey, setSubjectKey] = useState<SubjectKey>("maths1");
  const [inputs, setInputs] = useState<Record<string, number>>(initialInputValues);

  // Reset inputs when changing subject
  const subjectObj = SUBJECTS.find(s => s.key === subjectKey)!;

  // Handle input changes (clamp and parse)
  const handleInput = (id: string, val: string) => {
    let v = val === "" ? 0 : Number(val);
    if (isNaN(v)) v = 0;
    const field = subjectObj.inputFields.find(f => f.id === id);
    if (field) {
      if (id === "Bonus")
        v = Math.max(field.min, Math.min(field.max, v));
      else
        v = Math.max(field.min, Math.min(field.max, v));
    }
    setInputs(prev => ({ ...prev, [id]: v }));
  };

  // For eligibility/error display
  const eligibility = checkEligibility(subjectKey, inputs);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Foundation Subject Marks Predictor</CardTitle>
        <div className="text-xs mt-2 text-gray-500">{subjectObj.formula}</div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Subject</Label>
            <Select value={subjectKey} onValueChange={val => {
              setSubjectKey(val as SubjectKey);
              setInputs(initialInputValues);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SUBJECTS.map(subj => (
                  <SelectItem key={subj.key} value={subj.key}>{subj.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {subjectObj.inputFields.map(f => (
            <div key={f.id}>
              <Label>{f.label}</Label>
              <Input
                type="number"
                min={f.min}
                max={f.max}
                value={inputs[f.id] ?? ""}
                placeholder="0"
                onChange={e => handleInput(f.id, e.target.value)}
              />
            </div>
          ))}
        </div>
        {eligibility ? (
          <div className="p-3 rounded bg-yellow-100 text-yellow-900 font-medium mb-4">
            {eligibility}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-center border-separate border-spacing-x-2">
              <thead>
                <tr className="bg-royal/10">
                  <th className="py-2">Grade</th>
                  <th className="py-2">Target Score (T)</th>
                  <th className="py-2">Required Final Exam Score (F)</th>
                </tr>
              </thead>
              <tbody>
                {GRADES.map(([grade, T]) => {
                  const reqF = calcRequiredF(subjectKey, inputs, T);
                  return (
                    <tr key={grade} className="">
                      <td className="font-semibold">{grade}</td>
                      <td>{T}</td>
                      <td>
                        {reqF === null
                          ? <span className="text-red-700">Not possible</span>
                          : <span className="text-royal font-bold">{reqF.toFixed(2)}</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-2 text-xs text-gray-500">
          Input '0' for missing/absent quizzes. Scores are clamped to allowed ranges.<br/>
          Assignment eligibility is assumed. Eligibility is automatically checked per subject.
        </div>
      </CardContent>
    </Card>
  );
}
