
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBackend } from '@/components/BackendIntegratedWrapper';
import { useToast } from '@/components/ui/use-toast';

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
    subject: prefilledSubject || '',
    file_link: '',
    content_url: '',
    year: '',
    exam_type: examType || '',
    class_level: classLevel || '',
    branch: branch || '',
    level: level || '',
    price: '',
    duration: '',
    category: '',
    features: '',
    image_url: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success = false;
      
      if (contentType === 'notes') {
        success = await addNote({
          title: formData.title,
          description: formData.description,
          subject: formData.subject,
          file_link: formData.file_link,
          content_url: formData.content_url,
          exam_type: formData.exam_type,
          class_level: formData.class_level,
          branch: formData.branch,
          level: formData.level
        });
      } else if (contentType === 'pyqs') {
        success = await addPyq({
          title: formData.title,
          description: formData.description,
          subject: formData.subject,
          year: formData.year ? parseInt(formData.year) : null,
          exam_type: formData.exam_type,
          class_level: formData.class_level,
          branch: formData.branch,
          level: formData.level,
          file_link: formData.file_link,
          content_url: formData.content_url
        });
      } else if (contentType === 'courses') {
        // For courses, we'll show a placeholder form for now
        toast({
          title: "Course Creation",
          description: "Course creation functionality will be implemented soon",
        });
        success = true;
      }

      if (success) {
        setFormData({
          title: '',
          description: '',
          subject: prefilledSubject || '',
          file_link: '',
          content_url: '',
          year: '',
          exam_type: examType || '',
          class_level: classLevel || '',
          branch: branch || '',
          level: level || '',
          price: '',
          duration: '',
          category: '',
          features: '',
          image_url: ''
        });
        onClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderForm = () => {
    if (contentType === 'notes') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="exam_type">Exam Type</Label>
            <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
                <SelectItem value="IITM_BS">IITM BS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.exam_type === 'IITM_BS' && (
            <>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select value={formData.branch} onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Electronic Systems">Electronic Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Degree">Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(formData.exam_type === 'JEE' || formData.exam_type === 'NEET') && (
            <div>
              <Label htmlFor="class_level">Class Level</Label>
              <Select value={formData.class_level} onValueChange={(value) => setFormData(prev => ({ ...prev, class_level: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="file_link">File Link</Label>
            <Input
              id="file_link"
              type="url"
              value={formData.file_link}
              onChange={(e) => setFormData(prev => ({ ...prev, file_link: e.target.value }))}
              placeholder="https://example.com/file.pdf"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Adding...' : 'Add Note'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      );
    }

    if (contentType === 'pyqs') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              value={formData.year}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              placeholder="2024"
            />
          </div>

          <div>
            <Label htmlFor="exam_type">Exam Type</Label>
            <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select exam type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
                <SelectItem value="IITM_BS">IITM BS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.exam_type === 'IITM_BS' && (
            <>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select value={formData.branch} onValueChange={(value) => setFormData(prev => ({ ...prev, branch: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="Electronic Systems">Electronic Systems</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Foundation">Foundation</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Degree">Degree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {(formData.exam_type === 'JEE' || formData.exam_type === 'NEET') && (
            <div>
              <Label htmlFor="class_level">Class Level</Label>
              <Select value={formData.class_level} onValueChange={(value) => setFormData(prev => ({ ...prev, class_level: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11">Class 11</SelectItem>
                  <SelectItem value="12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="file_link">File Link</Label>
            <Input
              id="file_link"
              type="url"
              value={formData.file_link}
              onChange={(e) => setFormData(prev => ({ ...prev, file_link: e.target.value }))}
              placeholder="https://example.com/file.pdf"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Adding...' : 'Add PYQ'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      );
    }

    if (contentType === 'courses') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Course Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              placeholder="e.g., 6 months"
            />
          </div>

          <div>
            <Label htmlFor="features">Features (comma separated)</Label>
            <Textarea
              id="features"
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              placeholder="Feature 1, Feature 2, Feature 3"
            />
          </div>

          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Adding...' : 'Add Course'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Form for {contentType} is not yet implemented.</p>
        <Button onClick={onClose} className="mt-4">Close</Button>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add {contentType === 'notes' ? 'Note' : contentType === 'pyqs' ? 'Previous Year Question' : contentType === 'courses' ? 'Course' : contentType}
          </DialogTitle>
        </DialogHeader>
        {renderForm()}
      </DialogContent>
    </Dialog>
  );
};

export default AdminContentDialog;
