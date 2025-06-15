
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

interface Community {
  id: string;
  name: string;
  branch: string;
  level: string;
  subject: string;
  group_link: string;
  exam_type: string;
  created_at: string;
}

const CommunitiesManagerTab = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBranch, setFilterBranch] = useState("all");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    branch: '',
    level: '',
    subject: '',
    group_link: '',
  });

  // Subject options based on branch
  const getSubjectOptions = (branch: string) => {
    switch (branch) {
      case 'Data Science':
        return ['Mathematics', 'Statistics', 'Programming', 'Data Analysis', 'Machine Learning'];
      case 'Electronic System':
        return ['Electronics', 'Signal Processing', 'Circuit Design', 'Digital Systems', 'Communication Systems'];
      default:
        return [];
    }
  };

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunities(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch communities",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      branch: '',
      level: '',
      subject: '',
      group_link: '',
    });
    setEditingCommunity(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const communityData = {
        name: formData.name,
        branch: formData.branch,
        level: formData.level,
        subject: formData.subject || null,
        group_link: formData.group_link,
        group_type: 'Telegram',
        exam_type: 'IITM_BS',
      };

      if (editingCommunity) {
        const { error } = await supabase
          .from('communities')
          .update(communityData)
          .eq('id', editingCommunity.id);

        if (error) throw error;
        toast({ title: "Success", description: "Community updated successfully" });
      } else {
        const { error } = await supabase
          .from('communities')
          .insert([communityData]);

        if (error) throw error;
        toast({ title: "Success", description: "Community created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save community",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (community: Community) => {
    setEditingCommunity(community);
    setFormData({
      name: community.name,
      branch: community.branch || '',
      level: community.level,
      subject: community.subject || '',
      group_link: community.group_link,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (communityId: string) => {
    if (!confirm('Are you sure you want to delete this community?')) return;

    try {
      const { error } = await supabase
        .from('communities')
        .delete()
        .eq('id', communityId);

      if (error) throw error;
      toast({ title: "Success", description: "Community deleted successfully" });
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete community",
        variant: "destructive",
      });
    }
  };

  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         community.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBranch === 'all' || community.branch === filterBranch;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">IITM BS Padhai Mitra Communities</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New Community
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingCommunity ? 'Edit Community' : 'Add New Community'}</DialogTitle>
              <DialogDescription>
                {editingCommunity ? 'Update community details' : 'Fill in the community information for IITM BS Padhai Mitra'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="branch">Branch *</Label>
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
                  <Label htmlFor="level">Level *</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Foundation">Foundation</SelectItem>
                      <SelectItem value="Diploma">Diploma</SelectItem>
                      <SelectItem value="Degree">Degree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.branch && (
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({ ...formData, subject: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {getSubjectOptions(formData.branch).map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="group_link">Join Community Link *</Label>
                <Input
                  id="group_link"
                  type="url"
                  value={formData.group_link}
                  onChange={(e) => setFormData({ ...formData, group_link: e.target.value })}
                  placeholder="https://..."
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingCommunity ? 'Update Community' : 'Create Community'}
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
            placeholder="Search communities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterBranch} onValueChange={setFilterBranch}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Branches</SelectItem>
            <SelectItem value="Data Science">Data Science</SelectItem>
            <SelectItem value="Electronic System">Electronic System</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Communities List */}
      <div className="grid gap-4">
        {filteredCommunities.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <p className="text-lg font-medium text-gray-500">No communities found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first community to get started</p>
            </CardContent>
          </Card>
        ) : (
          filteredCommunities.map((community) => (
            <Card key={community.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {community.name}
                      <Badge variant="outline">{community.branch}</Badge>
                      <Badge variant="secondary">{community.level}</Badge>
                    </CardTitle>
                    <CardDescription>
                      IITM BS {community.branch} - {community.level} Level Community
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={community.group_link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleEdit(community)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(community.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div><span className="font-medium">Branch:</span> {community.branch}</div>
                  <div><span className="font-medium">Level:</span> {community.level}</div>
                  {community.subject && <div><span className="font-medium">Subject:</span> {community.subject}</div>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CommunitiesManagerTab;
