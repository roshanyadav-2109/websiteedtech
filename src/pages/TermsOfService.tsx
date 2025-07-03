
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Terms of Service</h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-2"><strong>Last Updated:</strong> January 2024</p>
              <p className="text-gray-700"><strong>Effective Date:</strong> January 2024</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using the Unknown IITians website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Service</h2>
              <p className="text-gray-700 mb-4">Unknown IITians provides educational services including:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Online courses and educational content</li>
                <li>Exam preparation materials for JEE, NEET, and IITM BS</li>
                <li>Study resources, notes, and practice questions</li>
                <li>Career guidance and counseling services</li>
                <li>Employment verification services</li>
                <li>Community forums and study groups</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts and Registration</h2>
              <p className="text-gray-700 mb-4">To access certain features of our services, you must register for an account. You agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use Policy</h2>
              <p className="text-gray-700 mb-4">You agree not to use our services to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Interfere with or disrupt our services or servers</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use our services for commercial purposes without permission</li>
                <li>Share your account credentials with others</li>
                <li>Engage in fraudulent or deceptive practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Payment Terms and Refund Policy</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Payment Processing</h3>
              <p className="text-gray-700 mb-4">All payments are processed securely through our authorized payment partners. You agree to provide accurate payment information and authorize us to charge the specified amounts.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Course Fees</h3>
              <p className="text-gray-700 mb-4">Course fees are clearly stated at the time of enrollment. Prices may change without notice, but changes will not affect existing enrollments.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Refund Policy</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Refunds may be requested within 7 days of course enrollment</li>
                <li>Refund eligibility depends on course progress and usage</li>
                <li>Processing fees may be deducted from refund amounts</li>
                <li>Refunds are processed within 7-14 business days</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property Rights</h2>
              <p className="text-gray-700 mb-4">All content on our platform, including but not limited to text, graphics, logos, videos, and software, is the property of Unknown IITians and is protected by intellectual property laws.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">License to Use</h3>
              <p className="text-gray-700 mb-4">We grant you a limited, non-exclusive, non-transferable license to access and use our content for personal educational purposes only.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Restrictions</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>You may not reproduce, distribute, or sell our content</li>
                <li>You may not modify or create derivative works</li>
                <li>You may not reverse engineer our software</li>
                <li>You may not share login credentials or course access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h2>
              <p className="text-gray-700">
                Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our services, you consent to the collection and use of your information as described in our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers and Limitations of Liability</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Availability</h3>
              <p className="text-gray-700 mb-4">We strive to maintain service availability but do not guarantee uninterrupted access. Services may be temporarily unavailable due to maintenance, updates, or technical issues.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Educational Outcomes</h3>
              <p className="text-gray-700 mb-4">While we provide quality educational content, we do not guarantee specific academic outcomes or exam results. Success depends on individual effort and circumstances.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Limitation of Liability</h3>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Unknown IITians shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Employment Verification Services</h2>
              <p className="text-gray-700 mb-4">Our employment verification services are provided for legitimate verification purposes only. Users of this service agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Use verification services only for lawful purposes</li>
                <li>Provide accurate information for verification requests</li>
                <li>Respect the privacy of individuals being verified</li>
                <li>Not misuse or falsify verification information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 mb-4">We may terminate or suspend your account and access to our services at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Effects of Termination</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Your right to access our services will cease immediately</li>
                <li>Any outstanding payments become immediately due</li>
                <li>We may delete your account and associated data</li>
                <li>Certain provisions of these Terms will survive termination</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700">
                You agree to indemnify, defend, and hold harmless Unknown IITians, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of our services or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law and Jurisdiction</h2>
              <p className="text-gray-700">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes acceptance of the modified Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Severability</h2>
              <p className="text-gray-700">
                If any provision of these Terms is found to be unenforceable or invalid, such provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">If you have questions about these Terms of Service, please contact us:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@unknowniitians.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 9876543210</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Education Street, Mumbai, Maharashtra 400001, India</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfService;
