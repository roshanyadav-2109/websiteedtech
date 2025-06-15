
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateDegreeGrade } from "./utils/gradeCalculations";

interface DegreeMarksPredictorProps {
  branch: string;
  level: string;
}

const GRADES: [string, number][] = [
  ["S", 90],
  ["A", 80],
  ["B", 70],
  ["C", 60],
  ["D", 50],
  ["E", 40],
];

function calcRequiredF(subjectKey: string, inputs: Record<string, number>, targetT: number): number | null {
  const clamp = (x: number, minv = 0, maxv = 100) => Math.max(minv, Math.min(maxv, x));

  for (let F = 0; F <= 100; F++) {
    const score = calculateDegreeGrade(subjectKey, { ...inputs, F });
    if (score >= targetT) return clamp(F);
  }
  return null;
}

function checkEligibility(subjectKey: string, inputs: Record<string, number>): string | null {
  const GAA_val = inputs.GAA ?? inputs.GA ?? 0;
  
  if (GAA_val < 40) {
    return "Eligibility: Assignment average must be at least 40/100 to appear for end term.";
  }
  
  const quizSubjects = [
      "computer_organization_es", "electromagnetic_fields_es", "electronic_product_design_es",
      "software_testing", "deep_learning", "ai_search", "deep_learning_cv", "managerial_economics",
      "algo_thinking_bio", "large_language_models", "speech_technology", "market_research",
      "statistical_computing", "advanced_algorithms", "game_theory_strategy", "computer_system_design",
      "deep_learning_practice"
  ];
  if (quizSubjects.includes(subjectKey)) {
    if ((inputs.Qz1 ?? 0) <= 0 && (inputs.Qz2 ?? 0) <= 0 && (inputs.Qz3 ?? 0) <= 0) {
        return "Eligibility: At least one quiz must be attended (>0).";
    }
  }

  if (subjectKey === "int_bigdata" || subjectKey === "c_prog") {
      if ((inputs.OPPE1 ?? 0) < 40 && (inputs.OPPE2 ?? 0) < 40) {
          return "Note: To be eligible for a grade, at least one of OPPE1 or OPPE2 must be ≥ 40.";
      }
  }

  return null;
}

export default function DegreeMarksPredictor({ branch, level }: DegreeMarksPredictorProps) {
  const getSubjectsKey = () => {
    if (branch === "electronic-systems" && level === "degree") {
      return "degree-electronic-systems";
    }
    return "degree";
  };
  
  const subjects = ALL_SUBJECTS[getSubjectsKey()] || [];
  const [subjectKey, setSubjectKey] = useState(subjects[0]?.key || "");
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const subjectObj = useMemo(() => subjects.find(s => s.key === subjectKey), [subjects, subjectKey]);

  const numericInputs = useMemo(() => {
    const numInputs: Record<string, number> = {};
    if (subjectObj) {
        subjectObj.fields.forEach(field => {
            if (field.id !== 'F') {
                const val = inputs[field.id] ?? "";
                numInputs[field.id] = val === "" ? 0 : Math.max(field.min, Math.min(field.max, Number(val)));
            }
        });
    }
    return numInputs;
  }, [inputs, subjectObj]);

  const eligibility = useMemo(() => subjectObj ? checkEligibility(subjectKey, numericInputs) : null, [subjectKey, numericInputs, subjectObj]);
  
  const GAA_val = numericInputs.GAA ?? numericInputs.GA ?? 0;

  const currentScore = useMemo(() => subjectObj ? calculateDegreeGrade(subjectKey, { ...numericInputs, F: 0 }) : 0, [subjectKey, numericInputs, subjectObj]);

  const requiredFs = useMemo(() => {
    if (!subjectObj || GAA_val < 40) return null;
    if (eligibility && eligibility.startsWith("Eligibility:")) return null;
    
    const out: { grade: string; mark: number | null; already: boolean }[] = [];
    for (const [grade, threshold] of GRADES) {
      if (currentScore >= threshold) {
        out.push({ grade, mark: null, already: true });
        continue;
      }
      const val = calcRequiredF(subjectKey, numericInputs, threshold);
      out.push({
        grade,
        mark: val === null || val > 100 ? null : Math.ceil(val * 100) / 100,
        already: false,
      });
    }
    return out;
  }, [subjectKey, numericInputs, GAA_val, currentScore, subjectObj, eligibility]);

  const handleInput = (id: string, val: string) => {
    if (/^(\d{0,3}(\.\d{0,2})?)?$/.test(val) || val === "") {
      setInputs(prev => ({ ...prev, [id]: val }));
    }
  };

  const handleSubjectChange = (newSubjectKey: string) => {
    setSubjectKey(newSubjectKey);
    setInputs({});
  };
  
  React.useEffect(() => {
      if (subjects.length > 0 && (!subjectKey || !subjects.find(s => s.key === subjectKey))) {
        setSubjectKey(subjects[0].key);
        setInputs({});
      }
  }, [subjects, subjectKey]);


  if (!subjectObj) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-600">
            No subjects available for the selected branch and level combination.
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Degree Subject Final Exam Marks Predictor</CardTitle>
        <div className="text-sm text-gray-600">
          {branch === "electronic-systems" ? "BS Electronic Systems" : "BS Data Science"} - Degree Level
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Subject</Label>
            <Select value={subjectKey} onValueChange={handleSubjectChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subj => (
                  <SelectItem key={subj.key} value={subj.key}>{subj.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {subjectObj.fields.filter(f => f.id !== 'F').map(f => (
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

        {eligibility && eligibility.startsWith("Eligibility:") ? (
          <div className="p-3 rounded bg-yellow-100 text-yellow-900 font-medium mb-4">
            {eligibility}
          </div>
        ) : eligibility ? (
          <div className="p-3 rounded bg-blue-100 text-blue-900 font-medium mb-4">
            {eligibility}
          </div>
        ) : (
          <div className="p-3 rounded bg-green-50 text-green-900 font-medium mb-4">
            Eligible for end term!
          </div>
        )}

        {requiredFs && (
          <div className="mb-4">
            <h3 className="font-semibold mb-3">Required Final Exam Marks for Each Grade</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Grade</TableHead>
                  <TableHead>Minimum Total Score</TableHead>
                  <TableHead>Required Final Exam Marks (/100)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requiredFs.map(({ grade, mark, already }) => (
                  <TableRow key={grade}>
                    <TableCell className="font-semibold">{grade}</TableCell>
                    <TableCell>{GRADES.find(([g]) => g === grade)?.[1]}</TableCell>
                    <TableCell>
                      {already ? (
                        <span className="text-green-700 font-semibold">Already scored</span>
                      ) : mark === null ? (
                        <span className="text-red-600 font-semibold">Not attainable</span>
                      ) : (
                        <span className="font-semibold">{mark}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          Enter your scores above to see the minimum Final Exam marks needed for each grade.
        </div>
      </CardContent>
    </Card>
  );
}
