
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
  const { isAdmin, isSuperAdmin, isLoading: adminLoading } = useAdminCheck();

  const isLoading = authLoading || adminLoading;

  console.log('AdminCheck state:', { 
    user: user?.email, 
    isAdmin, 
    isSuperAdmin,
    requireSuperAdmin,
    isLoading, 
    authLoading, 
    adminLoading 
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    console.log('No user, redirecting to admin login');
    return <Navigate to="/admin/login" replace />;
  }

  if (!isAdmin) {
    console.log('User is not admin, showing access denied');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this area.</p>
          <p className="text-sm text-gray-500 mt-2">Current user: {user.email}</p>
          <p className="text-sm text-gray-500">Admin status: {isAdmin ? 'Yes' : 'No'}</p>
          {requireSuperAdmin && (
            <p className="text-sm text-gray-500">Super Admin required: {isSuperAdmin ? 'Yes' : 'No'}</p>
          )}
        </div>
      </div>
    );
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    console.log('Super admin required but user is not super admin');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Super Admin Access Required</h2>
          <p className="text-gray-600">You need super admin privileges to access this area.</p>
          <p className="text-sm text-gray-500 mt-2">Current user: {user.email}</p>
          <p className="text-sm text-gray-500">Super Admin status: {isSuperAdmin ? 'Yes' : 'No'}</p>
        </div>
      </div>
    );
  }

  console.log('Admin access granted');
  return <>{children}</>;
};

export default AdminCheck;
