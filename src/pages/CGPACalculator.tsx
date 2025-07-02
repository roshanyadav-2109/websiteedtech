
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, Trash2 } from 'lucide-react';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface Subject {
  id: string;
  name: string;
  grade: string;
}

const CGPACalculator = () => {
  const [previousCGPA, setPreviousCGPA] = useState<number>(0);
  const [totalSubjectsCompleted, setTotalSubjectsCompleted] = useState<number>(0);
  const [currentSubjects, setCurrentSubjects] = useState<Subject[]>([
    { id: '1', name: '', grade: '' }
  ]);
  const [calculatedCGPA, setCalculatedCGPA] = useState<number | null>(null);

  const gradeToPoint = (grade: string): number => {
    const gradeMap: { [key: string]: number } = {
      'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
    };
    return gradeMap[grade] || 0;
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      grade: ''
    };
    setCurrentSubjects([...currentSubjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    if (currentSubjects.length > 1) {
      setCurrentSubjects(currentSubjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof Subject, value: string) => {
    setCurrentSubjects(currentSubjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const calculateCGPA = () => {
    const validSubjects = currentSubjects.filter(subject => subject.name.trim() && subject.grade);
    
    if (validSubjects.length === 0) {
      alert('Please add at least one subject with a grade');
      return;
    }

    const sumOfGradePoints = validSubjects.reduce((sum, subject) => {
      return sum + gradeToPoint(subject.grade);
    }, 0);

    const subjectsThisTerm = validSubjects.length;
    
    // Formula: Total CGPA = (Previous_Term_CGPA × Total_Subjects_Completed + Sum_of_Grade_Points_Current_Term) ÷ (Total_Subjects_Completed + Subjects_This_Term)
    const totalCGPA = (previousCGPA * totalSubjectsCompleted + sumOfGradePoints) / (totalSubjectsCompleted + subjectsThisTerm);
    
    setCalculatedCGPA(Math.round(totalCGPA * 100) / 100);
  };

  const resetCalculator = () => {
    setPreviousCGPA(0);
    setTotalSubjectsCompleted(0);
    setCurrentSubjects([{ id: '1', name: '', grade: '' }]);
    setCalculatedCGPA(null);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              CGPA Calculator
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calculate your Cumulative Grade Point Average using the standard formula
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Enter Your Academic Details</CardTitle>
                <CardDescription>
                  Fill in your previous CGPA, completed subjects, and current term grades
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Previous Academic Details */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousCGPA">Previous Term CGPA</Label>
                    <Input
                      id="previousCGPA"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      value={previousCGPA || ''}
                      onChange={(e) => setPreviousCGPA(parseFloat(e.target.value) || 0)}
                      placeholder="Enter your previous CGPA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSubjects">Total Subjects Completed</Label>
                    <Input
                      id="totalSubjects"
                      type="number"
                      min="0"
                      value={totalSubjectsCompleted || ''}
                      onChange={(e) => setTotalSubjectsCompleted(parseInt(e.target.value) || 0)}
                      placeholder="Number of subjects completed"
                    />
                  </div>
                </div>

                {/* Current Term Subjects */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Current Term Subjects</h3>
                    <Button onClick={addSubject} size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Subject
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {currentSubjects.map((subject) => (
                      <div key={subject.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <Input
                            placeholder="Subject name"
                            value={subject.name}
                            onChange={(e) => updateSubject(subject.id, 'name', e.target.value)}
                          />
                        </div>
                        <div className="w-32">
                          <Select
                            value={subject.grade}
                            onValueChange={(value) => updateSubject(subject.id, 'grade', value)}
                          >
                            <SelectTrigger>
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeSubject(subject.id)}
                          disabled={currentSubjects.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button onClick={calculateCGPA} className="flex-1">
                    Calculate CGPA
                  </Button>
                  <Button variant="outline" onClick={resetCalculator}>
                    Reset
                  </Button>
                </div>

                {/* Result */}
                {calculatedCGPA !== null && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-blue-900 mb-2">Your CGPA</h3>
                      <div className="text-4xl font-bold text-blue-600 mb-2">
                        {calculatedCGPA}
                      </div>
                      <Badge variant="secondary" className="text-sm">
                        Out of 10.0
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Formula Information */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">Formula Used:</h4>
                  <p className="text-sm text-gray-600">
                    Total CGPA = (Previous Term CGPA × Total Subjects Completed + Sum of Grade Points Current Term) ÷ (Total Subjects Completed + Subjects This Term)
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CGPACalculator;
