
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle, XCircle, User, Briefcase, Calendar } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Intern {
  id: string;
  employee_code: string;
  full_name: string;
  position: string;
  is_active: boolean;
  end_date?: string;
}

const InternVerification = () => {
  const [internCode, setInternCode] = useState("");
  const [internName, setInternName] = useState("");
  const [intern, setIntern] = useState<Intern | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!internCode.trim() || !internName.trim()) return;

    setIsSearching(true);
    setNotFound(false);
    setIntern(null);

    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_code', internCode.trim())
        .ilike('full_name', `%${internName.trim()}%`)
        .ilike('position', '%intern%')
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIntern(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error verifying intern:', error);
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  const resetForm = () => {
    setInternCode("");
    setInternName("");
    setIntern(null);
    setNotFound(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-600 text-white p-3 rounded-full">
                <User className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Intern Verification</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verify internship status and details of Unknown IITians interns
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verification Form */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Intern Verification Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleVerification} className="space-y-6">
                  <div>
                    <Label htmlFor="internCode">Intern ID/Code *</Label>
                    <Input
                      id="internCode"
                      value={internCode}
                      onChange={(e) => setInternCode(e.target.value)}
                      placeholder="Enter intern ID"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="internName">Intern Name *</Label>
                    <Input
                      id="internName"
                      value={internName}
                      onChange={(e) => setInternName(e.target.value)}
                      placeholder="Enter full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      disabled={isSearching}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {isSearching ? "Verifying..." : "Verify Intern"}
                    </Button>
                    <Button 
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                      className="px-6"
                    >
                      Reset
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="space-y-6">
              {intern && (
                <Card className="shadow-xl border-green-200">
                  <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardTitle className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verification Successful
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Status:</span>
                      <Badge className={intern.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {intern.is_active ? "Active Intern" : "Completed"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{intern.full_name}</span>
                      </div>

                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium">Position:</span>
                        <span className="ml-2">{intern.position}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="font-medium">Intern ID:</span>
                        <span className="ml-2 font-mono">{intern.employee_code}</span>
                      </div>

                      {intern.end_date && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium">End Date:</span>
                          <span className="ml-2">{new Date(intern.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {notFound && (
                <Card className="shadow-xl border-red-200">
                  <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
                    <CardTitle className="flex items-center">
                      <XCircle className="w-5 h-5 mr-2" />
                      Verification Failed
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-gray-600">
                      No intern found with the provided Intern ID and Name combination. 
                      Please verify the details and try again.
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Information Card */}
              <Card className="shadow-xl">
                <CardHeader className="bg-gray-50">
                  <CardTitle className="text-gray-800">Verification Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Enter the exact Intern ID/Code provided by Unknown IITians</p>
                    <p>• Intern name should match our records</p>
                    <p>• Verification results show current internship status</p>
                    <p>• For queries, contact our HR department</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Link to Career Page */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Looking for Internship Opportunities?
                </h3>
                <p className="text-gray-600 mb-4">
                  Check out our career page for current internship openings and opportunities.
                </p>
                <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
                  <a href="/career">View Career Opportunities</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InternVerification;
