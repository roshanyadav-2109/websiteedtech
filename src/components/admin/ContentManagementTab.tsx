
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ContentManagementCard from './ContentManagementCard';
import { useBackend } from '@/components/BackendIntegratedWrapper';

const ContentManagementTab = () => {
  const { notes, pyqs, courses, contentLoading } = useBackend();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState('');

  const filterContent = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = (item.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                           (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = !subjectFilter || item.subject === subjectFilter;
      const matchesExamType = !examTypeFilter || (item.exam_type || item.exam_category) === examTypeFilter;
      
      return matchesSearch && matchesSubject && matchesExamType;
    });
  };

  const filteredNotes = filterContent(notes);
  const filteredPyqs = filterContent(pyqs);
  const filteredCourses = filterContent(courses || []);

  const allSubjects = [...new Set([...notes, ...pyqs, ...(courses || [])].map(item => item.subject).filter(Boolean))];
  const allExamTypes = [...new Set([...notes, ...pyqs, ...(courses || [])].map(item => item.exam_type || item.exam_category).filter(Boolean))];

  if (contentLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-lg">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-2xl font-bold mb-4">Content Management</h2>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subjects</SelectItem>
              {allSubjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={examTypeFilter} onValueChange={setExamTypeFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by exam type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Exam Types</SelectItem>
              {allExamTypes.map(examType => (
                <SelectItem key={examType} value={examType}>{examType}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="notes">
          <TabsList>
            <TabsTrigger value="notes">Notes ({filteredNotes.length})</TabsTrigger>
            <TabsTrigger value="pyqs">PYQs ({filteredPyqs.length})</TabsTrigger>
            <TabsTrigger value="courses">Courses ({filteredCourses.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="mt-6">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notes found matching your criteria.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredNotes.map(note => (
                  <ContentManagementCard
                    key={note.id}
                    item={note}
                    contentType="notes"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="pyqs" className="mt-6">
            {filteredPyqs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No PYQs found matching your criteria.
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredPyqs.map(pyq => (
                  <ContentManagementCard
                    key={pyq.id}
                    item={pyq}
                    contentType="pyqs"
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No courses found matching your criteria.
              </div>
            ) : (
               <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Bestseller</TableHead>
                      <TableHead>Enrolled</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCourses.map(course => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.exam_category}</TableCell>
                        <TableCell>
                          {course.discounted_price ? (
                            <div className="flex items-center gap-2">
                              <span className="line-through text-gray-500">₹{course.price}</span>
                              <span className="font-semibold">₹{course.discounted_price}</span>
                            </div>
                          ) : `₹${course.price}`}
                        </TableCell>
                        <TableCell>{course.bestseller ? 'Yes' : 'No'}</TableCell>
                        <TableCell>{course.students_enrolled || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
               </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentManagementTab;
