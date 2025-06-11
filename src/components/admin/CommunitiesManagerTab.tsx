import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Trash2, Edit, Plus, Users, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Community {
  id: string;
  name: string;
  description?: string;
  group_link: string;
  group_type: 'telegram' | 'whatsapp';
  exam_type?: string;
  level?: string;
  branch?: string;
  subject?: string;
  class_level?: string;
  member_count: number;
  is_active: boolean;
  created_at: string;
}

const CommunitiesManagerTab = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCommunity, setEditingCommunity] = useState<Community | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    group_link: '',
    group_type: 'telegram' as 'telegram' | 'whatsapp',
    exam_type: '',
    level: '',
    branch: '',
    subject: '',
    class_level: '',
    member_count: 0,
    is_active: true
  });

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Type assertion to ensure proper typing
      const typedCommunities = (data || []).map(community => ({
        ...community,
        group_type: community.group_type as 'telegram' | 'whatsapp'
      }));
      
      setCommunities(typedCommunities);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch communities",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      group_link: '',
      group_type: 'telegram',
      exam_type: '',
      level: '',
      branch: '',
      subject: '',
      class_level: '',
      member_count: 0,
      is_active: true
    });
    setEditingCommunity(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.group_link) {
      toast({
        title: "Error",
        description: "Name and group link are required",
        variant: "destructive",
      });
      return;
    }

    try {
      const communityData = {
        ...formData,
        created_by: user?.id,
        updated_at: new Date().toISOString()
      };

      if (editingCommunity) {
        const { error } = await supabase
          .from('communities')
          .update(communityData)
          .eq('id', editingCommunity.id);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Community updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('communities')
          .insert([communityData]);

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Community created successfully",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save community",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (community: Community) => {
    setEditingCommunity(community);
    setFormData({
      name: community.name,
      description: community.description || '',
      group_link: community.group_link,
      group_type: community.group_type,
      exam_type: community.exam_type || '',
      level: community.level || '',
      branch: community.branch || '',
      subject: community.subject || '',
      class_level: community.class_level || '',
      member_count: community.member_count,
      is_active: community.is_active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this community?')) return;

    try {
      const { error } = await supabase
        .from('communities')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Community deleted successfully",
      });
      
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete community",
        variant: "destructive",
      });
    }
  };

  const toggleActiveStatus = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('communities')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Community ${!currentStatus ? 'activated' : 'deactivated'} successfully`,
      });
      
      fetchCommunities();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update community status",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Communities Management</h2>
          <p className="text-gray-600">Manage Telegram and WhatsApp study communities</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-royal hover:bg-royal-dark">
              <Plus className="h-4 w-4 mr-2" />
              Add Community
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingCommunity ? 'Edit Community' : 'Add New Community'}
              </DialogTitle>
              <DialogDescription>
                Create or modify study communities for students to join.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Community Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter community name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="group_type">Group Type *</Label>
                  <Select value={formData.group_type} onValueChange={(value: 'telegram' | 'whatsapp') => setFormData({...formData, group_type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="telegram">Telegram</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter community description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="group_link">Group Link *</Label>
                <Input
                  id="group_link"
                  value={formData.group_link}
                  onChange={(e) => setFormData({...formData, group_link: e.target.value})}
                  placeholder="https://t.me/... or https://chat.whatsapp.com/..."
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exam_type">Exam Type</Label>
                  <Select value={formData.exam_type} onValueChange={(value) => setFormData({...formData, exam_type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">None</SelectItem>
                      <SelectItem value="IITM_BS">IITM BS</SelectItem>
                      <SelectItem value="JEE">JEE</SelectItem>
                      <SelectItem value="NEET">NEET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="member_count">Member Count</Label>
                  <Input
                    id="member_count"
                    type="number"
                    value={formData.member_count}
                    onChange={(e) => setFormData({...formData, member_count: parseInt(e.target.value) || 0})}
                    placeholder="0"
                  />
                </div>
              </div>

              {formData.exam_type === 'IITM_BS' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({...formData, branch: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        <SelectItem value="Data Science">Data Science</SelectItem>
                        <SelectItem value="Electronic Systems">Electronic Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        <SelectItem value="Qualifier">Qualifier</SelectItem>
                        <SelectItem value="Foundation">Foundation</SelectItem>
                        <SelectItem value="Diploma">Diploma</SelectItem>
                        <SelectItem value="Degree">Degree</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {(formData.exam_type === 'JEE' || formData.exam_type === 'NEET') && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class_level">Class Level</Label>
                    <Select value={formData.class_level} onValueChange={(value) => setFormData({...formData, class_level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        <SelectItem value="Class 11">Class 11</SelectItem>
                        <SelectItem value="Class 12">Class 12</SelectItem>
                        <SelectItem value="Dropper">Dropper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None</SelectItem>
                        <SelectItem value="Mathematics">Mathematics</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        {formData.exam_type === 'NEET' && (
                          <SelectItem value="Biology">Biology</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({...formData, is_active: checked})}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-royal hover:bg-royal-dark">
                  {editingCommunity ? 'Update' : 'Create'} Community
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-lg">Loading communities...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {communities.map((community) => (
            <Card key={community.id} className={`${!community.is_active ? 'opacity-60' : ''}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{community.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={community.group_type === 'telegram' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}>
                      {community.group_type === 'telegram' ? 'Telegram' : 'WhatsApp'}
                    </Badge>
                    {!community.is_active && (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </div>
                </div>
                <CardDescription>{community.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {community.exam_type && (
                    <Badge variant="outline">{community.exam_type}</Badge>
                  )}
                  {community.branch && (
                    <Badge variant="outline">{community.branch}</Badge>
                  )}
                  {community.level && (
                    <Badge variant="outline">{community.level}</Badge>
                  )}
                  {community.subject && (
                    <Badge variant="outline">{community.subject}</Badge>
                  )}
                  {community.class_level && (
                    <Badge variant="outline">{community.class_level}</Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {community.member_count} members
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {community.group_type}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={community.is_active}
                      onCheckedChange={() => toggleActiveStatus(community.id, community.is_active)}
                    />
                    <span className="text-sm text-gray-600">Active</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(community)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(community.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {communities.length === 0 && (
            <Card className="col-span-full">
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <MessageCircle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No communities created yet</p>
                  <p className="text-sm text-gray-500">Click "Add Community" to create your first community</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunitiesManagerTab;
