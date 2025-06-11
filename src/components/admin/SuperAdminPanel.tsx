
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, UserPlus, Shield } from "lucide-react";

interface AdminUser {
  id: string;
  email: string;
  is_super_admin: boolean;
  created_at: string;
}

const SuperAdminPanel: React.FC = () => {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAdminUsers(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch admin users",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  const addAdmin = async () => {
    if (!newAdminEmail.trim()) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('admin_users')
        .insert([{ email: newAdminEmail.toLowerCase().trim() }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user added successfully",
      });

      setNewAdminEmail('');
      fetchAdminUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add admin user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeAdmin = async (adminId: string, email: string) => {
    if (email === 'uiwebsite638@gmail.com') {
      toast({
        title: "Error",
        description: "Cannot remove super admin",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Admin user removed successfully",
      });

      fetchAdminUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to remove admin user",
        variant: "destructive",
      });
    }
  };

  const toggleSuperAdmin = async (adminId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ is_super_admin: !currentStatus })
        .eq('id', adminId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Super admin status ${!currentStatus ? 'granted' : 'revoked'}`,
      });

      fetchAdminUsers();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Admin Management
        </CardTitle>
        <CardDescription>
          Manage admin users who can create and modify content
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new admin */}
        <div className="flex gap-2">
          <Input
            placeholder="Enter email address"
            value={newAdminEmail}
            onChange={(e) => setNewAdminEmail(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addAdmin()}
          />
          <Button onClick={addAdmin} disabled={isLoading}>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Admin
          </Button>
        </div>

        {/* Admin users list */}
        <div className="space-y-2">
          {adminUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No admin users found</p>
          ) : (
            adminUsers.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-3 border rounded">
                <div>
                  <p className="font-medium">{admin.email}</p>
                  <p className="text-sm text-gray-500">
                    {admin.is_super_admin ? 'Super Admin' : 'Admin'} • Added {new Date(admin.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {admin.email !== 'uiwebsite638@gmail.com' && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSuperAdmin(admin.id, admin.is_super_admin)}
                      >
                        {admin.is_super_admin ? 'Remove Super' : 'Make Super'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeAdmin(admin.id, admin.email)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SuperAdminPanel;
