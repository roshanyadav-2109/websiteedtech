
import { Job } from "@/types/job";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";

interface JobListProps {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (jobId: string) => void;
}

const JobList = ({ jobs, onEdit, onDelete }: JobListProps) => {
  return (
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
                <Button variant="ghost" size="icon" onClick={() => onEdit(job)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={() => onDelete(job.id)}>
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
  );
};

export default JobList;
