
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, FileQuestion } from "lucide-react";

interface PYQ {
  id: string;
  title: string;
  description?: string;
  content_url?: string;
  subject?: string;
  class_level?: string;
  exam_type?: string;
  branch?: string;
  level?: string;
  year?: number;
  created_at: string;
}

const PYQsManagerTab = () => {
  const [pyqs, setPyqs] = useState<PYQ[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPyq, setEditingPyq] = useState<PYQ | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_url: '',
    subject: '',
    class_level: '',
    exam_type: '',
    branch: '',
    level: '',
    year: '',
  });

  const examTypes = ['IITM_BS', 'JEE', 'NEET'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'English'];
  const classLevels = ['11th', '12th', 'Foundation Level', 'Diploma Level', 'Degree Level'];
  const branches = ['CSE', 'Physics', 'Mathematics', 'Data Science', 'Economics'];

  const fetchPyqs = async () => {
    try {
      const { data, error } = await supabase
        .from('pyqs')
        .select('*')
        .order('year', { ascending: false });

      if (error) throw error;
      setPyqs(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch PYQs",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPyqs();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content_url: '',
      subject: '',
      class_level: '',
      exam_type: '',
      branch: '',
      level: '',
      year: '',
    });
    setEditingPyq(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const pyqData = {
        title: formData.title,
        description: formData.description || null,
        content_url: formData.content_url || null,
        subject: formData.subject || null,
        class_level: formData.class_level || null,
        exam_type: formData.exam_type || null,
        branch: formData.branch || null,
        level: formData.level || null,
        year: formData.year ? parseInt(formData.year) : null,
      };

      if (editingPyq) {
        const { error } = await supabase
          .from('pyqs')
          .update(pyqData)
          .eq('id', editingPyq.id);

        if (error) throw error;
        toast({ title: "Success", description: "PYQ updated successfully" });
      } else {
        const { error } = await supabase
          .from('pyqs')
          .insert([pyqData]);

        if (error) throw error;
        toast({ title: "Success", description: "PYQ created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchPyqs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save PYQ",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (pyq: PYQ) => {
    setEditingPyq(pyq);
    setFormData({
      title: pyq.title,
      description: pyq.description || '',
      content_url: pyq.content_url || '',
      subject: pyq.subject || '',
      class_level: pyq.class_level || '',
      exam_type: pyq.exam_type || '',
      branch: pyq.branch || '',
      level: pyq.level || '',
      year: pyq.year?.toString() || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (pyqId: string) => {
    if (!confirm('Are you sure you want to delete this PYQ?')) return;

    try {
      const { error } = await supabase
        .from('pyqs')
        .delete()
        .eq('id', pyqId);

      if (error) throw error;
      toast({ title: "Success", description: "PYQ deleted successfully" });
      fetchPyqs();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete PYQ",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">PYQs Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New PYQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPyq ? 'Edit PYQ' : 'Add New PYQ'}</DialogTitle>
              <DialogDescription>
                {editingPyq ? 'Update PYQ details' : 'Fill in the PYQ information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">PYQ Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="content_url">Content URL (PDF/Document Link)</Label>
                <Input
                  id="content_url"
                  type="url"
                  value={formData.content_url}
                  onChange={(e) => setFormData({ ...formData, content_url: e.target.value })}
                  placeholder="https://example.com/pyq.pdf"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select value={formData.exam_type} onValueChange={(value) => setFormData({ ...formData, exam_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      {examTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2024"
                    min="2000"
                    max="2030"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="class_level">Class Level</Label>
                  <Select value={formData.class_level} onValueChange={(value) => setFormData({ ...formData, class_level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class level" />
                    </SelectTrigger>
                    <SelectContent>
                      {classLevels.map((level) => (
                        <SelectItem key={level} value={level}>{level}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Input
                    id="level"
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    placeholder="e.g., Beginner, Intermediate, Advanced"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingPyq ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {pyqs.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <FileQuestion className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">No PYQs found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first PYQ to get started</p>
            </CardContent>
          </Card>
        ) : (
          pyqs.map((pyq) => (
            <Card key={pyq.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{pyq.title}</CardTitle>
                    {pyq.description && <CardDescription>{pyq.description}</CardDescription>}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(pyq)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(pyq.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  {pyq.year && (
                    <div><span className="font-medium">Year:</span> {pyq.year}</div>
                  )}
                  {pyq.exam_type && (
                    <div><span className="font-medium">Exam:</span> {pyq.exam_type}</div>
                  )}
                  {pyq.subject && (
                    <div><span className="font-medium">Subject:</span> {pyq.subject}</div>
                  )}
                  {pyq.class_level && (
                    <div><span className="font-medium">Class:</span> {pyq.class_level}</div>
                  )}
                  {pyq.branch && (
                    <div><span className="font-medium">Branch:</span> {pyq.branch}</div>
                  )}
                </div>
                {pyq.content_url && (
                  <div className="mt-4">
                    <a
                      href={pyq.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      View Content →
                    </a>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PYQsManagerTab;
