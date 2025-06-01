import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, GraduationCap, Heart, Sparkles, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import SkillEnhancementSection from "@/components/SkillEnhancementSection";

const Index = () => {
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEmailPopupOpen(true);
    }, 5000); // Open after 5 seconds

    return () => clearTimeout(timer); // Clear timeout if component unmounts
  }, []);

  const handleCloseEmailPopup = () => {
    setIsEmailPopupOpen(false);
  };

  return (
    <>
      <NavBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Unlock Your Potential with Unknown IITians
          </h1>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto mb-12">
            Your one-stop platform for exam preparation, skill enhancement, and career guidance.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" className="bg-white text-royal hover:bg-gray-100 font-semibold">
              Explore Courses
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-royal" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert-Curated Content</h3>
              <p className="text-gray-600">
                Access high-quality study materials created by IIT graduates and experienced educators.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-royal" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Learning Paths</h3>
              <p className="text-gray-600">
                Customize your learning experience with tailored resources and adaptive practice tests.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-royal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-royal" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Guidance</h3>
              <p className="text-gray-600">
                Get expert advice on career options, interview preparation, and industry insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Hub Section - Updated with proper routing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Your Resource Hub
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access comprehensive study materials for every major entrance exam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle>JEE Preparation</CardTitle>
                <CardDescription>
                  Complete study materials for JEE Main & Advanced
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Access notes, PYQs, and practice tests for Mathematics, Physics, and Chemistry
                </p>
                <div className="flex gap-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="bg-royal hover:bg-royal-dark flex-1"
                  >
                    <a href="/exam-preparation/jee">View Notes</a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <a href="/courses">Lectures</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <CardTitle>NEET Preparation</CardTitle>
                <CardDescription>
                  Comprehensive resources for medical entrance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Biology, Physics, and Chemistry notes with detailed explanations
                </p>
                <div className="flex gap-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="bg-royal hover:bg-royal-dark flex-1"
                  >
                    <a href="/exam-preparation/neet">View Notes</a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <a href="/courses">Lectures</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>IITM BS Degree</CardTitle>
                <CardDescription>
                  Resources for IIT Madras BS program
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Branch-specific notes and tools for Data Science & Electronic Systems
                </p>
                <div className="flex gap-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="bg-royal hover:bg-royal-dark flex-1"
                  >
                    <a href="/exam-preparation/iitm-bs">View Notes</a>
                  </Button>
                  <Button 
                    asChild 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <a href="/exam-preparation/iitm-bs">Lectures</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Updated Skill Enhancement Section */}
      <SkillEnhancementSection />

      {/* Career Guidance Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Unlock Your Career Potential
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get personalized guidance and resources to excel in your chosen career path.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Career Guidance Card 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Job Opportunities</CardTitle>
                <CardDescription>Explore the latest job openings in top companies</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Find internships and full-time positions that match your skills and interests.
                </p>
                <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                  <a href="/career">View Job Board</a>
                </Button>
              </CardContent>
            </Card>

            {/* Career Guidance Card 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Interview Preparation</CardTitle>
                <CardDescription>Ace your interviews with expert tips and practice questions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Access resources to improve your communication skills and technical knowledge.
                </p>
                <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                  <a href="/career">Prepare Now</a>
                </Button>
              </CardContent>
            </Card>

            {/* Career Guidance Card 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle>Career Counseling</CardTitle>
                <CardDescription>Get personalized advice from experienced career counselors</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Schedule one-on-one sessions to discuss your career goals and challenges.
                </p>
                <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                  <a href="/career">Book a Session</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Read inspiring stories from students who have achieved their goals with Unknown IITians
            </p>
          </div>

          <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent className="-ml-1 md:-ml-4">
              <CarouselItem className="pl-1 md:pl-4">
                <Card className="bg-gray-50 border-none shadow-md">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">
                      "Unknown IITians helped me crack the JEE exam with their comprehensive study materials and expert guidance. I couldn't have done it without them!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
                        {/* Replace with actual profile image */}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Aman Sharma</p>
                        <p className="text-sm text-gray-500">IIT Delhi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-1 md:pl-4">
                <Card className="bg-gray-50 border-none shadow-md">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">
                      "I was struggling with NEET preparation until I found Unknown IITians. Their Biology notes were a lifesaver, and I got into my dream medical college!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
                        {/* Replace with actual profile image */}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Priya Verma</p>
                        <p className="text-sm text-gray-500">AIIMS Delhi</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem className="pl-1 md:pl-4">
                <Card className="bg-gray-50 border-none shadow-md">
                  <CardContent className="p-6">
                    <p className="text-gray-700 italic mb-4">
                      "The IITM BS degree resources on Unknown IITians were incredibly helpful. I aced the qualifier exam and am now pursuing my dream degree."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3">
                        {/* Replace with actual profile image */}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Rahul Kumar</p>
                        <p className="text-sm text-gray-500">IIT Madras</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-gray-100 text-gray-800" />
            <CarouselNext className="bg-gray-100 text-gray-800" />
          </Carousel>
        </div>
      </section>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default Index;
