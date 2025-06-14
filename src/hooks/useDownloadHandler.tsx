
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/components/ui/use-toast';

export const useDownloadHandler = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({});

  const handleDownload = async (contentId: string, tableName: 'notes' | 'pyqs', fileUrl?: string) => {
    try {
      // Increment download count in database
      const { error } = await supabase.rpc('increment_download_count', {
        table_name: tableName,
        content_id: contentId,
        user_email: user?.email || null
      });

      if (error) {
        console.error('Error incrementing download count:', error);
        toast({
          title: "Download Error",
          description: "Failed to track download, but file will still open.",
          variant: "destructive"
        });
      } else {
        // Update local state immediately
        setDownloadCounts(prev => ({
          ...prev,
          [contentId]: (prev[contentId] || 0) + 1
        }));

        toast({
          title: "Download Started",
          description: "File download tracked successfully.",
        });
      }

      // Open file in new tab if URL provided
      if (fileUrl) {
        window.open(fileUrl, '_blank');
      }

    } catch (error) {
      console.error('Error handling download:', error);
      toast({
        title: "Download Error",
        description: "Something went wrong with the download.",
        variant: "destructive"
      });
    }
  };

  const updateDownloadCount = (contentId: string, count: number) => {
    setDownloadCounts(prev => ({
      ...prev,
      [contentId]: count
    }));
  };

  return { 
    handleDownload, 
    downloadCounts, 
    updateDownloadCount 
  };
};
