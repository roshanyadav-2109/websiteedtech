
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface PYQ {
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
  content_url: string | null;
  description: string | null;
  class_level: string | null;
  branch: string | null;
  level: string | null;
  created_at: string;
}

export const usePyqsManager = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pyqs, setPyqs] = useState<PYQ[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPyqs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pyqs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPyqs(data || []);
    } catch (error: any) {
      toast({
        title: "Load Error",
        description: "Failed to load previous year questions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPyq = async (pyqData: Omit<PYQ, 'id' | 'download_count' | 'upload_date' | 'created_by' | 'is_active' | 'created_at'>) => {
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
          is_active: true,
        }]);
      if (error) throw error;
      toast({
        title: "Success",
        description: "Previous year question added successfully!",
      });
      await fetchPyqs();
    } catch (error: any) {
      toast({
        title: "Add Error",
        description: error.message || "Failed to add previous year question",
        variant: "destructive"
      });
    }
  };

  const deletePyq = async (pyqId: string) => {
    try {
      const { error } = await supabase
        .from('pyqs')
        .update({ is_active: false })
        .eq('id', pyqId);
      if (error) throw error;
      toast({ title: "Success", description: "Previous year question deleted successfully" });
      await fetchPyqs();
    } catch (error: any) {
      toast({
        title: "Delete Error",
        description: "Failed to delete previous year question",
        variant: "destructive"
      });
    }
  };

  const updatePyq = async (pyqId: string, updateData: Partial<PYQ>) => {
    try {
      const { error } = await supabase
        .from('pyqs')
        .update(updateData)
        .eq('id', pyqId);
      if (error) throw error;
      toast({ title: "Success", description: "Previous year question updated successfully" });
      await fetchPyqs();
    } catch (error: any) {
      toast({
        title: "Update Error",
        description: "Failed to update previous year question",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchPyqs();
  }, []);

  return {
    pyqs,
    loading,
    addPyq,
    deletePyq,
    updatePyq,
    fetchPyqs,
  };
};
