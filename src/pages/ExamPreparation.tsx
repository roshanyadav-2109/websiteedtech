
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Users, Calendar, Bell } from "lucide-react";

const ExamPreparation = () => {
  const examTypes = [
    {
      title: "NEET - Medical MBBS",
      path: "/exam-preparation/neet",
      description: "Comprehensive resources for medical entrance exams",
      icon: BookOpen
    },
    {
      title: "IIT Madras BS Degree - UG",
      path: "/exam-preparation/iitm-bs",
      description: "Resources for IIT Madras Bachelor of Science programs",
      icon: FileText
    },
    {
      title: "JEE Mains - Engineering",
      path: "/exam-preparation/jee",
      description: "Study materials for engineering entrance exams",
      icon: BookOpen
    }
  ];

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Exam Preparation</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive resources to help you succeed in your competitive exams
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Exam</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {examTypes.map((exam, index) => (
                <Link to={exam.path} key={index}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-none shadow-premium overflow-hidden">
                    <CardContent className="p-6 flex flex-col items-center text-center h-full">
                      <div className="rounded-full bg-royal/10 p-4 mb-4">
                        <exam.icon className="h-8 w-8 text-royal" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
                      <p className="text-gray-600 mb-4">{exam.description}</p>
                      <Button className="mt-auto bg-royal hover:bg-royal-dark text-white">
                        View Resources
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default ExamPreparation;
