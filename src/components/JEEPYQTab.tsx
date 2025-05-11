
import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AuthWrapper from "@/components/AuthWrapper";

interface JEEPYQTabProps {
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

interface PYQ {
  id: string;
  title: string;
  description: string;
  year: string;
  session: string;
  shift: string;
}

const JEEPYQTab = ({ downloads, onDownload }: JEEPYQTabProps) => {
  const [year, setYear] = useState("2024");
  const [session, setSession] = useState("January");
  const [availableSessions, setAvailableSessions] = useState<string[]>(["January", "April"]);
  
  const years = ["2024", "2023", "2022", "2021", "2020"];
  
  const pyqs: PYQ[] = [
    // 2024
    { id: "jee-2024-jan-shift1", title: "JEE Main 2024 January Shift 1", description: "Complete paper with solutions", year: "2024", session: "January", shift: "Shift 1" },
    { id: "jee-2024-jan-shift2", title: "JEE Main 2024 January Shift 2", description: "Complete paper with solutions", year: "2024", session: "January", shift: "Shift 2" },
    { id: "jee-2024-apr-shift1", title: "JEE Main 2024 April Shift 1", description: "Complete paper with solutions", year: "2024", session: "April", shift: "Shift 1" },
    { id: "jee-2024-apr-shift2", title: "JEE Main 2024 April Shift 2", description: "Complete paper with solutions", year: "2024", session: "April", shift: "Shift 2" },
    
    // 2023
    { id: "jee-2023-jan-shift1", title: "JEE Main 2023 January Shift 1", description: "Complete paper with solutions", year: "2023", session: "January", shift: "Shift 1" },
    { id: "jee-2023-jan-shift2", title: "JEE Main 2023 January Shift 2", description: "Complete paper with solutions", year: "2023", session: "January", shift: "Shift 2" },
    { id: "jee-2023-apr-shift1", title: "JEE Main 2023 April Shift 1", description: "Complete paper with solutions", year: "2023", session: "April", shift: "Shift 1" },
    { id: "jee-2023-apr-shift2", title: "JEE Main 2023 April Shift 2", description: "Complete paper with solutions", year: "2023", session: "April", shift: "Shift 2" },
    
    // 2022
    { id: "jee-2022-jun-shift1", title: "JEE Main 2022 June Shift 1", description: "Complete paper with solutions", year: "2022", session: "June", shift: "Shift 1" },
    { id: "jee-2022-jun-shift2", title: "JEE Main 2022 June Shift 2", description: "Complete paper with solutions", year: "2022", session: "June", shift: "Shift 2" },
    { id: "jee-2022-jul-shift1", title: "JEE Main 2022 July Shift 1", description: "Complete paper with solutions", year: "2022", session: "July", shift: "Shift 1" },
    { id: "jee-2022-jul-shift2", title: "JEE Main 2022 July Shift 2", description: "Complete paper with solutions", year: "2022", session: "July", shift: "Shift 2" },
    
    // 2021
    { id: "jee-2021-feb-shift1", title: "JEE Main 2021 February Shift 1", description: "Complete paper with solutions", year: "2021", session: "February", shift: "Shift 1" },
    { id: "jee-2021-feb-shift2", title: "JEE Main 2021 February Shift 2", description: "Complete paper with solutions", year: "2021", session: "February", shift: "Shift 2" },
    { id: "jee-2021-mar-shift1", title: "JEE Main 2021 March Shift 1", description: "Complete paper with solutions", year: "2021", session: "March", shift: "Shift 1" },
    { id: "jee-2021-mar-shift2", title: "JEE Main 2021 March Shift 2", description: "Complete paper with solutions", year: "2021", session: "March", shift: "Shift 2" },
    
    // 2020
    { id: "jee-2020-jan-shift1", title: "JEE Main 2020 January Shift 1", description: "Complete paper with solutions", year: "2020", session: "January", shift: "Shift 1" },
    { id: "jee-2020-jan-shift2", title: "JEE Main 2020 January Shift 2", description: "Complete paper with solutions", year: "2020", session: "January", shift: "Shift 2" },
    { id: "jee-2020-sep-shift1", title: "JEE Main 2020 September Shift 1", description: "Complete paper with solutions", year: "2020", session: "September", shift: "Shift 1" },
    { id: "jee-2020-sep-shift2", title: "JEE Main 2020 September Shift 2", description: "Complete paper with solutions", year: "2020", session: "September", shift: "Shift 2" },
  ];
  
  // Update available sessions based on selected year
  useEffect(() => {
    const sessionsForYear = [...new Set(pyqs
      .filter(pyq => pyq.year === year)
      .map(pyq => pyq.session))];
    
    setAvailableSessions(sessionsForYear);
    
    // If current session isn't available for this year, select the first available one
    if (!sessionsForYear.includes(session) && sessionsForYear.length > 0) {
      setSession(sessionsForYear[0]);
    }
  }, [year]);
  
  const filteredPapers = pyqs.filter(
    pyq => pyq.year === year && pyq.session === session
  );

  return (
    <AuthWrapper>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
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
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Session</label>
            <Select value={session} onValueChange={setSession} disabled={availableSessions.length === 0}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Session" />
              </SelectTrigger>
              <SelectContent>
                {availableSessions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredPapers.map((pyq) => (
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
          
          {filteredPapers.length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              No previous year papers available for this selection. Please try a different year or session.
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default JEEPYQTab;
