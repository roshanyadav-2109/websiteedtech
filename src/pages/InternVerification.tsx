
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const InternVerification = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Verification request sent",
      description: "We'll process your verification request and get back to you shortly.",
    });
  };
  
  return (
    <>
      <NavBar />
      
      <div className="pt-20 pb-16 min-h-screen">
        <div className="bg-gradient-to-r from-royal to-royal-dark text-white py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Intern Verification</h1>
            <p className="text-xl">
              Verify your internship status with Unknown IITians to showcase your experience.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
          <Card className="border shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Intern Verification Portal</h2>
                  <p className="text-gray-600 mt-2">
                    Please fill in the details below to verify your internship with us.
                  </p>
                </div>

                <Separator />

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="internshipID">Internship ID</Label>
                      <Input id="internshipID" required />
                      <p className="text-sm text-gray-500">
                        Please provide the unique ID that was assigned to you during your internship.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input id="startDate" type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input id="endDate" type="date" required />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input id="department" required />
                      <p className="text-sm text-gray-500">
                        The department or team you worked with during your internship.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="supervisor">Supervisor Name</Label>
                      <Input id="supervisor" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">
                        Description of Internship Responsibilities
                      </Label>
                      <textarea
                        id="description"
                        className="w-full min-h-[120px] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-royal focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full py-6 text-lg">
                      Submit Verification Request
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-2">Verification Process</h3>
            <p className="text-gray-600">
              We'll review your information and verify your internship status within 3-5 business days.
              Once verified, a digital certificate will be issued to your email address.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default InternVerification;
