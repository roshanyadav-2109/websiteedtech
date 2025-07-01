import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDownloadHandler } from '@/hooks/useDownloadHandler';
import { useContentManagement } from '@/hooks/useContentManagement';
import { Course } from '@/components/admin/courses/types';

interface BackendContextType {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  isAdminLoading: boolean;
  handleDownload: (contentId: string, tableName: 'notes' | 'pyqs', fileUrl?: string) => Promise<void>;
  downloadCounts: Record<string, number>;
  updateDownloadCount: (contentId: string, count: number) => void;
  isDownloadCountsInitialized: boolean;
  notes: any[];
  pyqs: any[];
  courses: Course[];
  contentLoading: boolean;
  addNote: (noteData: any) => Promise<boolean>;
  addPyq: (pyqData: any) => Promise<boolean>;
  createCourse: (courseData: any) => Promise<void>;
  deleteNote: (noteId: string) => Promise<boolean>;
  deletePyq: (pyqId: string) => Promise<boolean>;
  deleteCourse: (courseId: string) => Promise<void>;
  updateNote: (noteId: string, updateData: any) => Promise<boolean>;
  updatePyq: (pyqId: string, updateData: any) => Promise<boolean>;
  updateCourse: (courseId: string, updateData: any) => Promise<void>;
  refreshNotes: () => Promise<void>;
  refreshPyqs: () => Promise<void>;
  refreshCourses: () => Promise<void>;
}

const BackendContext = createContext<BackendContextType | undefined>(undefined);

export const useBackend = () => {
  const context = useContext(BackendContext);
  if (!context) {
    throw new Error('useBackend must be used within a BackendIntegratedWrapper');
  }
  return context;
};

interface BackendIntegratedWrapperProps {
  children: ReactNode;
}

export const BackendIntegratedWrapper: React.FC<BackendIntegratedWrapperProps> = ({ children }) => {
  const { isAdmin, isSuperAdmin, isLoading: isAdminLoading } = useAuth();
  const { handleDownload, downloadCounts, updateDownloadCount, isInitialized: isDownloadCountsInitialized } = useDownloadHandler();
  
  // UseContentManagement now fetches notes/pyqs/courses with is_active filtering
  const {
    notes,
    pyqs,
    courses,
    loading: contentLoading,
    addNote,
    addPyq,
    createCourse,
    deleteNote,
    deletePyq,
    deleteCourse,
    updateNote,
    updatePyq,
    updateCourse,
    refreshNotes,
    refreshPyqs,
    refreshCourses
  } = useContentManagement();

  console.log('BackendIntegratedWrapper - Admin status:', { isAdmin, isSuperAdmin, isAdminLoading });
  console.log('BackendIntegratedWrapper - Download counts initialized:', isDownloadCountsInitialized);

  // context value
  const contextValue: BackendContextType = {
    isAdmin,
    isSuperAdmin,
    isAdminLoading,
    handleDownload,
    downloadCounts,
    updateDownloadCount,
    isDownloadCountsInitialized,
    notes,
    pyqs,
    courses,
    contentLoading,
    addNote,
    addPyq,
    createCourse,
    deleteNote,
    deletePyq,
    deleteCourse,
    updateNote,
    updatePyq,
    updateCourse,
    refreshNotes,
    refreshPyqs,
    refreshCourses
  };

  return (
    <BackendContext.Provider value={contextValue}>
      {children}
    </BackendContext.Provider>
  );
};
