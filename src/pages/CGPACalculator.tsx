
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, BookOpen, TrendingUp } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const CGPACalculator = () => {
  const [previousCGPA, setPreviousCGPA] = useState("");
  const [totalSubjectsCompleted, setTotalSubjectsCompleted] = useState("");
  const [currentTermSubjects, setCurrentTermSubjects] = useState<Array<{grade: string, gradePoint: number}>>([]);
  const [subjectsThisTerm, setSubjectsThisTerm] = useState("");
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);

  const gradeToGradePoint = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
    };
    return gradeMap[grade] || 0;
  };

  const handleSubjectsThisTermChange = (value: string) => {
    const numSubjects = parseInt(value);
    setSubjectsThisTerm(value);
    
    if (numSubjects > 0) {
      const newSubjects = Array(numSubjects).fill(null).map(() => ({
        grade: '',
        gradePoint: 0
      }));
      setCurrentTermSubjects(newSubjects);
    } else {
      setCurrentTermSubjects([]);
    }
  };

  const updateSubjectGrade = (index: number, grade: string) => {
    const updatedSubjects = [...currentTermSubjects];
    updatedSubjects[index] = {
      grade,
      gradePoint: gradeToGradePoint(grade)
    };
    setCurrentTermSubjects(updatedSubjects);
  };

  const calculateCGPA = () => {
    const prevCGPA = parseFloat(previousCGPA) || 0;
    const totalCompleted = parseInt(totalSubjectsCompleted) || 0;
    const subjectsCount = parseInt(subjectsThisTerm) || 0;

    if (subjectsCount === 0) {
      alert("Please add at least one subject for the current term.");
      return;
    }

    // Check if all grades are selected
    const hasEmptyGrades = currentTermSubjects.some(subject => !subject.grade);
    if (hasEmptyGrades) {
      alert("Please select grades for all subjects.");
      return;
    }

    // Calculate sum of grade points for current term
    const sumCurrentTermGradePoints = currentTermSubjects.reduce(
      (sum, subject) => sum + subject.gradePoint, 0
    );

    // Apply CGPA formula
    const totalCGPA = (prevCGPA * totalCompleted + sumCurrentTermGradePoints) / 
                      (totalCompleted + subjectsCount);

    setCalculatedCGPA(Math.round(totalCGPA * 100) / 100);
  };

  const resetCalculator = () => {
    setPreviousCGPA("");
    setTotalSubjectsCompleted("");
    setCurrentTermSubjects([]);
    setSubjectsThisTerm("");
    setCalculatedCGPA(null);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-royal text-white p-3 rounded-full">
                <Calculator className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">CGPA Calculator</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate your Cumulative Grade Point Average using our intelligent formula-based calculator
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calculator Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-royal to-royal-dark text-white">
                  <CardTitle className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    CGPA Calculation Form
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Previous Term Data */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prevCGPA">Previous Term CGPA</Label>
                      <Input
                        id="prevCGPA"
                        type="number"
                        step="0.01"
                        min="0"
                        max="10"
                        placeholder="e.g., 8.5"
                        value={previousCGPA}
                        onChange={(e) => setPreviousCGPA(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="totalCompleted">Total Subjects Completed</Label>
                      <Input
                        id="totalCompleted"
                        type="number"
                        min="0"
                        placeholder="e.g., 24"
                        value={totalSubjectsCompleted}
                        onChange={(e) => setTotalSubjectsCompleted(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Current Term */}
                  <div>
                    <Label htmlFor="subjectsThisTerm">Number of Subjects This Term</Label>
                    <Select value={subjectsThisTerm} onValueChange={handleSubjectsThisTermChange}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select number of subjects" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} Subject{num > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject Grades */}
                  {currentTermSubjects.length > 0 && (
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Enter Grades for Current Term Subjects</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {currentTermSubjects.map((subject, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <Label className="w-20">Subject {index + 1}:</Label>
                            <Select 
                              value={subject.grade} 
                              onValueChange={(grade) => updateSubjectGrade(index, grade)}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A+">A+ (10)</SelectItem>
                                <SelectItem value="A">A (9)</SelectItem>
                                <SelectItem value="B+">B+ (8)</SelectItem>
                                <SelectItem value="B">B (7)</SelectItem>
                                <SelectItem value="C+">C+ (6)</SelectItem>
                                <SelectItem value="C">C (5)</SelectItem>
                                <SelectItem value="D">D (4)</SelectItem>
                                <SelectItem value="F">F (0)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-4 pt-4">
                    <Button 
                      onClick={calculateCGPA} 
                      className="flex-1 bg-royal hover:bg-royal-dark text-white"
                    >
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate CGPA
                    </Button>
                    <Button 
                      onClick={resetCalculator} 
                      variant="outline" 
                      className="px-6"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results & Info */}
            <div className="space-y-6">
              {/* Result Card */}
              {calculatedCGPA !== null && (
                <Card className="shadow-xl border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Your CGPA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      {calculatedCGPA}
                    </div>
                    <p className="text-gray-600">Calculated CGPA</p>
                  </CardContent>
                </Card>
              )}

              {/* Formula Card */}
              <Card className="shadow-xl">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-gray-800">Formula Used</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm font-mono text-blue-800">
                      CGPA = (Previous_CGPA × Total_Subjects_Completed + Sum_of_Grade_Points_Current_Term) ÷ (Total_Subjects_Completed + Subjects_This_Term)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Grade Scale */}
              <Card className="shadow-xl">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-gray-800">Grade Scale</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>A+</span><span>10</span></div>
                    <div className="flex justify-between"><span>A</span><span>9</span></div>
                    <div className="flex justify-between"><span>B+</span><span>8</span></div>
                    <div className="flex justify-between"><span>B</span><span>7</span></div>
                    <div className="flex justify-between"><span>C+</span><span>6</span></div>
                    <div className="flex justify-between"><span>C</span><span>5</span></div>
                    <div className="flex justify-between"><span>D</span><span>4</span></div>
                    <div className="flex justify-between"><span>F</span><span>0</span></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CGPACalculator;
