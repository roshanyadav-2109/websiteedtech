
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  experience_level: string;
  stipend?: string;
  description: string;
  requirements: string[];
  application_url?: string;
  deadline?: string;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  duration?: string;
}
