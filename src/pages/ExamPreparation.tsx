
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";

const ExamPreparation = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">Exam Preparation</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              This page is under construction. Check back soon for our exam preparation resources.
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default ExamPreparation;
