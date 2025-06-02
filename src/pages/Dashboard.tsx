
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PersonalizedDashboard from "@/components/dashboard/PersonalizedDashboard";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

const Dashboard = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OptimizedAuthWrapper>
            <PersonalizedDashboard />
          </OptimizedAuthWrapper>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
