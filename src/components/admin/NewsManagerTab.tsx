
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Newspaper } from "lucide-react";

interface News {
  id: string;
  title: string;
  content: string;
  exam_type?: string;
  branch?: string;
  level?: string;
  is_featured: boolean;
  created_at: string;
}

const NewsManagerTab = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    exam_type: '',
    branch: '',
    level: '',
    is_featured: false,
  });

  const examTypes = ['IITM_BS', 'JEE', 'NEET'];
  const branches = ['CSE', 'Physics', 'Mathematics', 'Data Science', 'Economics'];

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news_updates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch news",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      exam_type: '',
      branch: '',
      level: '',
      is_featured: false,
    });
    setEditingNews(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newsData = {
        title: formData.title,
        content: formData.content,
        exam_type: formData.exam_type || null,
        branch: formData.branch || null,
        level: formData.level || null,
        is_featured: formData.is_featured,
      };

      if (editingNews) {
        const { error } = await supabase
          .from('news_updates')
          .update(newsData)
          .eq('id', editingNews.id);

        if (error) throw error;
        toast({ title: "Success", description: "News updated successfully" });
      } else {
        const { error } = await supabase
          .from('news_updates')
          .insert([newsData]);

        if (error) throw error;
        toast({ title: "Success", description: "News created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchNews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save news",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (newsItem: News) => {
    setEditingNews(newsItem);
    setFormData({
      title: newsItem.title,
      content: newsItem.content,
      exam_type: newsItem.exam_type || '',
      branch: newsItem.branch || '',
      level: newsItem.level || '',
      is_featured: newsItem.is_featured,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (newsId: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return;

    try {
      const { error } = await supabase
        .from('news_updates')
        .delete()
        .eq('id', newsId);

      if (error) throw error;
      toast({ title: "Success", description: "News deleted successfully" });
      fetchNews();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete news",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">News Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add News Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? 'Edit News' : 'Add News Article'}</DialogTitle>
              <DialogDescription>
                {editingNews ? 'Update news details' : 'Fill in the news information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">News Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
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

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={formData.is_featured}
                  onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                />
                <Label htmlFor="is_featured">Mark as Featured</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingNews ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {news.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Newspaper className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">No news found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first news article to get started</p>
            </CardContent>
          </Card>
        ) : (
          news.map((newsItem) => (
            <Card key={newsItem.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {newsItem.title}
                      {newsItem.is_featured && <Badge variant="secondary">Featured</Badge>}
                    </CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {newsItem.content}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(newsItem.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  {newsItem.exam_type && (
                    <div><span className="font-medium">Exam:</span> {newsItem.exam_type}</div>
                  )}
                  {newsItem.branch && (
                    <div><span className="font-medium">Branch:</span> {newsItem.branch}</div>
                  )}
                  {newsItem.level && (
                    <div><span className="font-medium">Level:</span> {newsItem.level}</div>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  Created: {new Date(newsItem.created_at).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsManagerTab;
