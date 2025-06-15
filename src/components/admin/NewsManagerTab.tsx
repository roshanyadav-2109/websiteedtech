
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Search, ChevronDown, ChevronRight } from "lucide-react";

interface News {
  id: string;
  title: string;
  description: string;
  content: string;
  exam_type: string;
  branch: string;
  level: string;
  tag: string;
  date_time: string;
  is_featured: boolean;
  is_important: boolean;
  is_active: boolean;
  created_at: string;
}

const NewsManagerTab = () => {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterExamType, setFilterExamType] = useState("all");
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    exam_type: '',
    branch: '',
    level: '',
    tag: '',
    date_time: '',
    is_featured: false,
    is_important: false,
  });

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from('news_updates')
        .select('*')
        .eq('is_active', true)
        .order('date_time', { ascending: false });

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
    const now = new Date();
    const datetime = now.toISOString().slice(0, 16); // Format for datetime-local input
    
    setFormData({
      title: '',
      description: '',
      content: '',
      exam_type: '',
      branch: '',
      level: '',
      tag: '',
      date_time: datetime,
      is_featured: false,
      is_important: false,
    });
    setEditingNews(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newsData = {
        title: formData.title,
        description: formData.description || null,
        content: formData.content,
        exam_type: formData.exam_type || null,
        branch: formData.exam_type === 'IITM_BS' ? formData.branch : null,
        level: formData.exam_type === 'IITM_BS' ? formData.level : null,
        tag: formData.tag || null,
        date_time: formData.date_time ? new Date(formData.date_time).toISOString() : new Date().toISOString(),
        is_featured: formData.is_featured,
        is_important: formData.is_important,
        is_active: true,
        publish_date: new Date().toISOString(),
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
    const dateTime = newsItem.date_time ? new Date(newsItem.date_time).toISOString().slice(0, 16) : '';
    
    setFormData({
      title: newsItem.title,
      description: newsItem.description || '',
      content: newsItem.content,
      exam_type: newsItem.exam_type || '',
      branch: newsItem.branch || '',
      level: newsItem.level || '',
      tag: newsItem.tag || '',
      date_time: dateTime,
      is_featured: newsItem.is_featured || false,
      is_important: newsItem.is_important || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (newsId: string) => {
    if (!confirm('Are you sure you want to delete this news item?')) return;

    try {
      const { error } = await supabase
        .from('news_updates')
        .update({ is_active: false })
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

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredNews = news.filter(newsItem => {
    const matchesSearch = newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsItem.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsItem.tag?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterExamType === 'all' || newsItem.exam_type === filterExamType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">News Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingNews ? 'Edit News' : 'Add New News'}</DialogTitle>
              <DialogDescription>
                {editingNews ? 'Update news details' : 'Fill in the news information'}
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
                  <Label htmlFor="date_time">Date & Time *</Label>
                  <Input
                    id="date_time"
                    type="datetime-local"
                    value={formData.date_time}
                    onChange={(e) => setFormData({ ...formData, date_time: e.target.value })}
                    required
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
                <Label htmlFor="tag">Tag</Label>
                <Input
                  id="tag"
                  value={formData.tag}
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                  placeholder="e.g., Admission, Results, Exam"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  placeholder="Brief description of the news"
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  placeholder="Full news content"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_featured">Featured News</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_important"
                    checked={formData.is_important}
                    onChange={(e) => setFormData({ ...formData, is_important: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="is_important">Important News</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingNews ? 'Update News' : 'Create News'}
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
            placeholder="Search news..."
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

      {/* News List */}
      <div className="grid gap-4">
        {filteredNews.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-gray-500">No news found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first news item to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredNews.map((newsItem) => (
            <Card key={newsItem.id}>
              <Collapsible>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {newsItem.title}
                        {newsItem.exam_type && <Badge variant="outline">{newsItem.exam_type}</Badge>}
                        {newsItem.tag && <Badge variant="secondary">{newsItem.tag}</Badge>}
                        {newsItem.is_featured && <Badge className="bg-yellow-500">Featured</Badge>}
                        {newsItem.is_important && <Badge className="bg-red-500">Important</Badge>}
                      </CardTitle>
                      <CardDescription>
                        {newsItem.description}
                        {newsItem.date_time && (
                          <span className="ml-2 text-xs">
                            {new Date(newsItem.date_time).toLocaleString()}
                          </span>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => toggleExpanded(newsItem.id)}>
                          {expandedItems.has(newsItem.id) ? 
                            <ChevronDown className="h-4 w-4" /> : 
                            <ChevronRight className="h-4 w-4" />
                          }
                        </Button>
                      </CollapsibleTrigger>
                      <Button variant="outline" size="sm" onClick={() => handleEdit(newsItem)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(newsItem.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CollapsibleContent>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-sm text-gray-600 whitespace-pre-wrap">
                        {newsItem.content}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-500">
                        {newsItem.branch && <div><span className="font-medium">Branch:</span> {newsItem.branch}</div>}
                        {newsItem.level && <div><span className="font-medium">Level:</span> {newsItem.level}</div>}
                        <div><span className="font-medium">Created:</span> {new Date(newsItem.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NewsManagerTab;
