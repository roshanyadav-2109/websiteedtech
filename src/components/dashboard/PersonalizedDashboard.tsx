import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import ProfileSetup from "@/components/profile/ProfileSetup";
import ProfileEditModal from "@/components/dashboard/ProfileEditModal";
import { 
  User, 
  Settings, 
  BookOpen, 
  GraduationCap, 
  Trophy,
  Calendar,
  FileText,
  Download,
  Edit
} from "lucide-react";
import { Link } from "react-router-dom";

// Simplified type definitions to avoid deep type instantiation
interface UserProfile {
  program_type: string;
  branch?: string;
  level?: string;
  exam_type?: string;
  student_status?: string;
  subjects?: string[];
  student_name?: string;
  profile_completed?: boolean;
}

interface Employee {
  employee_code: string;
  full_name: string;
  position: string;
  department?: string;
  verification_certificate_url?: string; // Fixed column name
}

const PersonalizedDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
      checkEmployeeStatus();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile({
          program_type: data.program_type || '',
          branch: data.branch || undefined,
          level: data.level || undefined,
          exam_type: data.exam_type || undefined,
          student_status: data.student_status || undefined,
          subjects: data.subjects || undefined,
          student_name: data.student_name || undefined,
          profile_completed: data.profile_completed || false
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkEmployeeStatus = async () => {
    if (!user?.email) return;

    try {
      // Updated query to use correct column names
      const { data, error } = await supabase
        .from('employees')
        .select('employee_code, full_name, position, department, verification_certificate_url')
        .eq('email', user.email)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error checking employee status:', error);
        return;
      }

      if (data) {
        setEmployee({
          employee_code: data.employee_code || '',
          full_name: data.full_name || '',
          position: data.position || '',
          department: data.department || undefined,
          verification_certificate_url: data.verification_certificate_url || undefined
        });
      }
    } catch (error) {
      console.error('Error checking employee status:', error);
    }
  };

  const handleDownloadCertificate = () => {
    if (employee?.verification_certificate_url) {
      window.open(employee.verification_certificate_url, '_blank');
    } else {
      toast({
        title: "Certificate Not Available",
        description: "Verification certificate not yet generated.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-royal"></div>
      </div>
    );
  }

  if (!profile?.profile_completed) {
    return <ProfileSetup onComplete={fetchUserProfile} />;
  }

  // Render IITM content
  const renderIITMContent = () => (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Branch Notes
          </CardTitle>
          <CardDescription>
            Access notes for {profile?.branch} - {profile?.level} level
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/exam-preparation/iitm-bs">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              View Notes
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            Previous Year Questions
          </CardTitle>
          <CardDescription>
            PYQs for {profile?.branch} branch
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/exam-preparation/iitm-bs">
            <Button className="w-full bg-green-500 hover:bg-green-600">
              View PYQs
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            IITM Tools
          </CardTitle>
          <CardDescription>
            CGPA Calculator & Predictors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/exam-preparation/iitm-bs">
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
              Use Tools
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );

  // Render competitive exam content
  const renderCompetitiveExamContent = () => (
    <>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-purple-500" />
            {profile?.exam_type} Preparation
          </CardTitle>
          <CardDescription>
            Access {profile?.exam_type} study materials and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={`/exam-preparation/${profile?.exam_type?.toLowerCase()}`}>
            <Button className="w-full bg-purple-500 hover:bg-purple-600">
              Start Preparation
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-500" />
            Practice Tests
          </CardTitle>
          <CardDescription>
            Take mock tests for {profile?.exam_type}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to={`/exam-preparation/${profile?.exam_type?.toLowerCase()}`}>
            <Button className="w-full bg-indigo-500 hover:bg-indigo-600">
              Practice Now
            </Button>
          </Link>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-royal text-white text-xl">
                  {profile?.student_name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome, {profile?.student_name || 'Student'}!
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">
                    {profile?.program_type === 'IITM_BS' ? 'IITM BS Student' : 'Competitive Exam Aspirant'}
                  </Badge>
                  {profile?.exam_type && (
                    <Badge variant="outline">{profile.exam_type}</Badge>
                  )}
                  {profile?.branch && (
                    <Badge variant="outline">{profile.branch}</Badge>
                  )}
                </div>
              </div>
            </div>
            <Button onClick={() => setIsEditModalOpen(true)} variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Employee Section */}
      {employee && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Employee Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Employee Code:</strong> {employee.employee_code}</p>
                <p><strong>Position:</strong> {employee.position}</p>
                {employee.department && (
                  <p><strong>Department:</strong> {employee.department}</p>
                )}
              </div>
              <div className="flex items-center">
                <Button 
                  onClick={handleDownloadCertificate}
                  className="bg-green-600 text-white hover:bg-green-700 shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Verification Certificate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personalized Content */}
      <div>
        <h3 className="text-xl font-semibold mb-6">Your Personalized Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile?.program_type === 'IITM_BS' ? renderIITMContent() : renderCompetitiveExamContent()}
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/courses">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Button>
            </Link>
            <Link to="/career">
              <Button variant="outline" className="w-full justify-start">
                <Trophy className="h-4 w-4 mr-2" />
                Career Opportunities
              </Button>
            </Link>
            <Link to="/exam-preparation">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Exam Preparation
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        profile={profile}
        onProfileUpdate={setProfile}
      />
    </div>
  );
};

export default PersonalizedDashboard;
