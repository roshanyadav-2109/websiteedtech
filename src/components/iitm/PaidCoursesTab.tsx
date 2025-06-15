
import React, { useState } from "react";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import CourseFilters from "./CourseFilters";
import CourseList from "./CourseList";

const PaidCoursesTab = () => {
  const [branch, setBranch] = useState("all");
  const [level, setLevel] = useState("all");
  const { courses, contentLoading } = useBackend();

  const iitmCourses = courses.filter(course => course.exam_category === 'IITM BS');
  
  const filteredCourses = iitmCourses.filter(course => {
    const branchSlug = course.branch?.toLowerCase().replace(' ', '-') || '';
    const levelSlug = course.level?.toLowerCase() || '';

    const branchMatch = branch === "all" || branchSlug === branch;
    const levelMatch = level === "all" || levelSlug === level;
    return branchMatch && levelMatch;
  });

  if (contentLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, index) => <CourseCardSkeleton key={index} />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CourseFilters 
        branch={branch} 
        setBranch={setBranch} 
        level={level} 
        setLevel={setLevel} 
      />
      <CourseList courses={filteredCourses} />
    </div>
  );
};

export default PaidCoursesTab;
