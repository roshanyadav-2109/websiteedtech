
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { loadRazorpayScript, initializeRazorpayCheckout } from "@/services/RazorpayService";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { 
  BookOpen, 
  GraduationCap, 
  Star, 
  Users, 
  Calendar, 
  CheckCircle,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Courses" },
    { id: "iitm-bs", name: "IITM BS" },
    { id: "neet", name: "NEET" },
    { id: "jee", name: "JEE" },
    { id: "placement", name: "Placement" }
  ];

  // Fetch courses from Supabase
  const { data: courses = [], isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .order("bestseller", { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  // Check if user is enrolled in a course
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useQuery({
    queryKey: ["enrollments", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("enrollments")
        .select("course_id")
        .eq("user_id", user.id);
      
      if (error) throw error;
      return data.map(e => e.course_id);
    },
    enabled: !!user
  });

  const filteredCourses = selectedCategory === "all" 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const handleEnrollClick = (course: any) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to enroll in this course",
      });
      navigate("/auth");
      return;
    }

    setSelectedCourse(course);
    setIsPaymentDialogOpen(true);
  };

  const isEnrolled = (courseId: string) => {
    return enrollments.includes(courseId);
  };

  const handlePayment = async () => {
    if (!selectedCourse) return;
    
    try {
      setEnrollmentLoading(true);
      
      // Check if Razorpay script is loaded
      const isRazorpayLoaded = await loadRazorpayScript();
      if (!isRazorpayLoaded) {
        throw new Error("Failed to load payment gateway");
      }
      
      // Create order via Supabase Edge Function
      const { data: orderData, error: orderError } = await supabase.functions.invoke("create-order", {
        body: {
          courseId: selectedCourse.id,
          amount: selectedCourse.discounted_price || selectedCourse.price
        }
      });
      
      if (orderError) throw new Error(orderError.message);
      
      const { order, key } = orderData;
      if (!order || !key) throw new Error("Invalid order response");

      // Open Razorpay checkout
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "Unknown IITians",
        description: `Enrollment for ${selectedCourse.title}`,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            // Verify payment and record enrollment
            const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-payment", {
              body: {
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                courseId: selectedCourse.id
              }
            });
            
            if (verifyError) throw new Error(verifyError.message);
            
            // Close dialog and show success message
            setIsPaymentDialogOpen(false);
            toast({
              title: "Enrollment Successful!",
              description: `You've successfully enrolled in ${selectedCourse.title}`,
            });
            
            // Invalidate enrollments query to refresh data
            // Note: Since we're not using React Query's useQueryClient, we'll set a timeout to reload the page
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } catch (error: any) {
            toast({
              title: "Verification Failed",
              description: error.message,
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#4F46E5",
        },
      };
      
      await initializeRazorpayCheckout(options);
    } catch (error: any) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setEnrollmentLoading(false);
    }
  };

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
            <div className="flex items-center justify-between mb-8">
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

              {user && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Logged in as </span>
                  <Badge variant="outline" className="font-normal bg-gray-100">
                    {user.email}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={async () => {
                      await supabase.auth.signOut();
                      toast({
                        title: "Signed out",
                        description: "You've been signed out successfully",
                      });
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              )}

              {!user && !authLoading && (
                <Button 
                  className="bg-royal hover:bg-royal-dark" 
                  onClick={() => navigate("/auth")}
                >
                  Sign In
                </Button>
              )}
            </div>

            {coursesLoading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-royal" />
                <span className="ml-2 text-lg text-gray-600">Loading courses...</span>
              </div>
            ) : filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-xl text-gray-600">No courses found for this category</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                      {course.bestseller && (
                        <div className="absolute top-0 right-0">
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
                          {course.students} students
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(course.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm font-medium">{course.rating}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-4">{course.description}</CardDescription>
                        <div className="grid grid-cols-2 gap-2">
                          {course.features?.map((feature: string, i: number) => (
                            <div key={i} className="flex items-center text-sm">
                              <CheckCircle className="h-3 w-3 mr-1 text-green-500" /> 
                              {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <div className="mb-3 sm:mb-0">
                          <span className="text-xl font-bold text-royal">
                            ₹{course.discounted_price || course.price}
                          </span>
                          {course.discounted_price && (
                            <span className="ml-2 text-gray-500 line-through">
                              ₹{course.price}
                            </span>
                          )}
                        </div>
                        
                        {!isEnrolled(course.id) ? (
                          <Button
                            onClick={() => handleEnrollClick(course)}
                            className={`${course.bestseller ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700' : 'bg-royal hover:bg-royal-dark'} text-white px-5 py-2`}
                          >
                            Enroll Now
                          </Button>
                        ) : (
                          <Badge className="py-2 px-4 bg-green-100 text-green-800 hover:bg-green-200 border border-green-200">
                            <CheckCircle className="h-4 w-4 mr-2" /> Enrolled
                          </Badge>
                        )}
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
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

        {/* Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Complete Your Enrollment</DialogTitle>
              <DialogDescription>
                You're about to enroll in the following course:
              </DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <div className="py-4">
                <h3 className="font-medium text-lg">{selectedCourse.title}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">{selectedCourse.duration} course</span>
                  <span className="font-bold text-royal">₹{selectedCourse.discounted_price || selectedCourse.price}</span>
                </div>
                <div className="mt-4 bg-gray-50 p-3 rounded-md">
                  <p className="text-sm text-gray-600">
                    By proceeding with the payment, you agree to our terms of service and refund policy.
                  </p>
                </div>
              </div>
            )}
            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)} disabled={enrollmentLoading}>
                Cancel
              </Button>
              <Button 
                className="bg-royal hover:bg-royal-dark"
                onClick={handlePayment}
                disabled={enrollmentLoading}
              >
                {enrollmentLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Pay Now"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default Courses;
