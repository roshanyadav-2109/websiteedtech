
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Job } from "@/types/job";

export interface JobFormData {
  title: string;
  company: string;
  location: string;
  job_type: string;
  experience_level: string;
  stipend: string;
  description: string;
  requirements: string;
  application_url: string;
  deadline: string;
  is_featured: boolean;
  duration: string;
  is_active: boolean;
}

export const useJobsManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
      setJobs([]);
    } else {
      setJobs(data as Job[]);
    }
    setIsLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const deleteJob = async (jobId: string) => {
    if (!window.confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return;
    }

    const { error } = await supabase.from('jobs').delete().eq('id', jobId);

    if (error) {
      toast({
        title: "Error Deleting Job",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Job Deleted",
        description: "The job opening has been successfully deleted.",
      });
      fetchJobs();
    }
  };

  const submitJob = async (formData: JobFormData, editingJob: Job | null): Promise<boolean> => {
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(line => line.trim() !== ''),
      skills: [], 
      deadline: formData.deadline || null,
    };

    const { error } = editingJob
      ? await supabase.from('jobs').update(submissionData).eq('id', editingJob.id)
      : await supabase.from('jobs').insert([submissionData]);

    if (error) {
      toast({
        title: "Error",
        description: error.message || `Failed to ${editingJob ? 'update' : 'create'} job`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return false;
    } else {
      toast({
        title: "Success!",
        description: `Job has been successfully ${editingJob ? 'updated' : 'created'}.`,
      });
      fetchJobs();
      setIsSubmitting(false);
      return true;
    }
  };

  return { jobs, isLoading, isSubmitting, deleteJob, submitJob };
};
