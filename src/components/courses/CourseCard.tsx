import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Calendar,
  Users,
  CheckCircle,
  X,
  Clock,
  User,
  BookOpen,
  Award
} from "lucide-react";
import EnrollButton from "@/components/EnrollButton";
import { Course } from '@/components/admin/courses/types';

interface CourseCardProps {
  course: Course;
  index: number;
}

// Modal CourseDetail Component
const CourseDetailModal = ({ course, isOpen, onClose }: { course: Course; isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed Background */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Modal Header */}
        <div className="px-8 pt-8 pb-6 border-b">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{course.subtitle}</p>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Modal Body */}
        <div className="px-8 py-6 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Course Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description || "Comprehensive course designed to provide in-depth knowledge and practical skills. Our expert instructors will guide you through every step of the learning journey with hands-on projects and real-world applications."}
            </p>
          </section>
          
          {/* Syllabus */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Course Syllabus
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Fundamental concepts and theory</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Practical applications and case studies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Advanced techniques and methodologies</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Final project and assessment</span>
                </li>
              </ul>
            </div>
          </section>
          
          {/* Instructor Bio */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <User className="w-5 h-5" />
              Instructor
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Expert Instructor</h3>
              <p className="text-gray-700">
                Industry professional with over 10+ years of experience. Certified expert with proven track record of student success and innovative teaching methodologies.
              </p>
            </div>
          </section>
          
          {/* Dynamic Features Slot */}
          <section>
            <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              What You'll Get
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2">Certificate of Completion</h4>
                <p className="text-sm text-green-700">Industry-recognized certification</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2">Lifetime Access</h4>
                <p className="text-sm text-purple-700">Access materials anytime</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">1-on-1 Support</h4>
                <p className="text-sm text-orange-700">Personal guidance available</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Project Portfolio</h4>
                <p className="text-sm text-blue-700">Build impressive projects</p>
              </div>
            </div>
          </section>
        </div>
        
        {/* Modal Footer */}
        <div className="px-8 py-6 border-t bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                ₹{course.price}
                {course.originalPrice && (
                  <span className="text-lg text-gray-500 line-through ml-2">
                    ₹{course.originalPrice}
                  </span>
                )}
              </p>
              <p className="text-sm text-gray-600">One-time payment • Lifetime access</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
              Enroll Now & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleEnrollClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: index * 0.1 }}
      >
        <Card className="h-full min-h-[420px] w-full max-w-sm mx-auto overflow-hidden border-none shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-3xl bg-gradient-to-br from-white to-gray-50">
          {/* Premium Badge */}
          {course.bestseller && (
            <div className="absolute top-0 right-0 z-10">
              <Badge className="m-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg">
                ⭐ Bestseller
              </Badge>
            </div>
          )}
          
          {/* Course Image */}
          <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-6xl opacity-20">
              <BookOpen />
            </div>
            {course.image && (
              <img 
                src={course.image} 
                alt={course.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
          </div>
          
          <CardHeader className="pb-4 pt-6 px-6">
            {/* Premium Title Section */}
            <div className="space-y-3">
              <CardTitle className="text-2xl font-bold leading-tight text-gray-900 hover:text-blue-600 transition-colors">
                {course.title}
              </CardTitle>
              <CardDescription className="text-base text-gray-600 font-medium">
                {course.subtitle}
              </CardDescription>
            </div>
          </CardHeader>
          
          <CardContent className="px-6 py-2 flex-1">
            {/* Premium Stats Section */}
            <div className="space-y-4">
              {/* Row 1: Duration & Students */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">{course.duration}</p>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-xl p-3 flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Students</p>
                    <p className="text-sm font-semibold text-gray-900">{course.students}</p>
                  </div>
                </div>
              </div>
              
              {/* Row 2: Rating & Price */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{course.rating}</span>
                    <span className="text-sm text-gray-600">rating</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">₹{course.price}</p>
                    {course.originalPrice && (
                      <p className="text-sm text-gray-500 line-through">₹{course.originalPrice}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="px-6 pb-6 pt-4">
            {/* Premium Enroll Button */}
            <button
              onClick={handleEnrollClick}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 text-lg"
            >
              <CheckCircle className="w-5 h-5" />
              Enroll Now
            </button>
          </CardFooter>
        </Card>
      </motion.div>
      
      {/* Course Detail Modal */}
      <CourseDetailModal 
        course={course}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CourseCard;
