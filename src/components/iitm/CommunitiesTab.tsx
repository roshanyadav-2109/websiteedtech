
import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Users, ExternalLink } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';

// Branch and Subject lists
const BRANCHES = [
  "Data Science and Applications",
  "Electronic Systems",
];
const LEVELS = [
  { value: "foundation", label: "Foundation" },
  { value: "diploma", label: "Diploma" },
];
const FOUNDATION_SUBJECTS = ["Math 1", "Stats 1", "English 1", "CT", "Python"];
const DIPLOMA_SUBJECTS = ["Math 2", "Stats 2", "English 2", "DBMS", "MLF", "BDM", "App Dev 1", "App Dev 2", "PDSA", "MAD 1", "MAD 2", "MLT", "MLP", "Tools in DS"];

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

const TELEGRAM_GROUP_LINK = "https://t.me/iitm_bs_community";
const TELEGRAM_GROUP_NAME = "IITM BS Official Telegram";
const TELEGRAM_GROUP_DESCRIPTION = "Join 5000+ IITM BS students, ask questions, and connect with peers!";

const CommunitiesTab = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

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
        setSelectedBranch(data.branch || "");
        setSelectedLevel(data.level?.toLowerCase() || "");
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

  // Filtering logic: Only WhatsApp groups, then by branch, level, subject
  const filteredCommunities = useMemo(() => {
    let items = communities.filter(c => c.group_type === "WhatsApp");

    if (selectedBranch) {
      items = items.filter(c => c.branch === selectedBranch);
    }
    if (selectedLevel) {
      items = items.filter(c => c.level?.toLowerCase() === selectedLevel);
    }
    if (selectedSubject) {
      items = items.filter(c => c.subject === selectedSubject);
    }

    return items;
  }, [communities, selectedBranch, selectedLevel, selectedSubject]);

  // Subjects depend on level selection
  const subjectOptions = selectedLevel === "diploma"
    ? DIPLOMA_SUBJECTS
    : FOUNDATION_SUBJECTS;

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
    <div className="relative flex flex-col md:flex-row gap-6">
      {/* Left content: WhatsApp communities + filters */}
      <div className="flex-1 space-y-6">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Branch */}
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {BRANCHES.map((branch) => (
                  <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Level */}
          <Select value={selectedLevel} onValueChange={value => { setSelectedLevel(value); setSelectedSubject(""); }}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {LEVELS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>{label}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Subject */}
          <Select
            value={selectedSubject}
            onValueChange={setSelectedSubject}
            disabled={!selectedLevel}
          >
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {subjectOptions.map(s => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* WhatsApp Communities List */}
        <div>
          {filteredCommunities.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No WhatsApp communities found for the selected filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredCommunities.map((community) => (
                <Card key={community.id} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="rounded-full bg-green-500/10 p-2 mr-3">
                          <Users className="h-5 w-5 text-green-700" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{community.name}</CardTitle>
                          <CardDescription>WhatsApp Group</CardDescription>
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
                    <Button asChild className="w-full bg-green-500 hover:bg-green-600 text-white">
                      <a href={community.group_link} target="_blank" rel="noopener noreferrer">
                        Join WhatsApp <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Telegram group fixed card (right/side) */}
      <div className="w-full md:w-80 flex-shrink-0">
        <Card className="bg-[#3498db]/10 border-[#3498db] border-2 shadow-lg sticky top-4">
          <CardHeader>
            <div className="flex items-center">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://t.me/iitm_bs_community"
                alt="Telegram QR"
                className="w-20 h-20 rounded-lg mr-4"
              />
              <div>
                <CardTitle className="!text-base">{TELEGRAM_GROUP_NAME}</CardTitle>
                <CardDescription>
                  <span className="block mt-1">{TELEGRAM_GROUP_DESCRIPTION}</span>
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter>
            <Button 
              asChild
              className="w-full bg-[#0088cc] hover:bg-[#0088cc]/90 text-white font-bold mt-2"
            >
              <a href={TELEGRAM_GROUP_LINK} target="_blank" rel="noopener noreferrer">
                Join Telegram
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CommunitiesTab;
