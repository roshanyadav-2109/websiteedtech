
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus, Pencil, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  discounted_price: number | null;
  duration: string;
  image_url: string | null;
  bestseller: boolean;
  students: number;
  rating: number;
  features: string[];
}

const CoursesManagerTab = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({
    title: "",
    description: "",
    category: "",
    price: 0,
    discounted_price: null,
    duration: "",
    image_url: "",
    bestseller: false,
    features: [],
    students: 0,
    rating: 4.0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from("courses").select("*");
      
      if (error) throw error;
      
      setCourses(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching courses",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === "price" || name === "discounted_price") {
      setFormData({ ...formData, [name]: parseFloat(value) || 0 });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, bestseller: checked });
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const featuresArray = e.target.value
      .split("\n")
      .filter((feature) => feature.trim() !== "");
    setFormData({ ...formData, features: featuresArray });
  };

  const handleAddCourse = async () => {
    try {
      // Ensure all required fields are present
      if (!formData.title || !formData.description || !formData.category || !formData.price || !formData.duration) {
        toast({
          title: "Missing required fields",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      // Fix: Pass formData as a single object, not as an array
      const { error } = await supabase.from("courses").insert(formData);
      
      if (error) throw error;
      
      setIsAddDialogOpen(false);
      resetForm();
      fetchCourses();
      toast({
        title: "Course added successfully",
        description: `${formData.title} has been added to courses`,
      });
    } catch (error: any) {
      toast({
        title: "Error adding course",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (course: Course) => {
    setCurrentCourse(course);
    setFormData(course);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCourse = async () => {
    if (!currentCourse) return;
    
    try {
      const { error } = await supabase
        .from("courses")
        .update(formData)
        .eq("id", currentCourse.id);
      
      if (error) throw error;
      
      setIsEditDialogOpen(false);
      resetForm();
      fetchCourses();
      toast({
        title: "Course updated successfully",
        description: `${formData.title} has been updated`,
      });
    } catch (error: any) {
      toast({
        title: "Error updating course",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteCourse = async (courseId: string, courseTitle: string) => {
    if (!window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
      return;
    }
    
    try {
      const { error } = await supabase.from("courses").delete().eq("id", courseId);
      
      if (error) throw error;
      
      fetchCourses();
      toast({
        title: "Course deleted successfully",
        description: `${courseTitle} has been removed`,
      });
    } catch (error: any) {
      toast({
        title: "Error deleting course",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      price: 0,
      discounted_price: null,
      duration: "",
      image_url: "",
      bestseller: false,
      features: [],
      students: 0,
      rating: 4.0,
    });
    setCurrentCourse(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Courses Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-royal hover:bg-royal-dark">
              <Plus className="mr-2 h-4 w-4" /> Add New Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Course</DialogTitle>
              <DialogDescription>
                Create a new course that will be displayed on the courses page.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter course title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    placeholder="e.g., Programming, Science, etc."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (₹)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discounted_price">Discounted Price (₹) (Optional)</Label>
                  <Input
                    id="discounted_price"
                    name="discounted_price"
                    type="number"
                    value={formData.discounted_price || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 8 weeks, 3 months"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url || ""}
                    onChange={handleInputChange}
                    placeholder="Enter image URL"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bestseller" className="block mb-2">Bestseller</Label>
                  <Switch
                    id="bestseller"
                    checked={formData.bestseller || false}
                    onCheckedChange={handleSwitchChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter course description"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">
                  Features (One feature per line)
                </Label>
                <Textarea
                  id="features"
                  value={formData.features?.join("\n") || ""}
                  onChange={handleFeaturesChange}
                  placeholder="Enter features (one per line)"
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-royal hover:bg-royal-dark" onClick={handleAddCourse}>
                Add Course
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Update the details for this course.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Course Title</Label>
                <Input
                  id="edit-title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price (₹)</Label>
                <Input
                  id="edit-price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-discounted_price">Discounted Price (₹)</Label>
                <Input
                  id="edit-discounted_price"
                  name="discounted_price"
                  type="number"
                  value={formData.discounted_price || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image_url">Image URL</Label>
                <Input
                  id="edit-image_url"
                  name="image_url"
                  value={formData.image_url || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-bestseller" className="block mb-2">Bestseller</Label>
                <Switch
                  id="edit-bestseller"
                  checked={formData.bestseller || false}
                  onCheckedChange={handleSwitchChange}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-features">
                Features (One feature per line)
              </Label>
              <Textarea
                id="edit-features"
                value={formData.features?.join("\n") || ""}
                onChange={handleFeaturesChange}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-royal hover:bg-royal-dark" onClick={handleUpdateCourse}>
              Update Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Courses List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loading ? (
          <div className="flex items-center justify-center col-span-2 h-32">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center col-span-2 h-32 border rounded-md p-6 bg-gray-50">
            <p className="text-gray-500 mb-4">No courses found</p>
            <Button 
              className="bg-royal hover:bg-royal-dark"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Your First Course
            </Button>
          </div>
        ) : (
          courses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="relative h-40 bg-gray-100">
                {course.image_url ? (
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-gray-400">No image</p>
                  </div>
                )}
                {course.bestseller && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                    Bestseller
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.category}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      {course.discounted_price ? (
                        <>
                          <span className="text-green-600">₹{course.discounted_price}</span>
                          <span className="ml-2 text-gray-400 line-through text-sm">
                            ₹{course.price}
                          </span>
                        </>
                      ) : (
                        <span>₹{course.price}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{course.duration}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm line-clamp-2">{course.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-gray-500">
                  {course.students} students • {course.rating}/5 rating
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditClick(course)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteCourse(course.id, course.title)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CoursesManagerTab;
