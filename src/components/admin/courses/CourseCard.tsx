import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Course } from './types';

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEdit, onDelete }) => {
  return (
    <Card className={course.course_type === 'Gold' ? 'bg-amber-50 border-amber-200' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {course.title}
              {course.bestseller && <Badge variant="secondary">Bestseller</Badge>}
              {course.course_type && <Badge variant={course.course_type === 'Gold' ? 'default' : 'outline'} className={course.course_type === 'Gold' ? 'bg-amber-500' : ''}>{course.course_type}</Badge>}
            </CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(course)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDelete(course.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="font-medium">Exam Category:</span> {course.exam_category}
          </div>
          <div>
            <span className="font-medium">Price:</span> ₹{course.price}
            {course.discounted_price && (
              <span className="ml-2 text-green-600">₹{course.discounted_price}</span>
            )}
          </div>
          <div>
            <span className="font-medium">Duration:</span> {course.duration}
          </div>
          <div>
            <span className="font-medium">Students:</span> {course.students_enrolled || 0}
          </div>
           {course.subject && <div><span className="font-medium">Subject:</span> {course.subject}</div>}
          {course.start_date && <div><span className="font-medium">Start Date:</span> {new Date(course.start_date).toLocaleDateString()}</div>}
          {course.branch && <div><span className="font-medium">Branch:</span> {course.branch}</div>}
          {course.level && <div><span className="font-medium">Level:</span> {course.level}</div>}
        </div>
        {course.features && course.features.length > 0 && (
          <div className="mt-4">
            <span className="font-medium">Features:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {course.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {course.enroll_now_link && (
          <div className="mt-4">
            <Button asChild>
              <a href={course.enroll_now_link} target="_blank" rel="noopener noreferrer">Enroll Now</a>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CourseCard;
