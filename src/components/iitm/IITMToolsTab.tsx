import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, Award, RefreshCw } from "lucide-react";
import FoundationMarksPredictor from "./FoundationMarksPredictor";
import DiplomaMarksPredictor from "./DiplomaMarksPredictor";
import DegreeMarksPredictor from "./DegreeMarksPredictor";
import GradeCalculator from "./GradeCalculator";

const FOUNDATION_SUBJECTS = [
  {
    key: "maths1",
    label: "Mathematics 1",
    formula: "T = 0.1 × GAA + max(0.6 × F + 0.2 × max(Qz1, Qz2), 0.4 × F + 0.2 × Qz1 + 0.3 × Qz2)",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
    ],
  },
  {
    key: "english1",
    label: "English 1",
    formula: "T = 0.1 × GAA + max(0.5 × F + 0.2 × max(Qz1, Qz2), 0.4 × F + 0.2 × Qz1 + 0.3 × Qz2)",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
    ],
  },
  {
    key: "statistics1",
    label: "Statistics 1",
    formula: "T = 0.1 × GAA + max(0.6 × F + 0.2 × max(Qz1, Qz2), 0.4 × F + 0.2 × Qz1 + 0.3 × Qz2) + Bonus",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
      { id: "Bonus", name: "Bonus Marks (0-5)", type: "number", min: 0, max: 5 }
    ],
  },
  {
    key: "english2",
    label: "English 2",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
    ],
  },
  {
    key: "statistics2",
    label: "Statistics 2",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
    ],
  },
  {
    key: "computational",
    label: "Computational Thinking",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
    ],
  },
  {
    key: "python",
    label: "Programming in Python",
    formula: "T = 0.05 × GAA (objective) + 0.1 × GAAP + 0.15 × Qz1 + 0.2 × OPPE1 + 0.2 × OPPE2 + 0.3 × F",
    inputFields: [
      { id: "GAA", name: "GAA (objective, avg of 10 objective assignments)", type: "number", min: 0, max: 100 },
      { id: "GAAP", name: "GAAP (avg of best 7 of 8 programming assignments)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "OPPE1", name: "OPPE1 Score", type: "number", min: 0, max: 100 },
      { id: "OPPE2", name: "OPPE2 Score", type: "number", min: 0, max: 100 },
    ],
  },
  {
    key: "maths2",
    label: "Mathematics 2",
    formula: "T = 0.1 × GAA + 0.4 × F + 0.25 × Qz1 + 0.25 × Qz2",
    inputFields: [
      { id: "GAA", name: "Assignment Average (GAA)", type: "number", min: 0, max: 100 },
      { id: "Qz1", name: "Quiz 1 Score (Qz1)", type: "number", min: 0, max: 100 },
      { id: "Qz2", name: "Quiz 2 Score (Qz2)", type: "number", min: 0, max: 100 },
    ],
  }
];

const getFoundationSubject = (key: string) => FOUNDATION_SUBJECTS.find(s => s.key === key);

// Calculation helpers for each subject
function calculateFoundationMarks(subjKey: string, values: any, fValue: number | null) {
  // Clamp helper
  const clamp = (x: number, minv=0, maxv=100) => Math.max(minv, Math.min(maxv, x));
  // If fValue is null: use current input, else, use predicted
  if (subjKey === "maths1") {
    const { GAA, Qz1, Qz2 } = values;
    const F = fValue ?? values.F;
    const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
    const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
    return Math.max(part1, part2);
  }
  if (subjKey === "english1") {
    const { GAA, Qz1, Qz2 } = values;
    const F = fValue ?? values.F;
    const part1 = 0.1 * GAA + 0.5 * F + 0.2 * Math.max(Qz1, Qz2);
    const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
    return Math.max(part1, part2);
  }
  if (subjKey === "statistics1") {
    const { GAA, Qz1, Qz2, Bonus } = values;
    const F = fValue ?? values.F;
    const bonus = clamp(Bonus, 0, 5);
    const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2) + bonus;
    const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2 + bonus;
    return Math.max(part1, part2);
  }
  if (subjKey === "python") {
    const { GAA, GAAP, Qz1, OPPE1, OPPE2 } = values;
    const F = fValue ?? values.F;
    return (
      0.05 * GAA +
      0.1 * GAAP +
      0.15 * Qz1 +
      0.2 * OPPE1 +
      0.2 * OPPE2 +
      0.3 * F
    );
  }
  // default formula
  const { GAA, Qz1, Qz2 } = values;
  const F = fValue ?? values.F;
  return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
}

// Predict required F for passing/target for each subject
function predictRequiredF(subjKey: string, values: any, targetT: number) {
  const clamp = (x: number, minv=0, maxv=100) => Math.max(minv, Math.min(maxv, x));
  if (subjKey === "maths1") {
    // min F such that T >= targetT (either formula)
    let foundF = 100;
    for (let f = 0; f <= 100; f++) {
      let t = calculateFoundationMarks("maths1", values, f);
      if (t >= targetT) {
        foundF = f;
        break;
      }
    }
    return clamp(foundF);
  }
  if (subjKey === "english1") {
    let foundF = 100;
    for (let f = 0; f <= 100; f++) {
      let t = calculateFoundationMarks("english1", values, f);
      if (t >= targetT) {
        foundF = f;
        break;
      }
    }
    return clamp(foundF);
  }
  if (subjKey === "statistics1") {
    // bonus must already be clamped
    let foundF = 100;
    for (let f = 0; f <= 100; f++) {
      let t = calculateFoundationMarks("statistics1", values, f);
      if (t >= targetT) {
        foundF = f;
        break;
      }
    }
    return clamp(foundF);
  }
  if (subjKey === "python") {
    const { GAA, GAAP, Qz1, OPPE1, OPPE2 } = values;
    const needed = (targetT - 0.05 * GAA - 0.1 * GAAP - 0.15 * Qz1 - 0.2 * OPPE1 - 0.2 * OPPE2) / 0.3;
    return clamp(needed);
  }
  // default subjects
  const { GAA, Qz1, Qz2 } = values;
  const needed = (targetT - 0.1 * GAA - 0.25 * Qz1 - 0.25 * Qz2) / 0.4;
  return clamp(needed);
}

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

  // Data Science - Foundation Marks Predictor (new subject filter state)
  const [foundationSubject, setFoundationSubject] = useState("maths1");
  const [foundationInputs, setFoundationInputs] = useState<Record<string, number>>({
    GAA: 80,
    Qz1: 85,
    Qz2: 80,
    Bonus: 0,
    GAAP: 85,
    OPPE1: 80,
    OPPE2: 80,
    // F is not directly input here
  });
  const [targetFinalScore, setTargetFinalScore] = useState(40);
  const [predictedF, setPredictedF] = useState<number|null>(null);
  const [predictedT, setPredictedT] = useState<number|null>(null);

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
      description: "Calculate grades for specific subjects",
      needsFiltering: true
    },
    {
      id: "predictor",
      name: "Marks Predictor",
      icon: TrendingUp,
      description: "Predict required marks based on current scores",
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
            {/* Data Science Grade Calculator */}
            {branch === "data-science" && level !== "all" ? (
              <GradeCalculator level={level as "foundation" | "diploma" | "degree"} />
            ) : branch === "data-science" && level === "all" ? (
              <div className="text-center text-gray-600 text-lg pt-12 pb-16">
                Please select a specific <span className="font-semibold">level</span> (Foundation, Diploma, or Degree) to use the grade calculator.
              </div>
            ) : (
              <div className="text-center text-gray-600 text-lg pt-12 pb-16">
                Grade calculator is only available for <span className="font-semibold">BS Data Science branch</span>.
              </div>
            )}
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
            {/* Foundation: Data Science, Foundation */}
            {branch === "data-science" && level === "foundation" ? (
              <FoundationMarksPredictor />
            ) : branch === "data-science" && level === "diploma" ? (
              <DiplomaMarksPredictor />
            ) : branch === "data-science" && level === "degree" ? (
              <DegreeMarksPredictor />
            ) : (
              <div className="text-center text-gray-600 text-lg pt-12 pb-16">
                Marks predictor is only available for <span className="font-semibold">Foundation, Diploma, or Degree subjects</span> of <span className="font-semibold">BS Data Science branch</span>.
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default IITMToolsTab;
