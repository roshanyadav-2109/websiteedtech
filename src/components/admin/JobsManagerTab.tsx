
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, Briefcase, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Job {
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

const JobsManagerTab = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    company: 'Unknown IITians',
    location: '',
    job_type: '',
    experience_level: '',
    stipend: '',
    description: '',
    requirements: '',
    application_url: '',
    deadline: '',
    is_featured: false,
    duration: '',
    is_active: true,
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const fetchJobs = async () => {
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
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      company: 'Unknown IITians',
      location: '',
      job_type: '',
      experience_level: '',
      stipend: '',
      description: '',
      requirements: '',
      application_url: '',
      deadline: '',
      is_featured: false,
      duration: '',
      is_active: true,
    });
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      job_type: job.job_type,
      experience_level: job.experience_level,
      stipend: job.stipend || '',
      description: job.description,
      requirements: job.requirements.join('\n'),
      application_url: job.application_url || '',
      deadline: job.deadline ? new Date(job.deadline).toISOString().split('T')[0] : '',
      is_featured: job.is_featured,
      duration: job.duration || '',
      is_active: job.is_active,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (jobId: string) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(line => line.trim() !== ''),
      skills: [], // Added to match schema if needed, assuming skills can be empty for now
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
    } else {
      toast({
        title: "Success!",
        description: `Job has been successfully ${editingJob ? 'updated' : 'created'}.`,
      });
      fetchJobs();
      setIsDialogOpen(false);
      resetForm();
    }

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Jobs Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { setIsDialogOpen(isOpen); if (!isOpen) resetForm(); }}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</DialogTitle>
              <DialogDescription>
                {editingJob ? 'Update the details for this job opening.' : 'Fill in the form to create a new job opening.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} placeholder="e.g., 3 Months" />
                </div>
              </div>

              <div>
                <Label htmlFor="stipend">Stipend / Salary Range</Label>
                <Input id="stipend" value={formData.stipend} onChange={(e) => setFormData({ ...formData, stipend: e.target.value })} placeholder="e.g., ₹10,000/month or ₹5-8 LPA" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="job_type">Job Type</Label>
                  <Select value={formData.job_type} onValueChange={(value) => setFormData({ ...formData, job_type: value })}>
                    <SelectTrigger><SelectValue placeholder="Select job type" /></SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((type) => (<SelectItem key={type} value={type}>{type}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="experience_level">Experience Level</Label>
                  <Select value={formData.experience_level} onValueChange={(value) => setFormData({ ...formData, experience_level: value })}>
                    <SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger>
                    <SelectContent>
                      {experienceLevels.map((level) => (<SelectItem key={level} value={level}>{level}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Job Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} required />
              </div>

              <div>
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea id="requirements" value={formData.requirements} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} placeholder="Bachelor's degree...&#10;2+ years experience..." rows={4} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="application_url">Application URL</Label>
                  <Input id="application_url" type="url" value={formData.application_url} onChange={(e) => setFormData({ ...formData, application_url: e.target.value })} placeholder="https://company.com/apply" />
                </div>
                <div>
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input id="deadline" type="date" value={formData.deadline} onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="is_featured" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} className="h-4 w-4" />
                  <Label htmlFor="is_featured">Mark as Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="is_active" checked={formData.is_active} onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })} className="h-4 w-4" />
                  <Label htmlFor="is_active">Mark as Active</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (editingJob ? 'Update Job' : 'Create Job')}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-10"><Loader2 className="h-10 w-10 animate-spin text-royal" /></div>
      ) : jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <CardTitle>{job.title}</CardTitle>
                    <CardDescription>{job.company} - {job.location}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                <div className="flex items-center flex-wrap gap-2 mt-4">
                  <Badge variant={job.is_active ? "default" : "destructive"} className={job.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>{job.is_active ? 'Active' : 'Inactive'}</Badge>
                  <Badge variant={job.is_featured ? "default" : "outline"} className={job.is_featured ? "bg-yellow-100 text-yellow-800" : ""}>{job.is_featured ? 'Featured' : 'Standard'}</Badge>
                  <Badge variant="outline">{job.job_type}</Badge>
                  <Badge variant="outline">{job.experience_level}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8">
          <CardContent className="flex flex-col items-center justify-center text-center">
            <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-500">No Job Openings Found</p>
            <p className="text-sm text-gray-400 mt-1">
              Click 'Add New Job' to post a new opening.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JobsManagerTab;
