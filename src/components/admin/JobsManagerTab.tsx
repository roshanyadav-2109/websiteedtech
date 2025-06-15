
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { useJobsManager, JobFormData } from "@/hooks/useJobsManager";
import { Job } from "@/types/job";
import JobList from "./jobs/JobList";
import JobForm from "./jobs/JobForm";
import NoJobsPlaceholder from "./jobs/NoJobsPlaceholder";

const JobsManagerTab = () => {
  const { jobs, isLoading, isSubmitting, deleteJob, submitJob } = useJobsManager();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setEditingJob(null);
    }
  };

  const handleAddNew = () => {
    setEditingJob(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const handleSubmit = async (formData: JobFormData) => {
    const success = await submitJob(formData, editingJob);
    if (success) {
      handleOpenChange(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Jobs Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={handleAddNew}>
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
            <JobForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              initialData={editingJob}
              onCancel={() => handleOpenChange(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center p-10"><Loader2 className="h-10 w-10 animate-spin text-royal" /></div>
      ) : jobs.length > 0 ? (
        <JobList jobs={jobs} onEdit={handleEdit} onDelete={deleteJob} />
      ) : (
        <NoJobsPlaceholder />
      )}
    </div>
  );
};

export default JobsManagerTab;
