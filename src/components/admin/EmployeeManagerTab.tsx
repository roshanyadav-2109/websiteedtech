
import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Edit, Plus, Trash2 } from "lucide-react";

type Employee = {
  id: string;
  employee_code: string;
  full_name: string;
  position: string;
  is_active: boolean;
  end_date: string | null;
};

const defaultForm = {
  employee_code: "",
  full_name: "",
  position: "",
  is_active: true,
  end_date: "",
};

const EmployeeManagerTab = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchEmployees = async () => {
    const { data, error } = await supabase
      .from("employees")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast({ description: "Failed to fetch employees.", variant: "destructive" });
    else setEmployees(data || []);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openNew = () => {
    setEditingEmployee(null);
    setForm(defaultForm);
    setIsDialogOpen(true);
  };

  const openEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setForm({
      employee_code: emp.employee_code,
      full_name: emp.full_name,
      position: emp.position,
      is_active: emp.is_active,
      end_date: emp.end_date || "",
    });
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setForm(defaultForm);
    setEditingEmployee(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (editingEmployee) {
      // update
      const { error } = await supabase
        .from("employees")
        .update({
          employee_code: form.employee_code,
          full_name: form.full_name,
          position: form.position,
          is_active: form.is_active,
          end_date: form.end_date || null,
        })
        .eq("id", editingEmployee.id);
      if (error) {
        toast({ description: "Failed to update employee.", variant: "destructive" });
      } else {
        toast({ description: "Employee updated!" });
        fetchEmployees();
        closeDialog();
      }
    } else {
      // create
      const { error } = await supabase
        .from("employees")
        .insert([{
          employee_code: form.employee_code,
          full_name: form.full_name,
          position: form.position,
          is_active: form.is_active,
          end_date: form.end_date || null,
        }]);
      if (error) {
        toast({ description: "Failed to add employee.", variant: "destructive" });
      } else {
        toast({ description: "Employee added!" });
        fetchEmployees();
        closeDialog();
      }
    }
    setLoading(false);
  };

  const deleteEmployee = async (id: string) => {
    if (!window.confirm("Delete this employee?")) return;
    const { error } = await supabase.from("employees").delete().eq("id", id);
    if (error) {
      toast({ description: "Failed to delete.", variant: "destructive" });
    } else {
      toast({ description: "Deleted." });
      fetchEmployees();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Employee Manager</h2>
        <Button className="bg-royal" onClick={openNew}><Plus className="w-4 h-4 mr-1" /> Add Employee</Button>
      </div>
      <Card>
        <CardContent className="overflow-x-auto p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left">Employee Code</th>
                <th className="text-left">Name</th>
                <th className="text-left">Position</th>
                <th className="text-left">Active</th>
                <th className="text-left">End Date</th>
                <th className="text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-t group">
                  <td>{emp.employee_code}</td>
                  <td>{emp.full_name}</td>
                  <td>{emp.position}</td>
                  <td>
                    {emp.is_active
                      ? <span className="text-green-600 font-bold">Active</span>
                      : <span className="text-gray-500">Inactive</span>
                    }
                  </td>
                  <td>{emp.end_date ? new Date(emp.end_date).toLocaleDateString() : "-"}</td>
                  <td>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(emp)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteEmployee(emp.id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </td>
                </tr>
              ))}
              {!employees.length && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-400">No employees found</td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
      <Dialog open={isDialogOpen} onOpenChange={(v) => !v && closeDialog()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingEmployee ? "Edit Employee" : "Add Employee"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Employee Code</label>
              <Input
                value={form.employee_code}
                onChange={(e) => setForm(f => ({ ...f, employee_code: e.target.value }))}
                required
                disabled={!!editingEmployee}
              />
            </div>
            <div>
              <label className="block mb-1">Full Name</label>
              <Input
                value={form.full_name}
                onChange={(e) => setForm(f => ({ ...f, full_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="block mb-1">Position</label>
              <Input
                value={form.position}
                onChange={(e) => setForm(f => ({ ...f, position: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="inline-flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                />
                Active
              </label>
            </div>
            <div>
              <label className="block mb-1">End Date (optional)</label>
              <Input
                type="date"
                value={form.end_date ?? ""}
                onChange={(e) => setForm(f => ({ ...f, end_date: e.target.value }))}
                disabled={form.is_active}
              />
              <span className="text-xs text-gray-500">If employee has left, set inactive and enter end date.</span>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button type="submit" disabled={loading}>{editingEmployee ? "Update" : "Add"}</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeManagerTab;
