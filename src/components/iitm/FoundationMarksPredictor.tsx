
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, AlertCircle, CheckCircle, Target } from "lucide-react";
import { ALL_SUBJECTS } from "./data/subjectsData";
import { calculateFoundationGrade } from "./utils/gradeCalculations";

interface FoundationMarksPredictorProps {
  branch?: string;
  level?: string;
}

const FoundationMarksPredictor: React.FC<FoundationMarksPredictorProps> = ({ 
  branch = "all", 
  level = "all" 
}) => {
  // Get subjects based on filtering
  const getFilteredSubjects = () => {
    const foundationSubjects = ALL_SUBJECTS.foundation || [];
    
    if (branch === "all") {
      return foundationSubjects;
    }
    
    if (branch === "data-science") {
      return foundationSubjects.filter(subject => 
        !["english_es1", "math_electronics1", "electronic_systems_thinking", 
          "intro_c_programming", "english_es2", "intro_linux_programming", 
          "digital_systems", "electrical_electronic_circuits", "embedded_c_programming"].includes(subject.key)
      );
    }
    
    if (branch === "electronic-systems") {
      return foundationSubjects.filter(subject => 
        ["english_es1", "math_electronics1", "electronic_systems_thinking", 
         "intro_c_programming", "english_es2", "intro_linux_programming", 
         "digital_systems", "electrical_electronic_circuits", "embedded_c_programming"].includes(subject.key)
      );
    }
    
    return foundationSubjects;
  };

  const availableSubjects = getFilteredSubjects();
  const [selectedSubject, setSelectedSubject] = useState(availableSubjects[0]?.key || "");
  const [inputs, setInputs] = useState<Record<string, number>>({});
  const [targetScore, setTargetScore] = useState([40]);
  const [results, setResults] = useState<{
    requiredF: number;
    currentTotal: number;
    isEligible: boolean;
    eligibilityMessage: string;
  } | null>(null);

  // Reset when filtering changes
  useEffect(() => {
    const newSubjects = getFilteredSubjects();
    if (newSubjects.length > 0 && !newSubjects.find(s => s.key === selectedSubject)) {
      setSelectedSubject(newSubjects[0].key);
      setInputs({});
      setResults(null);
    }
  }, [branch, level]);

  const currentSubject = availableSubjects.find(s => s.key === selectedSubject);

  const checkEligibility = (subjectKey: string, values: Record<string, number>) => {
    const { GAA = 0, Qz1 = 0, Qz2 = 0, OPPE1 = 0, OPPE2 = 0 } = values;
    
    // Common eligibility: Best 5 of 7 assignments >= 40
    const gaaEligible = GAA >= 40;
    
    // Quiz attendance (at least one quiz)
    const quizAttendance = Qz1 > 0 || Qz2 > 0;
    
    // Special cases for programming subjects
    if (subjectKey === "intro_c_programming") {
      const oppeEligible = OPPE1 >= 40 || OPPE2 >= 40;
      return {
        isEligible: gaaEligible && quizAttendance && oppeEligible,
        message: !gaaEligible ? "Assignment average must be ≥ 40" :
                !quizAttendance ? "Must attend at least one quiz" :
                !oppeEligible ? "Must score ≥ 40 in at least one OPPE" :
                "Eligible for final exam"
      };
    }
    
    if (subjectKey === "intro_linux_programming") {
      return {
        isEligible: gaaEligible,
        message: !gaaEligible ? "Assignment average must be ≥ 40" : "Eligible for final exam"
      };
    }
    
    // Standard subjects
    return {
      isEligible: gaaEligible && quizAttendance,
      message: !gaaEligible ? "Assignment average must be ≥ 40" :
              !quizAttendance ? "Must attend at least one quiz" :
              "Eligible for final exam"
    };
  };

  const predictRequiredF = (subjectKey: string, values: Record<string, number>, target: number) => {
    // Binary search for required F score
    let low = 0, high = 100;
    let result = 100;
    
    for (let i = 0; i < 100; i++) {
      const mid = (low + high) / 2;
      const total = calculateFoundationGrade(subjectKey, { ...values, F: mid });
      
      if (total >= target) {
        result = mid;
        high = mid - 0.1;
      } else {
        low = mid + 0.1;
      }
    }
    
    return Math.max(0, Math.min(100, result));
  };

  const handleCalculate = () => {
    if (!currentSubject) return;
    
    const eligibility = checkEligibility(selectedSubject, inputs);
    const requiredF = predictRequiredF(selectedSubject, inputs, targetScore[0]);
    const currentTotal = calculateFoundationGrade(selectedSubject, { ...inputs, F: 0 });
    
    setResults({
      requiredF: Math.round(requiredF * 100) / 100,
      currentTotal: Math.round(currentTotal * 100) / 100,
      isEligible: eligibility.isEligible,
      eligibilityMessage: eligibility.message
    });
  };

  const handleInputChange = (fieldId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setInputs(prev => ({ ...prev, [fieldId]: numValue }));
  };

  const handleReset = () => {
    setInputs({});
    setResults(null);
    setTargetScore([40]);
  };

  // Show message when no subjects available
  if (availableSubjects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">
          No Foundation subjects available for the selected filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Foundation Final Exam Marks Predictor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Subject Selection */}
          <div>
            <Label>Subject</Label>
            <select 
              value={selectedSubject} 
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setInputs({});
                setResults(null);
              }}
              className="w-full p-2 border rounded-md"
            >
              {availableSubjects.map(subject => (
                <option key={subject.key} value={subject.key}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* Target Score Slider */}
          <div>
            <Label>Target Total Score: {targetScore[0]}</Label>
            <Slider
              value={targetScore}
              onValueChange={setTargetScore}
              min={40}
              max={100}
              step={1}
              className="mt-2"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>40 (Pass)</span>
              <span>100 (Max)</span>
            </div>
          </div>

          {/* Input Fields */}
          {currentSubject && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentSubject.fields.filter(field => field.id !== "F").map(field => (
                <div key={field.id}>
                  <Label>{field.label}</Label>
                  <Input
                    type="number"
                    min={field.min}
                    max={field.max}
                    value={inputs[field.id] || ""}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Calculate Button */}
          <div className="flex gap-2">
            <Button onClick={handleCalculate} className="bg-royal hover:bg-royal-dark">
              <Target className="mr-2 h-4 w-4" />
              Calculate Required F Score
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          {/* Results */}
          {results && (
            <div className="space-y-4">
              {/* Eligibility Status */}
              <Alert className={results.isEligible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
                <div className="flex items-center">
                  {results.isEligible ? (
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                  )}
                  <AlertDescription className={results.isEligible ? "text-green-800" : "text-red-800"}>
                    {results.eligibilityMessage}
                  </AlertDescription>
                </div>
              </Alert>

              {/* Prediction Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Required Final Exam Score</h4>
                    <p className="text-2xl font-bold text-blue-900">{results.requiredF.toFixed(1)}/100</p>
                    <p className="text-sm text-blue-700 mt-1">
                      To achieve target score of {targetScore[0]}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-200 bg-gray-50">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Current Score (without Final)</h4>
                    <p className="text-2xl font-bold text-gray-900">{results.currentTotal.toFixed(1)}/100</p>
                    <p className="text-sm text-gray-700 mt-1">
                      Based on current component scores
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="border-amber-200 bg-amber-50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Recommendations</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    {results.requiredF <= 40 && (
                      <li>✅ You're in a great position! Focus on maintaining your performance.</li>
                    )}
                    {results.requiredF > 40 && results.requiredF <= 70 && (
                      <li>⚠️ You need a moderate score in the final exam. Study consistently.</li>
                    )}
                    {results.requiredF > 70 && results.requiredF <= 90 && (
                      <li>🔥 You need a high score in the final exam. Intensive preparation required.</li>
                    )}
                    {results.requiredF > 90 && (
                      <li>❗ Target may be difficult to achieve. Consider improving other component scores if possible.</li>
                    )}
                    <li>💡 Remember: This is a prediction based on the grading formula. Actual results may vary.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FoundationMarksPredictor;
