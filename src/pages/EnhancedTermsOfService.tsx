
import React from "react";
import NavBar from "@/components/NavBar";
import FooterWithNewsletter from "@/components/FooterWithNewsletter";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Users } from "lucide-react";

const EnhancedTermsOfService = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl">
                <Scale className="h-16 w-16 text-golden" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Terms of <span className="text-golden">Service</span>
            </h1>
            <p className="text-xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed">
              Clear and transparent terms governing your use of Unknown IITians educational platform 
              and services. Read to understand your rights and responsibilities.
            </p>
            <div className="text-sm text-gray-300 bg-white/10 rounded-lg p-4 inline-block">
              <strong>Last Updated:</strong> January 2025 | <strong>Effective:</strong> Immediately
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Users className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Fair Usage</h3>
                <p className="text-sm text-gray-600 mt-2">Respectful platform usage for all</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Shield className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Protected Content</h3>
                <p className="text-sm text-gray-600 mt-2">Intellectual property safeguards</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <CheckCircle className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Clear Policies</h3>
                <p className="text-sm text-gray-600 mt-2">Transparent service guidelines</p>
              </div>
            </div>

            <Card className="shadow-2xl border-0 mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="flex items-center mb-8">
                    <FileText className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">1. Acceptance of Terms</h2>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl mb-8">
                    <p className="text-blue-900 mb-4">
                      By accessing and using the Unknown IITians platform, you acknowledge that you have read, 
                      understood, and agree to be bound by these Terms of Service. If you do not agree to these 
                      terms, please discontinue use of our services immediately.
                    </p>
                    <div className="bg-blue-100 p-4 rounded-lg">
                      <strong className="text-blue-800">Important:</strong> These terms constitute a legally 
                      binding agreement between you and Unknown IITians.
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Users className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">2. User Accounts & Responsibilities</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-green-900 mb-3">Account Security</h4>
                      <ul className="text-green-800 space-y-2 text-sm">
                        <li>• Maintain confidentiality of login credentials</li>
                        <li>• Provide accurate registration information</li>
                        <li>• Notify us immediately of unauthorized access</li>
                        <li>• Take responsibility for all account activities</li>
                      </ul>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-purple-900 mb-3">Acceptable Usage</h4>
                      <ul className="text-purple-800 space-y-2 text-sm">
                        <li>• Use services for educational purposes only</li>
                        <li>• Respect other users and community guidelines</li>
                        <li>• Avoid sharing accounts or credentials</li>
                        <li>• Report inappropriate content or behavior</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Shield className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">3. Intellectual Property Rights</h2>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-8">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-4">Our Content Protection</h3>
                    <p className="text-yellow-700 mb-4">
                      All educational materials, including notes, lectures, videos, and assessments, are protected 
                      by copyright and intellectual property laws. Unauthorized reproduction, distribution, or 
                      commercial use is strictly prohibited.
                    </p>
                    <div className="bg-yellow-100 p-4 rounded-lg">
                      <strong className="text-yellow-800">Permitted:</strong> Personal study and reference<br/>
                      <strong className="text-yellow-800">Prohibited:</strong> Sharing, selling, or redistributing content
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Scale className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">4. Payment Terms & Refund Policy</h2>
                  </div>

                  <div className="bg-red-50 p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-semibold text-red-900 mb-6">Non-Refundable Policy</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-red-800 mb-3">Batch Enrollments</h4>
                        <p className="text-red-700 text-sm mb-4">
                          Once enrolled in any batch program, payments are <strong>non-refundable</strong> under 
                          any circumstances. This policy ensures fair resource allocation and planning.
                        </p>
                        <div className="bg-red-100 p-3 rounded">
                          <strong className="text-red-800 text-sm">Notice:</strong> Please ensure availability 
                          and commitment before enrollment.
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-800 mb-3">Digital Access</h4>
                        <p className="text-red-700 text-sm mb-4">
                          Access to enrolled batches is granted within 2-3 business days via email. 
                          No physical shipping is involved as all services are digital.
                        </p>
                        <div className="bg-red-100 p-3 rounded">
                          <strong className="text-red-800 text-sm">Timeline:</strong> Login credentials 
                          shared within 48-72 hours.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <AlertTriangle className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">5. Prohibited Activities</h2>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">Content Violations</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Uploading malicious or harmful content</li>
                          <li>• Sharing copyrighted materials without permission</li>
                          <li>• Posting offensive, discriminatory content</li>
                          <li>• Impersonating other users or organizations</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">System Abuse</h4>
                        <ul className="space-y-2 text-gray-700 text-sm">
                          <li>• Attempting to hack or breach security</li>
                          <li>• Creating multiple accounts to circumvent limits</li>
                          <li>• Using automated tools to access content</li>
                          <li>• Interfering with platform functionality</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <CheckCircle className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">6. Service Availability & Modifications</h2>
                  </div>

                  <div style={{background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)'}} className="p-8 rounded-xl mb-8">
                    <h3 className="text-lg font-semibold text-indigo-900 mb-4">Service Commitment</h3>
                    <p className="text-indigo-800 mb-6">
                      We strive to maintain 99.9% uptime and continuously improve our services. However, 
                      we reserve the right to modify, suspend, or discontinue services with reasonable notice.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-900">99.9%</div>
                        <div className="text-sm text-indigo-700">Uptime Target</div>
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-900">24/7</div>
                        <div className="text-sm text-indigo-700">Monitoring</div>
                      </div>
                      <div className="bg-white/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-indigo-900">30 Days</div>
                        <div className="text-sm text-indigo-700">Change Notice</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Scale className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">7. Limitation of Liability</h2>
                  </div>

                  <div className="bg-orange-50 p-6 rounded-xl mb-8">
                    <p className="text-orange-900 mb-4">
                      Unknown IITians provides educational services "as is" without warranties. We are not 
                      liable for indirect, incidental, or consequential damages arising from service use.
                    </p>
                    <div className="bg-orange-100 p-4 rounded-lg text-sm text-orange-800">
                      <strong>Maximum Liability:</strong> Our total liability is limited to the amount 
                      paid for services in the 12 months preceding the claim.
                    </div>
                  </div>

                  <div className="bg-royal text-white p-8 rounded-xl text-center">
                    <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
                    <p className="mb-6">
                      Our legal team is available to clarify any aspects of these Terms of Service.
                    </p>
                    <div className="text-golden font-semibold text-lg">
                      <div>📧 help.unknowniitians@gmail.com</div>
                      <div className="mt-2">📍 IIT Madras Research Park, Chennai, Tamil Nadu, India</div>
                    </div>
                    <div className="mt-6 text-sm text-gray-200 bg-white/10 rounded-lg p-4">
                      <strong>Legal Jurisdiction:</strong> These terms are governed by Indian law. 
                      Disputes will be resolved in Chennai, Tamil Nadu courts.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <FooterWithNewsletter />
    </>
  );
};

export default EnhancedTermsOfService;
