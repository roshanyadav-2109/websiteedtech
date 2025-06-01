import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, TrendingUp, Award } from 'lucide-react';

const IITMToolsTab = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'grade-calculator',
      title: 'Grade Calculator',
      description: 'Calculate your grades based on level and branch requirements',
      icon: <Calculator className="h-8 w-8 text-blue-600" />,
      needsFiltering: true
    },
    {
      id: 'cgpa-calculator',
      title: 'CGPA Calculator',
      description: 'Calculate your cumulative GPA across all subjects',
      icon: <Award className="h-8 w-8 text-green-600" />,
      needsFiltering: false
    },
    {
      id: 'marks-predictor',
      title: 'Marks Predictor',
      description: 'Predict your marks based on level and branch analytics',
      icon: <TrendingUp className="h-8 w-8 text-purple-600" />,
      needsFiltering: true
    }
  ];

  if (activeTool) {
    return (
      <div>
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => setActiveTool(null)}
        >
          &larr; Back to Tools
        </Button>
        {activeTool === 'grade-calculator' && <GradeCalculator />}
        {activeTool === 'cgpa-calculator' && <CGPACalculator />}
        {activeTool === 'marks-predictor' && <MarksPredictor />}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <Card 
          key={tool.id}
          className="border-none shadow-md hover:shadow-xl transition-all cursor-pointer group"
          onClick={() => setActiveTool(tool.id)}
        >
          <CardHeader className="text-center">
            <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-royal/10 transition-colors">
              {tool.icon}
            </div>
            <CardTitle>{tool.title}</CardTitle>
            <CardDescription>{tool.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full bg-royal hover:bg-royal-dark text-white">
              Open Tool
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const GradeCalculator = () => {
  const [level, setLevel] = useState('');
  const [branch, setBranch] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', marks: '', maxMarks: '' }]);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', marks: '', maxMarks: '' }]);
  };

  const updateSubject = (index: number, field: string, value: string) => {
    const updated = subjects.map((subject, i) => 
      i === index ? { ...subject, [field]: value } : subject
    );
    setSubjects(updated);
  };

  const calculateGrade = () => {
    // Grade calculation logic here
    console.log('Calculating grade for', { level, branch, subjects });
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Grade Calculator</CardTitle>
        <CardDescription>Calculate your grades with level and branch filtering</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qualifier">Qualifier</SelectItem>
                <SelectItem value="foundation">Foundation</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="degree">Degree</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="electronic-systems">Electronic Systems</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label>Subjects</Label>
          {subjects.map((subject, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Subject name"
                value={subject.name}
                onChange={(e) => updateSubject(index, 'name', e.target.value)}
              />
              <Input
                placeholder="Marks obtained"
                type="number"
                value={subject.marks}
                onChange={(e) => updateSubject(index, 'marks', e.target.value)}
              />
              <Input
                placeholder="Maximum marks"
                type="number"
                value={subject.maxMarks}
                onChange={(e) => updateSubject(index, 'maxMarks', e.target.value)}
              />
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={addSubject}>
              Add Subject
            </Button>
            <Button onClick={calculateGrade} className="bg-royal hover:bg-royal-dark">
              Calculate Grade
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CGPACalculator = () => {
  const [semesters, setSemesters] = useState([{ semester: '1', gpa: '', credits: '' }]);

  const addSemester = () => {
    setSemesters([...semesters, { semester: (semesters.length + 1).toString(), gpa: '', credits: '' }]);
  };

  const updateSemester = (index: number, field: string, value: string) => {
    const updated = semesters.map((sem, i) => 
      i === index ? { ...sem, [field]: value } : sem
    );
    setSemesters(updated);
  };

  const calculateCGPA = () => {
    // CGPA calculation logic here
    console.log('Calculating CGPA for', semesters);
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>CGPA Calculator</CardTitle>
        <CardDescription>Calculate your cumulative GPA across all semesters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <Label>Semester Details</Label>
          {semesters.map((semester, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                placeholder="Semester"
                value={semester.semester}
                onChange={(e) => updateSemester(index, 'semester', e.target.value)}
              />
              <Input
                placeholder="GPA"
                type="number"
                step="0.01"
                max="10"
                value={semester.gpa}
                onChange={(e) => updateSemester(index, 'gpa', e.target.value)}
              />
              <Input
                placeholder="Credits"
                type="number"
                value={semester.credits}
                onChange={(e) => updateSemester(index, 'credits', e.target.value)}
              />
            </div>
          ))}
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={addSemester}>
              Add Semester
            </Button>
            <Button onClick={calculateCGPA} className="bg-royal hover:bg-royal-dark">
              Calculate CGPA
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MarksPredictor = () => {
  const [level, setLevel] = useState('');
  const [branch, setBranch] = useState('');
  const [currentMarks, setCurrentMarks] = useState('');
  const [targetGrade, setTargetGrade] = useState('');

  const predictMarks = () => {
    // Marks prediction logic here
    console.log('Predicting marks for', { level, branch, currentMarks, targetGrade });
  };

  return (
    <Card className="border-none shadow-lg">
      <CardHeader>
        <CardTitle>Marks Predictor</CardTitle>
        <CardDescription>Predict required marks based on level and branch analytics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="level">Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="qualifier">Qualifier</SelectItem>
                <SelectItem value="foundation">Foundation</SelectItem>
                <SelectItem value="diploma">Diploma</SelectItem>
                <SelectItem value="degree">Degree</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="branch">Branch</Label>
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="electronic-systems">Electronic Systems</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="currentMarks">Current Average Marks (%)</Label>
            <Input
              id="currentMarks"
              type="number"
              placeholder="Enter current average"
              value={currentMarks}
              onChange={(e) => setCurrentMarks(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetGrade">Target Grade</Label>
            <Select value={targetGrade} onValueChange={setTargetGrade}>
              <SelectTrigger>
                <SelectValue placeholder="Select target grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A+">A+ (90-100)</SelectItem>
                <SelectItem value="A">A (80-89)</SelectItem>
                <SelectItem value="B+">B+ (70-79)</SelectItem>
                <SelectItem value="B">B (60-69)</SelectItem>
                <SelectItem value="C">C (50-59)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={predictMarks} className="w-full bg-royal hover:bg-royal-dark">
          Predict Required Marks
        </Button>
      </CardContent>
    </Card>
  );
};

export default IITMToolsTab;
