import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, RefreshCw } from "lucide-react";
import AuthWrapper from "@/components/AuthWrapper";

const ToolsTab = () => {
  const [courses, setCourses] = useState([
    { name: "Course 1", credits: 4, grade: 10 },
    { name: "Course 2", credits: 4, grade: 10 },
    { name: "Course 3", credits: 3, grade: 10 },
  ]);
  const [cgpa, setCgpa] = useState(10);
  const [previousCgpa, setPreviousCgpa] = useState("");
  const [previousCredits, setPreviousCredits] = useState("");

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
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
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

  const resetCalculator = () => {
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
    <AuthWrapper>
      <div className="space-y-6">
        <Card className="border-none shadow-md">
          <CardHeader className="bg-gradient-to-r from-royal/10 to-blue-500/10">
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-royal" />
              IITM BS CGPA Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
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
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 h-6 px-2"
                        onClick={() => removeCourse(index)}
                      >
                        Remove
                      </Button>
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

              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  onClick={addCourse}
                  className="mr-2"
                >
                  Add Course
                </Button>
                <Button 
                  variant="outline" 
                  onClick={resetCalculator}
                  className="text-red-500"
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>

              <div className="mt-6">
                <Button 
                  onClick={calculateCGPA} 
                  className="w-full bg-royal hover:bg-royal-dark"
                >
                  Calculate CGPA
                </Button>
              </div>

              <div className="mt-6 bg-gray-100 p-4 rounded-md">
                <h3 className="text-lg font-bold mb-2">Your CGPA</h3>
                <div className="text-4xl font-bold text-royal">{cgpa}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-gray-500">
          <p>
            More tools will be added soon. If you have suggestions for tools that would be helpful,
            please let us know!
          </p>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default ToolsTab;
