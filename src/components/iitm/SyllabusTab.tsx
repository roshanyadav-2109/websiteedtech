
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BookOpen, GraduationCap, Book } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const SyllabusTab = () => {
  const [branch, setBranch] = useState("data-science");
  const [downloads, setDownloads] = useState({
    "ds-syllabus": 482,
    "es-syllabus": 315,
  });
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    // Actual download logic would go here
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={branch} onValueChange={setBranch} className="w-full">
        <TabsList className="mb-6 w-full grid grid-cols-2">
          <TabsTrigger value="data-science">Data Science</TabsTrigger>
          <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-science">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-royal" />
                <div>
                  <CardTitle>Data Science Curriculum</CardTitle>
                  <CardDescription>BS Degree in Data Science and Applications</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="foundation">
                    <AccordionTrigger className="text-lg font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <GraduationCap className="h-5 w-5 text-royal" />
                        </div>
                        Foundation Level
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-4 pt-4">
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Mathematics for Data Science</h4>
                        <p className="text-sm text-gray-600 mt-1">Linear algebra, calculus, and probability concepts</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Statistics for Data Science</h4>
                        <p className="text-sm text-gray-600 mt-1">Statistical inference, hypothesis testing, and regression</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Programming and Data Structures</h4>
                        <p className="text-sm text-gray-600 mt-1">Python programming and basic data structures</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Computational Thinking</h4>
                        <p className="text-sm text-gray-600 mt-1">Problem-solving approaches and algorithms</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="diploma">
                    <AccordionTrigger className="text-lg font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <GraduationCap className="h-5 w-5 text-royal" />
                        </div>
                        Diploma Level
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-4 pt-4">
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Machine Learning Foundations</h4>
                        <p className="text-sm text-gray-600 mt-1">Supervised and unsupervised learning algorithms</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Data Visualization and Analytics</h4>
                        <p className="text-sm text-gray-600 mt-1">Techniques for effective data presentation</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Database Systems</h4>
                        <p className="text-sm text-gray-600 mt-1">SQL, NoSQL, and database management</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800">Elective</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="degree">
                    <AccordionTrigger className="text-lg font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <GraduationCap className="h-5 w-5 text-royal" />
                        </div>
                        Degree Level
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-4 pt-4">
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Deep Learning</h4>
                        <p className="text-sm text-gray-600 mt-1">Neural networks and advanced ML techniques</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Natural Language Processing</h4>
                        <p className="text-sm text-gray-600 mt-1">Text analysis and language models</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800">Elective</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Capstone Project</h4>
                        <p className="text-sm text-gray-600 mt-1">Industry-relevant project implementation</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">8 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between bg-gray-50 border-t">
              <Button 
                onClick={() => handleDownload("ds-syllabus")}
                className="bg-royal hover:bg-royal-dark text-white"
              >
                <Download className="h-4 w-4 mr-2" /> Download Full Curriculum
              </Button>
              <span className="text-sm text-gray-500">{downloads["ds-syllabus"]} downloads</span>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="electronic-systems">
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gray-50 border-b">
              <div className="flex items-center">
                <Book className="h-6 w-6 mr-2 text-royal" />
                <div>
                  <CardTitle>Electronic Systems Curriculum</CardTitle>
                  <CardDescription>BS Degree in Electronic Systems</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="foundation">
                    <AccordionTrigger className="text-lg font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <GraduationCap className="h-5 w-5 text-royal" />
                        </div>
                        Foundation Level
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-4 pt-4">
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Basic Electrical Engineering</h4>
                        <p className="text-sm text-gray-600 mt-1">Fundamentals of electrical circuits and systems</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Digital System Design</h4>
                        <p className="text-sm text-gray-600 mt-1">Boolean algebra and digital circuits</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Engineering Mathematics</h4>
                        <p className="text-sm text-gray-600 mt-1">Mathematics relevant to electronic engineering</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="diploma">
                    <AccordionTrigger className="text-lg font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <GraduationCap className="h-5 w-5 text-royal" />
                        </div>
                        Diploma Level
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-4 pt-4">
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Analog Electronics</h4>
                        <p className="text-sm text-gray-600 mt-1">Operational amplifiers and analog circuits</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Signals and Systems</h4>
                        <p className="text-sm text-gray-600 mt-1">Signal processing fundamentals</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Microprocessors and Microcontrollers</h4>
                        <p className="text-sm text-gray-600 mt-1">Architecture and programming of embedded systems</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800">Elective</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="degree">
                    <AccordionTrigger className="text-lg font-medium">
                      <div className="flex items-center">
                        <div className="rounded-full bg-royal/10 p-2 mr-2">
                          <GraduationCap className="h-5 w-5 text-royal" />
                        </div>
                        Degree Level
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pl-4 pt-4">
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">VLSI Design</h4>
                        <p className="text-sm text-gray-600 mt-1">Very Large Scale Integration circuit design</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Embedded Systems</h4>
                        <p className="text-sm text-gray-600 mt-1">Advanced embedded systems design</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">4 credits</Badge>
                          <Badge variant="outline" className="bg-green-100 text-green-800">Elective</Badge>
                        </div>
                      </div>
                      
                      <div className="border-l-2 border-royal pl-4 pb-4">
                        <h4 className="text-md font-semibold">Capstone Project</h4>
                        <p className="text-sm text-gray-600 mt-1">Industry-relevant project implementation</p>
                        <div className="flex mt-2 space-x-2">
                          <Badge variant="outline" className="bg-gray-100">8 credits</Badge>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Core</Badge>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between bg-gray-50 border-t">
              <Button 
                onClick={() => handleDownload("es-syllabus")}
                className="bg-royal hover:bg-royal-dark text-white"
              >
                <Download className="h-4 w-4 mr-2" /> Download Full Curriculum
              </Button>
              <span className="text-sm text-gray-500">{downloads["es-syllabus"]} downloads</span>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SyllabusTab;
