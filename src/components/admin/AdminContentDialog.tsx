
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
    subject: prefilledSubject || '',
    description: '',
    file_link: '',
    content_url: '',
    year: '',
    exam_type: examType || '',
    class_level: classLevel || '',
    branch: branch || '',
    level: level || '',
    category: '',
    group_link: '',
    group_type: 'WhatsApp',
    date_value: '',
    content: '',
    price: '',
    duration: '',
    features: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let success = false;
      
      if (contentType === 'notes') {
        success = await addNote({
          title: formData.title,
          subject: formData.subject,
          description: formData.description,
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
          subject: formData.subject,
          description: formData.description,
          file_link: formData.file_link,
          content_url: formData.content_url,
          year: formData.year ? parseInt(formData.year) : null,
          exam_type: formData.exam_type,
          class_level: formData.class_level,
          branch: formData.branch,
          level: formData.level
        });
      }

      if (success) {
        toast({
          title: "Success",
          description: `${contentType === 'notes' ? 'Note' : 'PYQ'} added successfully and is now visible to all users`,
        });
        setFormData({
          title: '',
          subject: prefilledSubject || '',
          description: '',
          file_link: '',
          content_url: '',
          year: '',
          exam_type: examType || '',
          class_level: classLevel || '',
          branch: branch || '',
          level: level || '',
          category: '',
          group_link: '',
          group_type: 'WhatsApp',
          date_value: '',
          content: '',
          price: '',
          duration: '',
          features: ''
        });
        onClose();
      }
    } catch (error) {
      console.error('Error adding content:', error);
      toast({
        title: "Error",
        description: "Failed to add content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => {
    const commonFields = (
      <>
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter title"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter description"
            rows={3}
          />
        </div>
      </>
    );

    if (contentType === 'notes' || contentType === 'pyqs') {
      return (
        <>
          {commonFields}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="Enter subject"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exam_type">Exam Type</Label>
              <Select value={formData.exam_type} onValueChange={(value) => setFormData(prev => ({ ...prev, exam_type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JEE">JEE</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="IITM BS">IITM BS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {contentType === 'pyqs' && (
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                placeholder="Enter year"
                min="2000"
                max="2030"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="class_level">Class Level</Label>
              <Select value={formData.class_level} onValueChange={(value) => setFormData(prev => ({ ...prev, class_level: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class11">Class 11</SelectItem>
                  <SelectItem value="class12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Input
                id="level"
                value={formData.level}
                onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value }))}
                placeholder="Enter level"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="file_link">File Link</Label>
            <Input
              id="file_link"
              type="url"
              value={formData.file_link}
              onChange={(e) => setFormData(prev => ({ ...prev, file_link: e.target.value }))}
              placeholder="https://example.com/file.pdf"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content_url">Content URL</Label>
            <Input
              id="content_url"
              type="url"
              value={formData.content_url}
              onChange={(e) => setFormData(prev => ({ ...prev, content_url: e.target.value }))}
              placeholder="https://example.com/content"
            />
          </div>
        </>
      );
    }

    return commonFields;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Add {contentType === 'notes' ? 'Note' : contentType === 'pyqs' ? 'Previous Year Question' : contentType.charAt(0).toUpperCase() + contentType.slice(1)}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderFormFields()}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Adding...' : 'Add Content'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminContentDialog;
