
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { runPopulation } from "@/utils/populateIITMNotes";

interface AdminPopulateButtonProps {
  loading: boolean;
  onDone: () => void;
}

const AdminPopulateButton: React.FC<AdminPopulateButtonProps> = ({ loading, onDone }) => {
  const handlePopulateClick = async () => {
    if (loading) return;
    try {
      toast({
        title: "Populating notes...",
        description: "Starting population of all IITM branch notes.",
      });
      const result = await runPopulation();
      if (result.success) {
        toast({
          title: "Done!",
          description: result.message || "All notes populated successfully.",
          variant: "default",
        });
        onDone();
      } else {
        toast({
          title: "Error",
          description: result.message || "Something went wrong while populating.",
          variant: "destructive",
        });
      }
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to populate notes.",
        variant: "destructive",
      });
      console.error(e);
    }
  };

  return (
    <Button variant="outline" onClick={handlePopulateClick}>
      Populate All Notes (Admin)
    </Button>
  );
};

export default AdminPopulateButton;
