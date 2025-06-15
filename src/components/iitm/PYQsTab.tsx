import React, { useState, useEffect } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAddButton from "@/components/admin/AdminAddButton";
import { ShimmerButton } from "../ui/shimmer-button";
import { supabase } from "@/integrations/supabase/client";

interface PYQ {
  id: string;
  title: string;
  description: string;
  branch: string;
  level: string;
  examType: string;
  year: string;
}

const PYQsTab = () => {
  const [branch, setBranch] = useState("data-science");
  // Add "qualifier" to default options
  const [level, setLevel] = useState("foundation");
  const [examType, setExamType] = useState("quiz1");
  const [year, setYear] = useState("2023");
  
  const [downloads, setDownloads] = useState({
    "ds-f-q1-2023-1": 186,
    "ds-f-q1-2023-2": 152,
    "ds-f-q2-2023-1": 143,
    "ds-f-et-2023-1": 198,
  });
  
  const [pyqs, setPyqs] = useState<PYQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase integration and mapping
  useEffect(() => {
    const fetchPyqs = async () => {
      setLoading(true);
      let q = supabase.from('pyqs').select('*')
        .eq('is_active', true)
        .eq('branch', branch)
        .eq('level', level);

      if (level !== 'qualifier') {
        q = q.eq('exam_type', examType);
      }
      let { data, error } = await q.order('created_at', { ascending: false });
      if (error) {
        setPyqs([]);
        setLoading(false);
        return;
      }
      // Map Supabase data to PYQ type
      const mapped = (data || []).map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description || "",
        branch: p.branch || branch,
        level: p.level || level,
        examType: p.exam_type || examType,
        year: p.year?.toString() || "2023",
      }));
      setPyqs(mapped);
      setLoading(false);
    };
    fetchPyqs();
  }, [branch, level, examType]);
  
  // Add "qualifier" as a level. Add some sample PYQ for display if needed.
  const hardcodedPyqs: PYQ[] = [
    // Data Science Foundation
    { id: "ds-f-q1-2023-prog1", title: "Quiz 1 Set A", description: "Python basics and algorithms", branch: "data-science", level: "foundation", examType: "quiz1", year: "2023" },
    { id: "ds-f-q1-2023-prog2", title: "Quiz 1 Set B", description: "Data structures in Python", branch: "data-science", level: "foundation", examType: "quiz1", year: "2023" },
    { id: "ds-f-q2-2023-stats1", title: "Quiz 2 Set A", description: "Descriptive statistics", branch: "data-science", level: "foundation", examType: "quiz2", year: "2023" },
    { id: "es-f-q1-2023-circuit1", title: "Circuit Analysis Quiz 1", description: "Basic circuit laws", branch: "electronic-systems", level: "foundation", examType: "quiz1", year: "2023" },
    // Example qualifier PYQ (update this as needed)
    { id: "ds-q-2024-set1", title: "Qualifier 2024 Set 1", description: "Qualifier entrance paper", branch: "data-science", level: "qualifier", examType: "", year: "2024" }
  ];
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };
  
  // Use fetched PYQs if available, otherwise fall back to hardcoded ones
  const displayPyqs = pyqs.length > 0 ? 
    pyqs.map(p => ({
      id: p.id,
      title: p.title,
      description: p.description || "",
      branch: p.branch || branch,
      level: p.level || level,
      examType: p.examType || examType,
      year: p.year?.toString() || "2023"
    })) : 
    hardcodedPyqs;
  
  // Filtering: For qualifier, ignore examType
  const availableYears = [...new Set(displayPyqs
    .filter(pyq =>
      pyq.branch === branch &&
      pyq.level === level &&
      (level === "qualifier" ? true : pyq.examType === examType)
    )
    .map(pyq => pyq.year))];

  const filteredPYQs = displayPyqs.filter(pyq =>
    pyq.branch === branch &&
    pyq.level === level &&
    (level === "qualifier" ? true : pyq.examType === examType) &&
    pyq.year === year
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
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
              <TabsTrigger value="degree">Degree</TabsTrigger>
              <TabsTrigger value="qualifier">Qualifier</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Exam Type (hidden for "qualifier"), Year selector and Add Button */}
      <div className="flex justify-between items-end mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg">
          {/* Hide EXAM TYPE selection if level is "qualifier" */}
          {level !== "qualifier" && (
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
          )}
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

        {/* Remove subject prefill for add button */}
        <AdminAddButton 
          contentType="pyqs"
          examType="IITM_BS"
          branch={branch}
          level={level}
        >
          Add PYQs
        </AdminAddButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {loading ? (
          <div className="col-span-3 flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
          </div>
        ) : (
          filteredPYQs.map((pyq) => (
            <Card key={pyq.id} className="border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{pyq.title}</CardTitle>
                <CardDescription>{pyq.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <ShimmerButton
                  onClick={() => handleDownload(pyq.id)}
                  background="rgba(26, 86, 219, 0.8)"
                  borderRadius="var(--radius)"
                >
                  <span className="flex items-center text-white">
                      <Download className="h-4 w-4 mr-2" /> Download
                  </span>
                </ShimmerButton>
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
          ))
        )}
        
        {!loading && filteredPYQs.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No papers available for this selection. Please try another filter combination.
          </div>
        )}
      </div>
    </div>
  );
};

export default PYQsTab;
