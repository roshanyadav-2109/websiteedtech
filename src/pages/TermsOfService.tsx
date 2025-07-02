
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Agreement to Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using Unknown IITians' website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use License</h2>
                <p className="text-gray-700 mb-4">
                  Permission is granted to temporarily download one copy of the materials on Unknown IITians' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>modify or copy the materials</li>
                  <li>use the materials for any commercial purpose or for any public display</li>
                  <li>attempt to reverse engineer any software contained on the website</li>
                  <li>remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-700 mb-4">
                  When you create an account with us, you must provide information that is accurate, complete, and current at all times. You are responsible for safeguarding the password and for all activities that occur under your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Educational Content</h2>
                <p className="text-gray-700 mb-4">
                  All educational materials, including but not limited to notes, practice questions, and study guides, are provided for educational purposes only. Unknown IITians does not guarantee the accuracy, completeness, or currency of the content.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Payment and Refunds</h2>
                <p className="text-gray-700 mb-4">
                  For paid services, payment is due at the time of purchase. Refunds are available within 7 days of purchase, subject to our refund policy. All payments are processed securely through our third-party payment providers.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
                <p className="text-gray-700 mb-4">
                  You may not use our service:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Disclaimer</h2>
                <p className="text-gray-700 mb-4">
                  The materials on Unknown IITians' website are provided on an 'as is' basis. Unknown IITians makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitations</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall Unknown IITians or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Unknown IITians' website, even if Unknown IITians or an authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  Unknown IITians reserves the right to revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us at:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Unknown IITians</strong><br />
                    Email: support@unknowniitians.com<br />
                    Website: www.unknowniitians.com
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
