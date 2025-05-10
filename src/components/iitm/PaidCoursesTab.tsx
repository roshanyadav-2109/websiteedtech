
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice?: number;
  features: string[];
  duration: string;
  students: number;
  level: string;
  branch: string;
  bestseller: boolean;
}

const PaidCoursesTab = () => {
  const [branch, setBranch] = useState("all");
  const [level, setLevel] = useState("all");
  
  const courses: Course[] = [
    {
      id: "course-ds-python",
      title: "Python Programming Mastery",
      description: "Comprehensive Python course tailored for Data Science applications",
      price: 4999,
      discountedPrice: 2999,
      features: [
        "50+ hours of video content",
        "100+ practice problems",
        "10 real-world projects",
        "Certificate of completion",
        "Lifetime access"
      ],
      duration: "10 weeks",
      students: 1547,
      level: "foundation",
      branch: "data-science",
      bestseller: true
    },
    {
      id: "course-ds-ml",
      title: "Machine Learning Foundations",
      description: "Master machine learning algorithms and implementations",
      price: 5999,
      discountedPrice: 4499,
      features: [
        "40+ hours of video content",
        "Hands-on ML projects",
        "Model deployment tutorials",
        "Interview preparation",
        "1:1 doubt sessions"
      ],
      duration: "12 weeks",
      students: 1235,
      level: "diploma",
      branch: "data-science",
      bestseller: true
    },
    {
      id: "course-ds-dl",
      title: "Deep Learning Specialization",
      description: "Neural networks, CNNs, RNNs, and advanced architectures",
      price: 7999,
      features: [
        "60+ hours of video content",
        "GPU-enabled notebooks",
        "Research paper implementations",
        "Industry expert sessions",
        "Capstone project"
      ],
      duration: "16 weeks",
      students: 876,
      level: "degree",
      branch: "data-science",
      bestseller: false
    },
    {
      id: "course-es-circuits",
      title: "Circuit Analysis Fundamentals",
      description: "Master the basics of electrical circuits and analysis techniques",
      price: 3999,
      discountedPrice: 2499,
      features: [
        "30+ hours of video content",
        "Circuit simulation labs",
        "Problem-solving sessions",
        "Quizzes and assessments",
        "Discussion forums"
      ],
      duration: "8 weeks",
      students: 923,
      level: "foundation",
      branch: "electronic-systems",
      bestseller: true
    },
    {
      id: "course-es-digital",
      title: "Digital Electronics Design",
      description: "Learn digital circuit design and implementation techniques",
      price: 4999,
      features: [
        "35+ hours of video content",
        "FPGA programming labs",
        "HDL coding tutorials",
        "Digital system projects",
        "Hardware simulation"
      ],
      duration: "10 weeks",
      students: 712,
      level: "diploma",
      branch: "electronic-systems",
      bestseller: false
    },
    {
      id: "course-es-vlsi",
      title: "VLSI Design and Verification",
      description: "Advanced course on VLSI chip design and verification",
      price: 8999,
      discountedPrice: 6999,
      features: [
        "50+ hours of video content",
        "Industry-standard EDA tools",
        "Layout and verification techniques",
        "Tapeout preparation",
        "Advanced testing methods"
      ],
      duration: "14 weeks",
      students: 584,
      level: "degree",
      branch: "electronic-systems",
      bestseller: false
    }
  ];
  
  const filteredCourses = courses.filter(course => 
    (branch === "all" || course.branch === branch) &&
    (level === "all" || course.level === level)
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="mb-4 sm:mb-0 flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Branch</label>
          <Tabs value={branch} onValueChange={setBranch} className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="data-science">Data Science</TabsTrigger>
              <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Level</label>
          <Tabs value={level} onValueChange={setLevel} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="foundation">Foundation</TabsTrigger>
              <TabsTrigger value="diploma">Diploma</TabsTrigger>
              <TabsTrigger value="degree">Degree</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader className="pb-2 relative">
              {course.bestseller && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <Badge className="bg-yellow-400 text-yellow-900 font-medium">Bestseller</Badge>
                </div>
              )}
              <div className="flex justify-between items-start">
                <div>
                  <Badge className={`
                    ${course.branch === 'data-science' ? 'bg-blue-100 text-blue-800' : ''}
                    ${course.branch === 'electronic-systems' ? 'bg-purple-100 text-purple-800' : ''}
                  `}>
                    {course.branch === 'data-science' ? 'Data Science' : 'Electronic Systems'}
                  </Badge>
                  <Badge className="ml-2 bg-gray-100 text-gray-800">
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)} Level
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-xl mt-2">{course.title}</CardTitle>
              <CardDescription className="text-base">{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-500">Course Features:</h4>
                  <ul className="space-y-1">
                    {course.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <div className="flex items-center justify-between w-full mb-4">
                {course.discountedPrice ? (
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-royal">₹{course.discountedPrice}</span>
                    <span className="text-base text-gray-500 line-through ml-2">₹{course.price}</span>
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      {Math.round((1 - course.discountedPrice / course.price) * 100)}% OFF
                    </Badge>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-royal">₹{course.price}</span>
                )}
              </div>
              <Button className="w-full bg-royal hover:bg-royal-dark text-white">
                Enroll Now
              </Button>
            </CardFooter>
          </Card>
        ))}
        
        {filteredCourses.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No courses available for the selected filters. Please try a different combination.
          </div>
        )}
      </div>
    </div>
  );
};

export default PaidCoursesTab;
