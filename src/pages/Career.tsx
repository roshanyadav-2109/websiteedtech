
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  ExternalLink,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Career = () => {
  const featuredJobs = [
    {
      id: 1,
      title: "Content Writer Intern",
      type: "Internship",
      location: "Remote",
      duration: "3-6 months",
      stipend: "₹8,000 - ₹15,000/month",
      skills: ["Content Writing", "Research", "SEO"],
      description: "Create engaging educational content for our platform and help students succeed.",
      featured: true
    },
    {
      id: 2,
      title: "Social Media Marketing Intern",
      type: "Internship", 
      location: "Remote",
      duration: "3-6 months",
      stipend: "₹6,000 - ₹12,000/month",
      skills: ["Social Media", "Marketing", "Design"],
      description: "Manage our social media presence and create engaging content for students.",
      featured: true
    },
    {
      id: 3,
      title: "Academic Content Developer",
      type: "Full-time",
      location: "Hybrid",
      duration: "Permanent",
      stipend: "₹25,000 - ₹40,000/month",
      skills: ["Subject Expertise", "Curriculum Design", "Teaching"],
      description: "Develop comprehensive study materials and curriculum for various competitive exams.",
      featured: false
    }
  ];

  const benefits = [
    "Flexible working hours",
    "Remote work opportunities", 
    "Learning & development programs",
    "Performance-based incentives",
    "Certificate of completion",
    "Letter of recommendation"
  ];

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Build Your Career with Unknown IITians
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Join our team of passionate educators and innovators. Help us shape the future of education and make a meaningful impact on students' lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-royal hover:bg-gray-100">
                  <Link to="#jobs">View Open Positions</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-royal">
                  <Link to="/intern-verification">Verify Internship</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-royal">
                  <Link to="/employee-verification">Verify Employment</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-royal mb-2">50+</div>
                <div className="text-gray-600">Team Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-royal mb-2">10K+</div>
                <div className="text-gray-600">Students Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-royal mb-2">95%</div>
                <div className="text-gray-600">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-royal mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Section */}
        <div id="jobs" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover exciting opportunities to grow your career while making a difference in education.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <Card key={job.id} className={`hover:shadow-xl transition-all duration-300 ${job.featured ? 'border-royal border-2' : ''}`}>
                  {job.featured && (
                    <div className="bg-royal text-white text-center py-2 text-sm font-semibold">
                      Featured Position
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{job.title}</CardTitle>
                      <Badge variant={job.type === 'Internship' ? 'secondary' : 'default'}>
                        {job.type}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {job.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2" />
                        {job.stipend}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                      Apply Now
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Work With Us?</h2>
                <p className="text-lg text-gray-600 mb-8">
                  At Unknown IITians, we believe in nurturing talent and providing growth opportunities. 
                  Join our mission to democratize quality education and make learning accessible to all.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Card className="text-center p-6">
                  <Users className="w-12 h-12 text-royal mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Collaborative Team</h3>
                  <p className="text-sm text-gray-600">Work with passionate educators and innovators</p>
                </Card>
                <Card className="text-center p-6">
                  <TrendingUp className="w-12 h-12 text-royal mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Growth Focused</h3>
                  <p className="text-sm text-gray-600">Continuous learning and development opportunities</p>
                </Card>
                <Card className="text-center p-6">
                  <Briefcase className="w-12 h-12 text-royal mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Flexible Work</h3>
                  <p className="text-sm text-gray-600">Remote and hybrid work options available</p>
                </Card>
                <Card className="text-center p-6">
                  <CheckCircle className="w-12 h-12 text-royal mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Impact Driven</h3>
                  <p className="text-sm text-gray-600">Make a real difference in students' lives</p>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16 bg-gradient-to-r from-royal to-royal-dark text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Mission?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Don't see the perfect role? We're always looking for talented individuals to join our team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-royal hover:bg-gray-100">
                Send Your Resume
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-royal">
                Contact HR
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Career;
