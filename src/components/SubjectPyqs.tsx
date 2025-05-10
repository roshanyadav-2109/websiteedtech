
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

interface PyqSet {
  id: string;
  title: string;
  description: string;
}

interface SubjectPyqsProps {
  years: string[];
  pyqsByYear: Record<string, PyqSet[]>;
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

const SubjectPyqs = ({ years, pyqsByYear, downloads, onDownload }: SubjectPyqsProps) => {
  const [selectedYear, setSelectedYear] = useState(years[0] || "");

  return (
    <div className="mt-4">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Year</label>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pyqsByYear[selectedYear]?.map((pyq) => (
          <Card key={pyq.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{pyq.title}</CardTitle>
                <Badge variant="outline" className="ml-2">
                  {selectedYear}
                </Badge>
              </div>
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
      </div>
    </div>
  );
};

export default SubjectPyqs;
