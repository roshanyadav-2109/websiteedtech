
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Link as LinkIcon, BookOpen } from "lucide-react";
import AuthWrapper from '@/components/AuthWrapper';

const CommunitiesTab = () => {
  const communityLinks = [
    { title: "IITM BS General Discussion", type: "WhatsApp", link: "https://chat.whatsapp.com/example1" },
    { title: "Unknown IITians IITM BS Community", type: "Telegram", link: "https://t.me/example1" },
  ];

  const studyGuides = [
    { title: "Foundation Level Guide", description: "Essential topics and approaches for foundation courses" },
    { title: "Diploma Programming Guide", description: "Coding tips and practices for programming courses" },
    { title: "BS Degree Preparation", description: "How to manage time and prepare for higher level courses" },
    { title: "Qualifier Examination Strategy", description: "Strategic preparation for qualifier exams" },
  ];

  return (
    <AuthWrapper>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <h3 className="text-2xl font-bold mb-6">Community Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {communityLinks.map((link, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="rounded-full bg-royal/10 p-2 mr-3">
                      <Users className="h-5 w-5 text-royal" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{link.title}</CardTitle>
                      <CardDescription>{link.type} Group</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full bg-royal hover:bg-royal-dark text-white">
                    <a href={link.link} target="_blank" rel="noopener noreferrer">
                      Join Group
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-2xl font-bold mb-6">IITM BS Telegram Community</h3>
          <Card className="border-none shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardHeader>
              <div className="flex items-center">
                <div className="rounded-full bg-blue-500 p-3 mr-4">
                  <LinkIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle>Official Telegram Group</CardTitle>
                  <CardDescription>Join our main community channel</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with fellow IITM BS students, share resources, and get your doubts resolved in our official Telegram community
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                <a href="https://t.me/example-iitmbs" target="_blank" rel="noopener noreferrer">
                  Join Telegram Group
                </a>
              </Button>
            </CardFooter>
          </Card>

          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-6">Study Guides</h3>
            <div className="grid grid-cols-1 gap-4">
              {studyGuides.map((guide, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <div className="rounded-full bg-royal/10 p-2 mr-3">
                        <BookOpen className="h-5 w-5 text-royal" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                      Download Guide
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default CommunitiesTab;
