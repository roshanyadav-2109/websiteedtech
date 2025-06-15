
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface AdminCheckProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const AdminCheck: React.FC<AdminCheckProps> = ({ children, requireSuperAdmin = false }) => {
  const { user, isLoading, isAdmin, isSuperAdmin } = useAuth();

  console.log('AdminCheck state:', { 
    user: user?.email, 
    isAdmin, 
    isSuperAdmin,
    requireSuperAdmin,
    isLoading
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-royal" />
          <p className="text-gray-600">Checking authentication...</p>
        </div>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You don't have permission to access this area.</p>
          <div className="bg-gray-50 p-4 rounded text-sm">
            <p className="text-gray-500">Current user: {user.email}</p>
            <p className="text-gray-500">Admin status: {isAdmin ? 'Yes' : 'No'}</p>
            {requireSuperAdmin && (
              <p className="text-gray-500">Super Admin required: {isSuperAdmin ? 'Yes' : 'No'}</p>
            )}
          </div>
          <div className="mt-4">
            <button 
              onClick={() => window.location.href = '/admin/login'}
              className="bg-royal text-white px-4 py-2 rounded hover:bg-royal-dark"
            >
              Go to Admin Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (requireSuperAdmin && !isSuperAdmin) {
    console.log('Super admin required but user is not super admin');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Super Admin Access Required</h2>
          <p className="text-gray-600 mb-4">You need super admin privileges to access this area.</p>
          <div className="bg-gray-50 p-4 rounded text-sm">
            <p className="text-gray-500">Current user: {user.email}</p>
            <p className="text-gray-500">Super Admin status: {isSuperAdmin ? 'Yes' : 'No'}</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('Admin access granted');
  return <>{children}</>;
};

export default AdminCheck;
