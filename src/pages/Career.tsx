
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Star, Users, Briefcase, GraduationCap, PenTool } from "lucide-react";

const CareerEmailSubscription = () => {
  return (
    <div className="max-w-xl mx-auto mb-16">
      <form id="emailForm" className="flex flex-col sm:flex-row gap-4 w-full">
        <input 
          type="email" 
          id="emailInput" 
          placeholder="Enter your email for updates on hirings" 
          required
          className="flex-grow h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal focus:border-transparent" 
        />
        <Button 
          type="submit" 
          id="subscribeBtn" 
          className="bg-gradient-to-r from-golden to-golden-dark text-white px-6 py-2 rounded-lg hover:from-golden-dark hover:to-golden transition-all duration-300 h-12"
        >
          Subscribe
        </Button>
      </form>

      <script dangerouslySetInnerHTML={{ __html: `
        document.getElementById('emailForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('emailInput').value;
            
            if (email) {
                const emailFieldId = "entry.1179165163"; // Email field ID (confirmed)
                
                const baseUrl = "https://docs.google.com/forms/d/e/1FAIpQLScvl-2m-e6VBprNctakB4a8kzEvaOZCdN-LxTxJ2qGGOKTzZA/formResponse";
                const formUrl = \`\${baseUrl}?\${emailFieldId}=\${encodeURIComponent(email)}\`;
                
                fetch(formUrl, {
                    method: 'POST',
                    mode: 'no-cors'
                })
                .then(() => {
                    alert('Successfully subscribed!');
                    document.getElementById('emailInput').value = '';
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
            }
        });
      `}} />
    </div>
  );
};

const Career = () => {
  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Rooted in Opportunity, Built for Success</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Join UI - Start your career with us!
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-16">
              <p className="text-lg text-gray-700 mb-8">
                Unknown IITians is a platform dedicated to providing high-quality educational content to help students and freshers succeed in their careers. We also offer opportunities for internships and hiring positions directly through our platform. All hirings for Unknown IITians will be posted here, with notifications sent out to those who have filled out the required forms.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Once you complete the form, you will receive an email with further details about the interview process and the next steps. Our goal is to help you gain practical experience, develop your skills, and build a strong foundation for your future career.
              </p>
              
              <h2 className="text-2xl font-bold mb-4">Enter your email for updates on hirings</h2>
              <CareerEmailSubscription />
            </div>

            {/* Why work section */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-2">Why work at Unknown IITians</h2>
              <p className="text-xl text-golden text-center mb-12 font-semibold">Earn Today, Build Tomorrow, Succeed Forever</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "A Platform for Growth",
                    description: "Our company is built on helping individuals discover and unlock their full potential. Working with us means you'll be part of a community that values personal development, career advancement, and success.",
                    icon: Users
                  },
                  {
                    title: "Earn While You Learn",
                    description: "College students often look for ways to manage their expenses, and our internships offer the perfect solution. You can earn money while gaining hands-on experience and making progress toward your career goals.",
                    icon: GraduationCap
                  },
                  {
                    title: "No Middlemen – Direct Access",
                    description: "At Unknown IITians, we don't act as a mediator. You get direct access to internship openings based on your skills and interests. If you have the required skills, you can join and begin your journey without delays.",
                    icon: CheckCircle
                  },
                  {
                    title: "A Stepping Stone to Success",
                    description: "An internship with Unknown IITians is more than just a learning experience; it's a chance to set the foundation for your future career. You'll gain insights into the industry, develop a strong work ethic, and build a network.",
                    icon: Star
                  },
                  {
                    title: "No Experience? No Problem!",
                    description: "You don't need to have extensive experience to get started. We welcome students with basic skills who are eager to learn and grow. The internships we offer are a perfect starting point to build your knowledge.",
                    icon: Briefcase
                  },
                  {
                    title: "Paid Opportunities After Training",
                    description: "Once you've completed the training and feel confident in your abilities, you can directly apply for paid internships and roles. Unknown IITians helps bridge the gap between learning and earning.",
                    icon: PenTool
                  },
                ].map((item, index) => (
                  <Card key={index} className="border-none shadow-premium overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <CardContent className="p-6 h-full flex flex-col">
                      <div className="rounded-full bg-royal/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                        <item.icon className="text-royal h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className="text-gray-600 flex-grow">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How do we make remarkable change */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">How do we make remarkable change?</h2>
              
              <div className="bg-gray-50 rounded-2xl p-8 shadow-md">
                <p className="text-lg text-gray-700">
                  Unknown IITians creates remarkable change in the educational field by offering students the opportunity to earn while they learn. We provide skill-building resources, paid internships, and real-world experiences that empower students to develop their potential, gain practical knowledge, and support themselves financially. Through mentorship and hands-on training, we bridge the gap between education and career success, helping students thrive in both their personal and professional lives.
                </p>
              </div>
            </div>

            {/* Founder Quote */}
            <div className="bg-gradient-to-r from-royal/10 to-royal/5 rounded-2xl p-8 mb-16">
              <div className="max-w-3xl mx-auto">
                <svg className="h-10 w-10 text-royal/30 mb-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg text-gray-700 mb-6">
                  "Don't just think about placement; think about building your own empire. Success isn't limited to your degree—it begins with the growth you nurture today. Train yourself, work on your skills, and create something great, because true success comes from starting now, not after your studies."
                </p>
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="font-bold">Anonymous</p>
                    <p className="text-sm text-gray-600">Founder, Unknown IITians</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default Career;
