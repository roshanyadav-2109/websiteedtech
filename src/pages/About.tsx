
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Building2, Users } from "lucide-react";

const About = () => {
  const partners = [
    {
      name: "EduTech Solutions",
      description: "Educational technology for interactive learning",
      category: "EdTech"
    },
    {
      name: "CodeMentor",
      description: "Programming mentorship platform",
      category: "Mentorship"
    },
    {
      name: "MedPrep Institute",
      description: "Specialized medical entrance coaching",
      category: "Medical"
    },
    {
      name: "EngineeringHub",
      description: "Resources for engineering aspirants",
      category: "Engineering"
    },
    {
      name: "DataScience.ai",
      description: "Data science learning platform",
      category: "Technology"
    }
  ];
  
  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About Us</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Discover the journey and mission behind Unknown IITians
            </p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>

              <div className="prose prose-lg max-w-none">
                <p>
                  Unknown IITians was born from the shared vision of two entrepreneurial-minded friends who met in the heart of India's coaching hub—a city where thousands of students chase dreams of cracking competitive exams like JEE and NEET. Amid the relentless pressure and the rigid paths carved out by the system, these two visionaries saw a different possibility: a world where education wasn't just about securing a rank but about true learning, exploration, and carving one's unique journey.
                </p>
                
                <p>
                  What started as a simple YouTube channel to guide students through the IIT Madras BS Degree program soon transformed into something much bigger. The duo realized that countless students were struggling—not just with academics, but with a deeper issue: the lack of direction beyond traditional career options. Inspired by their own experiences, they set out to create a platform that wouldn't just help students crack exams but would also empower them to discover careers aligned with their passions.
                </p>
                
                <p>
                  Unknown IITians rapidly expanded its mission, offering high-quality, free resources for JEE, NEET, and other competitive exams. However, the platform stands apart because it doesn't just push students toward the conventional rat race of engineering and medical fields. Instead, it actively promotes alternative career paths, skill-based learning, and entrepreneurial thinking—so students can make informed choices rather than just follow the crowd.
                </p>
                
                <p>
                  Beyond academic support, Unknown IITians provides mentorship programs, real-world skill development, and a thriving community of learners and industry professionals. The goal is simple yet revolutionary: to ensure that students who are genuinely interested in fields like engineering and medicine don't fall behind due to a lack of resources, while also guiding others toward non-traditional careers where they can thrive.
                </p>
                
                <p>
                  With bigger plans on the horizon, Unknown IITians is on a mission to redefine success in education—one student at a time. The journey has only begun, and the future holds limitless possibilities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Journey Timeline - Improved Design */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
              Journey of Unknown IITians
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-16">
              Embarking and writing new chapters with every new step we take...
            </p>

            <div className="relative max-w-4xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-royal/10 via-royal to-golden/80 z-0 rounded-full"></div>

              {/* Timeline items */}
              {[
                {
                  date: "September 2024",
                  title: "YouTube Launch",
                  description: "Launched the YouTube channel with free educational contents."
                },
                {
                  date: "October 2024",
                  title: "First Milestone",
                  description: "Reached 50k viewers with a positive feedback."
                },
                {
                  date: "1st December 2024",
                  title: "Mentorship Program",
                  description: "Completed Premium Mentorship Batch with ⭐⭐⭐⭐⭐ 4.8 rating."
                },
                {
                  date: "30th December 2024",
                  title: "Website Launch",
                  description: "Launched the website with free resources."
                },
                {
                  date: "January 2025",
                  title: "Specialized Content",
                  description: "Focused the website on IIT-M BS degree resources."
                },
                {
                  date: "February 2025",
                  title: "Strategic Partnerships",
                  description: "Partnered with startups to provide the students with skill-building opportunities."
                },
                {
                  date: "April 2025",
                  title: "Expanded Resources",
                  description: "Added free JEE/NEET resources to the website."
                },
                {
                  date: "Future Goals",
                  title: "Looking Ahead",
                  description: "Continue providing free resources for all & enable the students pursue their interest instead of traditional career options."
                }
              ].map((item, index) => (
                <div key={index} className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-12 items-center`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                    <div className={`bg-white p-6 rounded-xl shadow-md ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} max-w-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                      <h3 className={`font-bold text-lg mb-1 ${index === 7 ? 'text-golden' : 'text-royal'}`}>
                        {item.date}
                      </h3>
                      <h4 className="font-semibold text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative w-0 flex items-center justify-center">
                    <div className={`absolute w-8 h-8 rounded-full ${index === 7 ? 'bg-golden' : 'bg-royal'} border-4 border-white z-10 transform -translate-x-1/2 shadow-md`}></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Partnerships - Enhanced Design */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-royal/10 rounded-full mb-6">
                <Building2 className="w-8 h-8 text-royal" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Initiative Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Student-founded and partnered companies working together to transform education and create opportunities
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {partners.map((partner, index) => (
                <Card key={index} className="group border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-royal to-royal-dark rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 bg-royal/10 text-royal rounded-full">
                        {partner.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-royal transition-colors duration-300">
                      {partner.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{partner.description}</p>
                    <div className="flex items-center text-royal font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Learn more
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">Interested in partnering with us?</p>
              <button className="bg-royal hover:bg-royal-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Become a Partner
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default About;
