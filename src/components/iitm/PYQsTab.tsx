
import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAddButton from "@/components/admin/AdminAddButton";

interface PYQ {
  id: string;
  title: string;
  description: string;
  branch: string;
  level: string;
  examType: string;
  year: string;
  subject: string;
}

const PYQsTab = () => {
  const [activeSubject, setActiveSubject] = useState("Programming");
  const [branch, setBranch] = useState("data-science");
  const [level, setLevel] = useState("foundation");
  const [examType, setExamType] = useState("quiz1");
  const [year, setYear] = useState("2023");
  
  const [downloads, setDownloads] = useState({
    "ds-f-q1-2023-1": 186,
    "ds-f-q1-2023-2": 152,
    "ds-f-q2-2023-1": 143,
    "ds-f-et-2023-1": 198,
    // ... keep existing code (download counts)
  });
  
  const subjects = {
    "data-science": {
      "foundation": ["Programming", "Statistics", "Linear Algebra", "Mathematics"],
      "diploma": ["Machine Learning", "Data Visualization", "Advanced Statistics"],
      "degree": ["Deep Learning", "Big Data", "Research Methods"]
    },
    "electronic-systems": {
      "foundation": ["Circuit Analysis", "Digital Electronics", "Signals"],
      "diploma": ["Embedded Systems", "VLSI", "Communication"],
      "degree": ["Advanced Electronics", "System Design"]
    }
  };
  
  const pyqs: PYQ[] = [
    // Data Science Foundation Programming
    { id: "ds-f-q1-2023-prog1", title: "Programming Quiz 1 Set A", description: "Python basics and algorithms", branch: "data-science", level: "foundation", examType: "quiz1", year: "2023", subject: "Programming" },
    { id: "ds-f-q1-2023-prog2", title: "Programming Quiz 1 Set B", description: "Data structures in Python", branch: "data-science", level: "foundation", examType: "quiz1", year: "2023", subject: "Programming" },
    
    // Data Science Foundation Statistics
    { id: "ds-f-q2-2023-stats1", title: "Statistics Quiz 2 Set A", description: "Descriptive statistics", branch: "data-science", level: "foundation", examType: "quiz2", year: "2023", subject: "Statistics" },
    
    // Electronic Systems Foundation Circuits
    { id: "es-f-q1-2023-circuit1", title: "Circuit Analysis Quiz 1", description: "Basic circuit laws", branch: "electronic-systems", level: "foundation", examType: "quiz1", year: "2023", subject: "Circuit Analysis" },
  ];
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };
  
  const currentSubjects = subjects[branch as keyof typeof subjects]?.[level as keyof typeof subjects["data-science"]] || [];
  
  const availableYears = [...new Set(pyqs
    .filter(pyq => 
      pyq.branch === branch && 
      pyq.level === level && 
      pyq.examType === examType &&
      pyq.subject === activeSubject
    )
    .map(pyq => pyq.year))];
  
  const filteredPYQs = pyqs.filter(pyq => 
    pyq.branch === branch && 
    pyq.level === level && 
    pyq.examType === examType &&
    pyq.year === year &&
    pyq.subject === activeSubject
  );

  return (
    <div className="space-y-6">
      {/* Branch and Level Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Tabs value={branch} onValueChange={setBranch}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="data-science">Data Science</TabsTrigger>
              <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <Tabs value={level} onValueChange={setLevel}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
              <TabsTrigger value="degree">Degree</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Subject Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
        <Tabs value={activeSubject} onValueChange={setActiveSubject}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full min-w-fit">
              {currentSubjects.map((subject) => (
                <TabsTrigger key={subject} value={subject} className="rounded-md flex-shrink-0">
                  {subject}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Exam Type, Year and Subject-Specific Add Button */}
      <div className="flex justify-between items-end mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
            <Tabs value={examType} onValueChange={setExamType}>
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

        <AdminAddButton 
          contentType="pyqs"
          examType="IITM_BS"
          prefilledSubject={activeSubject}
          branch={branch}
          level={level}
        >
          Add {activeSubject} PYQs
        </AdminAddButton>
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
            No {activeSubject} papers available for this selection. Please try another filter combination.
          </div>
        )}
      </div>
    </div>
  );
};

export default PYQsTab;
