import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  GraduationCap, 
  Star, 
  Users, 
  Calendar, 
  CheckCircle
} from "lucide-react";
import { motion } from "framer-motion";
import EnrollButton from "@/components/EnrollButton";
import AdminAddButton from "@/components/admin/AdminAddButton";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import { Skeleton } from "@/components/ui/skeleton";

const CourseCardSkeleton = () => (
  <Card className="h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
    <div className="h-2 bg-gray-200"></div>
    <CardHeader className="pb-2">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <div className="flex items-center text-sm text-gray-500">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20 ml-4" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-5/6" />
    </CardContent>
    <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="mb-3 sm:mb-0">
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-10 w-28" />
    </CardFooter>
  </Card>
);

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { courses, contentLoading } = useBackend();

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "IITM BS", name: "IITM BS" },
    { id: "NEET", name: "NEET" },
    { id: "JEE", name: "JEE" }
  ];

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.exam_category === selectedCategory);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Premium Courses
            </motion.h1>
            <motion.p 
              className="text-xl max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Accelerate your learning with our expert-crafted courses designed for academic excellence
            </motion.p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-royal text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <AdminAddButton 
                contentType="courses"
              >
                Add Course
              </AdminAddButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contentLoading ? (
                Array.from({ length: 6 }).map((_, index) => <CourseCardSkeleton key={index} />)
              ) : filteredCourses.length > 0 ? (
                filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                      {course.bestseller && (
                        <div className="absolute top-0 right-0 z-10">
                          <Badge className="m-2 bg-amber-500 hover:bg-amber-600">
                            <Star className="h-3 w-3 mr-1 fill-current" /> Bestseller
                          </Badge>
                        </div>
                      )}
                      <div className={`h-2 ${course.bestseller ? 'bg-gradient-to-r from-amber-400 to-amber-600' : 'bg-gradient-to-r from-royal to-royal-dark'}`}></div>
                      <CardHeader className="pb-2">
                        <CardTitle>{course.title}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1" /> 
                          {course.duration}
                          <Users className="h-4 w-4 ml-4 mr-1" /> 
                          {course.students_enrolled || 0} students
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-4">{course.description}</CardDescription>
                        <div className="grid grid-cols-2 gap-2">
                          {course.features?.map((feature, i) => (
                            <div key={i} className="flex items-center text-sm">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> 
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="mb-3 sm:mb-0">
                          {course.discounted_price && course.discounted_price < course.price ? (
                            <>
                              <span className="text-xl font-bold text-royal">₹{course.discounted_price}</span>
                              <span className="ml-2 text-gray-500 line-through">₹{course.price}</span>
                            </>
                          ) : (
                            <span className="text-xl font-bold text-royal">₹{course.price}</span>
                          )}
                        </div>
                        <EnrollButton 
                          courseId={course.id}
                          enrollmentLink={course.enroll_now_link || undefined}
                          className={`${course.bestseller ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' : 'bg-royal hover:bg-royal-dark'} text-white px-5 py-2`}
                        />
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-16 text-gray-500">
                  <p className="text-lg">No courses found for this category.</p>
                  <p>Please check back later or select a different category.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Why Choose Our Courses?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-royal/10 p-4 mb-4">
                  <GraduationCap className="h-8 w-8 text-royal" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Educators</h3>
                <p className="text-gray-600">Learn from experienced IITians who understand what it takes to succeed</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-royal/10 p-4 mb-4">
                  <BookOpen className="h-8 w-8 text-royal" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Resources</h3>
                <p className="text-gray-600">Access notes, videos, practice tests, and personalized feedback</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-royal/10 p-4 mb-4">
                  <CheckCircle className="h-8 w-8 text-royal" />
                </div>
                <h3 className="text-xl font-bold mb-2">Proven Results</h3>
                <p className="text-gray-600">Join thousands of successful students who achieved their academic goals</p>
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

export default Courses;
