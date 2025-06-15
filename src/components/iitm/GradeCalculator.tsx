
import React, { useState, useMemo } from "react";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateGradeByLevel, getGradeLetter, getGradePoints } from "./utils/gradeCalculations";
import { Level } from "./types/gradeTypes";
import SubjectSelector from "./components/SubjectSelector";
import ScoreInputForm from "./components/ScoreInputForm";
import GradeResult from "./components/GradeResult";

interface GradeCalculatorProps {
  level: Level;
  branch: "data-science" | "electronic-systems";
}

export default function GradeCalculator({ level, branch }: GradeCalculatorProps) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; letter: string; points: number } | null>(null);

  // Advanced filtering logic to get subjects based on branch and level
  const filteredSubjects = useMemo(() => {
    const getSubjectsKey = () => {
      if (branch === "electronic-systems") {
        if (level === "foundation") return "foundation-electronic-systems";
        if (level === "diploma") return "diploma-electronic-systems";
        if (level === "degree") return "degree-electronic-systems";
      }
      // For data-science branch
      return level;
    };

    const subjectsKey = getSubjectsKey();
    return ALL_SUBJECTS[subjectsKey] || [];
  }, [branch, level]);

  const currentSubject = filteredSubjects.find(s => s.key === selectedSubject);

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
