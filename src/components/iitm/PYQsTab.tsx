
import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PYQ {
  id: string;
  title: string;
  description: string;
  branch: string;
  level: string;
  examType: string;
  year: string;
}

const PYQsTab = () => {
  const [branch, setBranch] = useState("data-science");
  const [level, setLevel] = useState("foundation");
  const [examType, setExamType] = useState("quiz1");
  const [year, setYear] = useState("2023");
  
  const [downloads, setDownloads] = useState({
    "ds-f-q1-2023-1": 186,
    "ds-f-q1-2023-2": 152,
    "ds-f-q2-2023-1": 143,
    "ds-f-et-2023-1": 198,
    "ds-d-q1-2022-1": 87,
    "es-f-q1-2023-1": 92,
    // Add more as needed
  });
  
  const pyqs: PYQ[] = [
    // Data Science - Foundation - 2023
    { id: "ds-f-q1-2023-1", title: "Quiz 1 Set A", description: "Programming & Data Structures", branch: "data-science", level: "foundation", examType: "quiz1", year: "2023" },
    { id: "ds-f-q1-2023-2", title: "Quiz 1 Set B", description: "Programming & Data Structures", branch: "data-science", level: "foundation", examType: "quiz1", year: "2023" },
    { id: "ds-f-q2-2023-1", title: "Quiz 2 Set A", description: "Statistics & Linear Algebra", branch: "data-science", level: "foundation", examType: "quiz2", year: "2023" },
    { id: "ds-f-et-2023-1", title: "End Term Exam", description: "Comprehensive assessment", branch: "data-science", level: "foundation", examType: "endterm", year: "2023" },
    
    // Data Science - Foundation - 2022
    { id: "ds-f-q1-2022-1", title: "Quiz 1", description: "Programming basics", branch: "data-science", level: "foundation", examType: "quiz1", year: "2022" },
    { id: "ds-f-q2-2022-1", title: "Quiz 2", description: "Data analysis", branch: "data-science", level: "foundation", examType: "quiz2", year: "2022" },
    { id: "ds-f-et-2022-1", title: "End Term Exam", description: "Complete syllabus", branch: "data-science", level: "foundation", examType: "endterm", year: "2022" },
    
    // Data Science - Foundation - 2021
    { id: "ds-f-q1-2021-1", title: "Quiz 1", description: "Python and algorithms", branch: "data-science", level: "foundation", examType: "quiz1", year: "2021" },
    { id: "ds-f-et-2021-1", title: "End Term Exam", description: "Complete foundation level", branch: "data-science", level: "foundation", examType: "endterm", year: "2021" },
    
    // Data Science - Diploma - 2023
    { id: "ds-d-q1-2023-1", title: "Quiz 1", description: "Advanced ML concepts", branch: "data-science", level: "diploma", examType: "quiz1", year: "2023" },
    
    // Data Science - Diploma - 2022
    { id: "ds-d-q1-2022-1", title: "Quiz 1", description: "Data visualization", branch: "data-science", level: "diploma", examType: "quiz1", year: "2022" },
    
    // Electronic Systems - Foundation - 2023
    { id: "es-f-q1-2023-1", title: "Quiz 1", description: "Circuit basics", branch: "electronic-systems", level: "foundation", examType: "quiz1", year: "2023" },
    { id: "es-f-et-2023-1", title: "End Term Exam", description: "All foundation topics", branch: "electronic-systems", level: "foundation", examType: "endterm", year: "2023" },
  ];
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    // Actual download logic would go here
  };
  
  const availableYears = [...new Set(pyqs
    .filter(pyq => 
      pyq.branch === branch && 
      pyq.level === level && 
      pyq.examType === examType
    )
    .map(pyq => pyq.year))];
  
  const filteredPYQs = pyqs.filter(pyq => 
    pyq.branch === branch && 
    pyq.level === level && 
    pyq.examType === examType &&
    pyq.year === year
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Tabs value={branch} onValueChange={setBranch} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="data-science">Data Science</TabsTrigger>
              <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <Tabs value={level} onValueChange={setLevel} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
              <TabsTrigger value="degree">Degree</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
          <Tabs value={examType} onValueChange={setExamType} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="quiz1">Quiz 1</TabsTrigger>
              <TabsTrigger value="quiz2">Quiz 2</TabsTrigger>
              <TabsTrigger value="endterm">End Term</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
          <Select value={year} onValueChange={setYear} disabled={availableYears.length === 0}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredPYQs.map((pyq) => (
          <Card key={pyq.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-lg">{pyq.title}</CardTitle>
              <CardDescription>{pyq.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => handleDownload(pyq.id)}
                className="bg-royal hover:bg-royal-dark text-white"
              >
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{downloads[pyq.id] || 0}</span>
                <div className="ml-2 bg-gray-200 h-1.5 w-16 rounded-full overflow-hidden">
                  <div 
                    className="bg-royal h-full rounded-full" 
                    style={{ width: `${Math.min(100, ((downloads[pyq.id] || 0) / 100) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
        
        {filteredPYQs.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No previous year papers available for this selection. Please try another filter combination.
          </div>
        )}
      </div>
    </div>
  );
};

export default PYQsTab;
