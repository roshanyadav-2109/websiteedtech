
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20 bg-slate-50 min-h-screen">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Terms and Conditions for <span className="text-golden">UNKNOWN IITIANS</span></h1>
            <p className="text-lg text-gray-200 mb-2">Welcome to UNKNOWN IITIANS ("we," "us," or "our"). These Terms and Conditions govern your access and use of our website ("Site"). By using our Site, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, please refrain from using our services.</p>
          </div>
        </section>
        <section className="py-12 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-premium">
              <CardContent className="py-8 px-6 sm:p-10">
                <div className="prose prose-lg max-w-none">
                  <h2 className="font-bold text-2xl text-royal mb-4">1. General Use of the Website</h2>
                  <p>
                    Our website is intended to provide educational content, including notes, lectures, and study materials, for academic purposes. By accessing our Site, you acknowledge that you will use our platform in a lawful manner and will not engage in any activity that disrupts or damages the functionality of our Site. Misuse of our services, including unauthorized access, data extraction, hacking, or distribution of harmful content, is strictly prohibited. We reserve the right to restrict or terminate access for users who violate these terms.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">2. User Accounts and Responsibilities</h2>
                  <p>
                    To access certain features of our Site, users may be required to register an account. When registering, you agree to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your login credentials and any activities that occur under your account. If you suspect unauthorized use of your account, you must notify us immediately at <a className="text-royal underline" href="mailto:help.unknowniitians@gmail.com">help.unknowniitians@gmail.com</a>. We reserve the right to suspend or terminate accounts found to be in violation of our policies or engaged in fraudulent activities.
                  </p>

                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">3. Intellectual Property Rights</h2>
                  <p>
                    All content available on our Site, including notes, lectures, articles, graphics, logos, and other educational materials, is the intellectual property of UNKNOWN IITIANS unless otherwise specified. This content is protected under copyright and intellectual property laws. Users may not copy, modify, reproduce, distribute, or use any of our materials for commercial purposes without obtaining prior written permission from us. Unauthorized use of our intellectual property may result in legal action. If you wish to use any of our content for educational purposes, please contact us at <a className="text-royal underline" href="mailto:help.unknowniitians@gmail.com">help.unknowniitians@gmail.com</a>.
                  </p>

                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">4. Paid Services and Payment Policy</h2>
                  <p>
                    Certain services on our Site, such as premium educational materials, may require payment. By making a purchase, you agree to pay the applicable fees and taxes through our secure payment gateways. Payments are processed by third-party payment providers, and we do not store or have access to sensitive payment information. Refund policies, if applicable, will be outlined separately and should be reviewed before making a purchase. Failure to complete a payment may result in restricted access to premium content.
                  </p>
                  <h3 className="font-semibold text-lg text-golden mt-6 mb-2">Cancellation Policy:</h3>
                  <p>
                    Once enrolled in a batch, cancellations or refunds are not permitted under any circumstances. By completing the enrollment process, you acknowledge and agree that your subscription is non-transferable and non-refundable. Please ensure your availability and commitment before enrolling, as all seats are allocated and resources planned based on confirmed participants.
                  </p>
                  <h3 className="font-semibold text-lg text-golden mt-6 mb-2">Shipping Policy (Batch Access):</h3>
                  <p>
                    This is a digital service. Once your payment is successfully processed, access to the enrolled batch will be granted within 2–3 business days. All necessary details, including login credentials or joining instructions, will be shared via email. As this is a non-physical product, no physical shipping is involved.
                  </p>

                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">5. User-Generated Content and Contributions</h2>
                  <p>
                    Users may have the opportunity to submit notes, comments, or other content to our platform. By submitting content, you grant UNKNOWN IITIANS a non-exclusive, royalty-free license to use, modify, distribute, and display your content for educational purposes. However, we reserve the right to remove any user-generated content that violates our policies, infringes copyright, contains offensive material, or is deemed inappropriate. Users are solely responsible for ensuring that their submissions comply with applicable laws and do not infringe on the rights of third parties.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">6. Privacy Policy and Data Protection</h2>
                  <p>
                    Your use of our Site is also governed by our Privacy Policy, which details how we collect, use, and protect your personal data. We are committed to safeguarding user data and employ security measures to prevent unauthorized access. However, no data transmission over the internet is completely secure, and users should exercise caution when sharing personal information online. We encourage you to review our Privacy Policy to understand your rights regarding data protection and privacy.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">7. Third-Party Links and Services</h2>
                  <p>
                    Our website may contain links to third-party websites or services for additional educational resources. These third-party sites operate independently and have their own terms and privacy policies. UNKNOWN IITIANS is not responsible for the content, security, or practices of external websites. Users should review third-party policies before engaging with external content or providing personal information.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">8. Limitation of Liability and Disclaimer of Warranties</h2>
                  <p>
                    UNKNOWN IITIANS provides content and services on an "as is" basis without any express or implied warranties. While we strive to provide accurate and useful educational materials, we do not guarantee the completeness, reliability, or accuracy of the content available on our Site. We are not responsible for any errors, omissions, or damages arising from the use of our website. Additionally, we are not liable for technical failures, interruptions, or security breaches beyond our control.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">9. Termination of Services</h2>
                  <p>
                    We reserve the right to terminate or restrict access to our Site for users who violate these Terms and Conditions. This includes, but is not limited to, breaches of intellectual property rights, fraudulent activities, misuse of services, or engaging in harmful activities. Termination of access may be immediate and without prior notice. Users may contact us for clarification regarding account suspensions or restrictions.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">10. Modifications to Terms and Conditions</h2>
                  <p>
                    UNKNOWN IITIANS reserves the right to modify or update these Terms and Conditions at any time to reflect changes in our services, legal requirements, or operational needs. Any updates will be posted on this page with a revised "Effective Date." Continued use of our Site after changes have been made constitutes acceptance of the updated terms. Users are encouraged to review this page periodically to stay informed.
                  </p>
                  
                  <h2 className="font-bold text-2xl text-royal mt-8 mb-4">11. Contact Information</h2>
                  <p>
                    If you have any questions, concerns, or require assistance regarding these Terms and Conditions, please contact us at:
                  </p>
                  <div className="pl-4 mb-2">
                    <b>UNKNOWN IITIANS</b><br />
                    Email: <a className="text-royal underline" href="mailto:help.unknowniitians@gmail.com">help.unknowniitians@gmail.com</a>
                  </div>
                  <p>
                    By accessing and using our services, you acknowledge and agree to abide by these Terms and Conditions. Failure to comply with these terms may result in the suspension or termination of access to our platform. Thank you for being a part of UNKNOWN IITIANS and for using our platform responsibly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfService;
