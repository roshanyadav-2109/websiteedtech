
import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  ];

  if (isSuperAdmin) {
    menuItems.push({ id: "admins", label: "Admin Management", icon: Shield });
  }

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-royal">Admin Dashboard</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${
                  activeTab === item.id 
                    ? "bg-royal text-white" 
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default AdminSidebar;
