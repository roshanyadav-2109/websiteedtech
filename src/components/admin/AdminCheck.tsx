
import React from 'react';
import { useAuth } from '@/hooks/useAuth';

interface AdminCheckProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminCheck: React.FC<AdminCheckProps> = ({ children, requireSuperAdmin = false }) => {
  const { isAdmin, isSuperAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    return null;
  }

  if (!requireSuperAdmin && !isAdmin) {
    return null;
  }

  return <>{children}</>;
};

export default AdminCheck;
