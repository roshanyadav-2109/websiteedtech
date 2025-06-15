
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import EnrollButton from "@/components/EnrollButton";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import { Course } from "@/components/admin/courses/types";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="electronic-system">Electronic Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="qualifier">Qualifier</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="degree">Degree</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course: Course) => {
          const isPremium = course.course_type === 'Gold';
          return (
            <Card 
              key={course.id} 
              className={`border-none shadow-md hover:shadow-xl transition-all ${isPremium ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300' : ''}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-xl">
                    {course.title}
                    {isPremium && (
                      <Badge className="ml-2 bg-amber-500 text-white">
                        <Star className="h-3 w-3 mr-1 fill-current" /> Premium
                      </Badge>
                    )}
                  </CardTitle>
                  <Badge variant="outline" className={`${course.level?.toLowerCase() === 'foundation' ? 'bg-blue-100 text-blue-700' : course.level?.toLowerCase() === 'diploma' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                    {course.level ? course.level.charAt(0).toUpperCase() + course.level.slice(1) : ''}
                  </Badge>
                </div>
                <CardDescription className="text-base">{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{course.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Enrolled</p>
                    <p className="font-medium">{course.students_enrolled || 0}+ students</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Key Features:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {course.features?.map((feature, index) => (
                      <li key={index} className="text-sm">{feature}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <div className="flex items-center">
                  {course.discounted_price && course.discounted_price < course.price ? (
                    <>
                      <span className={`text-xl font-bold ${isPremium ? 'text-amber-600' : 'text-royal'}`}>₹{course.discounted_price}</span>
                      <span className="ml-2 text-gray-500 line-through">₹{course.price}</span>
                    </>
                  ) : (
                    <span className={`text-xl font-bold ${isPremium ? 'text-amber-600' : 'text-royal'}`}>₹{course.price}</span>
                  )}
                </div>
                <EnrollButton 
                  courseId={course.id}
                  enrollmentLink={course.enroll_now_link || undefined}
                  className={isPremium ? 
                    "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white" : 
                    "bg-royal hover:bg-royal-dark text-white"}
                />
              </CardFooter>
            </Card>
          );
        })}
        
        {filteredCourses.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No courses found matching your criteria. Please try different filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidCoursesTab;
