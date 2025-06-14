
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useBackend } from '@/components/BackendIntegratedWrapper';

interface AdminAddButtonProps {
  onClick?: () => void;
  onAdd?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
  contentType?: string;
  examType?: string;
}

const AdminAddButton: React.FC<AdminAddButtonProps> = ({ 
  onClick, 
  onAdd,
  children, 
  disabled = false,
  contentType,
  examType
}) => {
  const { isAdmin, isAdminLoading } = useBackend();

  // Don't render if not admin or still loading
  if (isAdminLoading || !isAdmin) {
    return null;
  }

  const handleClick = () => {
    if (onClick) onClick();
    if (onAdd) onAdd();
  };

  return (
    <Button 
      onClick={handleClick} 
      disabled={disabled}
      className="bg-royal hover:bg-royal-dark"
    >
      <Plus className="mr-2 h-4 w-4" />
      {children || `Add ${contentType || 'Item'}`}
    </Button>
  );
};

export default AdminAddButton;
