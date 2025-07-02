
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, Database, Users, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        "Personal identification information (name, email address, phone number)",
        "Educational information (academic background, exam preferences, study progress)",
        "Usage data (how you interact with our platform, features used, time spent)",
        "Device information (IP address, browser type, operating system)",
        "Communication data (support tickets, feedback, testimonials)"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        "Provide and maintain our educational services and platform",
        "Personalize your learning experience and content recommendations",
        "Send important updates, notifications, and educational content",
        "Improve our services through analytics and user feedback",
        "Respond to your inquiries and provide customer support",
        "Comply with legal obligations and protect against fraud"
      ]
    },
    {
      title: "Information Sharing",
      icon: Eye,
      content: [
        "We do not sell, trade, or otherwise transfer your personal information to third parties",
        "Service providers who assist in operating our platform (with strict confidentiality agreements)",
        "Legal authorities when required by law or to protect our rights",
        "Anonymous, aggregated data for research and improvement purposes",
        "With your explicit consent for specific partnerships or services"
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        "Industry-standard encryption for data transmission and storage",
        "Regular security audits and vulnerability assessments",
        "Secure servers with restricted access and monitoring",
        "Multi-factor authentication for administrative access",
        "Regular data backups with secure storage protocols",
        "Employee training on data protection and privacy practices"
      ]
    }
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-blue-200 mt-4">
              Last updated: January 2, 2025
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="mb-8">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Unknown IITians, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform and services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our services, you agree to the collection and use of information in accordance with this policy. 
                We will not use or share your information with anyone except as described in this Privacy Policy.
              </p>
            </CardContent>
          </Card>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-royal/10 to-royal/5">
                  <CardTitle className="flex items-center text-xl">
                    <section.icon className="w-6 h-6 mr-3 text-royal" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <div className="w-2 h-2 bg-royal rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-green-50">
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Access your personal data</li>
                  <li>• Correct inaccurate information</li>
                  <li>• Request data deletion</li>
                  <li>• Opt-out of communications</li>
                  <li>• Data portability</li>
                  <li>• File complaints with authorities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-blue-600" />
                  Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-gray-700 mb-4">
                  For privacy-related questions or concerns, contact us at:
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> privacy@unknowniitians.com</p>
                  <p><strong>Response Time:</strong> Within 48 hours</p>
                  <p><strong>Data Protection Officer:</strong> Available upon request</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cookies and Tracking */}
          <Card className="shadow-lg mt-8">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
              <CardTitle>Cookies and Tracking Technologies</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our platform:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Essential Cookies</h4>
                    <p className="text-sm">Required for basic platform functionality and security.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Analytics Cookies</h4>
                    <p className="text-sm">Help us understand how you use our platform to improve services.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Preference Cookies</h4>
                    <p className="text-sm">Remember your settings and personalize your experience.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Marketing Cookies</h4>
                    <p className="text-sm">Deliver relevant content and measure campaign effectiveness.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Updates */}
          <Card className="shadow-lg mt-8 mb-12">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Policy Updates</h3>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. 
                We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
              </p>
              <p className="text-sm text-gray-600">
                Your continued use of our services after any changes constitutes acceptance of the updated policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
