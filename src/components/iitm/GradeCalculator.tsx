
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateGradeByLevel, getGradeLetter, getGradePoints } from "./utils/gradeCalculations";
import { Level } from "./types/gradeTypes";
import GradeResult from "./components/GradeResult";

interface GradeCalculatorProps {
  level: Level;
}

export default function GradeCalculator({ level }: GradeCalculatorProps) {
  const [selectedSubject, setSelectedSubject] = useState("");
  const [inputValues, setInputValues] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ score: number; letter: string; points: number } | null>(null);

  const subjects = ALL_SUBJECTS[level] || [];
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
        <div>
          <Label htmlFor="subject-select">Select Subject</Label>
          <Select value={selectedSubject} onValueChange={handleSubjectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.key} value={subject.key}>
                  {subject.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentSubject && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{currentSubject.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentSubject.fields.map((field) => (
                  <div key={field.id} className="space-y-2">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type="number"
                      min={field.min}
                      max={field.max}
                      value={inputValues[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={calculateGrade} className="bg-royal hover:bg-royal-dark">
                  Calculate Grade
                </Button>
                <Button variant="outline" onClick={resetCalculator}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {result && <GradeResult result={result} />}
      </div>
    </div>
  );
}
