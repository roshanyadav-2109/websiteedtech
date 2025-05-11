
import React from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { LogOut, BookOpen, FileText, Calendar, Newspaper, Briefcase, Graduate } from "lucide-react";

interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  const menuItems = [
    { id: "courses", icon: <Graduate className="mr-2 h-5 w-5" />, label: "Courses" },
    { id: "notes", icon: <BookOpen className="mr-2 h-5 w-5" />, label: "Notes" },
    { id: "pyqs", icon: <FileText className="mr-2 h-5 w-5" />, label: "PYQs" },
    { id: "news", icon: <Newspaper className="mr-2 h-5 w-5" />, label: "News" },
    { id: "dates", icon: <Calendar className="mr-2 h-5 w-5" />, label: "Important Dates" },
    { id: "jobs", icon: <Briefcase className="mr-2 h-5 w-5" />, label: "Jobs" },
  ];

  return (
    <div className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-royal">Admin CMS</h2>
        <p className="text-sm text-gray-500">Manage your website content</p>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${activeTab === item.id ? 'bg-royal text-white' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center text-red-500"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
