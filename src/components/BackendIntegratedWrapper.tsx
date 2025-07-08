
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDownloadHandler } from '@/hooks/useDownloadHandler';
import { useRealtimeContentManagement } from '@/hooks/useRealtimeContentManagement';
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
  importantDates: any[];
  newsUpdates: any[];
  studyGroups: any[];
  jobs: any[];
  communities: any[];
  contentLoading: boolean;
  getFilteredContent: (profile: any) => any;
  refreshAll: () => Promise<void>;
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
  
  const {
    notes,
    pyqs,
    courses,
    importantDates,
    newsUpdates,
    studyGroups,
    jobs,
    communities,
    loading: contentLoading,
    getFilteredContent,
    refreshAll
  } = useRealtimeContentManagement();

  console.log('BackendIntegratedWrapper - Admin status:', { isAdmin, isSuperAdmin, isAdminLoading });
  console.log('BackendIntegratedWrapper - Content loaded:', { 
    notes: notes.length, 
    pyqs: pyqs.length, 
    courses: courses.length,
    jobs: jobs.length
  });

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
    importantDates,
    newsUpdates,
    studyGroups,
    jobs,
    communities,
    contentLoading,
    getFilteredContent,
    refreshAll
  };

  return (
    <BackendContext.Provider value={contextValue}>
      {children}
    </BackendContext.Provider>
  );
};
