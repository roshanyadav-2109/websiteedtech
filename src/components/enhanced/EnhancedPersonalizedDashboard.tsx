
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  Target, 
  TrendingUp, 
  Clock,
  User,
  Settings,
  Download,
  Star,
  BarChart3
} from "lucide-react";

interface DashboardStats {
  totalDownloads: number;
  coursesEnrolled: number;
  studyProgress: number;
  recentActivity: any[];
}

const EnhancedPersonalizedDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalDownloads: 0,
    coursesEnrolled: 0,
    studyProgress: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      // Fetch enrollments
      const { data: enrollments } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user?.id);

      setStats({
        totalDownloads: 0, // This would be tracked separately
        coursesEnrolled: enrollments?.length || 0,
        studyProgress: 65, // This would be calculated based on user activity
        recentActivity: []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0]}!
            </h1>
            <p className="text-gray-600 mt-1">Here's your learning dashboard</p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Downloads</p>
                  <p className="text-3xl font-bold">{stats.totalDownloads}</p>
                </div>
                <Download className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Courses Enrolled</p>
                  <p className="text-3xl font-bold">{stats.coursesEnrolled}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Study Progress</p>
                  <p className="text-3xl font-bold">{stats.studyProgress}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Achievements</p>
                  <p className="text-3xl font-bold">12</p>
                </div>
                <Trophy className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Study Progress */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-royal" />
                  Study Progress Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="progress" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                    <TabsTrigger value="goals">Goals</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="progress" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Mathematics</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Physics</span>
                          <span>72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Chemistry</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="goals" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span>Complete JEE Syllabus</span>
                        </div>
                        <Badge variant="secondary">75%</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-blue-500" />
                          <span>Practice 100 Questions</span>
                        </div>
                        <Badge variant="secondary">60%</Badge>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">Downloaded Physics Notes</p>
                          <p className="text-xs text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">Completed Math Quiz</p>
                          <p className="text-xs text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Notes
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Schedule
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Trophy className="h-4 w-4 mr-2" />
                  Take Quiz
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <User className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg border-l-4 border-l-blue-500">
                    <p className="text-sm font-medium">Math Test</p>
                    <p className="text-xs text-gray-500">Tomorrow, 2:00 PM</p>
                  </div>
                  <div className="p-3 border rounded-lg border-l-4 border-l-green-500">
                    <p className="text-sm font-medium">Physics Lab</p>
                    <p className="text-xs text-gray-500">Friday, 10:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPersonalizedDashboard;
