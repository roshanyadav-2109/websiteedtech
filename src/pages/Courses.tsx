
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import AdminAddButton from "@/components/admin/AdminAddButton";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import CourseCardSkeleton from "@/components/courses/CourseCardSkeleton";
import CourseCard from "@/components/courses/CourseCard";
import CoursesHeader from "@/components/courses/CoursesHeader";
import WhyChooseUsSection from "@/components/courses/WhyChooseUsSection";
import CategoryFilter from "@/components/courses/CategoryFilter";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { courses, contentLoading } = useBackend();

  const testimonials = [
    {
      author: {
        name: "Arjun Sharma",
        handle: "",
        avatar: ""
      },
      text: "The Qualifier Batch was a game-changer! Scored 98 in my IITM BS exam. The structured approach and mentorship made all the difference."
    },
    {
      author: {
        name: "Priya Nair",
        handle: "",
        avatar: ""
      },
      text: "Foundation Classes helped me build strong concepts from scratch. The live lectures were interactive and doubt-clearing sessions were excellent."
    },
    {
      author: {
        name: "Rohit Gupta",
        handle: "",
        avatar: ""
      },
      text: "Crash Course before my re-attempt was perfect timing. Covered entire syllabus in record time with focused practice sessions."
    },
    {
      author: {
        name: "Sneha Patel",
        handle: "",
        avatar: ""
      },
      text: "Free YouTube lectures saved my preparation cost. Quality content that's accessible anytime. Grateful for this initiative!"
    },
    {
      author: {
        name: "Vikram Singh",
        handle: "",
        avatar: ""
      },
      text: "One-on-one mentorship sessions were invaluable. My mentor guided me through tough concepts and exam strategies effectively."
    },
    {
      author: {
        name: "Ananya Krishnan",
        handle: "",
        avatar: ""
      },
      text: "Live lectures with instant doubt resolution helped me stay on track. Interactive teaching made complex topics understandable."
    },
    {
      author: {
        name: "Raj Agarwal",
        handle: "",
        avatar: ""
      },
      text: "The re-attempt batch gave me renewed confidence. Structured revision and mock tests led to significant score improvement."
    },
    {
      author: {
        name: "Kavya Reddy",
        handle: "",
        avatar: ""
      },
      text: "Personalized mentorship helped identify my weak areas. Targeted practice sessions resulted in scoring 96 in final exam."
    }
  ];

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "IITM BS", name: "IITM BS" },
    { id: "NEET", name: "NEET" },
    { id: "JEE", name: "JEE" }
  ];

  // Real-time filtering based on selected category
  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => {
        // Handle both "IITM BS" and "IITM_BS" variations
        if (selectedCategory === "IITM BS") {
          return course.exam_category === "IITM BS" || course.exam_category === "IITM_BS";
        }
        return course.exam_category === selectedCategory;
      });

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        <CoursesHeader />

        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <CategoryFilter 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              
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
                  <CourseCard course={course} index={index} key={course.id} />
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

        <WhyChooseUsSection />
        
        <TestimonialsSection
          title="Success Stories from Our Students"
          description="Join thousands of students who have achieved their academic goals with our courses, mentorship, and live lectures"
          testimonials={testimonials}
        />
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default Courses;
