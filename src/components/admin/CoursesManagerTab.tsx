import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash2, BookOpen } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  exam_category: string | null;
  price: number;
  discounted_price: number | null;
  duration: string;
  features: string[] | null;
  image_url: string | null;
  bestseller: boolean | null;
  students: number | null;
  rating: number | null;
  created_at: string;
  subject: string | null;
  start_date: string | null;
  course_type: string | null;
  branch: string | null;
  level: string | null;
  enroll_now_link: string | null;
}

const CoursesManagerTab = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
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
  });

  const examCategories = ['IITM BS', 'JEE', 'NEET'];
  const courseTypes = ['Regular', 'Gold'];
  const iitmBranches = ['Data Science', 'Electronic System'];
  const iitmLevels = ['Qualifier', 'Foundation', 'Diploma', 'Degree'];

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch courses",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const resetForm = () => {
    setFormData({
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
    });
    setEditingCourse(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const courseData = {
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
      };

      if (editingCourse) {
        const { error } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', editingCourse.id);

        if (error) throw error;
        toast({ title: "Success", description: "Course updated successfully" });
      } else {
        const { error } = await supabase
          .from('courses')
          .insert([courseData]);

        if (error) throw error;
        toast({ title: "Success", description: "Course created successfully" });
      }

      resetForm();
      setIsDialogOpen(false);
      fetchCourses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save course",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
      start_date: course.start_date ? course.start_date.split('T')[0] : '', // Format for date input
      course_type: course.course_type || '',
      branch: course.branch || '',
      level: course.level || '',
      enroll_now_link: course.enroll_now_link || '',
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm('Are you sure you want to delete this course?')) return;

    try {
      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;
      toast({ title: "Success", description: "Course deleted successfully" });
      fetchCourses();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete course",
        variant: "destructive",
      });
    }
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Original Price (₹)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="discounted_price">Discounted Price (₹)</Label>
                  <Input
                    id="discounted_price"
                    type="number"
                    value={formData.discounted_price}
                    onChange={(e) => setFormData({ ...formData, discounted_price: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 6 months"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="start_date">Start Date</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  />
                </div>
                 <div>
                  <Label htmlFor="course_type">Course Type</Label>
                  <Select value={formData.course_type} onValueChange={(value) => setFormData({ ...formData, course_type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course type" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="exam_category">Exam Category</Label>
                  <Select value={formData.exam_category} onValueChange={(value) => setFormData({ ...formData, exam_category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam category" />
                    </SelectTrigger>
                    <SelectContent>
                      {examCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {formData.exam_category === 'IITM BS' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-md bg-slate-50">
                  <div>
                    <Label htmlFor="branch">Branch</Label>
                    <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {iitmBranches.map((branch) => (
                          <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="level">Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {iitmLevels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="features">Features (one per line)</Label>
                <Textarea
                  id="features"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  />
                </div>
                 <div>
                  <Label htmlFor="enroll_now_link">Enroll Now Link</Label>
                  <Input
                    id="enroll_now_link"
                    type="url"
                    value={formData.enroll_now_link}
                    onChange={(e) => setFormData({ ...formData, enroll_now_link: e.target.value })}
                  />
                </div>
              </div>


              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="bestseller"
                  checked={formData.bestseller}
                  onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                />
                <Label htmlFor="bestseller">Mark as Bestseller</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingCourse ? 'Update Course' : 'Create Course'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {courses.length === 0 ? (
          <Card className="p-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">No courses found</p>
              <p className="text-sm text-gray-400 mt-1">Create your first course to get started</p>
            </CardContent>
          </Card>
        ) : (
          courses.map((course) => (
            <Card key={course.id} className={course.course_type === 'Gold' ? 'bg-amber-50 border-amber-200' : ''}>
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
                    <Button variant="outline" size="sm" onClick={() => handleEdit(course)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(course.id)}>
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
                    <span className="font-medium">Students:</span> {course.students || 'N/A'}
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
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesManagerTab;
