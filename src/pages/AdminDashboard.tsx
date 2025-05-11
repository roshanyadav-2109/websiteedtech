
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

// Admin component imports
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import CoursesManagerTab from "@/components/admin/CoursesManagerTab";
import NotesManagerTab from "@/components/admin/NotesManagerTab";
import PYQsManagerTab from "@/components/admin/PYQsManagerTab";
import NewsManagerTab from "@/components/admin/NewsManagerTab";
import DatesManagerTab from "@/components/admin/DatesManagerTab";
import JobsManagerTab from "@/components/admin/JobsManagerTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        
        if (data?.session?.user && data.session.user.email === "help.unknowniitians@gmail.com") {
          setIsAdmin(true);
        } else {
          navigate("/admin");
        }
      } catch (error) {
        navigate("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="courses" className="mt-0">
              <CoursesManagerTab />
            </TabsContent>
            
            <TabsContent value="notes" className="mt-0">
              <NotesManagerTab />
            </TabsContent>
            
            <TabsContent value="pyqs" className="mt-0">
              <PYQsManagerTab />
            </TabsContent>
            
            <TabsContent value="news" className="mt-0">
              <NewsManagerTab />
            </TabsContent>
            
            <TabsContent value="dates" className="mt-0">
              <DatesManagerTab />
            </TabsContent>
            
            <TabsContent value="jobs" className="mt-0">
              <JobsManagerTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
