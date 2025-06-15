
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
import { Plus, Edit, Trash2, Search, Calendar } from "lucide-react";

interface ImportantDate {
  id: string;
  title: string;
  description: string;
  date_value: string;
  exam_type: string;
  branch: string;
  level: string;
  tag: string;
  matter: string;
  is_highlighted: boolean;
  created_at: string;
}

const DatesManagerTab = () => {
  const [dates, setDates] = useState<ImportantDate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDate, setEditingDate] = useState<ImportantDate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExamType, setFilterExamType] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date_value: '',
    exam_type: '',
    branch: '',
    level: '',
    tag: '',
    matter: '',
    is_highlighted: false,
  });

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
      tag: '',
      matter: '',
      is_highlighted: false,
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
        branch: formData.exam_type === 'IITM_BS' ? formData.branch : null,
        level: formData.exam_type === 'IITM_BS' ? formData.level : null,
        tag: formData.tag || null,
        matter: formData.matter || null,
        is_highlighted: formData.is_highlighted,
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
      tag: date.tag || '',
      matter: date.matter || '',
      is_highlighted: date.is_highlighted || false,
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

  const filteredDates = dates.filter(date => {
    const matchesSearch = date.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         date.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         date.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         date.matter?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterExamType === 'all' || date.exam_type === filterExamType;
    return matchesSearch && matchesFilter;
  });

  const isDatePast = (dateValue: string) => {
    return new Date(dateValue) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Important Dates Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New Date
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingDate ? 'Edit Important Date' : 'Add New Important Date'}</DialogTitle>
              <DialogDescription>
                {editingDate ? 'Update important date details' : 'Fill in the important date information'}
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
                  <Label htmlFor="date_value">Date *</Label>
                  <Input
                    id="date_value"
                    type="date"
                    value={formData.date_value}
                    onChange={(e) => setFormData({ ...formData, date_value: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select value={formData.exam_type} onValueChange={(value) => setFormData({ ...formData, exam_type: value, branch: '', level: '' })}>
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
                  <Label htmlFor="tag">Tag</Label>
                  <Input
                    id="tag"
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                    placeholder="e.g., Registration, Exam, Results"
                  />
                </div>
              </div>

              {formData.exam_type === 'IITM_BS' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
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

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the event"
                />
              </div>

              <div>
                <Label htmlFor="matter">Important Date Matter</Label>
                <Textarea
                  id="matter"
                  value={formData.matter}
                  onChange={(e) => setFormData({ ...formData, matter: e.target.value })}
                  rows={3}
                  placeholder="Detailed information about what's happening on this date"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_highlighted"
                  checked={formData.is_highlighted}
                  onChange={(e) => setFormData({ ...formData, is_highlighted: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="is_highlighted">Highlighted Date (appears prominently)</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingDate ? 'Update Date' : 'Create Date'}
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
            placeholder="Search important dates..."
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

      {/* Important Dates List */}
      <div className="grid gap-4">
        {filteredDates.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-gray-500">No important dates found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first important date to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredDates.map((date) => (
            <Card key={date.id} className={`${date.is_highlighted ? 'border-yellow-400 bg-yellow-50' : ''} ${isDatePast(date.date_value) ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      {date.title}
                      {date.exam_type && <Badge variant="outline">{date.exam_type}</Badge>}
                      {date.tag && <Badge variant="secondary">{date.tag}</Badge>}
                      {date.is_highlighted && <Badge className="bg-yellow-500">Highlighted</Badge>}
                      {isDatePast(date.date_value) && <Badge variant="destructive">Past</Badge>}
                    </CardTitle>
                    <CardDescription>
                      <span className="font-medium">{new Date(date.date_value).toLocaleDateString()}</span>
                      {date.description && ` - ${date.description}`}
                    </CardDescription>
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
              {date.matter && (
                <CardContent>
                  <div className="text-sm text-gray-600 whitespace-pre-wrap">
                    {date.matter}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-500 mt-4">
                    {date.branch && <div><span className="font-medium">Branch:</span> {date.branch}</div>}
                    {date.level && <div><span className="font-medium">Level:</span> {date.level}</div>}
                    <div><span className="font-medium">Created:</span> {new Date(date.created_at).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DatesManagerTab;
