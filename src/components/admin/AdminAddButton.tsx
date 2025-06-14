
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useBackend } from '@/components/BackendIntegratedWrapper';
import AdminContentDialog from './AdminContentDialog';

interface AdminAddButtonProps {
  onClick?: () => void;
  onAdd?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  contentType?: 'notes' | 'pyqs' | 'news' | 'dates' | 'communities' | 'courses' | 'syllabus';
  examType?: string;
}

const AdminAddButton: React.FC<AdminAddButtonProps> = ({ 
  onClick, 
  onAdd,
  children, 
  disabled = false,
  contentType = 'notes',
  examType
}) => {
  const { isAdmin, isAdminLoading } = useBackend();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Don't render if not admin or still loading
  if (isAdminLoading || !isAdmin) {
    return null;
  }

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onAdd) {
      onAdd();
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Button 
        onClick={handleClick} 
        disabled={disabled}
        className="bg-royal hover:bg-royal-dark"
      >
        <Plus className="mr-2 h-4 w-4" />
        {children || `Add ${contentType}`}
      </Button>

      <AdminContentDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        contentType={contentType}
        examType={examType}
      />
    </>
  );
};

export default AdminAddButton;
