
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import ContentManagementCard from './ContentManagementCard';
import { useBackend } from '@/components/BackendIntegratedWrapper';
import AdminContentDialog from './AdminContentDialog';

const ContentManagementTab = () => {
  const { notes, pyqs, contentLoading } = useBackend();
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [examTypeFilter, setExamTypeFilter] = useState('');

  const [editingItem, setEditingItem] = useState<any>(null);
  const [editingContentType, setEditingContentType] = useState<'notes' | 'pyqs' | null>(null);

  const handleEdit = (item: any, type: 'notes' | 'pyqs') => {
    setEditingItem(item);
    setEditingContentType(type);
  };

  const handleCloseDialog = () => {
    setEditingItem(null);
    setEditingContentType(null);
  };

  const filterContent = (items: any[]) => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject = !subjectFilter || item.subject === subjectFilter;
      const matchesExamType = !examTypeFilter || item.exam_type === examTypeFilter;
      
      return matchesSearch && matchesSubject && matchesExamType;
    });
  };

  const filteredNotes = filterContent(notes);
  const filteredPyqs = filterContent(pyqs);

  const allSubjects = [...new Set([...notes, ...pyqs].map(item => item.subject).filter(Boolean))];
  const allExamTypes = [...new Set([...notes, ...pyqs].map(item => item.exam_type).filter(Boolean))];

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
                    onEdit={(item) => handleEdit(item, 'notes')}
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
                    onEdit={(item) => handleEdit(item, 'pyqs')}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      {editingItem && editingContentType && (
        <AdminContentDialog
            isOpen={!!editingItem}
            onClose={handleCloseDialog}
            contentType={editingContentType}
            contentToEdit={editingItem}
        />
    )}
    </div>
  );
};

export default ContentManagementTab;
