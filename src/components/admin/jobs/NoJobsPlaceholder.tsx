
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const NoJobsPlaceholder = () => (
  <Card className="p-8">
    <CardContent className="flex flex-col items-center justify-center text-center">
      <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
      <p className="text-lg font-medium text-gray-500">No Job Openings Found</p>
      <p className="text-sm text-gray-400 mt-1">
        Click 'Add New Job' to post a new opening.
      </p>
    </CardContent>
  </Card>
);

export default NoJobsPlaceholder;
