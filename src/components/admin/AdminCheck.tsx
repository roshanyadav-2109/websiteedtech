
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AdminCheckProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminCheck: React.FC<AdminCheckProps> = ({ children, requireSuperAdmin = false }) => {
  const { user, isLoading: authLoading } = useAuth();
  const { isAdmin, isLoading: adminLoading } = useAdminCheck();

  const isLoading = authLoading || adminLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this area.</p>
          <p className="text-sm text-gray-500 mt-2">Current user: {user.email}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminCheck;
