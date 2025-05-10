
import React, { useState, useMemo } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Community {
  id: string;
  title: string;
  description: string;
  platform: string;
  subject: string;
  level: string;
  members: number;
  link: string;
}

const CommunitiesTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  
  const levels = [
    { value: "all", label: "All Levels" },
    { value: "qualifier", label: "Qualifier" },
    { value: "foundation", label: "Foundation" },
    { value: "diploma", label: "Diploma" },
    { value: "degree", label: "Degree" },
  ];
  
  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "python", label: "Python" },
    { value: "statistics", label: "Statistics" },
    { value: "machine-learning", label: "Machine Learning" },
    { value: "math", label: "Mathematics" },
    { value: "circuits", label: "Circuits" },
    { value: "programming", label: "Programming" },
    { value: "general", label: "General" },
  ];
  
  const communities: Community[] = [
    {
      id: "ds-python-whatsapp",
      title: "Python Programming Group",
      description: "Discussions on Python programming concepts and exercises",
      platform: "WhatsApp",
      subject: "python",
      level: "foundation",
      members: 985,
      link: "https://chat.whatsapp.com/example"
    },
    {
      id: "ds-ml-whatsapp",
      title: "Machine Learning Community",
      description: "Advanced ML discussions and project collaboration",
      platform: "WhatsApp",
      subject: "machine-learning",
      level: "diploma",
      members: 1247,
      link: "https://chat.whatsapp.com/example2"
    },
    {
      id: "ds-stats-whatsapp",
      title: "Statistics Study Group",
      description: "Help with statistics concepts and problem-solving",
      platform: "WhatsApp",
      subject: "statistics",
      level: "foundation",
      members: 756,
      link: "https://chat.whatsapp.com/example3"
    },
    {
      id: "es-circuits-whatsapp",
      title: "Circuit Analysis Group",
      description: "Discussion forum for circuit theory and problems",
      platform: "WhatsApp",
      subject: "circuits",
      level: "foundation",
      members: 612,
      link: "https://chat.whatsapp.com/example4"
    },
    {
      id: "es-digital-whatsapp",
      title: "Digital Electronics",
      description: "Community for digital design and boolean logic",
      platform: "WhatsApp",
      subject: "circuits",
      level: "diploma",
      members: 548,
      link: "https://chat.whatsapp.com/example5"
    },
    {
      id: "ds-math-whatsapp",
      title: "Mathematics for Data Science",
      description: "Linear algebra, calculus, and probability discussions",
      platform: "WhatsApp",
      subject: "math",
      level: "foundation",
      members: 823,
      link: "https://chat.whatsapp.com/example6"
    },
    {
      id: "ds-qualifier-math-whatsapp",
      title: "Qualifier Math Group",
      description: "Help with qualifier math topics",
      platform: "WhatsApp",
      subject: "math",
      level: "qualifier",
      members: 437,
      link: "https://chat.whatsapp.com/example7"
    },
    {
      id: "iitm-official-forum",
      title: "Official IITM BS Discussion Forum",
      description: "Official Telegram forum for all IITM BS students",
      platform: "Telegram",
      subject: "general",
      level: "all",
      members: 3250,
      link: "https://t.me/example"
    }
  ];
  
  const filteredCommunities = useMemo(() => {
    return communities.filter(community => {
      // Filter by search query
      const matchesQuery = 
        searchQuery === "" ||
        community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.subject.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by level
      const matchesLevel = 
        selectedLevel === "all" || 
        community.level === selectedLevel || 
        community.level === "all";
      
      // Filter by subject
      const matchesSubject = 
        selectedSubject === "all" || 
        community.subject === selectedSubject;
      
      return matchesQuery && matchesLevel && matchesSubject;
    });
  }, [searchQuery, selectedLevel, selectedSubject, communities]);

  const telegramCommunity = communities.find(community => community.platform === "Telegram");

  return (
    <div className="space-y-6">
      {/* Telegram Banner */}
      {telegramCommunity && (
        <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-blue-50 to-indigo-50 mb-8">
          <CardHeader>
            <div className="flex items-center">
              <div className="rounded-full bg-blue-500 p-3 mr-4">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>IITM BS Telegram Community</CardTitle>
                <CardDescription>Join our main Telegram channel with {telegramCommunity.members}+ students</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              <a href={telegramCommunity.link} target="_blank" rel="noopener noreferrer">
                Join Telegram Group
              </a>
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search communities..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Subject" />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject.value} value={subject.value}>
                    {subject.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCommunities
          .filter(community => community.platform === "WhatsApp")
          .map((community) => (
            <Card key={community.id} className="border-none shadow-md hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{community.title}</CardTitle>
                  <Badge variant="outline" className="bg-royal/10 text-royal">
                    {community.platform}
                  </Badge>
                </div>
                <CardDescription>{community.description}</CardDescription>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-100">
                    {subjects.find(s => s.value === community.subject)?.label || community.subject}
                  </Badge>
                  {community.level !== "all" && (
                    <Badge variant="outline" className="bg-gray-100">
                      {levels.find(l => l.value === community.level)?.label || community.level}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardFooter className="flex justify-between">
                <Button asChild className="bg-royal hover:bg-royal-dark text-white">
                  <a href={community.link} target="_blank" rel="noopener noreferrer">
                    <Users className="h-4 w-4 mr-2" /> Join Group
                  </a>
                </Button>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">{community.members} members</span>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      
      {filteredCommunities.filter(community => community.platform === "WhatsApp").length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No communities found matching your criteria. Please try different filters.
        </div>
      )}
    </div>
  );
};

export default CommunitiesTab;
