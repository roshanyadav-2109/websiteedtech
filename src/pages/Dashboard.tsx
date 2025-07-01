
import React from "react";
import NavBar from "@/components/NavBar";
import FooterWithNewsletter from "@/components/FooterWithNewsletter";
import EnhancedPersonalizedDashboard from "@/components/enhanced/EnhancedPersonalizedDashboard";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20">
        <OptimizedAuthWrapper>
          <EnhancedPersonalizedDashboard />
        </OptimizedAuthWrapper>
      </div>
      <FooterWithNewsletter />
    </>
  );
};

export default Dashboard;
