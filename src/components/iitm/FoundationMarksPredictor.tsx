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
  | "maths2"
  | "english_es1"
  | "math_electronics1"
  | "electronic_systems_thinking"
  | "intro_c_programming"
  | "english_es2"
  | "intro_linux_programming"
  | "digital_systems"
  | "electrical_electronic_circuits"
  | "embedded_c_programming";

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
  // Electronic Systems subjects
  {
    key: "english_es1",
    name: "English - I (ES)",
    formula: "T = 0.1 × GAA + max(0.6F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.3Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "math_electronics1",
    name: "Math for Electronics - I",
    formula: "T = 0.1 × GAA + max(0.6F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.3Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "electronic_systems_thinking",
    name: "Electronic Systems Thinking and Circuits",
    formula: "T = 0.1 × GAA + max(0.6F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.3Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "intro_c_programming",
    name: "Introduction to C Programming",
    formula: "T = 0.1GAA + 0.2Qz1 + 0.4F + max(0.15OPPE1 + 0.15OPPE2, 0.20max(OPPE1,OPPE2))",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "OPPE1", label: "OPPE1 Score", min: 0, max: 100 },
      { id: "OPPE2", label: "OPPE2 Score", min: 0, max: 100 },
    ],
  },
  {
    key: "english_es2",
    name: "English - II (ES)",
    formula: "T = 0.1 × GAA + max(0.6F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.3Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "intro_linux_programming",
    name: "Introduction to Linux Programming",
    formula: "T = 0.1GAA + 0.05NPPE + 0.2Qz1 + 0.25OPE + 0.3F + 0.05BPTA + 0.05VMT",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "NPPE", label: "Avg. NPPE Assignments", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "OPE", label: "Online Programming Exam", min: 0, max: 100 },
      { id: "BPTA", label: "Avg. Biweekly Programming Tests", min: 0, max: 100 },
      { id: "VMT", label: "Avg. Virtual Machine Tasks", min: 0, max: 100 },
    ],
  },
  {
    key: "digital_systems",
    name: "Digital Systems",
    formula: "T = 0.1 × GAA + max(0.6F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.3Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "electrical_electronic_circuits",
    name: "Electrical and Electronic Circuits",
    formula: "T = 0.1 × GAA + max(0.6F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.3Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1 Score (Qz1)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2 Score (Qz2)", min: 0, max: 100 },
    ],
  },
  {
    key: "embedded_c_programming",
    name: "Embedded C Programming",
    formula: "T = 0.1GAA + 0.1GRPA + max(0.5F + 0.2max(Qz1,Qz2), 0.4F + 0.2Qz1 + 0.2Qz2)",
    inputFields: [
      { id: "GAA", label: "Assignment Avg (GAA)", min: 0, max: 100 },
      { id: "GRPA", label: "Avg. Programming Assignments", min: 0, max: 100 },
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
      const GAA = n(inputs.GAA);
      const Qz1 = n(inputs.Qz1);
      const OPPE1 = n(inputs.OPPE1);
      const OPPE2 = n(inputs.OPPE2);
      const reqF =
        (targetT - 0.15 * GAA - 0.15 * Qz1 - 0.2 * OPPE1 - 0.2 * OPPE2) / 0.3;
      if (reqF <= 100 && reqF >= 0) return reqF;
      return null;
    }
    // Electronic Systems subjects
    case "english_es1":
    case "math_electronics1":
    case "electronic_systems_thinking":
    case "english_es2":
    case "digital_systems":
    case "electrical_electronic_circuits": {
      const GAA = n(inputs.GAA), Qz1 = n(inputs.Qz1), Qz2 = n(inputs.Qz2);
      for(let F=0; F<=100; F++) {
        const p1 = 0.1*GAA + 0.6*F + 0.2*Math.max(Qz1, Qz2);
        const p2 = 0.1*GAA + 0.4*F + 0.2*Qz1 + 0.3*Qz2;
        if(Math.max(p1,p2) >= targetT) return F;
      }
      return null;
    }
    case "intro_c_programming": {
      const GAA = n(inputs.GAA);
      const Qz1 = n(inputs.Qz1);
      const OPPE1 = n(inputs.OPPE1);
      const OPPE2 = n(inputs.OPPE2);
      for(let F=0; F<=100; F++) {
        const p1 = 0.1*GAA + 0.2*Qz1 + 0.4*F + 0.15*OPPE1 + 0.15*OPPE2;
        const p2 = 0.1*GAA + 0.2*Qz1 + 0.4*F + 0.20*Math.max(OPPE1, OPPE2);
        if(Math.max(p1,p2) >= targetT) return F;
      }
      return null;
    }
    case "intro_linux_programming": {
      const GAA = n(inputs.GAA);
      const NPPE = n(inputs.NPPE);
      const Qz1 = n(inputs.Qz1);
      const OPE = n(inputs.OPE);
      const BPTA = n(inputs.BPTA);
      const VMT = n(inputs.VMT);
      const reqF = (targetT - 0.1*GAA - 0.05*NPPE - 0.2*Qz1 - 0.25*OPE - 0.05*BPTA - 0.05*VMT) / 0.3;
      if (reqF <= 100 && reqF >= 0) return reqF;
      return null;
    }
    case "embedded_c_programming": {
      const GAA = n(inputs.GAA);
      const GRPA = n(inputs.GRPA);
      const Qz1 = n(inputs.Qz1);
      const Qz2 = n(inputs.Qz2);
      for(let F=0; F<=100; F++) {
        const p1 = 0.1*GAA + 0.1*GRPA + 0.5*F + 0.2*Math.max(Qz1, Qz2);
        const p2 = 0.1*GAA + 0.1*GRPA + 0.4*F + 0.2*Qz1 + 0.2*Qz2;
        if(Math.max(p1,p2) >= targetT) return F;
      }
      return null;
    }
    default: {
      const GAA = n(inputs.GAA),
        Qz1 = n(inputs.Qz1),
        Qz2 = n(inputs.Qz2);
      const reqF = (targetT - 0.1 * GAA - 0.25 * Qz1 - 0.25 * Qz2) / 0.4;
      if (reqF <= 100 && reqF >= 0) return reqF;
      return null;
    }
  }
}

// Eligibility check
function checkEligibility(subjKey: SubjectKey, inputs: Record<string, number>): string | null {
  switch (subjKey) {
    case "python":
      return null;
    case "intro_c_programming":
      if (inputs.OPPE1 < 40 && inputs.OPPE2 < 40) {
        return "For final grade: At least one OPPE (OPPE1 or OPPE2) must be ≥ 40/100.";
      }
      return null;
    case "intro_linux_programming":
      if (inputs.OPE < 40) {
        return "For final grade: Programming exam (OPPE) score must be ≥ 40/100.";
      }
      return null;
    default:
      if((inputs.Qz1 ?? 0) === 0 && (inputs.Qz2 ?? 0) === 0)
        return "Eligibility: At least one quiz (Qz1 or Qz2) must be attempted (>0).";
      return null;
  }
}

const initialInputValues: Record<string, string> = {
  GAA: "", Qz1: "", Qz2: "", Bonus: "", GAAP: "", OPPE1: "", OPPE2: "", 
  NPPE: "", OPE: "", BPTA: "", VMT: "", GRPA: "",
};

export default function FoundationMarksPredictor() {
  const [subjectKey, setSubjectKey] = useState<SubjectKey>("maths1");
  const [inputs, setInputs] = useState<Record<string, string>>(initialInputValues);
  const subjectObj = SUBJECTS.find(s => s.key === subjectKey)!;

  const parseInputNumber = (val: string, min: number, max: number): number =>
    val === "" ? 0 : Math.max(min, Math.min(max, Number(val)));

  function getGAAValue(subjectKey: SubjectKey, sinputs: Record<string, string>) {
    const v = sinputs.GAA === "" ? 0 : Number(sinputs.GAA);
    return isNaN(v) ? 0 : v;
  }

  const numericInputs: Record<string, number> = {};
  subjectObj.inputFields.forEach(field => {
    numericInputs[field.id] = parseInputNumber(inputs[field.id] ?? "", field.min, field.max);
  });

  let eligibility: string | null = null;
  const GAA_val = getGAAValue(subjectKey, inputs);
  if (GAA_val < 40) {
    eligibility =
      "Eligibility: Assignment average must be at least 40/100 to appear for end term.";
  } else {
    eligibility = checkEligibility(subjectKey, numericInputs);
  }

  const calcCurrentScore = () => {
    const numbers = {
      GAA: numericInputs.GAA ?? 0,
      Qz1: numericInputs.Qz1 ?? 0,
      Qz2: numericInputs.Qz2 ?? 0,
      Bonus: numericInputs.Bonus ?? 0,
      OPPE1: numericInputs.OPPE1 ?? 0,
      OPPE2: numericInputs.OPPE2 ?? 0,
      NPPE: numericInputs.NPPE ?? 0,
      OPE: numericInputs.OPE ?? 0,
      BPTA: numericInputs.BPTA ?? 0,
      VMT: numericInputs.VMT ?? 0,
      GRPA: numericInputs.GRPA ?? 0,
      F: 0,
    };
    
    switch (subjectKey) {
      case "maths1": {
        const { GAA, Qz1, Qz2 } = numbers;
        const p1 = 0.1 * GAA + 0.6 * 0 + 0.2 * Math.max(Qz1, Qz2);
        const p2 = 0.1 * GAA + 0.4 * 0 + 0.2 * Qz1 + 0.3 * Qz2;
        return Math.max(p1, p2);
      }
      case "english1": {
        const { GAA, Qz1, Qz2 } = numbers;
        const p1 = 0.1 * GAA + 0.5 * 0 + 0.2 * Math.max(Qz1, Qz2);
        const p2 = 0.1 * GAA + 0.4 * 0 + 0.2 * Qz1 + 0.3 * Qz2;
        return Math.max(p1, p2);
      }
      case "statistics1": {
        const { GAA, Qz1, Qz2, Bonus } = numbers;
        const p1 = 0.1 * GAA + 0.6 * 0 + 0.2 * Math.max(Qz1, Qz2) + Bonus;
        const p2 = 0.1 * GAA + 0.4 * 0 + 0.2 * Qz1 + 0.3 * Qz2 + Bonus;
        return Math.max(p1, p2);
      }
      case "python": {
        const { GAA, Qz1, OPPE1, OPPE2 } = numbers;
        return 0.15 * GAA + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2;
      }
      case "english_es1":
      case "math_electronics1":
      case "electronic_systems_thinking":
      case "english_es2":
      case "digital_systems":
      case "electrical_electronic_circuits": {
        const { GAA, Qz1, Qz2 } = numbers;
        const p1 = 0.1 * GAA + 0.6 * 0 + 0.2 * Math.max(Qz1, Qz2);
        const p2 = 0.1 * GAA + 0.4 * 0 + 0.2 * Qz1 + 0.3 * Qz2;
        return Math.max(p1, p2);
      }
      case "intro_c_programming": {
        const { GAA, Qz1, OPPE1, OPPE2 } = numbers;
        const p1 = 0.1 * GAA + 0.2 * Qz1 + 0.4 * 0 + 0.15 * OPPE1 + 0.15 * OPPE2;
        const p2 = 0.1 * GAA + 0.2 * Qz1 + 0.4 * 0 + 0.20 * Math.max(OPPE1, OPPE2);
        return Math.max(p1, p2);
      }
      case "intro_linux_programming": {
        const { GAA, NPPE, Qz1, OPE, BPTA, VMT } = numbers;
        return 0.1 * GAA + 0.05 * NPPE + 0.2 * Qz1 + 0.25 * OPE + 0.05 * BPTA + 0.05 * VMT;
      }
      case "embedded_c_programming": {
        const { GAA, GRPA, Qz1, Qz2 } = numbers;
        const p1 = 0.1 * GAA + 0.1 * GRPA + 0.5 * 0 + 0.2 * Math.max(Qz1, Qz2);
        const p2 = 0.1 * GAA + 0.1 * GRPA + 0.4 * 0 + 0.2 * Qz1 + 0.2 * Qz2;
        return Math.max(p1, p2);
      }
      default: {
        const { GAA, Qz1, Qz2 } = numbers;
        return 0.1 * GAA + 0.25 * Qz1 + 0.25 * Qz2;
      }
    }
  };

  const currentScore = calcCurrentScore();

  const requiredFs = useMemo(() => {
    if (GAA_val < 40) return null;
    if (checkEligibility(subjectKey, numericInputs)) return null;
    const out: { grade: string; mark: number | null; already: boolean }[] = [];
    for (const [grade, threshold] of GRADES) {
      if (currentScore >= threshold) {
        out.push({ grade, mark: null, already: true });
        continue;
      }
      const val = calcRequiredF(subjectKey, numericInputs, threshold);
      out.push({
        grade,
        mark:
          val === null || val > 100
            ? null
            : Math.ceil(val * 100) / 100,
        already: false,
      });
    }
    return out;
  }, [subjectKey, numericInputs, GAA_val, currentScore]);

  let specialWarning: string | null = null;
  if (
    subjectKey === "python" &&
    GAA_val >= 40 &&
    (requiredFs?.[0].mark !== null) &&
    numericInputs.OPPE1 < 40 &&
    numericInputs.OPPE2 < 40
  ) {
    specialWarning =
      "Note: To PASS the subject, at least one of OPPE1 or OPPE2 must be ≥ 40, regardless of your calculated End Term marks.";
  } else if (
    subjectKey === "intro_c_programming" &&
    GAA_val >= 40 &&
    (requiredFs?.[0].mark !== null) &&
    numericInputs.OPPE1 < 40 &&
    numericInputs.OPPE2 < 40
  ) {
    specialWarning =
      "Note: To PASS the subject, at least one of OPPE1 or OPPE2 must be ≥ 40, regardless of your calculated End Term marks.";
  } else if (
    subjectKey === "intro_linux_programming" &&
    GAA_val >= 40 &&
    (requiredFs?.[0].mark !== null) &&
    numericInputs.OPE < 40
  ) {
    specialWarning =
      "Note: To PASS the subject, Programming exam (OPPE) score must be ≥ 40, regardless of your calculated End Term marks.";
  }

  const handleInput = (id: string, val: string) => {
    if (/^(\d{0,3})$/.test(val) || val === "") {
      setInputs(prev => ({ ...prev, [id]: val }));
    }
  };

  const requiredFMark = useMemo(() => {
    if (GAA_val < 40) return null;
    if (checkEligibility(subjectKey, numericInputs)) return null;
    
    // Special cases for subjects with additional requirements
    if (
      (subjectKey === "python" || subjectKey === "intro_c_programming") &&
      numericInputs.OPPE1 < 40 &&
      numericInputs.OPPE2 < 40
    ) {
      return null;
    }
    if (subjectKey === "intro_linux_programming" && numericInputs.OPE < 40) {
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
                <optgroup label="Data Science Subjects">
                  <SelectItem value="maths1">Mathematics 1</SelectItem>
                  <SelectItem value="english1">English 1</SelectItem>
                  <SelectItem value="statistics1">Statistics 1</SelectItem>
                  <SelectItem value="english2">English 2</SelectItem>
                  <SelectItem value="statistics2">Statistics 2</SelectItem>
                  <SelectItem value="computational">Computational Thinking</SelectItem>
                  <SelectItem value="python">Programming in Python</SelectItem>
                  <SelectItem value="maths2">Mathematics 2</SelectItem>
                </optgroup>
                <optgroup label="Electronic Systems Subjects">
                  <SelectItem value="english_es1">English - I (ES)</SelectItem>
                  <SelectItem value="math_electronics1">Math for Electronics - I</SelectItem>
                  <SelectItem value="electronic_systems_thinking">Electronic Systems Thinking and Circuits</SelectItem>
                  <SelectItem value="intro_c_programming">Introduction to C Programming</SelectItem>
                  <SelectItem value="english_es2">English - II (ES)</SelectItem>
                  <SelectItem value="intro_linux_programming">Introduction to Linux Programming</SelectItem>
                  <SelectItem value="digital_systems">Digital Systems</SelectItem>
                  <SelectItem value="electrical_electronic_circuits">Electrical and Electronic Circuits</SelectItem>
                  <SelectItem value="embedded_c_programming">Embedded C Programming</SelectItem>
                </optgroup>
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
        
        {eligibility ? (
          <div className="p-3 rounded bg-yellow-100 text-yellow-900 font-medium mb-4">
            {eligibility}
          </div>
        ) : (
          <div className="p-3 rounded bg-green-50 text-green-900 font-medium mb-4">
            Eligible for end term!
          </div>
        )}
        
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
                {requiredFs.map(({ grade, mark, already }) => (
                  <tr key={grade}>
                    <td className="py-1 px-2">{grade}</td>
                    <td className="py-1 px-2">
                      {already
                        ? <span className="text-green-700 font-semibold">Already scored</span>
                        : mark === null ? (
                          <span className="text-gray-400">Not attainable</span>
                        ) : (
                          <span className="font-semibold">{mark}</span>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {specialWarning && (
          <div className="p-3 rounded bg-rose-100 text-rose-900 font-medium mb-3">
            {specialWarning}
          </div>
        )}
        
        <div className="mt-2 text-xs text-gray-500">
          Enter your scores above to see the minimum End Term marks needed for each grade.
        </div>
      </CardContent>
    </Card>
  );
}
