
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Tool {
  id: string;
  title: string;
  description: string;
  type: string;
  level: string;
  users: number;
  link: string;
}

const ToolsTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");
  
  const tools: Tool[] = [
    {
      id: "grade-calculator-foundation",
      title: "Grade Calculator",
      description: "Calculate your expected grade based on marks in different components",
      type: "calculator",
      level: "foundation",
      users: 1256,
      link: "#grade-calculator"
    },
    {
      id: "grade-calculator-diploma",
      title: "Grade Calculator",
      description: "Calculate your expected grade based on marks in different components for Diploma level",
      type: "calculator",
      level: "diploma",
      users: 982,
      link: "#grade-calculator-diploma"
    },
    {
      id: "grade-calculator-degree",
      title: "Grade Calculator",
      description: "Calculate your expected grade based on marks in different components for Degree level",
      type: "calculator",
      level: "degree",
      users: 754,
      link: "#grade-calculator-degree"
    },
    {
      id: "cgpa-calculator-foundation",
      title: "CGPA Calculator",
      description: "Calculate your cumulative GPA for Foundation level courses",
      type: "calculator",
      level: "foundation",
      users: 1852,
      link: "#cgpa-calculator"
    },
    {
      id: "cgpa-calculator-diploma",
      title: "CGPA Calculator",
      description: "Calculate your cumulative GPA for Diploma level courses",
      type: "calculator",
      level: "diploma",
      users: 1243,
      link: "#cgpa-calculator-diploma"
    },
    {
      id: "cgpa-calculator-degree",
      title: "CGPA Calculator",
      description: "Calculate your cumulative GPA across Degree level courses",
      type: "calculator",
      level: "degree",
      users: 865,
      link: "#cgpa-calculator-degree"
    },
    {
      id: "marks-predictor-foundation",
      title: "Marks Predictor",
      description: "Predict your final marks based on your Foundation level performance",
      type: "calculator",
      level: "foundation",
      users: 967,
      link: "#marks-predictor"
    },
    {
      id: "marks-predictor-diploma",
      title: "Marks Predictor",
      description: "Predict your final marks based on your Diploma level performance",
      type: "calculator",
      level: "diploma",
      users: 732,
      link: "#marks-predictor-diploma"
    },
    {
      id: "marks-predictor-degree",
      title: "Marks Predictor",
      description: "Predict your final marks based on your Degree level performance",
      type: "calculator",
      level: "degree",
      users: 586,
      link: "#marks-predictor-degree"
    },
    {
      id: "marks-predictor-qualifier",
      title: "Marks Predictor",
      description: "Predict your final marks based on your Qualifier level performance",
      type: "calculator",
      level: "qualifier",
      users: 1340,
      link: "#marks-predictor-qualifier"
    },
    {
      id: "grade-calculator-qualifier",
      title: "Grade Calculator",
      description: "Calculate your expected grade based on marks for Qualifier level",
      type: "calculator",
      level: "qualifier",
      users: 1520,
      link: "#grade-calculator-qualifier"
    },
    {
      id: "cgpa-calculator-qualifier",
      title: "CGPA Calculator",
      description: "Calculate your cumulative GPA for Qualifier level courses",
      type: "calculator",
      level: "qualifier",
      users: 1756,
      link: "#cgpa-calculator-qualifier"
    }
  ];
  
  const filteredTools = searchQuery
    ? tools.filter(tool => 
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  const levelFilteredTools = activeLevel === "all" 
    ? filteredTools 
    : filteredTools.filter(tool => tool.level === activeLevel);

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
          <Tabs value={activeLevel} onValueChange={setActiveLevel} className="w-full">
            <TabsList className="w-full grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="all">All Levels</TabsTrigger>
              <TabsTrigger value="qualifier">Qualifier</TabsTrigger>
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
              <TabsTrigger value="degree">Degree</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levelFilteredTools.map((tool) => (
          <Card key={tool.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg flex items-center">
                  <Calculator className="h-5 w-5 mr-2 text-royal" />
                  {tool.title}
                </CardTitle>
                <Badge variant="outline" className="bg-royal/10 text-royal">
                  {tool.level.charAt(0).toUpperCase() + tool.level.slice(1)}
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
        
        {levelFilteredTools.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No tools found matching your search query. Please try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolsTab;
