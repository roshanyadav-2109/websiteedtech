
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import AdminAddButton from "@/components/admin/AdminAddButton";
import { 
  BookOpen, 
  FileText, 
  Download, 
  Search, 
  Filter,
  Loader2,
  GraduationCap,
  Calculator,
  BookOpenCheck
} from "lucide-react";

const ResourceHubSectionUpdated = () => {
  const { notes, pyqs, isAdmin, contentLoading, handleDownload } = useBackend();
  const [activeTab, setActiveTab] = useState("notes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExamType, setSelectedExamType] = useState("");
  const [filteredContent, setFilteredContent] = useState<any[]>([]);

  useEffect(() => {
    filterContent();
  }, [notes, pyqs, activeTab, searchTerm, selectedSubject, selectedExamType]);

  const filterContent = () => {
    const content = activeTab === "notes" ? notes : pyqs;
    
    let filtered = content.filter((item: any) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = !selectedSubject || item.subject === selectedSubject;
      const matchesExamType = !selectedExamType || item.exam_type === selectedExamType;
      
      return matchesSearch && matchesSubject && matchesExamType;
    });
    
    setFilteredContent(filtered);
  };

  const getUniqueValues = (content: any[], field: string) => {
    return [...new Set(content.map(item => item[field]).filter(Boolean))];
  };

  const subjects = getUniqueValues([...notes, ...pyqs], 'subject');
  const examTypes = getUniqueValues([...notes, ...pyqs], 'exam_type');

  const handleDownloadClick = async (item: any) => {
    const tableName = activeTab === "notes" ? "notes" : "pyqs";
    await handleDownload(item.id, tableName, item.file_link);
  };

  if (contentLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-royal" />
          <p className="text-lg text-gray-600">Loading resources...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Resource <span className="text-royal">Hub</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Access comprehensive study materials, practice questions, and skill enhancement resources
          </p>
          
          {isAdmin && (
            <div className="flex justify-center gap-4 mb-8">
              <AdminAddButton contentType="notes">
                Add New Notes
              </AdminAddButton>
              <AdminAddButton contentType="pyqs">
                Add New PYQs
              </AdminAddButton>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger 
                value="notes" 
                className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <BookOpen className="h-5 w-5" />
                <span className="hidden sm:inline">Study Notes</span>
                <span className="sm:hidden">Notes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="pyqs" 
                className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <FileText className="h-5 w-5" />
                <span className="hidden sm:inline">Previous Year Questions</span>
                <span className="sm:hidden">PYQs</span>
              </TabsTrigger>
              <TabsTrigger 
                value="calculator" 
                className="flex items-center gap-2 py-3 px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <Calculator className="h-5 w-5" />
                <span className="hidden sm:inline">CGPA Calculator</span>
                <span className="sm:hidden">Calculator</span>
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter Section */}
            {(activeTab === "notes" || activeTab === "pyqs") && (
              <div className="mb-8 space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search resources..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-royal"
                    />
                  </div>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className="w-full md:w-48 h-12">
                      <SelectValue placeholder="All Subjects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedExamType} onValueChange={setSelectedExamType}>
                    <SelectTrigger className="w-full md:w-48 h-12">
                      <SelectValue placeholder="All Exams" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Exams</SelectItem>
                      {examTypes.map((examType) => (
                        <SelectItem key={examType} value={examType}>{examType}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <TabsContent value="notes" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((note) => (
                  <Card key={note.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <BookOpenCheck className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {note.subject && (
                              <Badge variant="secondary" className="text-xs">
                                {note.subject}
                              </Badge>
                            )}
                            {note.exam_type && (
                              <Badge variant="outline" className="text-xs">
                                {note.exam_type}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-royal transition-colors">
                        {note.title}
                      </h3>
                      
                      {note.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {note.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="h-4 w-4 mr-1" />
                          {note.download_count || 0} downloads
                        </div>
                        <Button
                          onClick={() => handleDownloadClick(note)}
                          className="bg-royal hover:bg-royal-dark text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredContent.length === 0 && (
                <div className="text-center py-16">
                  <BookOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No notes found matching your criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="pyqs" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.map((pyq) => (
                  <Card key={pyq.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {pyq.subject && (
                              <Badge variant="secondary" className="text-xs">
                                {pyq.subject}
                              </Badge>
                            )}
                            {pyq.year && (
                              <Badge variant="outline" className="text-xs">
                                {pyq.year}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-royal transition-colors">
                        {pyq.title}
                      </h3>
                      
                      {pyq.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {pyq.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <Download className="h-4 w-4 mr-1" />
                          {pyq.download_count || 0} downloads
                        </div>
                        <Button
                          onClick={() => handleDownloadClick(pyq)}
                          className="bg-royal hover:bg-royal-dark text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredContent.length === 0 && (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">No previous year questions found matching your criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="calculator" className="mt-0">
              <div className="flex justify-center">
                <div className="w-full max-w-4xl">
                  {/* CGPA Calculator will be imported here */}
                  <div className="text-center py-16">
                    <Calculator className="h-16 w-16 mx-auto text-royal mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">CGPA Calculator</h3>
                    <p className="text-gray-600 mb-8">Calculate your CGPA easily with our interactive tool</p>
                    <Button className="bg-royal hover:bg-royal-dark text-white px-8 py-3 text-lg">
                      <Calculator className="h-5 w-5 mr-2" />
                      Open Calculator
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default ResourceHubSectionUpdated;
