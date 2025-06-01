
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>By using this website, you agree to our Privacy Policy and Terms of Use. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. Unauthorized use of our materials is prohibited.</p>
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy for UNKNOWN IITIANS</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-sm text-gray-600 mb-6"><strong>Effective Date:</strong> 01 January 2025</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed">
                Welcome to UNKNOWN IITIANS ("we," "us," or "our"). We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, and protect your personal data when you visit and use our website ("Site"), where we provide notes, lectures, and other educational materials.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                By using our Site, you agree to the terms of this Privacy Policy. If you do not agree with this policy, please refrain from using our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information from you when you use our Site, register for an account, or interact with our educational content. The types of information we collect include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Personal Identification Information:</strong> When you register for an account, subscribe to newsletters, or contact us, we may collect personal details such as your name, email address, phone number, and other necessary contact information.</li>
                <li><strong>Non-Personal Identification Information:</strong> We may collect non-identifiable information automatically, such as IP addresses, browser types, device information, and browsing patterns. This information helps us understand how users interact with our website and improve our services.</li>
                <li><strong>Payment Information:</strong> If you purchase paid content (such as premium notes or lectures), we may collect payment details such as credit card information. Payments are processed securely through third-party payment processors, and we do not store sensitive payment data.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>To Provide and Improve Services:</strong> We use your personal and non-personal information to deliver educational content, update you on new notes and lectures, improve the user experience, and tailor the content to your needs.</li>
                <li><strong>To Communicate:</strong> We may use your contact details to send you updates, newsletters, and promotional offers related to our services, provided you have given consent to receive such communications.</li>
                <li><strong>To Process Transactions:</strong> If you make a purchase, we will use your payment details to process the transaction securely. We do not store payment information, and all transactions are handled by trusted third-party payment processors.</li>
                <li><strong>To Protect and Improve Site Security:</strong> We monitor usage data to help secure our website and protect your personal data from unauthorized access.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Protect Your Information</h2>
              <p className="text-gray-700 leading-relaxed">
                We take appropriate technical and organizational measures to safeguard your personal information. These include secure servers, encryption technologies, and secure payment processing systems. However, no data transmission over the internet is completely secure, and while we strive to protect your data, we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 leading-relaxed">
                We may use cookies and similar tracking technologies to enhance the user experience on our Site. Cookies are small files stored on your device that help us analyze website traffic, customize your experience, and remember your preferences.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                You can control cookie settings through your browser, but please note that disabling cookies may affect the functionality of certain features on our Site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Links</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites, such as payment processors or external content providers. These websites have their own privacy policies, and we are not responsible for their practices. Please review their privacy policies before submitting any personal data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Sharing Your Information</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, rent, or lease your personal information to third parties. However, we may share your data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>With Service Providers:</strong> We may share your information with trusted third-party service providers who assist us in running our website, processing payments, or improving our services. These providers are obligated to keep your information confidential.</li>
                <li><strong>For Legal Compliance:</strong> We may disclose your personal information if required by law or in response to valid requests by public authorities, such as government agencies or law enforcement.</li>
                <li><strong>In Case of Business Transfer:</strong> If we are involved in a merger, acquisition, or sale of assets, your personal data may be transferred as part of that transaction. We will notify you in advance of any such transfer.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Data Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> You can request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> If any of your personal information is incorrect or incomplete, you can request that we update it.</li>
                <li><strong>Deletion:</strong> You can request that we delete your personal data, subject to legal obligations or legitimate business interests.</li>
                <li><strong>Opt-Out of Marketing Communications:</strong> You can opt out of receiving promotional emails by following the unsubscribe link in our emails or contacting us directly.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-4">
                To exercise any of these rights, please contact us at unknowniitians@gmail.com.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If we discover that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Copyright and Unauthorized Use of Materials</h2>
              <p className="text-gray-700 leading-relaxed">
                All educational content, notes, lectures, and other materials provided on our Site are the intellectual property of UNKNOWN IITIANS, unless otherwise specified. These materials are protected by copyright and other intellectual property laws. You may not copy, reproduce, distribute, or otherwise use any of our materials for commercial purposes without prior written permission from us.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Unauthorized use of our materials, including copying or distributing our content without permission, is prohibited. If you would like to use any of our materials for educational or other purposes, please contact us at unknowniitians@gmail.com for permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. Any updates will be posted on this page with the revised "Effective Date." We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or concerns regarding this Privacy Policy or how we handle your personal data, please contact us at:
              </p>
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">UNKNOWN IITIANS</p>
                <p className="text-gray-700">Email: help.unknowniitians@gmail.com</p>
              </div>
              <p className="text-gray-700 leading-relaxed mt-4">
                This Privacy Policy is intended to provide a clear understanding of how we handle your personal data and the use of our intellectual property. By using our services, you consent to the practices described herein.
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
