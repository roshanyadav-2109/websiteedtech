
import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { BookOpen, FileText, Users, BookmarkIcon } from "lucide-react";

interface Enrollment {
  id: string;
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    duration: string;
  };
}

const Dashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserEnrollments = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('enrollments')
          .select(`
            id,
            course:course_id (
              id, title, description, category, price, duration
            )
          `)
          .eq('user_id', user.id);

        if (error) throw error;
        setEnrollments(data || []);
      } catch (error) {
        console.error('Error fetching user enrollments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserEnrollments();
  }, [user]);

  return (
    <>
      <NavBar />
      <main className="pt-20 pb-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-royal to-royal-dark text-white py-10 px-6 rounded-lg mb-8 mt-4">
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.user_metadata?.full_name || 'Student'}</h1>
            <p className="opacity-90">Manage your courses and resources from your personal dashboard.</p>
          </div>

          <Tabs defaultValue="courses">
            <TabsList className="w-full max-w-md mx-auto mb-8">
              <TabsTrigger value="courses" className="flex-1">My Courses</TabsTrigger>
              <TabsTrigger value="resources" className="flex-1">Study Resources</TabsTrigger>
              <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <h2 className="text-2xl font-bold mb-6">Your Enrolled Courses</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-royal"></div>
                </div>
              ) : enrollments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrollments.map((enrollment) => (
                    <Card key={enrollment.id} className="h-full">
                      <CardHeader>
                        <CardTitle>{enrollment.course.title}</CardTitle>
                        <CardDescription>{enrollment.course.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">{enrollment.course.description}</p>
                        <div className="flex justify-between items-center text-sm text-gray-500">
                          <span>Duration: {enrollment.course.duration}</span>
                          <Button size="sm">Continue Learning</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                  <BookmarkIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses enrolled yet</h3>
                  <p className="text-gray-500 mb-4">Explore our available courses to start learning.</p>
                  <Button asChild>
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="resources">
              <h2 className="text-2xl font-bold mb-6">Study Resources</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="mr-3 p-3 bg-blue-100 rounded-full">
                        <FileText className="h-6 w-6 text-blue-600" />
                      </div>
                      <CardTitle>Study Notes</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Access comprehensive notes for your exam preparation</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Link to="/exam-preparation/neet">
                        <Badge variant="outline">NEET</Badge>
                      </Link>
                      <Link to="/exam-preparation/jee">
                        <Badge variant="outline">JEE</Badge>
                      </Link>
                      <Link to="/exam-preparation/iitm-bs">
                        <Badge variant="outline">IITM-BS</Badge>
                      </Link>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/exam-preparation">View All Notes</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="mr-3 p-3 bg-purple-100 rounded-full">
                        <BookOpen className="h-6 w-6 text-purple-600" />
                      </div>
                      <CardTitle>Video Lectures</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Watch expert video lectures on complex topics</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">Physics</Badge>
                      <Badge variant="outline">Chemistry</Badge>
                      <Badge variant="outline">Mathematics</Badge>
                      <Badge variant="outline">Biology</Badge>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/exam-preparation">Browse Lectures</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="mr-3 p-3 bg-green-100 rounded-full">
                        <Users className="h-6 w-6 text-green-600" />
                      </div>
                      <CardTitle>Study Groups</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Join study communities to learn with peers</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="outline">WhatsApp</Badge>
                      <Badge variant="outline">Telegram</Badge>
                      <Badge variant="outline">Discord</Badge>
                    </div>
                    <Button asChild className="w-full" variant="outline">
                      <Link to="/exam-preparation">Join Groups</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profile">
              <h2 className="text-2xl font-bold mb-6">Your Profile</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1 text-lg">{user?.user_metadata?.full_name || 'Not available'}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                      <p className="mt-1 text-lg">{user?.email || 'Not available'}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="mr-3">Update Profile</Button>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
