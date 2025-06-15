
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, ExternalLink, Search } from "lucide-react";

interface StudyGroup {
  id: string;
  title: string;
  join_link: string;
  social_handle_type: string;
  exam_type: string;
  subject: string;
  branch: string;
  level: string;
  class_level: string;
  created_at: string;
}

const StudyGroupsManagerTab = () => {
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<StudyGroup | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExamType, setFilterExamType] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    join_link: '',
    social_handle_type: '',
    exam_type: '',
    subject: '',
    branch: '',
    level: '',
    class_level: '',
  });

  // Subject options based on exam type
  const getSubjectOptions = (examType: string) => {
    switch (examType) {
      case 'JEE':
        return ['Physics', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Mathematics'];
      case 'NEET':
        return ['Physics', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Botany', 'Zoology'];
      case 'IITM_BS':
        return formData.branch === 'Data Science' 
          ? ['Mathematics', 'Statistics', 'Programming', 'Data Analysis']
          : ['Electronics', 'Signal Processing', 'Circuit Design', 'Digital Systems'];
      default:
        return [];
    }
  };

  const fetchStudyGroups = async () => {
    try {
      const { data, error } = await supabase
        .from('study_groups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStudyGroups(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch study groups",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      join_link: '',
      social_handle_type: '',
      exam_type: '',
      subject: '',
      branch: '',
      level: '',
      class_level: '',
    });
    setEditingGroup(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const groupData = {
        title: formData.title,
        join_link: formData.join_link,
        social_handle_type: formData.social_handle_type,
        exam_type: formData.exam_type || null,
        subject: formData.subject || null,
        branch: formData.exam_type === 'IITM_BS' ? formData.branch : null,
        level: formData.exam_type === 'IITM_BS' ? formData.level : null,
        class_level: ['JEE', 'NEET'].includes(formData.exam_type) ? formData.class_level : null,
      };

      if (editingGroup) {
        const { error } = await supabase
          .from('study_groups')
          .update(groupData)
          .eq('id', editingGroup.id);

        if (error) throw error;
        toast({ title: "Success", description: "Study group updated successfully" });
      } else {
        const { error } = await supabase
          .from('study_groups')
          .insert([groupData]);

        if (error) throw error;
        toast({ title: "Success", description: "Study group created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchStudyGroups();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save study group",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (group: StudyGroup) => {
    setEditingGroup(group);
    setFormData({
      title: group.title,
      join_link: group.join_link,
      social_handle_type: group.social_handle_type,
      exam_type: group.exam_type || '',
      subject: group.subject || '',
      branch: group.branch || '',
      level: group.level || '',
      class_level: group.class_level || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (groupId: string) => {
    if (!confirm('Are you sure you want to delete this study group?')) return;

    try {
      const { error } = await supabase
        .from('study_groups')
        .delete()
        .eq('id', groupId);

      if (error) throw error;
      toast({ title: "Success", description: "Study group deleted successfully" });
      fetchStudyGroups();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete study group",
        variant: "destructive",
      });
    }
  };

  const filteredGroups = studyGroups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         group.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterExamType === 'all' || group.exam_type === filterExamType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Study Groups Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New Study Group
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingGroup ? 'Edit Study Group' : 'Add New Study Group'}</DialogTitle>
              <DialogDescription>
                {editingGroup ? 'Update study group details' : 'Fill in the study group information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social_handle_type">Social Handle Type *</Label>
                  <Select value={formData.social_handle_type} onValueChange={(value) => setFormData({ ...formData, social_handle_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Telegram">Telegram</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select value={formData.exam_type} onValueChange={(value) => setFormData({ ...formData, exam_type: value, subject: '', branch: '', level: '' })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JEE">JEE</SelectItem>
                      <SelectItem value="NEET">NEET</SelectItem>
                      <SelectItem value="IITM_BS">IITM BS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="join_link">Join Link *</Label>
                <Input
                  id="join_link"
                  type="url"
                  value={formData.join_link}
                  onChange={(e) => setFormData({ ...formData, join_link: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>

              {formData.exam_type && (
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSubjectOptions(formData.exam_type).map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {formData.exam_type === 'IITM_BS' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value, subject: '' })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Electronic System">Electronic System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Qualifier">Qualifier</SelectItem>
                        <SelectItem value="Foundation">Foundation</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Degree">Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {['JEE', 'NEET'].includes(formData.exam_type) && (
                <div>
                  <Label htmlFor="class_level">Class Level</Label>
                  <Input
                    id="class_level"
                    value={formData.class_level}
                    onChange={(e) => setFormData({ ...formData, class_level: e.target.value })}
                    placeholder="e.g., Class 11, Class 12"
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingGroup ? 'Update Group' : 'Create Group'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search study groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterExamType} onValueChange={setFilterExamType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by exam type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Exam Types</SelectItem>
            <SelectItem value="JEE">JEE</SelectItem>
            <SelectItem value="NEET">NEET</SelectItem>
            <SelectItem value="IITM_BS">IITM BS</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Study Groups List */}
      <div className="grid gap-4">
        {filteredGroups.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-gray-500">No study groups found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first study group to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredGroups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {group.title}
                      <Badge variant="outline">{group.social_handle_type}</Badge>
                      {group.exam_type && <Badge variant="secondary">{group.exam_type}</Badge>}
                    </CardTitle>
                    <CardDescription>
                      Join this {group.social_handle_type} group for {group.exam_type || 'general'} discussions
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={group.join_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(group)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(group.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {group.subject && <div><span className="font-medium">Subject:</span> {group.subject}</div>}
                  {group.branch && <div><span className="font-medium">Branch:</span> {group.branch}</div>}
                  {group.level && <div><span className="font-medium">Level:</span> {group.level}</div>}
                  {group.class_level && <div><span className="font-medium">Class:</span> {group.class_level}</div>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default StudyGroupsManagerTab;
