
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Award, RefreshCw } from "lucide-react";

const IITMToolsTab = () => {
  const [activeTool, setActiveTool] = useState("cgpa");
  const [branch, setBranch] = useState("all");
  const [level, setLevel] = useState("all");

  // CGPA Calculator State
  const [courses, setCourses] = useState([
    { name: "Course 1", credits: 4, grade: 10 },
    { name: "Course 2", credits: 4, grade: 10 },
    { name: "Course 3", credits: 3, grade: 10 },
  ]);
  const [cgpa, setCgpa] = useState(10);

  // Grade Calculator State
  const [totalMarks, setTotalMarks] = useState(100);
  const [obtainedMarks, setObtainedMarks] = useState(85);
  const [calculatedGrade, setCalculatedGrade] = useState(0);

  // Marks Predictor State
  const [currentCGPA, setCurrentCGPA] = useState(8.5);
  const [targetGrade, setTargetGrade] = useState("A");
  const [predictedMarks, setPredictedMarks] = useState(0);

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
    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {
      totalCredits += course.credits;
      totalPoints += (course.credits * course.grade);
    });

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
  };

  const calculateGrade = () => {
    if (totalMarks > 0) {
      const percentage = (obtainedMarks / totalMarks) * 100;
      let grade = 0;
      
      if (percentage >= 90) grade = 10;
      else if (percentage >= 80) grade = 9;
      else if (percentage >= 70) grade = 8;
      else if (percentage >= 60) grade = 7;
      else if (percentage >= 50) grade = 6;
      else if (percentage >= 40) grade = 5;
      else grade = 4;
      
      setCalculatedGrade(grade);
    }
  };

  const predictMarks = () => {
    const gradeToMarks = {
      "A+": 95,
      "A": 85,
      "B+": 75,
      "B": 65,
      "C+": 55,
      "C": 45
    };
    
    const baseMarks = gradeToMarks[targetGrade as keyof typeof gradeToMarks] || 75;
    const cgpaFactor = currentCGPA / 10;
    const predicted = Math.round(baseMarks * cgpaFactor);
    
    setPredictedMarks(predicted);
  };

  const tools = [
    {
      id: "cgpa",
      name: "CGPA Calculator",
      icon: Calculator,
      description: "Calculate your CGPA based on course grades",
      needsFiltering: false
    },
    {
      id: "grade",
      name: "Grade Calculator",
      icon: Award,
      description: "Convert marks to grades with filtering",
      needsFiltering: true
    },
    {
      id: "predictor",
      name: "Marks Predictor",
      icon: TrendingUp,
      description: "Predict required marks based on CGPA",
      needsFiltering: true
    }
  ];

  const shouldShowFilters = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    return tool?.needsFiltering && (branch !== "all" || level !== "all");
  };

  return (
    <div className="space-y-6">
      {/* Tool Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Card 
            key={tool.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              activeTool === tool.id ? 'ring-2 ring-royal bg-royal/5' : ''
            }`}
            onClick={() => setActiveTool(tool.id)}
          >
            <CardContent className="p-4 text-center">
              <tool.icon className="h-8 w-8 mx-auto mb-2 text-royal" />
              <h3 className="font-semibold">{tool.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filtering Options for Grade Calculator and Marks Predictor */}
      {tools.find(t => t.id === activeTool)?.needsFiltering && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="text-amber-800">Advanced Filtering</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-amber-700">Branch</Label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Branches</SelectItem>
                    <SelectItem value="data-science">BS Data Science</SelectItem>
                    <SelectItem value="electronic-systems">BS Electronic Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-amber-700">Level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="qualifier">Qualifier</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                    <SelectItem value="diploma">Diploma</SelectItem>
                    <SelectItem value="degree">Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {shouldShowFilters(activeTool) && (
              <div className="mt-4 p-3 bg-amber-100 rounded-md">
                <p className="text-sm text-amber-800">
                  Results customized for {branch !== "all" ? branch.replace("-", " ") : "all branches"} 
                  {level !== "all" && ` - ${level} level`}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Tool Content */}
      {activeTool === "cgpa" && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-royal/10 to-blue-500/10">
            <CardTitle className="flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-royal" />
              CGPA Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
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
      )}

      {activeTool === "grade" && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-emerald-500/10">
            <CardTitle className="flex items-center">
              <Award className="mr-2 h-5 w-5 text-green-600" />
              Grade Calculator
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="totalMarks">Total Marks</Label>
                  <Input
                    id="totalMarks"
                    type="number"
                    value={totalMarks}
                    onChange={(e) => setTotalMarks(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obtainedMarks">Obtained Marks</Label>
                  <Input
                    id="obtainedMarks"
                    type="number"
                    value={obtainedMarks}
                    onChange={(e) => setObtainedMarks(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={calculateGrade} className="w-full bg-green-600 hover:bg-green-700">
                Calculate Grade
              </Button>

              <div className="bg-green-50 p-4 rounded-md text-center">
                <h3 className="text-lg font-bold mb-2">Your Grade</h3>
                <div className="text-4xl font-bold text-green-600">{calculatedGrade}</div>
                <p className="text-sm text-gray-600 mt-2">
                  Percentage: {totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTool === "predictor" && (
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
              Marks Predictor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentCGPA">Current CGPA</Label>
                  <Input
                    id="currentCGPA"
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={currentCGPA}
                    onChange={(e) => setCurrentCGPA(Number(e.target.value))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetGrade">Target Grade</Label>
                  <Select value={targetGrade} onValueChange={setTargetGrade}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+ (90-100%)</SelectItem>
                      <SelectItem value="A">A (80-89%)</SelectItem>
                      <SelectItem value="B+">B+ (70-79%)</SelectItem>
                      <SelectItem value="B">B (60-69%)</SelectItem>
                      <SelectItem value="C+">C+ (50-59%)</SelectItem>
                      <SelectItem value="C">C (40-49%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={predictMarks} className="w-full bg-purple-600 hover:bg-purple-700">
                Predict Required Marks
              </Button>

              <div className="bg-purple-50 p-4 rounded-md text-center">
                <h3 className="text-lg font-bold mb-2">Predicted Marks Required</h3>
                <div className="text-4xl font-bold text-purple-600">{predictedMarks}%</div>
                <p className="text-sm text-gray-600 mt-2">
                  Based on current CGPA: {currentCGPA} and target grade: {targetGrade}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IITMToolsTab;
