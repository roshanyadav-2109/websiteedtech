
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ExternalLink } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

interface Community {
  id: string;
  name: string;
  description: string;
  group_link: string;
  group_type: string;
  exam_type: string;
  branch: string;
  level: string;
  subject: string;
  member_count: number;
  is_active: boolean;
}

interface UserProfile {
  branch: string;
  level: string;
}

const CommunitiesTab = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('branch, level')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserProfile(data);
      } catch (error: any) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchCommunities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('communities')
          .select('*')
          .eq('is_active', true)
          .or('exam_type.eq.IITM_BS,exam_type.is.null')
          .order('member_count', { ascending: false });

        if (error) throw error;
        setCommunities(data || []);
      } catch (error: any) {
        setError("Failed to fetch communities. Please try again later.");
        console.error("Error fetching communities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
    fetchCommunities();
  }, [user]);

  const foundationSubjects = ["Math 1", "Stats 1", "English 1", "CT", "Python"];
  const diplomaSubjects = ["Math 2", "Stats 2", "English 2", "DBMS", "MLF", "BDM", "App Dev 1", "App Dev 2", "PDSA", "MAD 1", "MAD 2", "MLT", "MLP", "Tools in DS"];

  const filteredCommunities = useMemo(() => {
    if (!communities) return [];
    let items = communities;

    if (activeFilter === "my-branch" && userProfile?.branch) {
      items = items.filter(community => 
        community.branch === userProfile.branch || !community.branch
      );
    } else if (activeFilter === "my-level" && userProfile?.level) {
      items = items.filter(community => 
        community.level === userProfile.level || !community.level
      );
    } else if (activeFilter !== "all") {
      items = items.filter(community => community.group_type === activeFilter);
    }

    if (subjectFilter) {
      items = items.filter(community => community.subject === subjectFilter);
    }

    return items;
  }, [communities, activeFilter, subjectFilter, userProfile]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <div className="overflow-x-auto pb-2">
          <TabsList className="w-full min-w-fit">
            <TabsTrigger value="all" className="rounded-md flex-shrink-0">
              All Communities
            </TabsTrigger>
            {userProfile?.branch && (
              <TabsTrigger value="my-branch" className="rounded-md flex-shrink-0">
                My Branch ({userProfile.branch})
              </TabsTrigger>
            )}
            {userProfile?.level && (
              <TabsTrigger value="my-level" className="rounded-md flex-shrink-0">
                My Level ({userProfile.level})
              </TabsTrigger>
            )}
            <TabsTrigger value="WhatsApp" className="rounded-md flex-shrink-0">
              WhatsApp Groups
            </TabsTrigger>
            <TabsTrigger value="Telegram" className="rounded-md flex-shrink-0">
              Telegram Groups
            </TabsTrigger>
            <TabsTrigger value="Discord" className="rounded-md flex-shrink-0">
              Discord Servers
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
      
      {/* Subject Filter Tabs */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">Filter by Subject</h3>
        <Tabs onValueChange={(value) => setSubjectFilter(value === "all" ? null : value)} defaultValue="all">
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full min-w-fit">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Foundation" disabled className="text-royal font-semibold">Foundation</TabsTrigger>
              {foundationSubjects.map(s => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
              <TabsTrigger value="Diploma" disabled className="text-royal font-semibold">Diploma</TabsTrigger>
              {diplomaSubjects.map(s => <TabsTrigger key={s} value={s}>{s}</TabsTrigger>)}
            </TabsList>
          </div>
        </Tabs>
      </div>

      {/* Communities Grid */}
      <div>
        {filteredCommunities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No communities available for the selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="border-none shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className="rounded-full bg-royal/10 p-2 mr-3">
                        <Users className="h-5 w-5 text-royal" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{community.name}</CardTitle>
                        <CardDescription>{community.group_type} Group</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {community.description && (
                    <p className="text-sm text-gray-600 mb-2">{community.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {community.branch && <Badge variant="outline">{community.branch}</Badge>}
                    {community.level && <Badge variant="outline">{community.level}</Badge>}
                    {community.subject && <Badge variant="secondary">{community.subject}</Badge>}
                  </div>
                  {community.member_count > 0 && (
                    <p className="text-xs text-gray-500">{community.member_count} members</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-royal hover:bg-royal-dark text-white">
                    <a href={community.group_link} target="_blank" rel="noopener noreferrer">
                      Join Group <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitiesTab;
