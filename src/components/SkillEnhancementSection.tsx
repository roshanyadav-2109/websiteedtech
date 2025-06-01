
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Sparkles, Zap } from 'lucide-react';

const SkillEnhancementSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Skill Enhancement Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced skill development programs designed to accelerate your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Programming Skills */}
          <Card className="relative overflow-hidden border-none shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
              COMING SOON
            </div>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Programming Skills</CardTitle>
              <CardDescription className="text-gray-600">
                Master Python, Java, C++ and data structures with hands-on projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  12-week intensive program
                </div>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Industry-relevant curriculum
                </div>
              </div>
              <Button 
                disabled 
                className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Notify Me When Available
              </Button>
            </CardContent>
          </Card>

          {/* Research Methods */}
          <Card className="relative overflow-hidden border-none shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
              COMING SOON
            </div>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Research Methods</CardTitle>
              <CardDescription className="text-gray-600">
                Learn scientific research methodologies and academic writing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  8-week comprehensive course
                </div>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Publication-ready skills
                </div>
              </div>
              <Button 
                disabled 
                className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Notify Me When Available
              </Button>
            </CardContent>
          </Card>

          {/* Industry Preparation */}
          <Card className="relative overflow-hidden border-none shadow-lg bg-white hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-amber-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
              COMING SOON
            </div>
            <CardHeader className="pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl">Industry Preparation</CardTitle>
              <CardDescription className="text-gray-600">
                Professional development and career readiness programs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  10-week career program
                </div>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Industry mentorship
                </div>
              </div>
              <Button 
                disabled 
                className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
              >
                Notify Me When Available
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-royal to-royal-dark text-white border-none">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Be the First to Know!</h3>
              <p className="text-lg mb-6 opacity-90">
                Join our waitlist to get early access to these exciting skill enhancement programs
              </p>
              <Button 
                size="lg" 
                className="bg-white text-royal hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Join Waitlist
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SkillEnhancementSection;
