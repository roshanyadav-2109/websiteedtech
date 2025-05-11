
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

const DatesManagerTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Important Dates Management</h2>
        <Button className="bg-royal hover:bg-royal-dark">
          <Plus className="mr-2 h-4 w-4" /> Add Important Date
        </Button>
      </div>
      
      <Card className="p-6">
        <CardContent className="p-0 flex flex-col items-center justify-center h-48">
          <Calendar className="h-16 w-16 text-gray-300 mb-4" />
          <p className="text-lg font-medium text-gray-500">Important Dates Management</p>
          <p className="text-sm text-gray-400 mt-1">
            This feature will be implemented soon
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatesManagerTab;
