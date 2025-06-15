
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Course } from "./courses/types";
import { useCoursesManager } from "@/hooks/useCoursesManager";
import CourseForm, { CourseFormData } from "./courses/CourseForm";
import CourseList from "./courses/CourseList";

const examCategories = ['IITM BS', 'JEE', 'NEET'];
const courseTypes = ['Regular', 'Gold'];
const iitmBranches = ['Data Science', 'Electronic System'];
const iitmLevels = ['Qualifier', 'Foundation', 'Diploma', 'Degree'];

const initialFormData: CourseFormData = {
  title: '',
  description: '',
  exam_category: '',
  price: '',
  discounted_price: '',
  duration: '',
  features: '',
  image_url: '',
  bestseller: false,
  subject: '',
  start_date: '',
  course_type: '',
  branch: '',
  level: '',
  enroll_now_link: '',
  students_enrolled: '',
};

const CoursesManagerTab = () => {
  const { courses, isLoading, createCourse, updateCourse, deleteCourse } = useCoursesManager();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CourseFormData>(initialFormData);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingCourse(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      description: formData.description,
      exam_category: formData.exam_category || null,
      price: parseFloat(formData.price),
      discounted_price: formData.discounted_price ? parseFloat(formData.discounted_price) : null,
      duration: formData.duration,
      features: formData.features.split('\n').filter(f => f.trim()),
      image_url: formData.image_url || null,
      bestseller: formData.bestseller,
      subject: formData.subject || null,
      start_date: formData.start_date || null,
      course_type: formData.course_type || null,
      branch: formData.exam_category === 'IITM BS' ? (formData.branch || null) : null,
      level: formData.exam_category === 'IITM BS' ? (formData.level || null) : null,
      enroll_now_link: formData.enroll_now_link || null,
      students_enrolled: formData.students_enrolled ? parseInt(formData.students_enrolled) : 0,
    } as any;

    if (editingCourse) {
      await updateCourse(editingCourse.id, payload);
    } else {
      await createCourse(payload);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      exam_category: course.exam_category || '',
      price: course.price.toString(),
      discounted_price: course.discounted_price?.toString() || '',
      duration: course.duration,
      features: course.features?.join('\n') || '',
      image_url: course.image_url || '',
      bestseller: course.bestseller || false,
      subject: course.subject || '',
      start_date: course.start_date ? course.start_date.split('T')[0] : '',
      course_type: course.course_type || '',
      branch: course.branch || '',
      level: course.level || '',
      enroll_now_link: course.enroll_now_link || '',
      students_enrolled: course.students_enrolled?.toString() || '0',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    await deleteCourse(courseId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Courses Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" /> Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
              <DialogDescription>
                {editingCourse ? 'Update course details' : 'Fill in the course information'}
              </DialogDescription>
            </DialogHeader>
            <CourseForm
              formData={formData}
              setFormData={setFormData}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
              editingCourse={editingCourse}
              examCategories={examCategories}
              courseTypes={courseTypes}
              iitmBranches={iitmBranches}
              iitmLevels={iitmLevels}
              setIsDialogOpen={setIsDialogOpen}
            />
          </DialogContent>
        </Dialog>
      </div>

      <CourseList
        courses={courses}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default CoursesManagerTab;
