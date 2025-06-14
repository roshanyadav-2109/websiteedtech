
import React, { createContext, useContext, ReactNode } from 'react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { useDownloadHandler } from '@/hooks/useDownloadHandler';
import { useContentManagement } from '@/hooks/useContentManagement';

interface BackendContextType {
  isAdmin: boolean;
  isAdminLoading: boolean;
  handleDownload: (contentId: string, tableName: 'notes' | 'pyqs', fileUrl?: string) => Promise<void>;
  downloadCounts: Record<string, number>;
  updateDownloadCount: (contentId: string, count: number) => void;
  notes: any[];
  pyqs: any[];
  contentLoading: boolean;
  addNote: (noteData: any) => Promise<boolean>;
  addPyq: (pyqData: any) => Promise<boolean>;
  deleteNote: (noteId: string) => Promise<boolean>;
  deletePyq: (pyqId: string) => Promise<boolean>;
  updateNote: (noteId: string, updateData: any) => Promise<boolean>;
  updatePyq: (pyqId: string, updateData: any) => Promise<boolean>;
  refreshNotes: () => Promise<void>;
  refreshPyqs: () => Promise<void>;
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
  const { isAdmin, isLoading: isAdminLoading } = useAdminCheck();
  const { handleDownload, downloadCounts, updateDownloadCount } = useDownloadHandler();
  const {
    notes,
    pyqs,
    loading: contentLoading,
    addNote,
    addPyq,
    deleteNote,
    deletePyq,
    updateNote,
    updatePyq,
    refreshNotes,
    refreshPyqs
  } = useContentManagement();

  const contextValue: BackendContextType = {
    isAdmin,
    isAdminLoading,
    handleDownload,
    downloadCounts,
    updateDownloadCount,
    notes,
    pyqs,
    contentLoading,
    addNote,
    addPyq,
    deleteNote,
    deletePyq,
    updateNote,
    updatePyq,
    refreshNotes,
    refreshPyqs
  };

  return (
    <BackendContext.Provider value={contextValue}>
      {children}
    </BackendContext.Provider>
  );
};
