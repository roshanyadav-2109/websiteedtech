
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, RefreshCw, Plus, Minus } from "lucide-react";

const CGPACalculator = () => {
  const [previousCgpa, setPreviousCgpa] = useState("");
  const [totalCourses, setTotalCourses] = useState("");
  const [courses, setCourses] = useState([
    { name: "Course 1", grade: "10" }
  ]);
  const [calculatedCgpa, setCalculatedCgpa] = useState(0);

  const gradeOptions = [
    { value: "10", label: "S (10)" },
    { value: "9", label: "A (9)" },
    { value: "8", label: "B (8)" },
    { value: "7", label: "C (7)" },
    { value: "6", label: "D (6)" },
    { value: "5", label: "E (5)" },
    { value: "4", label: "U (4)" }
  ];

  const handleCourseNameChange = (index: number, value: string) => {
    const updatedCourses = [...courses];
    updatedCourses[index].name = value;
    setCourses(updatedCourses);
  };

  const handleGradeChange = (index: number, value: string) => {
    const updatedCourses = [...courses];
    updatedCourses[index].grade = value;
    setCourses(updatedCourses);
  };

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: "10" }]);
  };

  const removeCourse = (index: number) => {
    if (courses.length > 1) {
      const updatedCourses = [...courses];
      updatedCourses.splice(index, 1);
      setCourses(updatedCourses);
    }
  };

  const calculateCGPA = () => {
    // Calculate current semester CGPA
    const currentSemesterGrades = courses.map(course => parseFloat(course.grade));
    const currentSemesterCGPA = currentSemesterGrades.reduce((sum, grade) => sum + grade, 0) / currentSemesterGrades.length;

    // If previous CGPA and total courses are provided, calculate overall CGPA
    if (previousCgpa && totalCourses) {
      const prevCgpaNum = parseFloat(previousCgpa);
      const totalCoursesNum = parseInt(totalCourses);
      const currentCoursesNum = courses.length;
      
      // Weighted average formula
      const totalGradePoints = (prevCgpaNum * totalCoursesNum) + (currentSemesterCGPA * currentCoursesNum);
      const totalCourses = totalCoursesNum + currentCoursesNum;
      const overallCGPA = totalGradePoints / totalCourses;
      
      setCalculatedCgpa(parseFloat(overallCGPA.toFixed(2)));
    } else {
      // Only current semester CGPA
      setCalculatedCgpa(parseFloat(currentSemesterCGPA.toFixed(2)));
    }
  };

  const resetCalculator = () => {
    setPreviousCgpa("");
    setTotalCourses("");
    setCourses([{ name: "Course 1", grade: "10" }]);
    setCalculatedCgpa(0);
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
          {/* Previous CGPA Section (Optional) */}
          <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-3">Previous Academic Record (Optional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="previous-cgpa">Previous CGPA</Label>
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
                <Label htmlFor="total-courses">Total Courses Completed</Label>
                <Input
                  id="total-courses"
                  type="number"
                  min="0"
                  value={totalCourses}
                  onChange={(e) => setTotalCourses(e.target.value)}
                  placeholder="e.g., 8"
                />
              </div>
            </div>
          </div>

          {/* Current Courses Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">Current Courses</h4>
              <Button onClick={addCourse} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add Course
              </Button>
            </div>

            {courses.map((course, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-md bg-gray-50 border">
                <div className="space-y-2">
                  <Label htmlFor={`course-${index}`}>Course Name</Label>
                  <Input
                    id={`course-${index}`}
                    value={course.name}
                    onChange={(e) => handleCourseNameChange(index, e.target.value)}
                    placeholder="Enter course name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`grade-${index}`}>Grade</Label>
                  <Select value={course.grade} onValueChange={(value) => handleGradeChange(index, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  {courses.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeCourse(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button onClick={calculateCGPA} className="bg-royal hover:bg-royal-dark">
              Calculate CGPA
            </Button>
            <Button variant="outline" onClick={resetCalculator} className="text-red-500">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          {/* Result */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg text-center border">
            <h3 className="text-lg font-bold mb-2 text-gray-800">Your CGPA</h3>
            <div className="text-4xl font-bold text-royal mb-2">{calculatedCgpa}</div>
            {previousCgpa && totalCourses ? (
              <p className="text-sm text-gray-600">Overall CGPA (including previous courses)</p>
            ) : (
              <p className="text-sm text-gray-600">Current semester CGPA</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CGPACalculator;
