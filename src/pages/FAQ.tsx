
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";

const FAQ = () => {
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is Unknown IITians?",
          answer: "Unknown IITians is an educational platform that provides high-quality study resources, notes, lectures, and mentorship for students preparing for competitive exams like JEE, NEET, and IITM BS degree programs."
        },
        {
          question: "Who can access the platform?",
          answer: "Our platform is designed for students preparing for competitive exams, particularly JEE, NEET, and IITM BS degree programs. Anyone can access our free resources, while premium content requires registration."
        },
        {
          question: "Is Unknown IITians affiliated with IIT?",
          answer: "No, Unknown IITians is an independent educational platform created by IIT alumni and students to help aspiring candidates. We are not officially affiliated with any IIT institution."
        }
      ]
    },
    {
      category: "Account & Registration",
      questions: [
        {
          question: "How do I create an account?",
          answer: "You can create an account by clicking the 'Sign In' button in the top navigation and selecting 'Sign up'. You can register using your email or Google account."
        },
        {
          question: "I forgot my password. How can I reset it?",
          answer: "Click on 'Sign In' and then select 'Forgot Password'. Enter your email address and we'll send you a password reset link."
        },
        {
          question: "Can I change my email address?",
          answer: "Yes, you can update your email address from your profile settings in the dashboard. Contact support if you need assistance."
        }
      ]
    },
    {
      category: "Courses & Content",
      questions: [
        {
          question: "What type of content is available?",
          answer: "We provide comprehensive study materials including notes, video lectures, previous year questions (PYQs), practice tests, and subject-wise resources for JEE, NEET, and IITM BS preparations."
        },
        {
          question: "Are the materials free?",
          answer: "We offer both free and premium content. Basic resources like some notes and PYQs are free, while comprehensive courses and advanced materials require a subscription."
        },
        {
          question: "How often is content updated?",
          answer: "Our content is regularly updated to reflect the latest exam patterns and syllabus changes. We add new materials and improve existing content based on student feedback and exam trends."
        }
      ]
    },
    {
      category: "Payments & Subscriptions",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, debit cards, UPI, and net banking through our secure payment gateway partners."
        },
        {
          question: "Can I get a refund?",
          answer: "Once enrolled in a batch, cancellations or refunds are not permitted under any circumstances. Please ensure your availability and commitment before enrolling."
        },
        {
          question: "How will I receive access after payment?",
          answer: "After successful payment, access to your enrolled batch will be granted within 2–3 business days. Login credentials and joining instructions will be shared via email."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble accessing my course. What should I do?",
          answer: "First, ensure you're logged in with the correct account. If issues persist, clear your browser cache or try a different browser. Contact our support team if the problem continues."
        },
        {
          question: "Can I download the study materials?",
          answer: "Selected materials are available for download, while others are accessible only through our online platform to protect intellectual property rights."
        },
        {
          question: "Is the platform mobile-friendly?",
          answer: "Yes, our platform is fully responsive and works seamlessly on mobile devices, tablets, and desktops. You can access all features through your mobile browser."
        }
      ]
    },
    {
      category: "Exam Preparation",
      questions: [
        {
          question: "Which exams do you cover?",
          answer: "We specialize in JEE (Main & Advanced), NEET, and IITM BS degree program preparations. Our resources are tailored to these specific exam patterns and requirements."
        },
        {
          question: "Do you provide mock tests?",
          answer: "Yes, we offer practice tests and mock exams that simulate the actual exam environment to help you assess your preparation level."
        },
        {
          question: "Can I get personalized study plans?",
          answer: "Premium subscribers get access to personalized study recommendations based on their performance and target exams through our dashboard."
        }
      ]
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Get help via email",
      contact: "help.unknowniitians@gmail.com"
    },
    {
      icon: MessageCircle,
      title: "General Inquiries",
      description: "For general questions",
      contact: "unknowniitians@gmail.com"
    }
  ];

  return (
    <>
      <NavBar />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <HelpCircle className="h-12 w-12 text-royal" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about Unknown IITians platform, courses, and services.
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-xl text-royal">
                    {category.category}
                  </CardTitle>
                  <CardDescription>
                    Common questions about {category.category.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${categoryIndex}-${index}`}
                        className="border-b border-gray-200"
                      >
                        <AccordionTrigger className="text-left hover:text-royal transition-colors">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
              Still Need Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <contact.icon className="h-8 w-8 text-royal mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {contact.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{contact.description}</p>
                    <a 
                      href={`mailto:${contact.contact}`}
                      className="text-royal hover:text-royal-dark font-medium"
                    >
                      {contact.contact}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-gray-600 mb-6">
              Our support team is here to help. Send us an email with your question and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:help.unknowniitians@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-royal text-white font-medium rounded-md hover:bg-royal-dark transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Support
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;
