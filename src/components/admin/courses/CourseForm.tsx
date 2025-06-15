
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export interface CourseFormData {
  title: string;
  description: string;
  exam_category: string;
  price: string;
  discounted_price: string;
  duration: string;
  features: string;
  image_url: string;
  bestseller: boolean;
  subject: string;
  start_date: string;
  course_type: string;
  branch: string;
  level: string;
  enroll_now_link: string;
  students_enrolled: string;
}

interface CourseFormProps {
  formData: CourseFormData;
  setFormData: React.Dispatch<React.SetStateAction<CourseFormData>>;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  editingCourse: any;
  examCategories: string[];
  courseTypes: string[];
  iitmBranches: string[];
  iitmLevels: string[];
  setIsDialogOpen: (open: boolean) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  formData,
  setFormData,
  handleSubmit,
  isLoading,
  editingCourse,
  examCategories,
  courseTypes,
  iitmBranches,
  iitmLevels,
  setIsDialogOpen
}) => {
  const featuresList = formData.features.split('\n').filter(f => f.trim());

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
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
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duration">Duration *</Label>
          <Input
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="e.g., 6 months, 1 year"
            required
          />
        </div>
        <div>
          <Label htmlFor="start_date">Start Date</Label>
          <Input
            id="start_date"
            type="date"
            value={formData.start_date}
            onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="students_enrolled">No of Students Enrolled</Label>
          <Input
            id="students_enrolled"
            type="number"
            value={formData.students_enrolled}
            onChange={(e) => setFormData({ ...formData, students_enrolled: e.target.value })}
            min="0"
            placeholder="0"
          />
        </div>
        <div>
          <Label htmlFor="exam_category">Exam Category</Label>
          <Select value={formData.exam_category} onValueChange={(value) => setFormData({ ...formData, exam_category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select exam category" />
            </SelectTrigger>
            <SelectContent>
              {examCategories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {formData.exam_category === 'IITM BS' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="branch">Branch</Label>
            <Select value={formData.branch} onValueChange={(value) => setFormData({ ...formData, branch: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent>
                {iitmBranches.map(branch => (
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
                {iitmLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div>
        <Label htmlFor="features">Features (4 separate lines)</Label>
        <Textarea
          id="features"
          value={formData.features}
          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          placeholder="Enter each feature on a new line&#10;Feature 1&#10;Feature 2&#10;Feature 3&#10;Feature 4"
          rows={4}
        />
        {featuresList.length > 0 && (
          <div className="mt-2">
            <p className="text-sm text-gray-600">Preview ({featuresList.length} features):</p>
            <ul className="text-sm text-gray-500">
              {featuresList.slice(0, 4).map((feature, index) => (
                <li key={index}>• {feature}</li>
              ))}
              {featuresList.length > 4 && (
                <li className="text-orange-500">• Only first 4 features will be displayed</li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">Original Pricing *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="discounted_price">Discounted Pricing</Label>
          <Input
            id="discounted_price"
            type="number"
            step="0.01"
            value={formData.discounted_price}
            onChange={(e) => setFormData({ ...formData, discounted_price: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="course_type">Course Type</Label>
          <Select value={formData.course_type} onValueChange={(value) => setFormData({ ...formData, course_type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select course type" />
            </SelectTrigger>
            <SelectContent>
              {courseTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="image_url">Image URL</Label>
          <Input
            id="image_url"
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            placeholder="https://..."
          />
        </div>
      </div>

      <div>
        <Label htmlFor="enroll_now_link">Enroll Now Button Redirect Link</Label>
        <Input
          id="enroll_now_link"
          type="url"
          value={formData.enroll_now_link}
          onChange={(e) => setFormData({ ...formData, enroll_now_link: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="bestseller"
          checked={formData.bestseller}
          onCheckedChange={(checked) => setFormData({ ...formData, bestseller: checked as boolean })}
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
  );
};

export default CourseForm;
