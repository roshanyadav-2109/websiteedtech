
import React, { useState, useEffect } from "react";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateGradeByLevel, getGradeLetter, getGradePoints } from "./utils/gradeCalculations";
import { Level } from "./types/gradeTypes";
import SubjectSelector from "./components/SubjectSelector";
import ScoreInputForm from "./components/ScoreInputForm";
import GradeResult from "./components/GradeResult";

interface GradeCalculatorProps {
  level: Level;
}

export default function GradeCalculator({ level }: GradeCalculatorProps) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; letter: string; points: number } | null>(null);

  useEffect(() => {
    // Reset everything when the level (Foundation/Diploma/Degree) changes
    setSelectedSubject("");
    setInputValues({});
    setResult(null);
  }, [level]);

  const dsSubjects = ALL_SUBJECTS[level] || [];
  const esSubjects = ALL_SUBJECTS[`${level}-electronic-systems`] || [];
  const subjects = [...dsSubjects, ...esSubjects];
  const currentSubject = subjects.find(s => s.key === selectedSubject);

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
