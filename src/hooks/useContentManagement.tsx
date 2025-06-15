import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useNotesManager } from './useNotesManager';
import { usePyqsManager } from './usePyqsManager';
import { useCoursesManager } from './useCoursesManager';

interface Note {
  id: string;
  title: string;
  subject: string | null;
  file_link: string | null;
  download_count: number;
  upload_date: string;
  created_by: string | null;
  is_active: boolean;
  content_url: string | null;
  description: string | null;
  class_level: string | null;
  exam_type: string | null;
  branch: string | null;
  level: string | null;
  created_at: string;
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
  content_url: string | null;
  description: string | null;
  class_level: string | null;
  branch: string | null;
  level: string | null;
  created_at: string;
}

// This hook now combines useNotesManager & usePyqsManager for compatibility with BackendIntegratedWrapper
export const useContentManagement = () => {
  const {
    notes,
    loading: notesLoading,
    addNote,
    deleteNote,
    updateNote,
    fetchNotes,
  } = useNotesManager();

  const {
    pyqs,
    loading: pyqsLoading,
    addPyq,
    deletePyq,
    updatePyq,
    fetchPyqs,
  } = usePyqsManager();
  
  const {
    courses,
    isLoading: coursesLoading,
    createCourse,
    updateCourse,
    deleteCourse,
    fetchCourses,
  } = useCoursesManager();

  return {
    notes,
    pyqs,
    courses,
    loading: notesLoading || pyqsLoading || coursesLoading,
    addNote,
    addPyq,
    createCourse,
    deleteNote,
    deletePyq,
    deleteCourse,
    updateNote,
    updatePyq,
    updateCourse,
    refreshNotes: fetchNotes,
    refreshPyqs: fetchPyqs,
    refreshCourses: fetchCourses,
  };
};
