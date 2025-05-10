
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  branch: string;
  level: string;
  price: number;
  enrollments: number;
  duration: string;
  isPremium: boolean;
  features: string[];
}

const PaidCoursesTab = () => {
  const [branch, setBranch] = useState("all");
  const [level, setLevel] = useState("all");
  
  const courses: Course[] = [
    {
      id: "ds-python-mastery",
      title: "Python Mastery for Data Science",
      description: "Comprehensive course covering Python programming for data science applications",
      branch: "data-science",
      level: "foundation",
      price: 2999,
      enrollments: 1256,
      duration: "6 weeks",
      isPremium: true,
      features: ["24/7 Mentor Support", "Capstone Project", "Industry Certification"]
    },
    {
      id: "ds-ml-specialization",
      title: "Machine Learning Specialization",
      description: "Advanced course covering machine learning algorithms and their applications",
      branch: "data-science",
      level: "diploma",
      price: 4999,
      enrollments: 857,
      duration: "10 weeks",
      isPremium: true,
      features: ["1-on-1 Mentoring", "Real-world Projects", "Job Placement Assistance"]
    },
    {
      id: "ds-stats-bootcamp",
      title: "Statistics Bootcamp",
      description: "Intensive course on statistics for data science",
      branch: "data-science",
      level: "foundation",
      price: 1999,
      enrollments: 952,
      duration: "4 weeks",
      isPremium: false,
      features: ["Practice Problems", "Weekly Assignments"]
    },
    {
      id: "es-circuit-design",
      title: "Advanced Circuit Design",
      description: "In-depth course on circuit design principles and applications",
      branch: "electronic-systems",
      level: "diploma",
      price: 3999,
      enrollments: 512,
      duration: "8 weeks",
      isPremium: true,
      features: ["Circuit Simulation Tools", "Hardware Kit", "Live Sessions"]
    },
    {
      id: "es-digital-electronics",
      title: "Digital Electronics Masterclass",
      description: "Complete guide to digital electronics and design",
      branch: "electronic-systems",
      level: "foundation",
      price: 2499,
      enrollments: 689,
      duration: "6 weeks",
      isPremium: false,
      features: ["Weekly Assignments", "Discussion Forum"]
    },
    {
      id: "ds-deep-learning",
      title: "Deep Learning Specialization",
      description: "Comprehensive course on neural networks and deep learning",
      branch: "data-science",
      level: "degree",
      price: 5999,
      enrollments: 423,
      duration: "12 weeks",
      isPremium: true,
      features: ["GPU Access", "Industry Projects", "Expert Reviews"]
    },
    {
      id: "ds-math-for-ml",
      title: "Mathematics for Machine Learning",
      description: "Essential mathematics concepts for machine learning applications",
      branch: "data-science",
      level: "foundation",
      price: 1799,
      enrollments: 1089,
      duration: "5 weeks",
      isPremium: false,
      features: ["Interactive Exercises", "Quizzes"]
    },
    {
      id: "es-embedded-systems",
      title: "Embedded Systems Design",
      description: "Design and implementation of embedded systems",
      branch: "electronic-systems",
      level: "degree",
      price: 4499,
      enrollments: 378,
      duration: "10 weeks",
      isPremium: true,
      features: ["Hardware Kit", "Project-based", "Industry Certification"]
    }
  ];
  
  const filteredCourses = courses.filter(course => {
    const branchMatch = branch === "all" || course.branch === branch;
    const levelMatch = level === "all" || course.level === level;
    return branchMatch && levelMatch;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Select value={branch} onValueChange={setBranch}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              <SelectItem value="data-science">Data Science</SelectItem>
              <SelectItem value="electronic-systems">Electronic Systems</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="qualifier">Qualifier</SelectItem>
              <SelectItem value="foundation">Foundation</SelectItem>
              <SelectItem value="diploma">Diploma</SelectItem>
              <SelectItem value="degree">Degree</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card 
            key={course.id} 
            className={`border-none shadow-md hover:shadow-xl transition-all ${course.isPremium ? 'bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300' : ''}`}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl">
                  {course.title}
                  {course.isPremium && (
                    <Badge className="ml-2 bg-amber-500 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" /> Premium
                    </Badge>
                  )}
                </CardTitle>
                <Badge variant="outline" className={`${course.level === 'foundation' ? 'bg-blue-100 text-blue-700' : course.level === 'diploma' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                  {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                </Badge>
              </div>
              <CardDescription className="text-base">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{course.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Enrolled</p>
                  <p className="font-medium">{course.enrollments}+ students</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Key Features:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {course.features.map((feature, index) => (
                    <li key={index} className="text-sm">{feature}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center">
                <span className={`text-xl font-bold ${course.isPremium ? 'text-amber-600' : ''}`}>₹{course.price}</span>
              </div>
              <Button 
                className={course.isPremium ? 
                  "bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white" : 
                  "bg-royal hover:bg-royal-dark text-white"}
              >
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredCourses.length === 0 && (
          <div className="col-span-2 text-center py-8 text-gray-500">
            No courses found matching your criteria. Please try different filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidCoursesTab;
