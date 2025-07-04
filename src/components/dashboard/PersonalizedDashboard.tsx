import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, FileText, Calendar, Newspaper, Users, TrendingUp, Clock, Settings, Edit, User } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileEditModal from "./ProfileEditModal";

interface UserProfile {
  program_type: string;
  branch?: string;
  level?: string;
  exam_type?: string;
  student_status?: string;
  subjects?: string[];
  student_name?: string;
}

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  created_at: string;
}

interface Community {
  id: string;
  name: string;
  description?: string;
  group_type?: string;
  invite_link?: string;
  created_at: string;
  exam_type?: string;
  level?: string;
  branch?: string;
  subject?: string;
  class_level?: string;
}

const PersonalizedDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notes, setNotes] = useState<ContentItem[]>([]);
  const [pyqs, setPyqs] = useState<ContentItem[]>([]);
  const [news, setNews] = useState<ContentItem[]>([]);
  const [dates, setDates] = useState<ContentItem[]>([]);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      fetchPersonalizedContent();
    }
  }, [profile]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('program_type, branch, level, exam_type, student_status, subjects, student_name')
        .eq('id', user?.id)
        .single();

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchPersonalizedContent = async () => {
    if (!profile) return;

    setIsLoading(true);

    try {
      // Build filter conditions based on profile
      let filterConditions: any = {};
      
      if (profile.program_type === 'IITM_BS') {
        filterConditions = {
          branch: profile.branch,
          level: profile.level
        };
      } else if (profile.program_type === 'COMPETITIVE_EXAM') {
        filterConditions = {
          exam_type: profile.exam_type,
          class_level: profile.student_status
        };
      }

      // Fetch filtered content
      const [notesData, pyqsData, newsData, datesData, communitiesData] = await Promise.all([
        supabase.from('notes').select('*').match(filterConditions).limit(5),
        supabase.from('pyqs').select('*').match(filterConditions).limit(5),
        supabase.from('news_updates').select('*').match(filterConditions).limit(5),
        supabase.from('important_dates').select('*').match(filterConditions).limit(5),
        fetchFilteredCommunities()
      ]);

      setNotes(notesData.data || []);
      setPyqs(pyqsData.data || []);
      setNews(newsData.data || []);
      setDates(datesData.data || []);
      setCommunities(communitiesData || []);

    } catch (error) {
      console.error('Error fetching personalized content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFilteredCommunities = async () => {
    if (!profile) return [];

    try {
      let query = supabase.from('communities').select('*').eq('is_active', true);

      if (profile.program_type === 'IITM_BS') {
        // Show Telegram groups for all IITM_BS students + filtered WhatsApp groups
        query = query.or(`group_type.eq.telegram,and(group_type.eq.whatsapp,branch.eq.${profile.branch},level.eq.${profile.level})`);
      } else if (profile.program_type === 'COMPETITIVE_EXAM') {
        // Show Telegram groups for exam type + filtered WhatsApp groups by subjects
        const subjectFilters = profile.subjects?.map(subject => `subject.eq.${subject}`).join(',') || '';
        query = query.or(`and(group_type.eq.telegram,exam_type.eq.${profile.exam_type}),and(group_type.eq.whatsapp,exam_type.eq.${profile.exam_type},class_level.eq.${profile.student_status},or(${subjectFilters}))`);
      }

      const { data } = await query.limit(10);
      return data || [];
    } catch (error) {
      console.error('Error fetching communities:', error);
      return [];
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto"></div>
          <p className="text-gray-600 text-lg">Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    const name = profile?.student_name ? `, ${profile.student_name}` : '';
    
    if (profile?.program_type === 'IITM_BS') {
      return `Welcome to your IITM BS ${profile.branch} dashboard${name}`;
    } else if (profile?.program_type === 'COMPETITIVE_EXAM') {
      return `Welcome to your ${profile.exam_type} preparation dashboard${name}`;
    }
    return `Welcome to your personalized dashboard${name}`;
  };

  const getSubtitle = () => {
    if (profile?.program_type === 'IITM_BS') {
      return `${profile.level} level • Personalized content for your academic journey`;
    } else if (profile?.program_type === 'COMPETITIVE_EXAM') {
      return `${profile.student_status} • Tailored resources for exam success`;
    }
    return 'Your personalized learning hub';
  };

  return (
    <div className="space-y-8 animate-fade-in bg-white min-h-screen">
      {/* Modern Welcome Section */}
      <div className="relative overflow-hidden">
        <Card className="border-0 shadow-sm bg-gray-50">
          <CardHeader className="pb-6 pt-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {getWelcomeMessage()}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {getSubtitle()}
                </CardDescription>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-green-700">Active</span>
                </div>
                <Button 
                  onClick={() => setShowProfileEdit(true)}
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-2 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Edit Profile</span>
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Notes</p>
                <p className="text-2xl font-bold text-gray-900">{notes.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">PYQs</p>
                <p className="text-2xl font-bold text-gray-900">{pyqs.length}</p>
              </div>
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Communities</p>
                <p className="text-2xl font-bold text-gray-900">{communities.length}</p>
              </div>
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Updates</p>
                <p className="text-2xl font-bold text-gray-900">{news.length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Recent Notes */}
        <Card className="hover:shadow-md transition-all duration-300 border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-gray-600 mr-2" />
                <CardTitle className="text-lg text-gray-900">Recent Notes</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {notes.length > 0 ? (
              <div className="space-y-3">
                {notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-sm truncate text-gray-900">{note.title}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(note.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                <Link to="/exam-preparation">
                  <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-gray-50">
                    View All Notes
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No notes available yet</p>
            )}
          </CardContent>
        </Card>

        {/* Recent PYQs */}
        <Card className="hover:shadow-md transition-all duration-300 border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-600 mr-2" />
                <CardTitle className="text-lg text-gray-900">Recent PYQs</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {pyqs.length > 0 ? (
              <div className="space-y-3">
                {pyqs.slice(0, 3).map((pyq) => (
                  <div key={pyq.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-sm truncate text-gray-900">{pyq.title}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(pyq.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                <Link to="/exam-preparation">
                  <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-gray-50">
                    View All PYQs
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No PYQs available yet</p>
            )}
          </CardContent>
        </Card>

        {/* Latest News */}
        <Card className="hover:shadow-md transition-all duration-300 border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Newspaper className="h-5 w-5 text-gray-600 mr-2" />
                <CardTitle className="text-lg text-gray-900">Latest News</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {news.length > 0 ? (
              <div className="space-y-3">
                {news.slice(0, 3).map((item) => (
                  <div key={item.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-sm truncate text-gray-900">{item.title}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(item.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-gray-50">
                  View All News
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No news updates yet</p>
            )}
          </CardContent>
        </Card>

        {/* Important Dates */}
        <Card className="hover:shadow-md transition-all duration-300 border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-600 mr-2" />
                <CardTitle className="text-lg text-gray-900">Important Dates</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {dates.length > 0 ? (
              <div className="space-y-3">
                {dates.slice(0, 3).map((date) => (
                  <div key={date.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <p className="font-medium text-sm truncate text-gray-900">{date.title}</p>
                    <div className="flex items-center mt-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(date.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3 hover:bg-gray-50">
                  View All Dates
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-4">No important dates yet</p>
            )}
          </CardContent>
        </Card>

        {/* Study Communities */}
        <Card className="lg:col-span-2 hover:shadow-md transition-all duration-300 border border-gray-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-600 mr-2" />
                <CardTitle className="text-lg text-gray-900">Your Study Communities</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {communities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {communities.slice(0, 4).map((community) => (
                  <div key={community.id} className="p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-all duration-300 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-semibold text-sm text-gray-900">{community.name}</p>
                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                        community.group_type === 'telegram' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'bg-green-50 text-green-700 border border-green-200'
                      }`}>
                        {community.group_type === 'telegram' ? 'Telegram' : 'WhatsApp'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{community.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center py-8">No study communities available yet</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal 
        isOpen={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        profile={profile}
        onProfileUpdate={setProfile}
      />
    </div>
  );
};

export default PersonalizedDashboard;
