
import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthWrapper from "@/components/AuthWrapper";

interface NEETPYQTabProps {
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

interface PYQ {
  id: string;
  title: string;
  description: string;
  year: string;
}

const NEETPYQTab = ({ downloads, onDownload }: NEETPYQTabProps) => {
  const [year, setYear] = useState("2024");
  
  const years = ["2024", "2023", "2022", "2021", "2020"];
  
  const pyqs: Record<string, PYQ[]> = {
    "2024": [
      { id: "neet-2024-set-a", title: "NEET 2024 Set A", description: "Complete paper with solutions", year: "2024" },
      { id: "neet-2024-set-b", title: "NEET 2024 Set B", description: "Complete paper with solutions", year: "2024" },
    ],
    "2023": [
      { id: "neet-2023-set-a", title: "NEET 2023 Set A", description: "Complete paper with solutions", year: "2023" },
      { id: "neet-2023-set-b", title: "NEET 2023 Set B", description: "Complete paper with solutions", year: "2023" },
    ],
    "2022": [
      { id: "neet-2022-set-a", title: "NEET 2022 Set A", description: "Complete paper with solutions", year: "2022" },
      { id: "neet-2022-set-b", title: "NEET 2022 Set B", description: "Complete paper with solutions", year: "2022" },
    ],
    "2021": [
      { id: "neet-2021-set-a", title: "NEET 2021 Set A", description: "Complete paper with solutions", year: "2021" },
      { id: "neet-2021-set-b", title: "NEET 2021 Set B", description: "Complete paper with solutions", year: "2021" },
    ],
    "2020": [
      { id: "neet-2020-set-a", title: "NEET 2020 Set A", description: "Complete paper with solutions", year: "2020" },
      { id: "neet-2020-set-b", title: "NEET 2020 Set B", description: "Complete paper with solutions", year: "2020" },
    ],
  };

  return (
    <AuthWrapper>
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-4 max-w-xs">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {pyqs[year]?.map((pyq) => (
            <Card key={pyq.id} className="border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{pyq.title}</CardTitle>
                <CardDescription>{pyq.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button
                  onClick={() => onDownload(pyq.id)}
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
          
          {!pyqs[year] || pyqs[year].length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No previous year papers available for this year. Please try another year.
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default NEETPYQTab;
