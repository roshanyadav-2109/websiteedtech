
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import AdminAddButton from "@/components/admin/AdminAddButton";

interface PyqSet {
  id: string;
  title: string;
  description: string;
  subject: string;
  examType: string;
}

interface SubjectPyqsProps {
  subject: string;
  examType: string;
  years: string[];
  pyqsByYear: Record<string, PyqSet[]>;
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

const SubjectPyqs = ({ subject, examType, years, pyqsByYear, downloads, onDownload }: SubjectPyqsProps) => {
  const [selectedYear, setSelectedYear] = useState(years[0] || "");

  // Filter PYQs by subject and exam type
  const filteredPyqs = pyqsByYear[selectedYear]?.filter(pyq => 
    pyq.subject === subject && pyq.examType === examType
  ) || [];

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
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
        
        <AdminAddButton 
          contentType="pyqs"
          examType={examType}
        >
          Add {subject} PYQs
        </AdminAddButton>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {subject} - {selectedYear} Previous Year Questions
        </h3>
        <p className="text-sm text-gray-600">
          Download previous year questions for {subject} ({examType})
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPyqs.map((pyq) => (
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
        
        {filteredPyqs.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No {subject} previous year papers available for {selectedYear}. Please try a different year.
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPyqs;
