
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Shield, Plus, Trash2 } from "lucide-react";

type AdminUser = {
  id: string;
  email: string;
  is_super_admin: boolean;
  created_at: string;
};

const AdminManagementTab = () => {
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchAdmins = async () => {
    const { data, error } = await supabase
      .from("admin_users")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) {
      toast({ description: "Failed to fetch admins.", variant: "destructive" });
    } else {
      setAdmins(data || []);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("admin_users")
      .insert([{
        email: newAdminEmail,
        is_super_admin: isSuperAdmin,
      }]);

    if (error) {
      toast({ description: "Failed to add admin.", variant: "destructive" });
    } else {
      toast({ description: "Admin added successfully!" });
      setNewAdminEmail("");
      setIsSuperAdmin(false);
      setIsDialogOpen(false);
      fetchAdmins();
    }
    setLoading(false);
  };

  const deleteAdmin = async (id: string, email: string) => {
    if (email === 'uiwebsite638@gmail.com') {
      toast({ description: "Cannot delete the main super admin.", variant: "destructive" });
      return;
    }

    if (!window.confirm(`Delete admin ${email}?`)) return;

    const { error } = await supabase
      .from("admin_users")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ description: "Failed to delete admin.", variant: "destructive" });
    } else {
      toast({ description: "Admin deleted." });
      fetchAdmins();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Admin Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal">
              <Plus className="w-4 h-4 mr-1" /> Add Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block mb-1">Email</label>
                <Input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_super_admin"
                  checked={isSuperAdmin}
                  onChange={(e) => setIsSuperAdmin(e.target.checked)}
                />
                <label htmlFor="is_super_admin">Super Admin</label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding..." : "Add Admin"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="space-y-4">
            {admins.map((admin) => (
              <div key={admin.id} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <p className="font-medium">{admin.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {admin.is_super_admin && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                        <Shield className="w-3 h-3 mr-1" />
                        Super Admin
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      Added: {new Date(admin.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {admin.email !== 'uiwebsite638@gmail.com' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteAdmin(admin.id, admin.email)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
            {!admins.length && (
              <div className="text-center py-8 text-gray-400">
                No admins found
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminManagementTab;
