
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Download, Search } from "lucide-react";

interface PYQ {
  id: string;
  title: string;
  description: string;
  year: number;
  subject: string;
  exam_type: string;
  branch: string;
  level: string;
  session: string;
  shift: string;
  file_link: string;
  download_count: number;
  created_at: string;
}

const PYQsManagerTab = () => {
  const [pyqs, setPyqs] = useState<PYQ[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPyq, setEditingPyq] = useState<PYQ | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExamType, setFilterExamType] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
    subject: '',
    exam_type: '',
    branch: '',
    level: '',
    session: '',
    shift: '',
    file_link: '',
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

  const fetchPyqs = async () => {
    try {
      const { data, error } = await supabase
        .from('pyqs')
        .select('*')
        .eq('is_active', true)
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
      year: '',
      subject: '',
      exam_type: '',
      branch: '',
      level: '',
      session: '',
      shift: '',
      file_link: '',
    });
    setEditingPyq(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const pyqData = {
        title: formData.title,
        description: formData.description,
        year: formData.year ? parseInt(formData.year) : null,
        subject: formData.subject || null,
        exam_type: formData.exam_type || null,
        branch: formData.exam_type === 'IITM_BS' ? formData.branch : null,
        level: formData.exam_type === 'IITM_BS' ? formData.level : null,
        session: formData.exam_type === 'JEE' ? formData.session : null,
        shift: formData.exam_type === 'JEE' ? formData.shift : null,
        file_link: formData.file_link || null,
        upload_date: new Date().toISOString(),
        download_count: 0,
        is_active: true,
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
      year: pyq.year?.toString() || '',
      subject: pyq.subject || '',
      exam_type: pyq.exam_type || '',
      branch: pyq.branch || '',
      level: pyq.level || '',
      session: pyq.session || '',
      shift: pyq.shift || '',
      file_link: pyq.file_link || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (pyqId: string) => {
    if (!confirm('Are you sure you want to delete this PYQ?')) return;

    try {
      const { error } = await supabase
        .from('pyqs')
        .update({ is_active: false })
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

  const filteredPyqs = pyqs.filter(pyq => {
    const matchesSearch = pyq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pyq.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pyq.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterExamType === 'all' || pyq.exam_type === filterExamType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Previous Year Questions Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New PYQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPyq ? 'Edit PYQ' : 'Add New PYQ'}</DialogTitle>
              <DialogDescription>
                {editingPyq ? 'Update PYQ details' : 'Fill in the PYQ information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
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

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exam_type">Exam Type *</Label>
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
              </div>

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

              {formData.exam_type === 'JEE' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="session">Session</Label>
                    <Input
                      id="session"
                      value={formData.session}
                      onChange={(e) => setFormData({ ...formData, session: e.target.value })}
                      placeholder="e.g., Session 1, Session 2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="shift">Shift</Label>
                    <Select value={formData.shift} onValueChange={(value) => setFormData({ ...formData, shift: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select shift" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Shift 1">Shift 1</SelectItem>
                        <SelectItem value="Shift 2">Shift 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="file_link">File Link</Label>
                <Input
                  id="file_link"
                  type="url"
                  value={formData.file_link}
                  onChange={(e) => setFormData({ ...formData, file_link: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingPyq ? 'Update PYQ' : 'Create PYQ'}
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
            placeholder="Search PYQs..."
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

      {/* PYQs List */}
      <div className="grid gap-4">
        {filteredPyqs.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-gray-500">No PYQs found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first PYQ to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredPyqs.map((pyq) => (
            <Card key={pyq.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {pyq.title}
                      {pyq.exam_type && <Badge variant="outline">{pyq.exam_type}</Badge>}
                      {pyq.year && <Badge variant="secondary">{pyq.year}</Badge>}
                    </CardTitle>
                    <CardDescription>{pyq.description}</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    {pyq.file_link && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={pyq.file_link} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {pyq.subject && <div><span className="font-medium">Subject:</span> {pyq.subject}</div>}
                  {pyq.branch && <div><span className="font-medium">Branch:</span> {pyq.branch}</div>}
                  {pyq.level && <div><span className="font-medium">Level:</span> {pyq.level}</div>}
                  {pyq.session && <div><span className="font-medium">Session:</span> {pyq.session}</div>}
                  {pyq.shift && <div><span className="font-medium">Shift:</span> {pyq.shift}</div>}
                  <div><span className="font-medium">Downloads:</span> {pyq.download_count}</div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default PYQsManagerTab;
