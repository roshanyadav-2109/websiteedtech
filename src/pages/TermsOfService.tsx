
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Please read these terms carefully
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <h2>Acceptance of Terms</h2>
              <p>
                By accessing and using Unknown IITians services, you accept and agree to be bound by 
                the terms and provision of this agreement.
              </p>

              <h2>Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the materials on Unknown IITians 
                website for personal, non-commercial transitory viewing only.
              </p>

              <h2>Disclaimer</h2>
              <p>
                The materials on Unknown IITians website are provided on an 'as is' basis. Unknown IITians 
                makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including without limitation, implied warranties or conditions of merchantability, fitness for 
                a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>

              <h2>Limitations</h2>
              <p>
                In no event shall Unknown IITians or its suppliers be liable for any damages (including, 
                without limitation, damages for loss of data or profit, or due to business interruption) 
                arising out of the use or inability to use the materials on Unknown IITians website.
              </p>

              <h2>User Accounts</h2>
              <p>
                When you create an account with us, you must provide information that is accurate, complete, 
                and current at all times. You are responsible for safeguarding the password and for all 
                activities that occur under your account.
              </p>

              <h2>Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us at 
                support@unknowniitians.com
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfService;
