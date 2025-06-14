import React, { useState, useMemo } from "react";
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
    formula:
      "T = 0.15 × GAA (Assignments: Objective + Programming avg) + 0.15 × Qz1 + 0.2 × OPPE1 + 0.2 × OPPE2 + 0.3 × F",
    inputFields: [
      {
        id: "GAA",
        label: "Assignment Avg (GAA: Objective & Programming)",
        min: 0,
        max: 100,
      },
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
function calcRequiredF(
  subjKey: SubjectKey,
  inputs: Record<string, number>,
  targetT: number
): number | null {
  const clamp = (x: number, minv = 0, maxv = 100) =>
    Math.max(minv, Math.min(maxv, x));
  const n = (x: unknown, minv = 0, maxv = 100) =>
    clamp(typeof x === "number" && !isNaN(x) ? x : 0, minv, maxv);

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
    case "python": {
      // Now, GAA is the combined/average of objective and programming, both entered as one number
      const GAA = n(inputs.GAA); // Treated as already averaged
      const Qz1 = n(inputs.Qz1);
      const OPPE1 = n(inputs.OPPE1);
      const OPPE2 = n(inputs.OPPE2);
      // 0.15 * GAA + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F = targetT
      const reqF =
        (targetT - 0.15 * GAA - 0.15 * Qz1 - 0.2 * OPPE1 - 0.2 * OPPE2) / 0.3;
      if (reqF <= 100 && reqF >= 0) return reqF;
      return null;
    }
    default: {
      // For most, 0.1*GAA + 0.4*F + 0.25*Qz1 + 0.25*Qz2
      const GAA = n(inputs.GAA),
        Qz1 = n(inputs.Qz1),
        Qz2 = n(inputs.Qz2);
      const reqF = (targetT - 0.1 * GAA - 0.25 * Qz1 - 0.25 * Qz2) / 0.4;
      if (reqF <= 100 && reqF >= 0) return reqF;
      return null;
    }
  }
}

// Eligibility check -- enhanced for Python "Pass theory but not OPPE"
function checkEligibility(subjKey: SubjectKey, inputs: Record<string, number>, theoryPassedT?: number): string | null {
  switch (subjKey) {
    case "python":
      const oppe1 = inputs.OPPE1 ?? 0;
      const oppe2 = inputs.OPPE2 ?? 0;
      // If theoryPassedT is specified, and we pass theory but not OPPE, return special message
      if (typeof theoryPassedT === "number") {
        if (oppe1 < 40 && oppe2 < 40) {
          // User's calculated T passes, but OPPE does not
          return "Passed theory, but did not clear OPPE eligibility (need OPPE1 or OPPE2 ≥ 40).";
        }
      } else {
        if (oppe1 < 40 && oppe2 < 40)
          return "Eligibility: At least one of OPPE1 or OPPE2 must be ≥ 40.";
      }
      return null;
    default:
      // All other: must have Qz1 > 0 or Qz2 > 0
      if((inputs.Qz1 ?? 0) === 0 && (inputs.Qz2 ?? 0) === 0)
        return "Eligibility: At least one quiz (Qz1 or Qz2) must be attempted (>0).";
      return null;
  }
}

// Modified: treat blank input as undefined, and allow user to freely type value until submission/blur
const initialInputValues: Record<string, string> = {
  GAA: "", Qz1: "", Qz2: "", Bonus: "", GAAP: "", OPPE1: "", OPPE2: "",
};

export default function FoundationMarksPredictor() {
  const [subjectKey, setSubjectKey] = useState<SubjectKey>("maths1");
  const [inputs, setInputs] = useState<Record<string, string>>(initialInputValues);
  const subjectObj = SUBJECTS.find(s => s.key === subjectKey)!;

  // Utility to parse and clamp for calculations only
  const parseInputNumber = (val: string, min: number, max: number): number =>
    val === "" ? 0 : Math.max(min, Math.min(max, Number(val)));

  // Helper for assignment avg
  function getGAAValue(subjectKey: SubjectKey, sinputs: Record<string, string>) {
    const v = sinputs.GAA === "" ? 0 : Number(sinputs.GAA);
    return isNaN(v) ? 0 : v;
  }

  // CALCULATION LOGIC
  // Only use fields present in subject
  const numericInputs: Record<string, number> = {};
  subjectObj.inputFields.forEach(field => {
    numericInputs[field.id] = parseInputNumber(inputs[field.id] ?? "", field.min, field.max);
  });

  // Eligibility logic
  let eligibility: string | null = null;
  const GAA_val = getGAAValue(subjectKey, inputs);
  if (GAA_val < 40) {
    eligibility =
      "Eligibility: Assignment average must be at least 40/100 to appear for end term.";
  } else {
    eligibility = checkEligibility(subjectKey, numericInputs);
  }

  // Python special: check if theory mark passes but OPPE fails
  let passTheoryButNotOppeMsg: string | null = null;
  if (subjectKey === "python" && GAA_val >= 40) {
    // "Theory" here = all but F, using merged GAA
    const userTheoryScore =
      0.15 * numericInputs.GAA +
      0.15 * numericInputs.Qz1 +
      0.2 * numericInputs.OPPE1 +
      0.2 * numericInputs.OPPE2;
    // If theory mark passes but both OPPE <40, show message
    if (
      userTheoryScore >= 40 &&
      numericInputs.OPPE1 < 40 &&
      numericInputs.OPPE2 < 40
    ) {
      passTheoryButNotOppeMsg =
        "You passed the theory component but did not clear OPPE eligibility (at least one of OPPE1 or OPPE2 must be ≥ 40 to pass the subject).";
    }
  }

  // Input update
  const handleInput = (id: string, val: string) => {
    // Only allow numbers (including 0) and empty string
    if (/^(\d{0,3})$/.test(val) || val === "") {
      setInputs(prev => ({ ...prev, [id]: val }));
    }
  };

  // Required F for each grade
  const requiredFs = useMemo(() => {
    // Only show if GAA eligibility and all non-quiz eligibility passed
    if (GAA_val < 40) return null;
    if (checkEligibility(subjectKey, numericInputs)) return null;
    if (subjectKey === "python" && numericInputs.OPPE1 < 40 && numericInputs.OPPE2 < 40) {
      return null;
    }
    const out: { grade: string; mark: number | null }[] = [];
    for (const [grade, threshold] of GRADES) {
      const val = calcRequiredF(subjectKey, numericInputs, threshold);
      out.push({
        grade,
        mark:
          val === null || val > 100
            ? null
            : Math.ceil(val * 100) / 100,
      });
    }
    return out;
  }, [subjectKey, numericInputs, GAA_val]);

  // ALSO calculate specific "required F" just for pass, for old logic
  const requiredFMark = useMemo(() => {
    if (GAA_val < 40) return null;
    if (checkEligibility(subjectKey, numericInputs)) return null;
    if (
      subjectKey === "python" &&
      numericInputs.OPPE1 < 40 &&
      numericInputs.OPPE2 < 40
    ) {
      return null;
    }
    const val = calcRequiredF(subjectKey, numericInputs, 40);
    if (val === null || val > 100) return null;
    return Math.ceil(val * 100) / 100;
  }, [subjectKey, numericInputs, GAA_val]);

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
                inputMode="numeric"
              />
            </div>
          ))}
        </div>
        {/* Eligibility info */}
        {eligibility ? (
          <div className="p-3 rounded bg-yellow-100 text-yellow-900 font-medium mb-4">
            {eligibility}
          </div>
        ) : passTheoryButNotOppeMsg ? (
          <div className="p-3 rounded bg-rose-100 text-rose-900 font-medium mb-4">
            {passTheoryButNotOppeMsg}
          </div>
        ) : (
          <div className="p-3 rounded bg-green-50 text-green-900 font-medium mb-4">
            Eligible for end term!
          </div>
        )}
        {/* Required End Term Marks for Each Grade */}
        {requiredFs && (
          <div className="overflow-x-auto mt-2 mb-3">
            <table className="min-w-full bg-blue-50 text-blue-900 rounded">
              <thead>
                <tr>
                  <th className="py-1 px-2 font-semibold text-left">Grade</th>
                  <th className="py-1 px-2 font-semibold text-left">
                    Required F (End Term) / 100
                  </th>
                </tr>
              </thead>
              <tbody>
                {requiredFs.map(({ grade, mark }) => (
                  <tr key={grade}>
                    <td className="py-1 px-2">{grade}</td>
                    <td className="py-1 px-2">
                      {mark === null ? (
                        <span className="text-gray-400">Not attainable</span>
                      ) : (
                        <span className="font-semibold">{mark}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {subjectKey === "python" && (
              <div className="text-xs text-blue-700 mt-1">
                <strong>Note:</strong> To pass, at least one of OPPE1 or OPPE2 must be ≥ 40.
              </div>
            )}
          </div>
        )}
        {/* Reduced info */}
        <div className="mt-2 text-xs text-gray-500">
          Enter your scores above to see the minimum End Term marks needed for each grade.<br />
          Assignment average must be 40+ for end term eligibility.<br />
          For Python, enter your average assignment score directly (objective and programming combined).
        </div>
      </CardContent>
    </Card>
  );
}
