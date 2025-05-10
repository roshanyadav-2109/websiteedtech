
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Note {
  id: string;
  title: string;
  description: string;
  level: string;
  branch: string;
}

const BranchNotesTab = () => {
  const [branch, setBranch] = useState("data-science");
  const [level, setLevel] = useState("foundation");
  
  const [downloads, setDownloads] = useState({
    "ds-foundation-1": 123,
    "ds-foundation-2": 98,
    "ds-foundation-3": 76,
    "ds-diploma-1": 65,
    "ds-diploma-2": 45,
    "ds-degree-1": 32,
    "es-foundation-1": 55,
    "es-foundation-2": 43,
    "es-diploma-1": 38,
    "es-degree-1": 24,
  });
  
  const notes: Note[] = [
    // Data Science - Foundation Level
    { id: "ds-foundation-1", title: "Introduction to Programming", description: "Python basics and programming fundamentals", level: "foundation", branch: "data-science" },
    { id: "ds-foundation-2", title: "Mathematics for Data Science", description: "Linear algebra, calculus, and probability", level: "foundation", branch: "data-science" },
    { id: "ds-foundation-3", title: "Statistics Fundamentals", description: "Descriptive and inferential statistics", level: "foundation", branch: "data-science" },
    
    // Data Science - Diploma Level
    { id: "ds-diploma-1", title: "Machine Learning Basics", description: "Supervised and unsupervised learning algorithms", level: "diploma", branch: "data-science" },
    { id: "ds-diploma-2", title: "Data Visualization", description: "Creating effective visualizations using Python", level: "diploma", branch: "data-science" },
    
    // Data Science - Degree Level
    { id: "ds-degree-1", title: "Deep Learning", description: "Neural networks and advanced ML techniques", level: "degree", branch: "data-science" },
    
    // Electronic Systems - Foundation Level
    { id: "es-foundation-1", title: "Circuit Analysis", description: "Basic circuit theory and analysis", level: "foundation", branch: "electronic-systems" },
    { id: "es-foundation-2", title: "Digital Electronics", description: "Boolean algebra and digital circuits", level: "foundation", branch: "electronic-systems" },
    
    // Electronic Systems - Diploma Level
    { id: "es-diploma-1", title: "Analog Electronics", description: "Amplifiers, oscillators, and filters", level: "diploma", branch: "electronic-systems" },
    
    // Electronic Systems - Degree Level
    { id: "es-degree-1", title: "VLSI Design", description: "Very Large Scale Integration design principles", level: "degree", branch: "electronic-systems" },
  ];
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    // Actual download logic would go here
  };
  
  const filteredNotes = notes.filter(note => 
    note.branch === branch && note.level === level
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="mb-4 sm:mb-0 flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Branch</label>
          <Tabs value={branch} onValueChange={setBranch} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="data-science">Data Science</TabsTrigger>
              <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Level</label>
          <Tabs value={level} onValueChange={setLevel} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
              <TabsTrigger value="degree">Degree</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="notes">
          <AccordionTrigger className="text-xl font-medium">
            {branch === "data-science" ? "Data Science" : "Electronic Systems"} - {level.charAt(0).toUpperCase() + level.slice(1)} Level Notes
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>{note.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => handleDownload(note.id)}
                      className="bg-royal hover:bg-royal-dark text-white"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">{downloads[note.id] || 0}</span>
                      <div className="ml-2 bg-gray-200 h-1.5 w-16 rounded-full overflow-hidden">
                        <div 
                          className="bg-royal h-full rounded-full" 
                          style={{ width: `${Math.min(100, ((downloads[note.id] || 0) / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredNotes.length === 0 && (
                <div className="col-span-3 text-center py-8 text-gray-500">
                  No notes available for this selection. Please try another branch or level.
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BranchNotesTab;
