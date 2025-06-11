
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MessageCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import OptimizedAuthWrapper from "@/components/OptimizedAuthWrapper";

interface Community {
  id: string;
  name: string;
  description?: string;
  group_link: string;
  group_type: 'telegram' | 'whatsapp';
  exam_type?: string;
  level?: string;
  branch?: string;
  subject?: string;
  class_level?: string;
  member_count: number;
}

interface UserProfile {
  program_type: string;
  branch?: string;
  level?: string;
  exam_type?: string;
  student_status?: string;
  subjects?: string[];
}

const Communities = () => {
  const { user } = useAuth();
  const [communities, setCommunities] = useState<Community[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  useEffect(() => {
    if (profile) {
      fetchCommunities();
    }
  }, [profile]);

  const fetchUserProfile = async () => {
    try {
      const { data } = await supabase
        .from('profiles')
        .select('program_type, branch, level, exam_type, student_status, subjects')
        .eq('id', user?.id)
        .single();

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchCommunities = async () => {
    if (!profile) return;

    setIsLoading(true);
    try {
      let query = supabase
        .from('communities')
        .select('*')
        .eq('is_active', true);

      if (profile.program_type === 'IITM_BS') {
        // Show all Telegram groups for IITM_BS + filtered WhatsApp groups
        if (profile.branch && profile.level) {
          query = query.or(`group_type.eq.telegram,and(group_type.eq.whatsapp,branch.eq.${profile.branch},level.eq.${profile.level})`);
        } else {
          query = query.eq('group_type', 'telegram');
        }
      } else if (profile.program_type === 'COMPETITIVE_EXAM' && profile.exam_type) {
        // Show Telegram groups for exam type + filtered WhatsApp groups by subjects
        if (profile.subjects && profile.subjects.length > 0 && profile.student_status) {
          const subjectFilters = profile.subjects.map(subject => `subject.eq.${subject}`).join(',');
          query = query.or(`and(group_type.eq.telegram,exam_type.eq.${profile.exam_type}),and(group_type.eq.whatsapp,exam_type.eq.${profile.exam_type},class_level.eq.${profile.student_status},or(${subjectFilters}))`);
        } else {
          query = query.eq('group_type', 'telegram').eq('exam_type', profile.exam_type);
        }
      }

      const { data } = await query;
      
      // Type assertion to ensure proper typing
      const typedCommunities = (data || []).map(community => ({
        ...community,
        group_type: community.group_type as 'telegram' | 'whatsapp'
      }));
      
      setCommunities(typedCommunities);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const telegramCommunities = communities.filter(c => c.group_type === 'telegram');
  const whatsappCommunities = communities.filter(c => c.group_type === 'whatsapp');

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <OptimizedAuthWrapper>
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Study Communities</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Join study groups and communities tailored to your academic journey. 
                  Connect with peers, share resources, and get help when you need it.
                </p>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-xl">Loading communities...</div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Telegram Communities */}
                  {telegramCommunities.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
                        Telegram Communities
                        <Badge variant="secondary" className="ml-2">Broad Access</Badge>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {telegramCommunities.map((community) => (
                          <Card key={community.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{community.name}</CardTitle>
                                <Badge className="bg-blue-100 text-blue-700">Telegram</Badge>
                              </div>
                              <CardDescription>{community.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Users className="h-4 w-4 mr-1" />
                                  {community.member_count} members
                                </div>
                                <Button 
                                  asChild 
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <a 
                                    href={community.group_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Join Group
                                  </a>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WhatsApp Communities */}
                  {whatsappCommunities.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-semibold mb-4 flex items-center">
                        <MessageCircle className="h-6 w-6 mr-2 text-green-600" />
                        WhatsApp Communities
                        <Badge variant="secondary" className="ml-2">Filtered Access</Badge>
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whatsappCommunities.map((community) => (
                          <Card key={community.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">{community.name}</CardTitle>
                                <Badge className="bg-green-100 text-green-700">WhatsApp</Badge>
                              </div>
                              <CardDescription>{community.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {community.subject && (
                                  <Badge variant="outline" className="text-xs">
                                    {community.subject}
                                  </Badge>
                                )}
                                {community.branch && (
                                  <Badge variant="outline" className="text-xs">
                                    {community.branch}
                                  </Badge>
                                )}
                                {community.level && (
                                  <Badge variant="outline" className="text-xs">
                                    {community.level}
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <Users className="h-4 w-4 mr-1" />
                                  {community.member_count} members
                                </div>
                                <Button 
                                  asChild 
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <a 
                                    href={community.group_link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-1" />
                                    Join Group
                                  </a>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                  {telegramCommunities.length === 0 && whatsappCommunities.length === 0 && (
                    <div className="text-center py-12">
                      <MessageCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">
                        No communities available
                      </h3>
                      <p className="text-gray-500">
                        Communities matching your profile will appear here once they're created.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </OptimizedAuthWrapper>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Communities;
