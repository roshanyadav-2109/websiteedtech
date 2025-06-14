
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AdminAddButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const AdminAddButton: React.FC<AdminAddButtonProps> = ({ 
  onClick, 
  children, 
  disabled = false 
}) => {
  return (
    <Button 
      onClick={onClick} 
      disabled={disabled}
      className="bg-royal hover:bg-royal-dark"
    >
      <Plus className="mr-2 h-4 w-4" />
      {children}
    </Button>
  );
};

export default AdminAddButton;
