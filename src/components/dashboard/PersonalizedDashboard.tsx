
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Download, 
  Calendar, 
  TrendingUp, 
  User, 
  Bell,
  Star,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import TestimonialForm from "./TestimonialForm";

const PersonalizedDashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    { title: "Browse Notes", icon: BookOpen, href: "/exam-preparation", color: "bg-blue-500" },
    { title: "Download PYQs", icon: Download, href: "/exam-preparation", color: "bg-green-500" },
    { title: "View Courses", icon: Calendar, href: "/courses", color: "bg-purple-500" },
    { title: "CGPA Calculator", icon: Target, href: "/cgpa-calculator", color: "bg-orange-500" },
  ];

  const stats = [
    { title: "Notes Downloaded", value: "24", icon: BookOpen, color: "text-blue-600" },
    { title: "PYQs Accessed", value: "12", icon: Download, color: "text-green-600" },
    { title: "Study Streak", value: "7 days", icon: TrendingUp, color: "text-purple-600" },
    { title: "Courses Enrolled", value: "3", icon: Calendar, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-royal to-royal-dark text-white rounded-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}! 👋
            </h1>
            <p className="text-blue-100 text-lg">
              Ready to continue your learning journey today?
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-royal" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.href}>
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-royal transition-colors">
                    {action.title}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Stats Overview */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-royal" />
          Your Progress
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <Badge variant="secondary" className="bg-gray-100">
                    {stat.value}
                  </Badge>
                </div>
                <h3 className="font-medium text-gray-900">{stat.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-royal" />
          Recent Activity
        </h2>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Downloaded JEE Physics Notes</p>
                    <p className="text-sm text-gray-600">2 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Download className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Accessed NEET Chemistry PYQs</p>
                    <p className="text-sm text-gray-600">1 day ago</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Calendar className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Enrolled in Advanced Mathematics</p>
                    <p className="text-sm text-gray-600">3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Testimonial Form */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2 text-royal" />
          Share Your Experience
        </h2>
        <TestimonialForm />
      </div>

      {/* Helpful Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-royal">
            <CardHeader>
              <CardTitle className="text-lg">Study Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Maximize your learning with proven study techniques and time management strategies.
              </p>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="text-lg">Exam Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Stay updated with important exam dates and registration deadlines.
              </p>
              <Button variant="outline" size="sm">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
