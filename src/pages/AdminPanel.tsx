
import React, { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SubjectsAdmin from "@/components/admin/SubjectsAdmin";
import NotesAdmin from "@/components/admin/NotesAdmin";
import PYQsAdmin from "@/components/admin/PYQsAdmin";
import BatchesAdmin from "@/components/admin/BatchesAdmin";
import CommunitiesAdmin from "@/components/admin/CommunitiesAdmin";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  BookOpen, 
  Settings, 
  Users, 
  BookmarkIcon, 
  LayoutDashboard 
} from "lucide-react";

const AdminPanel = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-16">
        <div className="bg-royal text-white py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-royal-light">Manage website content and settings</p>
              </div>
              <Button 
                variant="outline" 
                className="md:hidden bg-white/10 hover:bg-white/20 text-white border-white/20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                Menu
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Sidebar Navigation */}
          <aside className={`w-full md:w-64 md:block ${isMenuOpen ? 'block' : 'hidden'} md:mr-8 mb-4 md:mb-0`}>
            <nav className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h2 className="font-medium text-gray-800">Content Management</h2>
              </div>
              
              <div className="p-2">
                <Link to="/admin">
                  <Button variant={isActive("/admin") ? "default" : "ghost"} className="w-full justify-start mb-1">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                
                <Link to="/admin/subjects">
                  <Button variant={isActive("/admin/subjects") ? "default" : "ghost"} className="w-full justify-start mb-1">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Subjects
                  </Button>
                </Link>
                
                <Link to="/admin/notes">
                  <Button variant={isActive("/admin/notes") ? "default" : "ghost"} className="w-full justify-start mb-1">
                    <FileText className="mr-2 h-4 w-4" />
                    Notes
                  </Button>
                </Link>
                
                <Link to="/admin/pyqs">
                  <Button variant={isActive("/admin/pyqs") ? "default" : "ghost"} className="w-full justify-start mb-1">
                    <FileText className="mr-2 h-4 w-4" />
                    PYQs
                  </Button>
                </Link>
                
                <Link to="/admin/batches">
                  <Button variant={isActive("/admin/batches") ? "default" : "ghost"} className="w-full justify-start mb-1">
                    <BookmarkIcon className="mr-2 h-4 w-4" />
                    Batches
                  </Button>
                </Link>
                
                <Link to="/admin/communities">
                  <Button variant={isActive("/admin/communities") ? "default" : "ghost"} className="w-full justify-start mb-1">
                    <Users className="mr-2 h-4 w-4" />
                    Communities
                  </Button>
                </Link>
                
                <Link to="/admin/settings">
                  <Button variant={isActive("/admin/settings") ? "default" : "ghost"} className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </nav>
          </aside>
          
          {/* Main content area */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/subjects/*" element={<SubjectsAdmin />} />
              <Route path="/notes/*" element={<NotesAdmin />} />
              <Route path="/pyqs/*" element={<PYQsAdmin />} />
              <Route path="/batches/*" element={<BatchesAdmin />} />
              <Route path="/communities/*" element={<CommunitiesAdmin />} />
              <Route path="/settings" element={<AdminSettings />} />
            </Routes>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const AdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="font-medium text-lg mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/notes/new">
                <FileText className="mr-2 h-4 w-4" />
                Add New Note
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/pyqs/new">
                <FileText className="mr-2 h-4 w-4" />
                Add New PYQ
              </Link>
            </Button>
            <Button asChild className="w-full justify-start" variant="outline">
              <Link to="/admin/subjects/new">
                <BookOpen className="mr-2 h-4 w-4" />
                Add New Subject
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
      <p className="text-gray-500">Configure admin panel settings and preferences.</p>
    </div>
  );
};

export default AdminPanel;
