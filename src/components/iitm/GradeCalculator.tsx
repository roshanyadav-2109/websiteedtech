
import React, { useState, useMemo } from "react";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateGradeByLevel, getGradeLetter, getGradePoints } from "./utils/gradeCalculations";
import { Level } from "./types/gradeTypes";
import SubjectSelector from "./components/SubjectSelector";
import ScoreInputForm from "./components/ScoreInputForm";
import GradeResult from "./components/GradeResult";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface GradeCalculatorProps {
  level: Level;
}

export default function GradeCalculator({ level }: GradeCalculatorProps) {
  const [selectedBranch, setSelectedBranch] = useState<"data-science" | "electronic-systems">("data-science");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; letter: string; points: number } | null>(null);

  // Advanced filtering logic to get subjects based on branch and level
  const filteredSubjects = useMemo(() => {
    const getSubjectsKey = () => {
      if (selectedBranch === "electronic-systems") {
        if (level === "foundation") return "foundation-electronic-systems";
        if (level === "diploma") return "diploma-electronic-systems";
        if (level === "degree") return "degree-electronic-systems";
      }
      // For data-science branch
      return level;
    };

    const subjectsKey = getSubjectsKey();
    return ALL_SUBJECTS[subjectsKey] || [];
  }, [selectedBranch, level]);

  const currentSubject = filteredSubjects.find(s => s.key === selectedSubject);

  const handleBranchChange = (branch: "data-science" | "electronic-systems") => {
    setSelectedBranch(branch);
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
      <div className="space-y-4">
        {/* Branch Selector */}
        <div>
          <Label htmlFor="branch-select">Select Branch</Label>
          <Select value={selectedBranch} onValueChange={handleBranchChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data-science">BS Data Science</SelectItem>
              <SelectItem value="electronic-systems">BS Electronic Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Subject Selector */}
        <SubjectSelector
          subjects={filteredSubjects}
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
