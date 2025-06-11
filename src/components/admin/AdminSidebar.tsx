
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileText, 
  Calendar, 
  Newspaper, 
  Briefcase,
  GraduationCap,
  Users,
  Shield
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const { isSuperAdmin } = useAuth();

  const menuItems = [
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "pyqs", label: "PYQs", icon: FileText },
    { id: "news", label: "News", icon: Newspaper },
    { id: "dates", label: "Important Dates", icon: Calendar },
    { id: "jobs", label: "Jobs", icon: Briefcase },
    { id: "communities", label: "Communities", icon: Users },
  ];

  if (isSuperAdmin) {
    menuItems.push({ id: "admins", label: "Manage Admins", icon: Shield });
  }

  return (
    <div className="w-64 bg-white shadow-lg h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start px-6 py-3 text-left ${
                activeTab === item.id ? "bg-royal/10 text-royal border-r-2 border-royal" : "text-gray-600 hover:text-royal hover:bg-royal/5"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <IconComponent className="mr-3 h-5 w-5" />
              {item.label}
            </Button>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
