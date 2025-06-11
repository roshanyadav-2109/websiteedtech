
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
import { Plus, Edit, Trash2, Calendar } from "lucide-react";

interface ImportantDate {
  id: string;
  title: string;
  description?: string;
  date_value: string;
  exam_type?: string;
  branch?: string;
  level?: string;
  created_at: string;
}

const DatesManagerTab = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDate, setEditingDate] = useState<ImportantDate | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_value: '',
    exam_type: '',
    branch: '',
    level: '',
  });

  const examTypes = ['IITM_BS', 'JEE', 'NEET'];
  const branches = ['CSE', 'Physics', 'Mathematics', 'Data Science', 'Economics'];

  const fetchDates = async () => {
    try {
      const { data, error } = await supabase
        .from('important_dates')
        .select('*')
        .order('date_value', { ascending: true });

      if (error) throw error;
      setDates(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch important dates",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchDates();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date_value: '',
      exam_type: '',
      branch: '',
      level: '',
    });
    setEditingDate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dateData = {
        title: formData.title,
        description: formData.description || null,
        date_value: formData.date_value,
        exam_type: formData.exam_type || null,
        branch: formData.branch || null,
        level: formData.level || null,
      };

      if (editingDate) {
        const { error } = await supabase
          .from('important_dates')
          .update(dateData)
          .eq('id', editingDate.id);

        if (error) throw error;
        toast({ title: "Success", description: "Important date updated successfully" });
      } else {
        const { error } = await supabase
          .from('important_dates')
          .insert([dateData]);

        if (error) throw error;
        toast({ title: "Success", description: "Important date created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchDates();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save important date",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (date: ImportantDate) => {
    setEditingDate(date);
    setFormData({
      title: date.title,
      description: date.description || '',
      date_value: date.date_value,
      exam_type: date.exam_type || '',
      branch: date.branch || '',
      level: date.level || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (dateId: string) => {
    if (!confirm('Are you sure you want to delete this important date?')) return;

    try {
      const { error } = await supabase
        .from('important_dates')
        .delete()
        .eq('id', dateId);

      if (error) throw error;
      toast({ title: "Success", description: "Important date deleted successfully" });
      fetchDates();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete important date",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Important Dates Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add Important Date
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingDate ? 'Edit Date' : 'Add Important Date'}</DialogTitle>
              <DialogDescription>
                {editingDate ? 'Update date details' : 'Fill in the important date information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
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
                <Label htmlFor="date_value">Date</Label>
                <Input
                  id="date_value"
                  type="date"
                  value={formData.date_value}
                  onChange={(e) => setFormData({ ...formData, date_value: e.target.value })}
                  required
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
                      <SelectItem value="">All Exams</SelectItem>
                      {examTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Branches</SelectItem>
                      {branches.map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
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

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingDate ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {dates.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Calendar className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">No important dates found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first important date to get started</p>
            </CardContent>
          </Card>
        ) : (
          dates.map((date) => (
            <Card key={date.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{date.title}</CardTitle>
                    {date.description && <CardDescription>{date.description}</CardDescription>}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(date)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(date.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Date:</span> {new Date(date.date_value).toLocaleDateString()}
                  </div>
                  {date.exam_type && (
                    <div><span className="font-medium">Exam:</span> {date.exam_type}</div>
                  )}
                  {date.branch && (
                    <div><span className="font-medium">Branch:</span> {date.branch}</div>
                  )}
                  {date.level && (
                    <div><span className="font-medium">Level:</span> {date.level}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DatesManagerTab;
