
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Job } from "@/types/job";
import { JobFormData } from "@/hooks/useJobsManager";

interface JobFormProps {
  onSubmit: (formData: JobFormData) => void;
  isSubmitting: boolean;
  initialData: Job | null;
  onCancel: () => void;
}

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote', 'Hybrid'];
const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

const JobForm = ({ onSubmit, isSubmitting, initialData, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState<JobFormData>({
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

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        company: initialData.company,
        location: initialData.location,
        job_type: initialData.job_type,
        experience_level: initialData.experience_level,
        stipend: initialData.stipend || '',
        description: initialData.description,
        requirements: Array.isArray(initialData.requirements) ? initialData.requirements.join('\n') : '',
        application_url: initialData.application_url || '',
        deadline: initialData.deadline ? new Date(initialData.deadline).toISOString().split('T')[0] : '',
        is_featured: initialData.is_featured,
        duration: initialData.duration || '',
        is_active: initialData.is_active,
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
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
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (initialData ? 'Update Job' : 'Create Job')}
        </Button>
      </div>
    </form>
  );
};

export default JobForm;
