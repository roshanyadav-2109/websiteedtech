
import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { Loader } from "lucide-react";

interface AdminRouteProps {
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { user, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="h-8 w-8 animate-spin text-royal" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AdminRoute;
