
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

const EmployeeVerification = () => {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [verificationResult, setVerificationResult] = useState<null | { verified: boolean, message: string, details?: any }>(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!employeeId || !name) {
      setVerificationResult({
        verified: false,
        message: "Please enter both employee ID and name."
      });
      toast({
        title: "Incomplete Information",
        description: "Please enter both employee ID and name.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      // Query employee by code and full name
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .eq("employee_code", employeeId)
        .eq("full_name", name)
        .maybeSingle();

      if (error) {
        setVerificationResult({
          verified: false,
          message: "Error occurred. Please try again later."
        });
        toast({ title: "Verification Error", description: error.message, variant: "destructive" });
      } else if (!data) {
        setVerificationResult({
          verified: false,
          message: "No records found for the provided ID and name combination."
        });
        toast({
          title: "Verification Failed",
          description: "We couldn't find a match for your credentials.",
          variant: "destructive",
        });
      } else {
        // Show current status and details
        let statusText = "";
        if (data.status === 'active') {
          statusText = "Active";
        } else if (data.status === 'completed') {
          statusText = "Completed";
        } else {
          statusText = "Terminated";
        }

        setVerificationResult({
          verified: true,
          message: data.status === 'active' 
            ? "Employee record found. The employee is currently ACTIVE." 
            : `Employee record found. The employee status is ${statusText.toUpperCase()}.`,
          details: {
            name: data.full_name,
            employeeId: data.employee_code,
            position: data.position,
            department: data.department,
            employeeType: data.employee_type,
            startDate: data.start_date ? new Date(data.start_date).toLocaleDateString() : "N/A",
            endDate: data.end_date ? new Date(data.end_date).toLocaleDateString() : "N/A",
            status: statusText,
            isActive: data.is_active
          }
        });
        toast({
          title: "Verification Successful",
          description: "Record matched in employee database.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationResult({
        verified: false,
        message: "An unexpected error occurred. Please try again."
      });
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Employee Verification Portal</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Verify the employment history of Unknown IITians staff members
            </p>
          </div>
        </section>

        {/* Verification Type Selection */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                className="bg-royal hover:bg-royal-dark text-white py-6 px-8 text-lg"
                onClick={() => {/* Current page */}}
              >
                Employee Verification
              </Button>
              <Button
                variant="outline"
                className="border-royal text-royal hover:bg-royal hover:text-white py-6 px-8 text-lg"
                onClick={() => navigate('/intern-verification')}
              >
                Intern Verification
              </Button>
            </div>
          </div>
        </section>

        {/* Verification Form */}
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-none shadow-premium overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-royal/5 to-royal/10 pb-6">
                <CardTitle className="text-2xl text-center">Verify Employment Status</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleVerify} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700">
                      Employee ID
                    </label>
                    <Input
                      id="employee-id"
                      placeholder="Enter Employee ID (e.g., UI12345)"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">Enter the ID in the format UI12345</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="employee-name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <Input
                      id="employee-name"
                      placeholder="Enter Full Name as in records"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500">Enter the full name exactly as provided in employment documents</p>
                  </div>
                  
                  <Button 
                    type="submit"
                    disabled={loading} 
                    className="w-full bg-royal hover:bg-royal-dark text-white py-2 h-12"
                  >
                    {loading ? "Verifying..." : "Verify Employee"}
                  </Button>
                </form>
                
                {verificationResult && (
                  <div className={`mt-8 p-6 rounded-lg ${
                    verificationResult.verified 
                      ? 'bg-green-50 border border-green-100' 
                      : 'bg-red-50 border border-red-100'
                  }`}>
                    <div className="flex items-center mb-4">
                      {verificationResult.verified ? (
                        <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600 mr-2" />
                      )}
                      <h3 className={`font-bold text-lg ${
                        verificationResult.verified ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {verificationResult.verified ? 'Verification Successful' : 'Verification Failed'}
                      </h3>
                    </div>
                    
                    <p className={`mb-4 ${
                      verificationResult.verified ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {verificationResult.message}
                    </p>
                    
                    {verificationResult.verified && verificationResult.details && (
                      <div className="mt-6 space-y-4">
                        <h4 className="font-semibold text-gray-900">Employment Details:</h4>
                        <div className="bg-white rounded-md p-4 border border-gray-200">
                          <table className="min-w-full">
                            <tbody className="divide-y divide-gray-200">
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Name:</td>
                                <td className="py-2">{verificationResult.details.name}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Employee ID:</td>
                                <td className="py-2">{verificationResult.details.employeeId}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Position:</td>
                                <td className="py-2">{verificationResult.details.position}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Department:</td>
                                <td className="py-2">{verificationResult.details.department}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Type:</td>
                                <td className="py-2 capitalize">{verificationResult.details.employeeType}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Start Date:</td>
                                <td className="py-2">{verificationResult.details.startDate}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">End Date:</td>
                                <td className="py-2">{verificationResult.details.endDate}</td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">Status:</td>
                                <td className="py-2">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    verificationResult.details.status === 'Active'
                                      ? 'bg-green-100 text-green-800'
                                      : verificationResult.details.status === 'Completed'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {verificationResult.details.status}
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 text-center">
                          <Button className="bg-royal hover:bg-royal-dark text-white">
                            Download Verification Certificate
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-8 text-center text-gray-600 text-sm">
                  <p>If you need further assistance, please contact:</p>
                  <p className="font-medium mt-1">hr@unknowniitians.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default EmployeeVerification;
