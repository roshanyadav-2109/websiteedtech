
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { LogOut, BookOpen, Bookmark, GraduationCap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string | null;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        navigate("/login");
        return;
      }
      
      setUser(data.session.user);
      fetchEnrolledCourses(data.session.user.id);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/login");
        } else if (session) {
          setUser(session.user);
          fetchEnrolledCourses(session.user.id);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchEnrolledCourses = async (userId: string) => {
    try {
      setLoading(true);
      
      // Fetch enrollments first
      const { data: enrollments, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select('course_id')
        .eq('user_id', userId);
        
      if (enrollmentsError) throw enrollmentsError;
      
      if (!enrollments || enrollments.length === 0) {
        setEnrolledCourses([]);
        setLoading(false);
        return;
      }
      
      // Fetch course details for enrolled courses
      const courseIds = enrollments.map(enrollment => enrollment.course_id);
      
      const { data: courses, error: coursesError } = await supabase
        .from('courses')
        .select('id, title, category, description, image_url')
        .in('id', courseIds);
        
      if (coursesError) throw coursesError;
      
      setEnrolledCourses(courses || []);
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
      toast({
        title: "Error",
        description: "Failed to load your enrolled courses",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate("/");
  };

  return (
    <>
      <NavBar />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-royal/10 to-royal/5 rounded-lg p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Your Dashboard</h1>
                <p className="text-gray-600 mt-1">{user?.email}</p>
              </div>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-5 w-5 text-royal" />
                  Enrolled Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{enrolledCourses.length}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bookmark className="mr-2 h-5 w-5 text-royal" />
                  Saved Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <GraduationCap className="mr-2 h-5 w-5 text-royal" />
                  Completed Lessons
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>
          </div>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
            
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-royal mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your courses...</p>
              </div>
            ) : enrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map(course => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-100 relative">
                      {course.image_url ? (
                        <img 
                          src={course.image_url} 
                          alt={course.title} 
                          className="w-full h-full object-cover rounded-t-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-t-lg">
                          <BookOpen className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">{course.title}</h3>
                      <div className="text-sm text-royal mb-3">{course.category}</div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                      
                      <Button className="w-full bg-royal hover:bg-royal-dark">
                        Continue Learning
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No enrolled courses yet</h3>
                <p className="text-gray-600 mb-6">Browse our courses and start learning today</p>
                <Button 
                  onClick={() => navigate('/courses')}
                  className="bg-royal hover:bg-royal-dark"
                >
                  Explore Courses
                </Button>
              </div>
            )}
          </section>
        </div>
      </main>
      
      <Footer />
      <EmailPopup />
    </>
  );
};

export default Dashboard;
