
import React from 'react';
import NoCoursesPlaceholder from './NoCoursesPlaceholder';
import CourseCard from './CourseCard';
import { Course } from './types';

interface CourseListProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

const CourseList: React.FC<CourseListProps> = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="grid gap-4">
      {courses.length === 0 ? (
        <NoCoursesPlaceholder />
      ) : (
        courses.map((course) => (
          <CourseCard 
            key={course.id} 
            course={course}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default CourseList;
