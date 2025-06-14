
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

interface Note {
  id: string;
  title: string;
  subject: string | null;
  file_link: string | null;
  download_count: number;
  upload_date: string;
  created_by: string | null;
  is_active: boolean;
}

interface PYQ {
  id: string;
  title: string;
  subject: string | null;
  year: number | null;
  exam_type: string | null;
  file_link: string | null;
  download_count: number;
  upload_date: string;
  created_by: string | null;
  is_active: boolean;
}

export const useContentManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<Note[]>([]);
  const [pyqs, setPyqs] = useState<PYQ[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    try {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading notes:', error);
        toast({
          title: "Load Error",
          description: "Failed to load notes",
          variant: "destructive"
        });
      } else {
        setNotes(data || []);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const loadPyqs = async () => {
    try {
      const { data, error } = await supabase
        .from('pyqs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading pyqs:', error);
        toast({
          title: "Load Error",
          description: "Failed to load previous year questions",
          variant: "destructive"
        });
      } else {
        setPyqs(data || []);
      }
    } catch (error) {
      console.error('Error loading pyqs:', error);
    }
  };

  const addNote = async (noteData: Omit<Note, 'id' | 'download_count' | 'upload_date' | 'created_by' | 'is_active'>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add content",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('notes')
        .insert([{
          ...noteData,
          created_by: user.id,
          download_count: 0,
          is_active: true
        }]);

      if (error) {
        console.error('Error adding note:', error);
        toast({
          title: "Add Error",
          description: "Failed to add note",
          variant: "destructive"
        });
        return false;
      } else {
        toast({
          title: "Success",
          description: "Note added successfully",
        });
        await loadNotes(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error('Error adding note:', error);
      return false;
    }
  };

  const addPyq = async (pyqData: Omit<PYQ, 'id' | 'download_count' | 'upload_date' | 'created_by' | 'is_active'>) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to add content",
        variant: "destructive"
      });
      return false;
    }

    try {
      const { error } = await supabase
        .from('pyqs')
        .insert([{
          ...pyqData,
          created_by: user.id,
          download_count: 0,
          is_active: true
        }]);

      if (error) {
        console.error('Error adding pyq:', error);
        toast({
          title: "Add Error",
          description: "Failed to add previous year question",
          variant: "destructive"
        });
        return false;
      } else {
        toast({
          title: "Success",
          description: "Previous year question added successfully",
        });
        await loadPyqs(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error('Error adding pyq:', error);
      return false;
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ is_active: false })
        .eq('id', noteId);

      if (error) {
        console.error('Error deleting note:', error);
        toast({
          title: "Delete Error",
          description: "Failed to delete note",
          variant: "destructive"
        });
        return false;
      } else {
        toast({
          title: "Success",
          description: "Note deleted successfully",
        });
        await loadNotes(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      return false;
    }
  };

  const deletePyq = async (pyqId: string) => {
    try {
      const { error } = await supabase
        .from('pyqs')
        .update({ is_active: false })
        .eq('id', pyqId);

      if (error) {
        console.error('Error deleting pyq:', error);
        toast({
          title: "Delete Error",
          description: "Failed to delete previous year question",
          variant: "destructive"
        });
        return false;
      } else {
        toast({
          title: "Success",
          description: "Previous year question deleted successfully",
        });
        await loadPyqs(); // Refresh the list
        return true;
      }
    } catch (error) {
      console.error('Error deleting pyq:', error);
      return false;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([loadNotes(), loadPyqs()]);
      setLoading(false);
    };

    loadData();
  }, []);

  return {
    notes,
    pyqs,
    loading,
    addNote,
    addPyq,
    deleteNote,
    deletePyq,
    refreshNotes: loadNotes,
    refreshPyqs: loadPyqs
  };
};
