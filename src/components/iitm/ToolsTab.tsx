
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tool {
  id: string;
  title: string;
  description: string;
  type: string;
  users: number;
  link: string;
}

const ToolsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  
  const tools: Tool[] = [
    {
      id: "grade-calculator",
      title: "Grade Calculator",
      description: "Calculate your expected grade based on marks in different components",
      type: "calculator",
      users: 1256,
      link: "#grade-calculator"
    },
    {
      id: "cgpa-calculator",
      title: "CGPA Calculator",
      description: "Calculate your cumulative GPA across all courses",
      type: "calculator",
      users: 1852,
      link: "#cgpa-calculator"
    },
    {
      id: "marks-predictor",
      title: "Marks Predictor",
      description: "Predict your final marks based on your current performance",
      type: "calculator",
      users: 967,
      link: "#marks-predictor"
    },
    {
      id: "python-playground",
      title: "Python Code Playground",
      description: "Online Python environment for testing code",
      type: "programming",
      users: 2347,
      link: "#python-playground"
    },
    {
      id: "math-formula-sheet",
      title: "Math Formula Sheet",
      description: "Interactive formula sheet for mathematics",
      type: "reference",
      users: 1589,
      link: "#math-formula"
    },
    {
      id: "time-table-creator",
      title: "Course Time Table Creator",
      description: "Plan your course schedule efficiently",
      type: "planner",
      users: 1122,
      link: "#time-table-creator"
    },
    {
      id: "assignment-tracker",
      title: "Assignment Progress Tracker",
      description: "Track your assignments and submissions",
      type: "planner",
      users: 1756,
      link: "#assignment-tracker"
    },
    {
      id: "practice-quiz",
      title: "Practice Quiz Generator",
      description: "Generate practice quizzes for any course topic",
      type: "practice",
      users: 2103,
      link: "#practice-quiz"
    }
  ];
  
  const filteredTools = searchQuery
    ? tools.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  const categoryTools = activeCategory === "all" 
    ? filteredTools 
    : filteredTools.filter(tool => tool.type === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search tools..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex-shrink-0">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="calculator">Calculators</TabsTrigger>
              <TabsTrigger value="programming">Programming</TabsTrigger>
              <TabsTrigger value="reference">References</TabsTrigger>
              <TabsTrigger value="planner">Planners</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryTools.map((tool) => (
          <Card key={tool.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <Badge variant={tool.type === "calculator" ? "default" : "outline"} className={tool.type === "calculator" ? "bg-royal" : "bg-royal/10 text-royal"}>
                  {tool.type.charAt(0).toUpperCase() + tool.type.slice(1)}
                </Badge>
              </div>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  Use Tool
                </a>
              </Button>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{tool.users} users</span>
              </div>
            </CardFooter>
          </Card>
        ))}
        
        {categoryTools.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No tools found matching your search query. Please try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsTab;
