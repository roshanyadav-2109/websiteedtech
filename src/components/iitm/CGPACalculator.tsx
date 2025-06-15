
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, RefreshCw } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CGPACalculator = () => {
  const [courses, setCourses] = useState([
    { name: "Course 1", credits: 4, grade: 10 },
    { name: "Course 2", credits: 4, grade: 10 },
    { name: "Course 3", credits: 3, grade: 10 },
  ]);
  const [cgpa, setCgpa] = useState(10);
  const [previousCgpa, setPreviousCgpa] = useState("");
  const [previousCredits, setPreviousCredits] = useState("");

  const gradeReference = [
    { letter: "S", points: "10" },
    { letter: "A", points: "9" },
    { letter: "B", points: "8" },
    { letter: "C", points: "7" },
    { letter: "D", points: "6" },
    { letter: "E", points: "5" },
    { letter: "U (Fail)", points: "4 or less" },
  ];

  const handleNameChange = (index: number, value: string) => {
    const updatedCourses = [...courses];
    updatedCourses[index].name = value;
    setCourses(updatedCourses);
  };

  const handleCreditsChange = (index: number, value: string) => {
    const updatedCourses = [...courses];
    updatedCourses[index].credits = parseInt(value) || 0;
    setCourses(updatedCourses);
  };

  const handleGradeChange = (index: number, value: number[]) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = value[0];
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, credits: 4, grade: 10 }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      const updatedCourses = [...courses];
      updatedCourses.splice(index, 1);
      setCourses(updatedCourses);
    }
  };

  const calculateCGPA = () => {
    let currentSemesterCredits = 0;
    let currentSemesterPoints = 0;

    courses.forEach(course => {
      currentSemesterCredits += course.credits;
      currentSemesterPoints += (course.credits * course.grade);
    });

    const prevCgpaNum = parseFloat(previousCgpa) || 0;
    const prevCreditsNum = parseInt(previousCredits) || 0;

    const totalPoints = (prevCgpaNum * prevCreditsNum) + currentSemesterPoints;
    const totalCredits = prevCreditsNum + currentSemesterCredits;

    const calculatedCGPA = totalCredits ? (totalPoints / totalCredits) : 0;
    setCgpa(parseFloat(calculatedCGPA.toFixed(2)));
  };

  const resetCGPACalculator = () => {
    setCourses([
      { name: "Course 1", credits: 4, grade: 10 },
      { name: "Course 2", credits: 4, grade: 10 },
      { name: "Course 3", credits: 3, grade: 10 },
    ]);
    setCgpa(10);
    setPreviousCgpa("");
    setPreviousCredits("");
  };

  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-royal/10 to-blue-500/10">
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-royal" />
          CGPA Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2 text-center">Grade Points Reference</h4>
            <Table className="text-center my-2">
              <TableHeader>
                <TableRow>
                  {gradeReference.map((grade) => (
                    <TableHead key={grade.letter} className="text-center font-semibold px-2 h-10">{grade.letter}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  {gradeReference.map((grade) => (
                    <TableCell key={grade.letter} className="px-2 py-2">{grade.points}</TableCell>
                  ))}
                </TableRow>
              </TableBody>
            </Table>
            <p className="text-xs text-gray-600 mt-2 text-center">Use the grade points in the calculator below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-md bg-gray-50 border">
            <div className="space-y-2">
              <Label htmlFor="previous-cgpa">Previous CGPA (Optional)</Label>
              <Input
                id="previous-cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10"
                value={previousCgpa}
                onChange={(e) => setPreviousCgpa(e.target.value)}
                placeholder="e.g., 8.5"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previous-credits">Total Credits Earned (Optional)</Label>
              <Input
                id="previous-credits"
                type="number"
                min="0"
                value={previousCredits}
                onChange={(e) => setPreviousCredits(e.target.value)}
                placeholder="e.g., 30"
              />
            </div>
          </div>
          {courses.map((course, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-50">
              <div className="space-y-2">
                <Label htmlFor={`course-${index}`}>Course Name</Label>
                <Input
                  id={`course-${index}`}
                  value={course.name}
                  onChange={(e) => handleNameChange(index, e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`credits-${index}`}>Credits</Label>
                <Input
                  id={`credits-${index}`}
                  type="number"
                  min="1"
                  max="10"
                  value={course.credits}
                  onChange={(e) => handleCreditsChange(index, e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor={`grade-${index}`}>Grade: {course.grade}</Label>
                  {courses.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 h-6 px-2"
                      onClick={() => removeCourse(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <Slider
                  id={`grade-${index}`}
                  min={0}
                  max={10}
                  step={1}
                  value={[course.grade]}
                  onValueChange={(value) => handleGradeChange(index, value)}
                />
                <div className="text-xs text-gray-500 grid grid-cols-11 mt-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                    <div key={grade} className="text-center">{grade}</div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center gap-2">
            <Button variant="outline" onClick={addCourse}>
              Add Course
            </Button>
            <Button variant="outline" onClick={resetCGPACalculator} className="text-red-500">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          <Button onClick={calculateCGPA} className="w-full bg-royal hover:bg-royal-dark">
            Calculate CGPA
          </Button>

          <div className="bg-gray-100 p-4 rounded-md text-center">
            <h3 className="text-lg font-bold mb-2">Your CGPA</h3>
            <div className="text-4xl font-bold text-royal">{cgpa}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CGPACalculator;
