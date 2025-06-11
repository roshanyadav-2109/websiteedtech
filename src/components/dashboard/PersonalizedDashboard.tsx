
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, FileText, Calendar, Newspaper, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface UserProfile {
  program_type: string;
  branch?: string;
  level?: string;
  exam_type?: string;
  student_status?: string;
  selected_subjects?: string[];
}

interface ContentItem {
  id: string;
  title: string;
  description?: string;
  created_at: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description?: string;
  group_type?: string;
  invite_link?: string;
  created_at: string;
}

const PersonalizedDashboard: React.FC = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [notes, setNotes] = useState<ContentItem[]>([]);
  const [pyqs, setPyqs] = useState<ContentItem[]>([]);
  const [news, setNews] = useState<ContentItem[]>([]);
  const [dates, setDates] = useState<ContentItem[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
        .select('program_type, branch, level, exam_type, student_status, selected_subjects')
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
      const [notesData, pyqsData, newsData, datesData, groupsData] = await Promise.all([
        supabase.from('notes').select('*').match(filterConditions).limit(5),
        supabase.from('pyqs').select('*').match(filterConditions).limit(5),
        supabase.from('news_updates').select('*').match(filterConditions).limit(5),
        supabase.from('important_dates').select('*').match(filterConditions).limit(5),
        supabase.from('study_groups').select('*').match(filterConditions).limit(10)
      ]);

      setNotes(notesData.data || []);
      setPyqs(pyqsData.data || []);
      setNews(newsData.data || []);
      setDates(datesData.data || []);
      setStudyGroups(groupsData.data || []);

    } catch (error) {
      console.error('Error fetching personalized content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-xl">Loading your personalized content...</div>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    if (profile?.program_type === 'IITM_BS') {
      return `Welcome to your IITM BS ${profile.branch} dashboard (${profile.level} level)`;
    } else if (profile?.program_type === 'COMPETITIVE_EXAM') {
      return `Welcome to your ${profile.exam_type} preparation dashboard (${profile.student_status})`;
    }
    return "Welcome to your personalized dashboard";
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-royal/10 to-purple-100 border-none">
        <CardHeader>
          <CardTitle className="text-2xl">{getWelcomeMessage()}</CardTitle>
          <CardDescription>
            Here's your personalized content based on your profile
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Notes Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-royal mr-2" />
              <CardTitle className="text-lg">Recent Notes</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {notes.length > 0 ? (
              <div className="space-y-2">
                {notes.slice(0, 3).map((note) => (
                  <div key={note.id} className="text-sm">
                    <p className="font-medium truncate">{note.title}</p>
                    <p className="text-gray-500 text-xs">{new Date(note.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                <Link to="/exam-preparation">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All Notes
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No notes available yet</p>
            )}
          </CardContent>
        </Card>

        {/* PYQs Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-royal mr-2" />
              <CardTitle className="text-lg">Recent PYQs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {pyqs.length > 0 ? (
              <div className="space-y-2">
                {pyqs.slice(0, 3).map((pyq) => (
                  <div key={pyq.id} className="text-sm">
                    <p className="font-medium truncate">{pyq.title}</p>
                    <p className="text-gray-500 text-xs">{new Date(pyq.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                <Link to="/exam-preparation">
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All PYQs
                  </Button>
                </Link>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No PYQs available yet</p>
            )}
          </CardContent>
        </Card>

        {/* News Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Newspaper className="h-5 w-5 text-royal mr-2" />
              <CardTitle className="text-lg">Latest News</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {news.length > 0 ? (
              <div className="space-y-2">
                {news.slice(0, 3).map((item) => (
                  <div key={item.id} className="text-sm">
                    <p className="font-medium truncate">{item.title}</p>
                    <p className="text-gray-500 text-xs">{new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All News
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No news updates yet</p>
            )}
          </CardContent>
        </Card>

        {/* Important Dates Section */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-royal mr-2" />
              <CardTitle className="text-lg">Important Dates</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {dates.length > 0 ? (
              <div className="space-y-2">
                {dates.slice(0, 3).map((date) => (
                  <div key={date.id} className="text-sm">
                    <p className="font-medium truncate">{date.title}</p>
                    <p className="text-gray-500 text-xs">{new Date(date.created_at).toLocaleDateString()}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-3">
                  View All Dates
                </Button>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No important dates yet</p>
            )}
          </CardContent>
        </Card>

        {/* Study Groups Section */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-royal mr-2" />
              <CardTitle className="text-lg">Your Study Groups</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {studyGroups.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {studyGroups.slice(0, 4).map((group) => (
                  <div key={group.id} className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">{group.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{group.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No study groups available yet</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
