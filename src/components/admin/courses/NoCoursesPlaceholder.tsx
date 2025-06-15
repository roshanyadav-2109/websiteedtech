
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";

const NoCoursesPlaceholder = () => (
  <Card className="p-8">
    <CardContent className="flex flex-col items-center justify-center text-center">
      <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
      <p className="text-lg font-medium text-gray-500">No courses found</p>
      <p className="text-sm text-gray-400 mt-1">Create your first course to get started</p>
    </CardContent>
  </Card>
);

export default NoCoursesPlaceholder;
