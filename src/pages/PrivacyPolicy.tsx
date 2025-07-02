
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                <strong>Effective Date:</strong> January 1, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  Unknown IITians ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Data</h3>
                <p className="text-gray-700 mb-4">
                  We may collect personally identifiable information, such as:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>Name and contact information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Educational background and academic information</li>
                  <li>Payment information (processed securely through third-party providers)</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Usage Data</h3>
                <p className="text-gray-700 mb-4">
                  We may also collect information about how the service is accessed and used, including:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>IP address and browser type</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Device information and operating system</li>
                  <li>Referral sources and search terms used</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">
                  We use the collected information for various purposes:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>To provide and maintain our educational services</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our service</li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>To send you marketing communications (with your consent)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except as described in this Privacy Policy:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li><strong>Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in operating our website and providing our services</li>
                  <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li>Encryption of sensitive data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Secure payment processing through certified third-party providers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Privacy Rights</h2>
                <p className="text-gray-700 mb-4">
                  You have certain rights regarding your personal information:
                </p>
                <ul className="list-disc ml-6 text-gray-700 mb-4">
                  <li><strong>Access:</strong> Request copies of your personal data</li>
                  <li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong>Erasure:</strong> Request deletion of your personal data under certain circumstances</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Objection:</strong> Object to our processing of your personal data</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar tracking technologies to enhance your experience on our website. Cookies are small data files stored on your device. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
                <p className="text-gray-700 mb-4">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective Date" at the top of this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700">
                    <strong>Unknown IITians</strong><br />
                    Email: privacy@unknowniitians.com<br />
                    Phone: +91-XXXXXXXXXX<br />
                    Address: [Your Business Address]<br />
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

export default PrivacyPolicy;
