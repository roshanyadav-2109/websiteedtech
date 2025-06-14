
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import AdminCheck from "@/components/admin/AdminCheck";
import SuperAdminPanel from "@/components/admin/SuperAdminPanel";
import ContentManagementTab from "@/components/admin/ContentManagementTab";

// Import existing admin components
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import CoursesManagerTab from "@/components/admin/CoursesManagerTab";
import NotesManagerTab from "@/components/admin/NotesManagerTab";
import PYQsManagerTab from "@/components/admin/PYQsManagerTab";
import NewsManagerTab from "@/components/admin/NewsManagerTab";
import DatesManagerTab from "@/components/admin/DatesManagerTab";
import JobsManagerTab from "@/components/admin/JobsManagerTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("content-management");
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <AdminCheck>
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Main content */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <AdminHeader />
          
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="content-management" className="mt-0">
                <ContentManagementTab />
              </TabsContent>
              
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
              
              <TabsContent value="admins" className="mt-0">
                <AdminCheck requireSuperAdmin>
                  <SuperAdminPanel />
                </AdminCheck>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </AdminCheck>
  );
};

export default AdminDashboard;
