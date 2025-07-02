
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, AlertTriangle, CheckCircle, Users, Gavel } from "lucide-react";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: CheckCircle,
      content: [
        "By accessing and using Unknown IITians services, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, please do not use our platform or services",
        "These terms apply to all users, including students, educators, and visitors",
        "Your use of our services constitutes acceptance of any updates to these terms"
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        "You must provide accurate and complete information when creating an account",
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must notify us immediately of any unauthorized use of your account",
        "One person may maintain only one active account unless specifically authorized",
        "You are fully responsible for all activities that occur under your account"
      ]
    },
    {
      title: "Acceptable Use Policy",
      icon: Shield,
      content: [
        "Use our services only for lawful educational purposes",
        "Do not share, distribute, or resell our educational content without permission",
        "Respect intellectual property rights of all content creators and contributors",
        "Do not attempt to reverse engineer, hack, or compromise our platform security",
        "Maintain respectful communication in all interactions with other users and staff",
        "Do not use our platform for spam, harassment, or any malicious activities"
      ]
    },
    {
      title: "Prohibited Activities",
      icon: AlertTriangle,
      content: [
        "Uploading or sharing copyrighted material without proper authorization",
        "Creating multiple accounts to circumvent limitations or restrictions",
        "Attempting to gain unauthorized access to other users' accounts or data",
        "Using automated scripts or bots to access our services",
        "Engaging in any activity that disrupts or interferes with our services",
        "Violating any applicable laws or regulations while using our platform"
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
            <FileText className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100">
              Please read these terms carefully before using our educational platform and services.
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
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Unknown IITians</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your use of the Unknown IITians educational platform, 
                including our website, mobile applications, and all related services (collectively, the "Services"). 
                By using our Services, you enter into a legally binding agreement with Unknown IITians.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our mission is to democratize quality education and help students achieve their academic goals. 
                These terms ensure a safe, respectful, and productive learning environment for all users.
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

          {/* Service Specific Terms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-100 to-blue-50">
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Educational Content
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Content is for personal educational use only</li>
                  <li>• Commercial redistribution is strictly prohibited</li>
                  <li>• We strive for accuracy but cannot guarantee completeness</li>
                  <li>• Content may be updated or modified without notice</li>
                  <li>• Some content may require additional licensing</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-100 to-green-50">
                <CardTitle className="flex items-center">
                  <Gavel className="w-5 h-5 mr-2 text-green-600" />
                  Dispute Resolution
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Contact support for issue resolution</li>
                  <li>• Mediation preferred over litigation</li>
                  <li>• Governed by Indian law and jurisdiction</li>
                  <li>• Class action waiver applies</li>
                  <li>• 30-day notice required for legal action</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Payment and Refund Policy */}
          <Card className="shadow-lg mt-8">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-purple-50">
              <CardTitle>Payment and Refund Policy</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Payment Terms</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• All payments are processed securely</li>
                    <li>• Prices are subject to change with notice</li>
                    <li>• Taxes may apply based on location</li>
                    <li>• Failed payments may suspend access</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3 text-gray-900">Refund Policy</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• 7-day refund policy for paid courses</li>
                    <li>• Refunds processed within 7-10 business days</li>
                    <li>• Partial refunds for unused portions</li>
                    <li>• No refunds for free content or services</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="shadow-lg mt-8">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-orange-50">
              <CardTitle>Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p>
                  All content, features, and functionality of our Services are owned by Unknown IITians and are protected by 
                  copyright, trademark, and other intellectual property laws.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Our Rights</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Platform design and functionality</li>
                      <li>• Original educational content</li>
                      <li>• Trademarks and logos</li>
                      <li>• Software and algorithms</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Your Rights</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Personal use of accessed content</li>
                      <li>• Downloaded materials for study</li>
                      <li>• User-generated content ownership</li>
                      <li>• Fair use under applicable law</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card className="shadow-lg mt-8">
            <CardHeader className="bg-gradient-to-r from-red-100 to-red-50">
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                Limitation of Liability
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-gray-700">
                <p className="font-semibold">
                  Our services are provided "as is" without warranties of any kind, either express or implied.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Service Disclaimers</h4>
                    <ul className="text-sm space-y-1">
                      <li>• No guarantee of exam success</li>
                      <li>• Content accuracy not warranted</li>
                      <li>• Service availability may vary</li>
                      <li>• Third-party content limitations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Liability Limits</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Maximum liability equals fees paid</li>
                      <li>• No consequential damages</li>
                      <li>• Force majeure events excluded</li>
                      <li>• User responsibility for account security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact and Changes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 mb-12">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-100 to-teal-50">
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>Email:</strong> legal@unknowniitians.com</p>
                  <p><strong>Support:</strong> support@unknowniitians.com</p>
                  <p><strong>Business Hours:</strong> 9 AM - 6 PM IST</p>
                  <p><strong>Response Time:</strong> Within 24-48 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-100 to-indigo-50">
                <CardTitle>Terms Updates</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3 text-sm text-gray-700">
                  <p>We may modify these terms periodically to reflect:</p>
                  <ul className="space-y-1 ml-4">
                    <li>• Changes in our services</li>
                    <li>• Legal or regulatory requirements</li>
                    <li>• Industry best practices</li>
                    <li>• User feedback and improvements</li>
                  </ul>
                  <p className="mt-3">
                    Continued use after changes constitutes acceptance of updated terms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
