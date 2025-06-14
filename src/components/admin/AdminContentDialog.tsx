import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackend } from '@/components/BackendIntegratedWrapper';
import { useToast } from '@/hooks/use-toast';

interface AdminContentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'notes' | 'pyqs' | 'news' | 'dates' | 'communities' | 'courses' | 'syllabus';
  examType?: string;
  prefilledSubject?: string;
  branch?: string;
  level?: string;
  classLevel?: string;
}

const AdminContentDialog: React.FC<AdminContentDialogProps> = ({
  isOpen,
  onClose,
  contentType,
  examType,
  prefilledSubject,
  branch,
  level,
  classLevel
}) => {
  const { addNote, addPyq } = useBackend();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content_url: '',
    subject: prefilledSubject || '',
    class_level: classLevel || '',
    exam_type: examType || '',
    branch: branch || '',
    level: level || '',
    year: '',
    date_value: '',
    category: '',
    name: '',
    group_link: '',
    group_type: '',
    content: '',
    is_featured: false,
    is_highlighted: false,
    price: '',
    duration: '',
    features: ''
  });

  // Update form data when props change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      subject: prefilledSubject || prev.subject,
      exam_type: examType || prev.exam_type,
      branch: branch || prev.branch,
      level: level || prev.level,
      class_level: classLevel || prev.class_level
    }));
  }, [prefilledSubject, examType, branch, level, classLevel]);

  const examTypes = ['IITM_BS', 'JEE', 'NEET'];
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'English', 'Botany', 'Zoology', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Programming', 'Linear Algebra', 'Machine Learning', 'Data Visualization', 'Circuit Analysis', 'Digital Electronics', 'Signals'];
  const classLevels = ['11th', '12th', 'Foundation Level', 'Diploma Level', 'Degree Level'];
  const branches = ['CSE', 'Physics', 'Mathematics', 'Data Science', 'Economics', 'Electronic Systems'];
  const groupTypes = ['Telegram', 'WhatsApp', 'Discord', 'Facebook'];

  // Dynamic subject selection based on exam type
  const getSubjectsForExamType = (examType: string) => {
    switch (examType) {
      case 'NEET':
        return ['Zoology', 'Botany', 'Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Physics'];
      case 'JEE':
        return ['Mathematics', 'Inorganic Chemistry', 'Organic Chemistry', 'Physical Chemistry', 'Physics'];
      case 'IITM_BS':
        return ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'English', 'Linear Algebra', 'Machine Learning', 'Data Visualization', 'Circuit Analysis', 'Digital Electronics', 'Signals', 'Programming'];
      default:
        return ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Statistics', 'English', 'Botany', 'Zoology', 'Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Programming', 'Linear Algebra', 'Machine Learning', 'Data Visualization', 'Circuit Analysis', 'Digital Electronics', 'Signals'];
    }
  };

  // Dynamic class levels based on exam type
  const getClassLevelsForExamType = (examType: string) => {
    switch (examType) {
      case 'NEET':
      case 'JEE':
        return ['11th', '12th'];
      case 'IITM_BS':
        return ['Foundation Level', 'Diploma Level', 'Degree Level'];
      default:
        return ['11th', '12th', 'Foundation Level', 'Diploma Level', 'Degree Level'];
    }
  };

  // Dynamic branches for IITM BS
  const getIITMBranches = () => {
    return ['CSE', 'Physics', 'Mathematics', 'Data Science', 'Economics', 'Electronic Systems'];
  };

  // Dynamic course categories
  const getCourseCategoriesForExamType = (examType: string) => {
    switch (examType) {
      case 'NEET':
        return ['neet'];
      case 'JEE':
        return ['jee'];
      case 'IITM_BS':
        return ['iitm-bs'];
      default:
        return ['all', 'neet', 'jee', 'iitm-bs', 'placement'];
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content_url: '',
      subject: prefilledSubject || '',
      class_level: classLevel || '',
      exam_type: examType || '',
      branch: branch || '',
      level: level || '',
      year: '',
      date_value: '',
      category: '',
      name: '',
      group_link: '',
      group_type: '',
      content: '',
      is_featured: false,
      is_highlighted: false,
      price: '',
      duration: '',
      features: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success = false;

      if (contentType === 'notes') {
        success = await addNote({
          title: formData.title,
          subject: formData.subject,
          content_url: formData.content_url,
          description: formData.description,
          class_level: formData.class_level,
          exam_type: formData.exam_type,
          branch: formData.branch,
          level: formData.level
        });
      } else if (contentType === 'pyqs') {
        success = await addPyq({
          title: formData.title,
          subject: formData.subject,
          year: formData.year ? parseInt(formData.year) : null,
          exam_type: formData.exam_type,
          content_url: formData.content_url,
          description: formData.description,
          class_level: formData.class_level,
          branch: formData.branch,
          level: formData.level
        });
      }

      if (success) {
        resetForm();
        onClose();
        toast({
          title: "Success",
          description: `${contentType === 'notes' ? 'Note' : 'PYQ'} added successfully for ${formData.subject}`,
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to add content",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDialogTitle = () => {
    const subjectPrefix = prefilledSubject ? `${prefilledSubject} ` : '';
    switch (contentType) {
      case 'notes': return `Add New ${subjectPrefix}Note`;
      case 'pyqs': return `Add New ${subjectPrefix}Previous Year Question`;
      case 'news': return 'Add News Update';
      case 'dates': return 'Add Important Date';
      case 'communities': return 'Add Community';
      case 'courses': return 'Add Course';
      case 'syllabus': return 'Add Syllabus';
      default: return 'Add Content';
    }
  };

  const renderFormFields = () => {
    switch (contentType) {
      case 'notes':
      case 'pyqs':
        return (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder={`Enter ${prefilledSubject ? prefilledSubject + ' ' : ''}title`}
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter description"
              />
            </div>

            <div>
              <Label htmlFor="content_url">Content Link (PDF/Document)</Label>
              <Input
                id="content_url"
                type="url"
                value={formData.content_url}
                onChange={(e) => setFormData(prev => ({ ...prev, content_url: e.target.value }))}
                placeholder="https://example.com/document.pdf"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exam_type">Exam Type</Label>
                <Select 
                  value={formData.exam_type} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      exam_type: value,
                      subject: '', // Reset subject when exam type changes
                      class_level: '', // Reset class level when exam type changes
                      branch: value === 'IITM_BS' ? prev.branch : '', // Keep branch only for IITM_BS
                      level: value === 'IITM_BS' ? prev.level : '' // Keep level only for IITM_BS
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSubjectsForExamType(formData.exam_type).map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {contentType === 'pyqs' && (
              <div>
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="2024"
                  min="2000"
                  max="2030"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class_level">Class Level</Label>
                <Select value={formData.class_level} onValueChange={(value) => setFormData(prev => ({ ...prev, class_level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class level" />
                  </SelectTrigger>
                  <SelectContent>
                    {getClassLevelsForExamType(formData.exam_type).map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {formData.exam_type === 'IITM_BS' && (
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={formData.branch} onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {getIITMBranches().map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {formData.exam_type === 'IITM_BS' && (
              <div>
                <Label htmlFor="level">Level</Label>
                <Input
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                  placeholder="e.g., foundation, diploma, degree"
                />
              </div>
            )}
          </>
        );

      case 'courses':
        return (
          <>
            <div>
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="Enter course title"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
                placeholder="Enter course description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exam_type">Exam Type</Label>
                <Select 
                  value={formData.exam_type} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ 
                      ...prev, 
                      exam_type: value,
                      category: getCourseCategoriesForExamType(value)[0] || ''
                    }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {getCourseCategoriesForExamType(formData.exam_type).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'iitm-bs' ? 'IITM BS' : category.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  required
                  placeholder="Enter price"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                  required
                  placeholder="e.g., 6 months, 1 year"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="features">Features (comma-separated)</Label>
              <Textarea
                id="features"
                value={formData.features}
                onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>
          </>
        );

      case 'news':
        return (
          <>
            <div>
              <Label htmlFor="title">News Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="Enter news title"
              />
            </div>

            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                rows={4}
                required
                placeholder="Enter news content"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exam_type">Exam Type</Label>
                <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Exams</SelectItem>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Admission, Results, Updates"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
              />
              <Label htmlFor="is_featured">Mark as Featured</Label>
            </div>
          </>
        );

      case 'dates':
        return (
          <>
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                placeholder="Enter event title"
              />
            </div>

            <div>
              <Label htmlFor="date_value">Date</Label>
              <Input
                id="date_value"
                type="date"
                value={formData.date_value}
                onChange={(e) => setFormData(prev => ({ ...prev, date_value: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter event description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="exam_type">Exam Type</Label>
                <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="e.g., Exam, Registration, Results"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_highlighted"
                checked={formData.is_highlighted}
                onChange={(e) => setFormData(prev => ({ ...prev, is_highlighted: e.target.checked }))}
              />
              <Label htmlFor="is_highlighted">Highlight this date</Label>
            </div>
          </>
        );

      case 'communities':
        return (
          <>
            <div>
              <Label htmlFor="name">Community Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                placeholder="Enter community name"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter community description"
              />
            </div>

            <div>
              <Label htmlFor="group_link">Group Link</Label>
              <Input
                id="group_link"
                type="url"
                value={formData.group_link}
                onChange={(e) => setFormData(prev => ({ ...prev, group_link: e.target.value }))}
                required
                placeholder="https://t.me/groupname or WhatsApp link"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="group_type">Group Type</Label>
                <Select value={formData.group_type} onValueChange={(value) => setFormData(prev => ({ ...prev, group_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group type" />
                  </SelectTrigger>
                  <SelectContent>
                    {groupTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="exam_type">Exam Type</Label>
                <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      default:
        return (
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
              placeholder="Enter title"
            />
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            Fill in the form below to add new {prefilledSubject ? `${prefilledSubject} ` : ''}content
            {branch && level ? ` for ${branch} ${level}` : ''}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-royal hover:bg-royal-dark">
              {isSubmitting ? 'Adding...' : 'Add Content'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminContentDialog;
