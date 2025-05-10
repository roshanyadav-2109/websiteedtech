
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  link: string;
}

const NewsTab = () => {
  const [newsItems] = React.useState<NewsItem[]>([
    {
      id: "news-1",
      title: "Applications Open for July 2025 Cohort",
      description: "IIT Madras is now accepting applications for the July 2025 cohort of the BS in Data Science and Applications program.",
      date: "2025-04-01",
      category: "admissions",
      link: "#"
    },
    {
      id: "news-2",
      title: "New Specializations Announced",
      description: "Two new specializations in AI and IoT have been announced for the diploma level of the program.",
      date: "2025-03-15",
      category: "curriculum",
      link: "#"
    },
    {
      id: "news-3",
      title: "Scholarship Applications Now Open",
      description: "Merit-based and need-based scholarships for the next academic year are now open for applications.",
      date: "2025-03-10",
      category: "scholarships",
      link: "#"
    },
    {
      id: "news-4",
      title: "Industry Partnership with Microsoft",
      description: "IIT Madras has partnered with Microsoft to offer specialized workshops and internship opportunities.",
      date: "2025-02-28",
      category: "partnerships",
      link: "#"
    },
    {
      id: "news-5",
      title: "Alumni Placement Report 2024",
      description: "The placement report for the 2024 graduating class shows impressive statistics with top companies.",
      date: "2025-02-15",
      category: "placements",
      link: "#"
    },
    {
      id: "news-6",
      title: "Research Opportunities for BS Students",
      description: "New research projects open for BS degree students in collaboration with industry partners.",
      date: "2025-01-30",
      category: "research",
      link: "#"
    }
  ]);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {newsItems.map((item) => (
          <Card key={item.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={`
                  ${item.category === 'admissions' ? 'bg-blue-100 text-blue-800' : ''}
                  ${item.category === 'curriculum' ? 'bg-purple-100 text-purple-800' : ''}
                  ${item.category === 'scholarships' ? 'bg-green-100 text-green-800' : ''}
                  ${item.category === 'partnerships' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${item.category === 'placements' ? 'bg-pink-100 text-pink-800' : ''}
                  ${item.category === 'research' ? 'bg-indigo-100 text-indigo-800' : ''}
                `}>
                  {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </Badge>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="h-3 w-3 mr-1" />
                  {new Date(item.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Read More
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NewsTab;
