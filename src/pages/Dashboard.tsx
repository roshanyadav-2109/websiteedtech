
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ModernDashboard from "@/components/dashboard/ModernDashboard";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="pt-20">
        <OptimizedAuthWrapper>
          <ModernDashboard />
        </OptimizedAuthWrapper>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
