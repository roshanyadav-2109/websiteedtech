
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Tool {
  id: string;
  title: string;
  description: string;
  category: string;
  userCount: number;
  link: string;
}

const ToolsTab = () => {
  const [tools] = React.useState<Tool[]>([
    {
      id: "jupyter",
      title: "Jupyter Notebook",
      description: "Interactive computing environment for data science and Python programming",
      category: "programming",
      userCount: 3456,
      link: "https://jupyter.org/"
    },
    {
      id: "vscode",
      title: "VS Code with Python Extension",
      description: "Code editor optimized for Python and data science workflows",
      category: "programming",
      userCount: 4231,
      link: "https://code.visualstudio.com/"
    },
    {
      id: "calculator",
      title: "Advanced Scientific Calculator",
      description: "Online calculator with scientific and matrix operations",
      category: "calculator",
      userCount: 2876,
      link: "#"
    },
    {
      id: "formulas",
      title: "Data Science Formula Sheet",
      description: "Comprehensive collection of statistics and ML formulas",
      category: "formula",
      userCount: 3123,
      link: "#"
    },
    {
      id: "circuit-sim",
      title: "Circuit Simulator",
      description: "Simulate electronic circuits online",
      category: "programming",
      userCount: 1458,
      link: "#"
    },
    {
      id: "assignment-helper",
      title: "Assignment Template Generator",
      description: "Generate properly formatted assignment templates",
      category: "helper",
      userCount: 1893,
      link: "#"
    },
  ]);
  
  const [category, setCategory] = React.useState<string>("all");
  
  const filteredTools = category === "all" 
    ? tools 
    : tools.filter(tool => tool.category === category);
  
  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 space-x-2">
        <Badge 
          onClick={() => setCategory("all")}
          className={`cursor-pointer py-2 px-4 ${category === "all" ? "bg-royal text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          All Tools
        </Badge>
        <Badge 
          onClick={() => setCategory("programming")}
          className={`cursor-pointer py-2 px-4 ${category === "programming" ? "bg-royal text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          Programming
        </Badge>
        <Badge 
          onClick={() => setCategory("calculator")}
          className={`cursor-pointer py-2 px-4 ${category === "calculator" ? "bg-royal text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          Calculators
        </Badge>
        <Badge 
          onClick={() => setCategory("formula")}
          className={`cursor-pointer py-2 px-4 ${category === "formula" ? "bg-royal text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          Formula Sheets
        </Badge>
        <Badge 
          onClick={() => setCategory("helper")}
          className={`cursor-pointer py-2 px-4 ${category === "helper" ? "bg-royal text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
        >
          Assignment Helpers
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <Card key={tool.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between items-center">
              <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Open Tool
                </a>
              </Button>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{tool.userCount.toLocaleString()} users</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ToolsTab;
