
import React, { useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Community {
  id: string;
  title: string;
  description: string;
  platform: string;
  subject: string;
  members: number;
  link: string;
}

const CommunitiesTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const communities: Community[] = [
    {
      id: "ds-python-whatsapp",
      title: "Python Programming Group",
      description: "Discussions on Python programming concepts and exercises",
      platform: "WhatsApp",
      subject: "Python",
      members: 985,
      link: "https://chat.whatsapp.com/example"
    },
    {
      id: "ds-ml-discord",
      title: "Machine Learning Community",
      description: "Advanced ML discussions and project collaboration",
      platform: "Discord",
      subject: "Machine Learning",
      members: 1247,
      link: "https://discord.gg/example"
    },
    {
      id: "ds-stats-telegram",
      title: "Statistics Study Group",
      description: "Help with statistics concepts and problem-solving",
      platform: "Telegram",
      subject: "Statistics",
      members: 756,
      link: "https://t.me/example"
    },
    {
      id: "es-circuits-whatsapp",
      title: "Circuit Analysis Group",
      description: "Discussion forum for circuit theory and problems",
      platform: "WhatsApp",
      subject: "Circuits",
      members: 612,
      link: "https://chat.whatsapp.com/example2"
    },
    {
      id: "es-digital-discord",
      title: "Digital Electronics",
      description: "Community for digital design and boolean logic",
      platform: "Discord",
      subject: "Digital Electronics",
      members: 548,
      link: "https://discord.gg/example2"
    },
    {
      id: "ds-math-telegram",
      title: "Mathematics for Data Science",
      description: "Linear algebra, calculus, and probability discussions",
      platform: "Telegram",
      subject: "Mathematics",
      members: 823,
      link: "https://t.me/example2"
    },
    {
      id: "github-collab",
      title: "IITM Projects Collaboration",
      description: "Open source project collaboration for IITM students",
      platform: "GitHub",
      subject: "Programming",
      members: 437,
      link: "https://github.com/example-org"
    },
    {
      id: "iitm-official-forum",
      title: "Official IITM BS Discussion Forum",
      description: "Official forum moderated by IITM faculty",
      platform: "Forum",
      subject: "General",
      members: 3250,
      link: "https://discuss.example.org"
    }
  ];
  
  const filteredCommunities = searchQuery
    ? communities.filter(community => 
        community.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        community.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : communities;

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          className="pl-10"
          placeholder="Search communities by title, description, or subject..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCommunities.map((community) => (
          <Card key={community.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{community.title}</CardTitle>
                <Badge variant="outline" className="bg-royal/10 text-royal">
                  {community.platform}
                </Badge>
              </div>
              <CardDescription>{community.description}</CardDescription>
              <div className="mt-2">
                <Badge variant="outline" className="bg-gray-100">
                  {community.subject}
                </Badge>
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
        
        {filteredCommunities.length === 0 && (
          <div className="col-span-3 text-center py-8 text-gray-500">
            No communities found matching your search query. Please try a different search term.
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunitiesTab;
