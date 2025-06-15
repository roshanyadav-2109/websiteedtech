
import React from "react";
import { Course } from "@/components/admin/courses/types";
import IITMCourseCard from "./IITMCourseCard";

interface CourseListProps {
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {courses.length > 0 ? (
        courses.map((course: Course) => (
          <IITMCourseCard key={course.id} course={course} />
        ))
      ) : (
        <div className="col-span-1 lg:col-span-2 text-center py-8 text-gray-500">
          No courses found matching your criteria. Please try different filters.
        </div>
      )}
    </div>
  );
};

export default CourseList;
