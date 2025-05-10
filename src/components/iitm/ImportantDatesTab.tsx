
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface DateEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  term: string;
  type: string;
}

const ImportantDatesTab = () => {
  const [activeTerm, setActiveTerm] = useState("2024-may");
  
  const terms = [
    { id: "2024-may", label: "May 2024" },
    { id: "2024-sept", label: "September 2024" },
    { id: "2025-jan", label: "January 2025" },
  ];
  
  const dateEvents: DateEvent[] = [
    // May 2024 Term
    {
      id: "may-2024-registration",
      title: "Term Registration",
      date: "Apr 15 - May 2, 2024",
      description: "Registration period for May 2024 term",
      term: "2024-may",
      type: "registration"
    },
    {
      id: "may-2024-term-start",
      title: "Term Start",
      date: "May 6, 2024",
      description: "Official start of May 2024 term",
      term: "2024-may",
      type: "term"
    },
    {
      id: "may-2024-quiz1",
      title: "Quiz 1",
      date: "Jun 10-12, 2024",
      description: "First quiz for May 2024 term",
      term: "2024-may",
      type: "exam"
    },
    {
      id: "may-2024-quiz2",
      title: "Quiz 2",
      date: "Jul 15-17, 2024",
      description: "Second quiz for May 2024 term",
      term: "2024-may",
      type: "exam"
    },
    {
      id: "may-2024-end-term",
      title: "End Term Exam",
      date: "Aug 19-23, 2024",
      description: "End term examination for May 2024 term",
      term: "2024-may",
      type: "exam"
    },
    {
      id: "may-2024-term-end",
      title: "Term End",
      date: "Aug 25, 2024",
      description: "Official end of May 2024 term",
      term: "2024-may",
      type: "term"
    },
    
    // September 2024 Term
    {
      id: "sept-2024-registration",
      title: "Term Registration",
      date: "Aug 12-30, 2024",
      description: "Registration period for September 2024 term",
      term: "2024-sept",
      type: "registration"
    },
    {
      id: "sept-2024-term-start",
      title: "Term Start",
      date: "Sep 2, 2024",
      description: "Official start of September 2024 term",
      term: "2024-sept",
      type: "term"
    },
    {
      id: "sept-2024-quiz1",
      title: "Quiz 1",
      date: "Oct 7-9, 2024",
      description: "First quiz for September 2024 term",
      term: "2024-sept",
      type: "exam"
    },
    {
      id: "sept-2024-quiz2",
      title: "Quiz 2",
      date: "Nov 11-13, 2024",
      description: "Second quiz for September 2024 term",
      term: "2024-sept",
      type: "exam"
    },
    {
      id: "sept-2024-end-term",
      title: "End Term Exam",
      date: "Dec 16-20, 2024",
      description: "End term examination for September 2024 term",
      term: "2024-sept",
      type: "exam"
    },
    {
      id: "sept-2024-term-end",
      title: "Term End",
      date: "Dec 22, 2024",
      description: "Official end of September 2024 term",
      term: "2024-sept",
      type: "term"
    },
    
    // January 2025 Term
    {
      id: "jan-2025-registration",
      title: "Term Registration",
      date: "Dec 9-27, 2024",
      description: "Registration period for January 2025 term",
      term: "2025-jan",
      type: "registration"
    },
    {
      id: "jan-2025-term-start",
      title: "Term Start",
      date: "Jan 6, 2025",
      description: "Official start of January 2025 term",
      term: "2025-jan",
      type: "term"
    },
    {
      id: "jan-2025-quiz1",
      title: "Quiz 1",
      date: "Feb 10-12, 2025",
      description: "First quiz for January 2025 term",
      term: "2025-jan",
      type: "exam"
    },
    {
      id: "jan-2025-quiz2",
      title: "Quiz 2",
      date: "Mar 17-19, 2025",
      description: "Second quiz for January 2025 term",
      term: "2025-jan",
      type: "exam"
    },
    {
      id: "jan-2025-end-term",
      title: "End Term Exam",
      date: "Apr 21-25, 2025",
      description: "End term examination for January 2025 term",
      term: "2025-jan",
      type: "exam"
    },
    {
      id: "jan-2025-term-end",
      title: "Term End",
      date: "Apr 27, 2025",
      description: "Official end of January 2025 term",
      term: "2025-jan",
      type: "term"
    }
  ];
  
  const filteredEvents = dateEvents.filter(event => event.term === activeTerm);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case "registration": return "bg-blue-100 text-blue-700";
      case "exam": return "bg-red-100 text-red-700";
      case "term": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center">
          <Calendar className="h-6 w-6 mr-2 text-royal" />
          Important Dates & Deadlines
        </h2>
        
        <Tabs value={activeTerm} onValueChange={setActiveTerm} className="w-full">
          <TabsList className="w-full max-w-lg grid grid-cols-3 mb-6">
            {terms.map(term => (
              <TabsTrigger key={term.id} value={term.id}>{term.label}</TabsTrigger>
            ))}
          </TabsList>
          
          {terms.map(term => (
            <TabsContent key={term.id} value={term.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEvents.map(event => (
                  <Card key={event.id} className="border-none shadow-md hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <Badge variant="outline" className={getTypeColor(event.type)}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                      </div>
                      <CardDescription>{event.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
                        <span className="font-medium">{event.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {filteredEvents.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No events found for this term.
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ImportantDatesTab;
