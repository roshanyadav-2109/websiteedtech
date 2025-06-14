import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, FileText, HelpCircle, Info } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const InternVerification = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [verificationResult, setVerificationResult] = useState<null | { verified: boolean, message: string, details?: any }>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useIsMobile();

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
      let status = "";
      if (data.is_active) {
        status = "Active";
      } else if (!data.is_active && data.end_date) {
        status = "Inactive";
      } else {
        status = "Inactive";
      }
      setVerificationResult({
        verified: true,
        message: status === "Active" 
          ? "Employee record found. The employee is currently ACTIVE." 
          : `Employee record found. The employee was ACTIVE till ${data.end_date ? new Date(data.end_date).toLocaleDateString() : "N/A"}.`,
        details: {
          name: data.full_name,
          employeeId: data.employee_code,
          position: data.position,
          status,
          endDate: data.end_date ? new Date(data.end_date).toLocaleDateString() : "N/A"
        }
      });
      toast({
        title: "Verification Successful",
        description: "Record matched in employee database.",
        variant: "default",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Intern Verification Portal</h1>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto">
              Verify your employment history at Unknown IITians
            </p>
          </div>
        </section>

        {/* Verification Form */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-none shadow-premium overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-royal/5 to-royal/10 pb-6">
                <CardTitle className="text-2xl text-center flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5" />
                  Verify Employment Status
                </CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to verify your employment history
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
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
                  <div className={`mt-8 p-4 sm:p-6 rounded-lg ${
                    verificationResult.verified 
                      ? 'bg-green-50 border border-green-100' 
                      : 'bg-red-50 border border-red-100'
                  }`}>
                    <div className="flex items-center mb-4">
                      {verificationResult.verified ? (
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 mr-2" />
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
                        <div className="bg-white rounded-md p-4 border border-gray-200 overflow-x-auto">
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
                                <td className="py-2 pr-4 font-medium text-gray-700">Status:</td>
                                <td className="py-2">
                                  {verificationResult.details.status === "Active" ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                      Active
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                                      Inactive
                                    </span>
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="py-2 pr-4 font-medium text-gray-700">End Date:</td>
                                <td className="py-2">{verificationResult.details.endDate}</td>
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

        {/* FAQ Section */}
        <section className="py-10 sm:py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold flex items-center justify-center gap-2 mb-4">
                <HelpCircle className="h-6 w-6 text-royal" />
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about the intern verification portal
              </p>
            </div>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      What is the Intern Verification Portal?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      A secure platform to verify roles and identities at Unknown IITians.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      How secure is the Intern Verification Portal?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Highly secure; only authorized personnel can access records.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      How can I become an employee at Unknown IITians?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Fill out the form: <a href="https://docs.google.com/forms/d/e/1FAIpQLSfG0--xi-qdseHlJWihF_d_BV4ic67L-uon0YgWh5avNmtwqg/viewform" target="_blank" rel="noopener noreferrer" className="text-royal hover:underline font-medium">Apply Here</a>.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      Who can verify intern records on the portal?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Only authorized employees and designated individuals.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      What information is available on the portal?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Intern roles, verification status, and related details.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      How do I verify my role as an intern or employee?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Log in to the portal to view and verify your role.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-royal hover:text-royal-dark font-medium">
                      What if I encounter issues with the portal?
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Contact support at <a href="mailto:help.unknowniitians@gmail.com" className="text-royal hover:underline font-medium">help.unknowniitians@gmail.com</a>.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Additional Information */}
        <section className="py-10 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-royal/5 rounded-lg p-6 border border-royal/10">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <Info className="h-6 w-6 text-royal" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-royal mb-2">Need Additional Help?</h3>
                  <p className="text-gray-600 mb-4">
                    If you need further assistance with verification or have any other questions about your employment status, please don't hesitate to reach out to our HR department.
                  </p>
                  <Button variant="outline" className="border-royal text-royal hover:bg-royal hover:text-white">
                    Contact HR Support
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default InternVerification;
