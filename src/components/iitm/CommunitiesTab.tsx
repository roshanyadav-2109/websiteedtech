import React, { useState, useEffect, useMemo } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectGroup, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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

// Branch and Subject lists
const BRANCHES = [
  "Data Science and Applications",
  "Electronic Systems",
];

const LEVELS = [
  { value: "foundation", label: "Foundation" },
  { value: "diploma", label: "Diploma" }
];

// Updated subject lists based on branch & level
const SUBJECT_MAP: Record<
  string,
  { foundation: string[]; diploma: string[] }
> = {
  "Data Science and Applications": {
    foundation: [
      "Mathematics for Data Science 1",
      "English 1",
      "Computational Thinking",
      "Statistics for Data Science 1",
      "Mathematics for Data Science 2",
      "English 2",
      "Introduction to Python Programming",
      "Statistics for Data Science 2",
    ],
    diploma: [
      "Machine Learning Foundations",
      "Machine Learning Techniques",
      "Machine Learning Practice",
      "Business Data Management",
      "Business Analytics",
      "Tools in Data Science",
      "Programming Data Structures and Algorithms using Python (PDSA)",
      "Database Management System (DBMS)",
      "Application Development - 1",
      "Programming Concepts using Java",
      "System Commands (Linux/Unix)",
      "Application Development - 2",
      "Machine Learning Practice Project",
      "Business Data Management Project",
      "Application Development 1 Project",
      "Application Development 2 Project"
    ]
  },
  "Electronic Systems": {
    foundation: [
      "English - I",
      "Math for Electronics - I",
      "Electronic Systems Thinking and Circuits",
      "Introduction to C Programming",
      "English - II",
      "Introduction to Linux Programming",
      "Digital Systems",
      "Electrical and Electronic Circuits",
      "Embedded C Programming"
    ],
    diploma: [
      "Math for Electronics - II",
      "Signals and Systems",
      "Python Programming",
      "Analog Electronic Systems",
      "Digital Signal Processing",
      "Sensors and Applications",
      "Digital System Design",
      "Control Engineering"
    ]
  }
};

// Centralized Telegram group data
const TELEGRAM_GROUP = {
  name: "IITM BS Main Telegram Group",
  link: "https://t.me/IITM_BS_Official", // Replace with actual group link if different.
  description: "Join the central Telegram group to connect & discuss with students across all levels and branches of the IITM BS degree."
};

const CommunitiesTab = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const { user } = useAuth();

  // Real-time sync/initialize
  useEffect(() => {
    let channel: any = null;

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

    // Real-time subscription
    channel = supabase
      .channel('realtime-communities')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'communities' },
        (payload) => {
          // Refetch on any change for now (simple solution)
          fetchCommunities();
        }
      )
      .subscribe();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
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

  // Generate subject options based on branch and level
  const subjectOptions =
    selectedBranch && selectedLevel
      ? SUBJECT_MAP[selectedBranch]?.[selectedLevel] || []
      : [];

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
    <div className="flex flex-col space-y-6 w-full">
      {/* Telegram Group Card */}
      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border mb-2">
        <div>
          <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
            <span>📢</span> {TELEGRAM_GROUP.name}
          </h2>
          <p className="text-sm text-blue-700 mt-1">{TELEGRAM_GROUP.description}</p>
        </div>
        <a
          href={TELEGRAM_GROUP.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 font-medium shadow transition"
        >
          Join Telegram
        </a>
      </div>

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Branch */}
        <Select value={selectedBranch} onValueChange={value => { setSelectedBranch(value); setSelectedLevel(""); setSelectedSubject(""); }}>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {BRANCHES.map(branch => (
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
          disabled={!selectedBranch || !selectedLevel}
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
  );
};

export default CommunitiesTab;
