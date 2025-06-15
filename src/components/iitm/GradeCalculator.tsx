
import React, { useState, useEffect } from "react";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateGradeByLevel, getGradeLetter, getGradePoints } from "./utils/gradeCalculations";
import { Level } from "./types/gradeTypes";
import SubjectSelector from "./components/SubjectSelector";
import ScoreInputForm from "./components/ScoreInputForm";
import GradeResult from "./components/GradeResult";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GradeCalculatorProps {
  level: Level;
}

export default function GradeCalculator({ level }: GradeCalculatorProps) {
  const [branch, setBranch] = useState<"data-science" | "electronic-systems">("data-science");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; letter: string; points: number } | null>(null);

  useEffect(() => {
    // Reset everything when the level (Foundation/Diploma/Degree) changes
    setBranch("data-science");
    setSelectedSubject("");
    setInputValues({});
    setResult(null);
  }, [level]);

  const getSubjectsKey = () => {
    if (branch === "electronic-systems") {
      return `${level}-electronic-systems`;
    }
    return level;
  };

  const subjects = ALL_SUBJECTS[getSubjectsKey()] || [];
  const currentSubject = subjects.find(s => s.key === selectedSubject);

  const handleBranchChange = (newBranch: "data-science" | "electronic-systems") => {
    setBranch(newBranch);
    setSelectedSubject("");
    setInputValues({});
    setResult(null);
  };

  const handleSubjectChange = (subjectKey: string) => {
    setSelectedSubject(subjectKey);
    setInputValues({});
    setResult(null);
  };

  const handleInputChange = (fieldId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputValues(prev => ({
      ...prev,
      [fieldId]: numValue
    }));
  };

  const calculateGrade = () => {
    if (!selectedSubject || !currentSubject) return;

    const score = calculateGradeByLevel(level, selectedSubject, inputValues);
    const letter = getGradeLetter(score);
    const points = getGradePoints(score);

    setResult({
      score: Math.round(score * 100) / 100,
      letter,
      points
    });
  };

  const resetCalculator = () => {
    setInputValues({});
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center p-4 bg-gray-50 rounded-lg border">
        <Label className="font-semibold text-gray-700 shrink-0">Select Branch:</Label>
        <RadioGroup
          onValueChange={(value) => handleBranchChange(value as "data-science" | "electronic-systems")}
          value={branch}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="data-science" id={`ds-branch-${level}`} />
            <Label htmlFor={`ds-branch-${level}`} className="font-normal">Data Science</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="electronic-systems" id={`es-branch-${level}`} />
            <Label htmlFor={`es-branch-${level}`} className="font-normal">Electronic Systems</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-4">
        <SubjectSelector
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSubjectChange={handleSubjectChange}
        />

        {currentSubject && (
          <ScoreInputForm
            subject={currentSubject}
            inputValues={inputValues}
            onInputChange={handleInputChange}
            onCalculate={calculateGrade}
            onReset={resetCalculator}
          />
        )}

        {result && <GradeResult result={result} />}
      </div>
    </div>
  );
}
