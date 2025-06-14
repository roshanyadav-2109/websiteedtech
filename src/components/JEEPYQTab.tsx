
import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthWrapper from "@/components/AuthWrapper";
import AdminAddButton from "@/components/admin/AdminAddButton";

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
  subject: string;
}

const JEEPYQTab = ({ downloads, onDownload }: JEEPYQTabProps) => {
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [year, setYear] = useState("2024");
  const [session, setSession] = useState("January");
  const [availableSessions, setAvailableSessions] = useState<string[]>(["January", "April"]);
  
  const subjects = ["Physics", "Mathematics", "Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"];
  const years = ["2024", "2023", "2022", "2021", "2020"];
  
  const pyqs: PYQ[] = [
    // Physics
    { id: "jee-2024-jan-shift1-phy", title: "Physics January Shift 1", description: "Complete Physics paper with solutions", year: "2024", session: "January", shift: "Shift 1", subject: "Physics" },
    { id: "jee-2024-jan-shift2-phy", title: "Physics January Shift 2", description: "Complete Physics paper with solutions", year: "2024", session: "January", shift: "Shift 2", subject: "Physics" },
    { id: "jee-2024-apr-shift1-phy", title: "Physics April Shift 1", description: "Complete Physics paper with solutions", year: "2024", session: "April", shift: "Shift 1", subject: "Physics" },
    
    // Mathematics
    { id: "jee-2024-jan-shift1-math", title: "Mathematics January Shift 1", description: "Complete Mathematics paper with solutions", year: "2024", session: "January", shift: "Shift 1", subject: "Mathematics" },
    { id: "jee-2024-jan-shift2-math", title: "Mathematics January Shift 2", description: "Complete Mathematics paper with solutions", year: "2024", session: "January", shift: "Shift 2", subject: "Mathematics" },
    
    // Organic Chemistry
    { id: "jee-2024-jan-shift1-org", title: "Organic Chemistry January Shift 1", description: "Complete Organic Chemistry paper", year: "2024", session: "January", shift: "Shift 1", subject: "Organic Chemistry" },
    { id: "jee-2024-jan-shift2-org", title: "Organic Chemistry January Shift 2", description: "Complete Organic Chemistry paper", year: "2024", session: "January", shift: "Shift 2", subject: "Organic Chemistry" },
    
    // Inorganic Chemistry
    { id: "jee-2024-jan-shift1-inorg", title: "Inorganic Chemistry January Shift 1", description: "Complete Inorganic Chemistry paper", year: "2024", session: "January", shift: "Shift 1", subject: "Inorganic Chemistry" },
    
    // Physical Chemistry
    { id: "jee-2024-jan-shift1-phys", title: "Physical Chemistry January Shift 1", description: "Complete Physical Chemistry paper", year: "2024", session: "January", shift: "Shift 1", subject: "Physical Chemistry" },
  ];
  
  // Update available sessions based on selected year and subject
  useEffect(() => {
    const sessionsForYearAndSubject = [...new Set(pyqs
      .filter(pyq => pyq.year === year && pyq.subject === activeSubject)
      .map(pyq => pyq.session))];
    
    setAvailableSessions(sessionsForYearAndSubject);
    
    if (!sessionsForYearAndSubject.includes(session) && sessionsForYearAndSubject.length > 0) {
      setSession(sessionsForYearAndSubject[0]);
    }
  }, [year, activeSubject]);
  
  const filteredPapers = pyqs.filter(
    pyq => pyq.year === year && pyq.session === session && pyq.subject === activeSubject
  );

  return (
    <AuthWrapper>
      <div className="space-y-6">
        {/* Subject Tabs */}
        <div className="mb-6">
          <Tabs value={activeSubject} onValueChange={setActiveSubject}>
            <div className="overflow-x-auto pb-2">
              <TabsList className="w-full min-w-fit">
                {subjects.map((subject) => (
                  <TabsTrigger key={subject} value={subject} className="rounded-md flex-shrink-0">
                    {subject}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
        </div>

        {/* Filters and Subject-Specific Add Button */}
        <div className="flex justify-between items-end mb-6">
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

          <AdminAddButton 
            contentType="pyqs"
            examType="JEE"
            prefilledSubject={activeSubject}
          >
            Add {activeSubject} PYQs
          </AdminAddButton>
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
              No {activeSubject} papers available for {year} {session}. Please try a different selection.
            </div>
          )}
        </div>
      </div>
    </AuthWrapper>
  );
};

export default JEEPYQTab;
