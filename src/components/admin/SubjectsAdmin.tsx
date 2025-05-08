
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";

interface Subject {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('subjects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubjects(data || []);
      } catch (error: any) {
        toast({
          title: "Error fetching subjects",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const deleteSubject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subjects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setSubjects(subjects.filter(subject => subject.id !== id));
      toast({
        title: "Subject deleted",
        description: "The subject has been successfully deleted",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting subject",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Subjects</h2>
        <Button asChild>
          <Link to="/admin/subjects/new">Add New Subject</Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-royal"></div>
        </div>
      ) : subjects.length > 0 ? (
        <Table>
          <TableCaption>List of all subjects</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell className="font-medium">{subject.name}</TableCell>
                <TableCell>{subject.category}</TableCell>
                <TableCell>{new Date(subject.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild className="mr-2">
                    <Link to={`/admin/subjects/edit/${subject.id}`}>Edit</Link>
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteSubject(subject.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
          <p className="text-gray-500 mb-4">Get started by creating a new subject.</p>
          <Button asChild>
            <Link to="/admin/subjects/new">Add New Subject</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

const SubjectForm = ({ isEditing = false }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !category) {
      toast({
        title: "Validation error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from('subjects')
        .insert([
          { name, category },
        ]);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Subject created successfully",
      });
      
      // Reset form
      setName("");
      setCategory("");
    } catch (error: any) {
      toast({
        title: "Error creating subject",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{isEditing ? 'Edit Subject' : 'Add New Subject'}</h2>
        <Button variant="outline" asChild>
          <Link to="/admin/subjects">Cancel</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Subject Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter subject name"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEET">NEET</SelectItem>
              <SelectItem value="JEE">JEE</SelectItem>
              <SelectItem value="IITM_BS_DATA_SCIENCE">IITM BS Data Science</SelectItem>
              <SelectItem value="IITM_BS_ELECTRONIC_SYSTEMS">IITM BS Electronic Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Subject' : 'Create Subject'}
        </Button>
      </form>
    </div>
  );
};

const SubjectsAdmin = () => {
  return (
    <Routes>
      <Route path="/" element={<SubjectsList />} />
      <Route path="/new" element={<SubjectForm />} />
      <Route path="/edit/:id" element={<SubjectForm isEditing={true} />} />
    </Routes>
  );
};

export default SubjectsAdmin;
