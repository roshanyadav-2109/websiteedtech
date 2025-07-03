
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Privacy Policy</h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-gray-700 mb-2"><strong>Last Updated:</strong> January 2024</p>
              <p className="text-gray-700"><strong>Effective Date:</strong> January 2024</p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Unknown IITians ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Personal Information</h3>
              <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Educational background and academic records</li>
                <li>Course enrollment and payment information</li>
                <li>Employment verification details</li>
                <li>Profile information and preferences</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Automatically Collected Information</h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Website usage patterns and analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Providing educational services and course materials</li>
                <li>Processing enrollments and payments</li>
                <li>Communicating about courses, updates, and support</li>
                <li>Verifying employment and academic credentials</li>
                <li>Improving our website and services</li>
                <li>Complying with legal obligations</li>
                <li>Sending marketing communications (with consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information. We may share your information in the following circumstances:</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Service Providers</h3>
              <p className="text-gray-700 mb-4">We may share information with trusted third-party service providers who assist us in operating our website and providing services.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Legal Requirements</h3>
              <p className="text-gray-700 mb-4">We may disclose information when required by law or to protect our rights, property, or safety.</p>
              
              <h3 className="text-xl font-medium text-gray-800 mb-3">Business Transfers</h3>
              <p className="text-gray-700 mb-4">In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new entity.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 mb-4">We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li><strong>Access:</strong> Request access to your personal information</li>
                <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
                <li><strong>Restriction:</strong> Request limitation of processing activities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4">We use cookies and similar technologies to enhance your browsing experience. You can control cookie settings through your browser preferences. Types of cookies we use include:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Essential cookies for website functionality</li>
                <li>Analytics cookies for usage statistics</li>
                <li>Performance cookies for optimization</li>
                <li>Marketing cookies for personalized content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
              <p className="text-gray-700">
                Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
              <p className="text-gray-700">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Specific retention periods vary based on the type of information and legal requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700 mb-4">If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@unknowniitians.com</p>
                <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 9876543210</p>
                <p className="text-gray-700"><strong>Address:</strong> 123 Education Street, Mumbai, Maharashtra 400001, India</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Compliance</h2>
              <p className="text-gray-700">
                This Privacy Policy is designed to comply with applicable data protection laws and regulations, including but not limited to the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and Indian Personal Data Protection laws. We are committed to maintaining the highest standards of data protection and privacy.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
