
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAccessCheck = (contentType: string, examType: string) => {
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        setLoading(true);
        
        // First check if user is authenticated
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          setHasAccess(false);
          setLoading(false);
          return;
        }
        
        // Then check if they have access to this content type for this exam
        const { data, error } = await supabase
          .from('user_access')
          .select('*')
          .eq('user_id', sessionData.session.user.id)
          .eq('content_type', contentType)
          .eq('exam_type', examType);
          
        if (error) {
          console.error('Error checking access:', error);
          setHasAccess(false);
        } else {
          setHasAccess(data && data.length > 0);
        }
      } catch (error) {
        console.error('Error in access check:', error);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };
    
    checkAccess();
  }, [contentType, examType]);

  return { hasAccess, loading };
};

export default useAccessCheck;
