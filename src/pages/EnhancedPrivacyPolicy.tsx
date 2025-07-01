
import React from "react";
import NavBar from "@/components/NavBar";
import FooterWithNewsletter from "@/components/FooterWithNewsletter";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, UserCheck, Database, Globe } from "lucide-react";

const EnhancedPrivacyPolicy = () => {
  return (
    <>
      <NavBar />
      <main className="pt-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-20 shadow-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl">
                <Shield className="h-16 w-16 text-golden" />
              </div>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              Privacy <span className="text-golden">Policy</span>
            </h1>
            <p className="text-xl text-gray-200 mb-4 max-w-4xl mx-auto leading-relaxed">
              Your privacy is our priority. Learn how we collect, use, and protect your personal information 
              while providing exceptional educational services.
            </p>
            <div className="text-sm text-gray-300 bg-white/10 rounded-lg p-4 inline-block">
              <strong>Last Updated:</strong> January 2025 | <strong>Effective:</strong> Immediately
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <UserCheck className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Data Minimization</h3>
                <p className="text-sm text-gray-600 mt-2">We only collect what's necessary</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Lock className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Secure Storage</h3>
                <p className="text-sm text-gray-600 mt-2">Industry-standard encryption</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Eye className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Transparency</h3>
                <p className="text-sm text-gray-600 mt-2">Clear about our practices</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <Globe className="h-12 w-12 text-royal mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">Global Compliance</h3>
                <p className="text-sm text-gray-600 mt-2">GDPR & CCPA compliant</p>
              </div>
            </div>

            <Card className="shadow-2xl border-0 mb-8">
              <CardContent className="p-8 md:p-12">
                <div className="prose prose-lg max-w-none">
                  <div className="flex items-center mb-8">
                    <Database className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">Information We Collect</h2>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4">Personal Information</h3>
                    <ul className="space-y-2 text-blue-800">
                      <li><strong>Account Information:</strong> Name, email address, phone number, and profile details</li>
                      <li><strong>Educational Data:</strong> Academic preferences, course selections, and learning progress</li>
                      <li><strong>Communication Records:</strong> Messages, inquiries, and support interactions</li>
                      <li><strong>Payment Information:</strong> Billing details for premium services (processed securely)</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 p-6 rounded-xl mb-8">
                    <h3 className="text-xl font-semibold text-green-900 mb-4">Automatically Collected Data</h3>
                    <ul className="space-y-2 text-green-800">
                      <li><strong>Usage Analytics:</strong> Pages visited, time spent, features used</li>
                      <li><strong>Device Information:</strong> Browser type, device model, operating system</li>
                      <li><strong>Location Data:</strong> General geographic location (city/region level)</li>
                      <li><strong>Cookies & Tracking:</strong> For performance optimization and personalization</li>
                    </ul>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Lock className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">How We Use Your Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-purple-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-purple-900 mb-3">Service Delivery</h4>
                      <ul className="text-purple-800 space-y-1 text-sm">
                        <li>• Provide educational content and resources</li>
                        <li>• Process course enrollments and payments</li>
                        <li>• Track learning progress and achievements</li>
                        <li>• Deliver personalized recommendations</li>
                      </ul>
                    </div>
                    <div className="bg-orange-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-orange-900 mb-3">Communication</h4>
                      <ul className="text-orange-800 space-y-1 text-sm">
                        <li>• Send course updates and notifications</li>
                        <li>• Respond to inquiries and support requests</li>
                        <li>• Share educational newsletters (opt-in)</li>
                        <li>• Provide important service announcements</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Shield className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">Data Protection & Security</h2>
                  </div>

                  <div className="bg-gray-50 p-8 rounded-xl mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="bg-royal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Lock className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold mb-2">Encryption</h4>
                        <p className="text-sm text-gray-600">All data transmitted using SSL/TLS encryption</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-royal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Database className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold mb-2">Secure Storage</h4>
                        <p className="text-sm text-gray-600">Data stored in secure, monitored environments</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-royal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UserCheck className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold mb-2">Access Control</h4>
                        <p className="text-sm text-gray-600">Limited access on need-to-know basis</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-6 mt-16">
                    <Eye className="h-8 w-8 text-royal mr-4" />
                    <h2 className="text-3xl font-bold text-royal m-0">Your Rights & Choices</h2>
                  </div>

                  <div className="bg-gradient-to-r from-royal/5 to-blue-50 p-8 rounded-xl mb-8">
                    <h3 className="text-xl font-semibold text-royal mb-6">You have the right to:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <strong>Access:</strong> Request copies of your personal data
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <strong>Rectification:</strong> Correct inaccurate information
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <strong>Erasure:</strong> Request deletion of your data
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <strong>Portability:</strong> Transfer data to another service
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <strong>Restriction:</strong> Limit how we process your data
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <strong>Objection:</strong> Opt-out of certain data processing
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl mb-8">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Cookie Policy</h3>
                    <p className="text-yellow-700 mb-4">
                      We use cookies to enhance your experience, analyze usage, and provide personalized content. 
                      You can manage cookie preferences through your browser settings.
                    </p>
                    <div className="text-sm text-yellow-600">
                      <strong>Essential Cookies:</strong> Required for basic functionality<br/>
                      <strong>Analytics Cookies:</strong> Help us improve our services<br/>
                      <strong>Marketing Cookies:</strong> Used for personalized content (optional)
                    </div>
                  </div>

                  <div className="bg-royal text-white p-8 rounded-xl text-center">
                    <h3 className="text-2xl font-bold mb-4">Need to Contact Us?</h3>
                    <p className="mb-6">
                      For any privacy-related questions or to exercise your rights, contact our Data Protection Team:
                    </p>
                    <div className="text-golden font-semibold text-lg">
                      <div>📧 help.unknowniitians@gmail.com</div>
                      <div className="mt-2">📍 IIT Madras Research Park, Chennai, Tamil Nadu, India</div>
                    </div>
                    <p className="mt-4 text-sm text-gray-200">
                      We commit to responding to all privacy requests within 30 days.
                    </p>
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

export default EnhancedPrivacyPolicy;
