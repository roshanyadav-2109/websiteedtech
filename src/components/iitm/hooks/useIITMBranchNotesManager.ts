
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface IITMNoteData {
  title: string;
  description?: string;
  subject: string;
  branch: string;
  level: string;
  week_number: number;
  diploma_specialization?: string;
  file_link?: string;
}

export const useIITMBranchNotesManager = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addIITMNote = useCallback(async (noteData: IITMNoteData): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('iitm_branch_notes')
        .insert([{
          title: noteData.title,
          description: noteData.description,
          subject: noteData.subject,
          branch: noteData.branch,
          level: noteData.level,
          week_number: noteData.week_number,
          diploma_specialization: noteData.diploma_specialization,
          file_link: noteData.file_link,
          is_active: true,
          download_count: 0
        }]);

      if (error) {
        console.error('Error adding IITM note:', error);
        toast({
          title: "Error",
          description: "Failed to add note. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "IITM note added successfully!",
      });
      return true;
    } catch (error) {
      console.error('Error adding IITM note:', error);
      toast({
        title: "Error",
        description: "Failed to add note. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateIITMNote = useCallback(async (noteId: string, updateData: Partial<IITMNoteData>): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('iitm_branch_notes')
        .update({
          title: updateData.title,
          description: updateData.description,
          subject: updateData.subject,
          branch: updateData.branch,
          level: updateData.level,
          week_number: updateData.week_number,
          diploma_specialization: updateData.diploma_specialization,
          file_link: updateData.file_link,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId);

      if (error) {
        console.error('Error updating IITM note:', error);
        toast({
          title: "Error",
          description: "Failed to update note. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "IITM note updated successfully!",
      });
      return true;
    } catch (error) {
      console.error('Error updating IITM note:', error);
      toast({
        title: "Error",
        description: "Failed to update note. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteIITMNote = useCallback(async (noteId: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('iitm_branch_notes')
        .update({ is_active: false })
        .eq('id', noteId);

      if (error) {
        console.error('Error deleting IITM note:', error);
        toast({
          title: "Error",
          description: "Failed to delete note. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "IITM note deleted successfully!",
      });
      return true;
    } catch (error) {
      console.error('Error deleting IITM note:', error);
      toast({
        title: "Error",
        description: "Failed to delete note. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    addIITMNote,
    updateIITMNote,
    deleteIITMNote,
    loading
  };
};
