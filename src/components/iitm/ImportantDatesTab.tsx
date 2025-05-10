
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Bell } from "lucide-react";

interface DateEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  upcoming: boolean;
}

const ImportantDatesTab = () => {
  const [downloads, setDownloads] = React.useState({
    "calendar-ics": 356,
  });
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    // Actual download logic would go here
  };
  
  const [events] = React.useState<DateEvent[]>([
    {
      id: "jan-2025-app",
      title: "January 2025 Cohort Application Window Opens",
      description: "Applications open for the January 2025 intake",
      date: "2024-09-15",
      category: "admissions",
      upcoming: false
    },
    {
      id: "jan-2025-app-close",
      title: "January 2025 Cohort Application Deadline",
      description: "Last date to submit applications for January 2025 intake",
      date: "2024-11-30",
      category: "admissions",
      upcoming: false
    },
    {
      id: "jan-2025-qual-exam",
      title: "January 2025 Qualifier Exam",
      description: "Online qualifier examination for all applicants",
      date: "2024-12-15",
      category: "exam",
      upcoming: false
    },
    {
      id: "jan-2025-start",
      title: "January 2025 Term Start",
      description: "Classes begin for the January 2025 cohort",
      date: "2025-01-20",
      category: "term",
      upcoming: false
    },
    {
      id: "jul-2025-app",
      title: "July 2025 Cohort Application Window Opens",
      description: "Applications open for the July 2025 intake",
      date: "2025-03-01",
      category: "admissions",
      upcoming: true
    },
    {
      id: "jul-2025-app-close",
      title: "July 2025 Cohort Application Deadline",
      description: "Last date to submit applications for July 2025 intake",
      date: "2025-05-15",
      category: "admissions",
      upcoming: true
    },
    {
      id: "jul-2025-qual-exam",
      title: "July 2025 Qualifier Exam",
      description: "Online qualifier examination for all applicants",
      date: "2025-06-01",
      category: "exam",
      upcoming: true
    },
    {
      id: "jul-2025-start",
      title: "July 2025 Term Start",
      description: "Classes begin for the July 2025 cohort",
      date: "2025-07-20",
      category: "term",
      upcoming: true
    },
    {
      id: "quiz1-deadline",
      title: "Quiz 1 Deadline",
      description: "Last date to complete Quiz 1 for all courses",
      date: "2025-03-15",
      category: "assessment",
      upcoming: true
    },
    {
      id: "assignment-deadline",
      title: "Assignments Submission Deadline",
      description: "Final date to submit all pending assignments",
      date: "2025-04-30",
      category: "assessment",
      upcoming: true
    },
    {
      id: "endterm-exam",
      title: "End Term Examinations",
      description: "Final examinations for all courses",
      date: "2025-05-01",
      category: "exam",
      upcoming: true
    },
    {
      id: "result-declaration",
      title: "Results Declaration",
      description: "Publication of results for the term",
      date: "2025-06-15",
      category: "results",
      upcoming: true
    }
  ]);
  
  // Sort events by date
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Group events by month and year
  const groupedEvents: Record<string, DateEvent[]> = {};
  sortedEvents.forEach(event => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    
    if (!groupedEvents[monthYear]) {
      groupedEvents[monthYear] = [];
    }
    
    groupedEvents[monthYear].push(event);
  });

  return (
    <div className="space-y-6">
      <div className="bg-royal/5 p-6 rounded-lg border border-royal/20">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-royal mr-2" />
          <h3 className="text-lg font-medium text-royal">Upcoming Important Dates</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedEvents.filter(event => event.upcoming).slice(0, 4).map((event) => (
            <Card key={event.id} className="bg-white border-none shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge className={`
                    ${event.category === 'admissions' ? 'bg-blue-100 text-blue-800' : ''}
                    ${event.category === 'exam' ? 'bg-red-100 text-red-800' : ''}
                    ${event.category === 'term' ? 'bg-green-100 text-green-800' : ''}
                    ${event.category === 'assessment' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${event.category === 'results' ? 'bg-purple-100 text-purple-800' : ''}
                  `}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                  <div className="flex items-center font-medium">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    {new Date(event.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
                <CardTitle className="text-md mt-1">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <Button variant="outline" className="text-royal border-royal hover:bg-royal hover:text-white">
            Add to Calendar
          </Button>
        </div>
      </div>
      
      <div className="space-y-8">
        {Object.entries(groupedEvents).map(([monthYear, events]) => (
          <div key={monthYear} className="space-y-4">
            <h3 className="text-xl font-bold border-b pb-2">{monthYear}</h3>
            
            <div className="space-y-3">
              {events.map((event) => (
                <div key={event.id} className="flex flex-col sm:flex-row gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex-shrink-0 sm:w-32 font-medium">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short'
                    })}
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-md font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <div className="sm:self-center mt-2 sm:mt-0">
                    <Badge className={`
                      ${event.category === 'admissions' ? 'bg-blue-100 text-blue-800' : ''}
                      ${event.category === 'exam' ? 'bg-red-100 text-red-800' : ''}
                      ${event.category === 'term' ? 'bg-green-100 text-green-800' : ''}
                      ${event.category === 'assessment' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${event.category === 'results' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <Button 
          onClick={() => handleDownload("calendar-ics")}
          className="bg-royal hover:bg-royal-dark text-white"
        >
          <Download className="h-4 w-4 mr-2" /> Download Academic Calendar
        </Button>
        <p className="text-sm text-gray-500 mt-2">{downloads["calendar-ics"]} downloads</p>
      </div>
    </div>
  );
};

export default ImportantDatesTab;
