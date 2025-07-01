
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Search, CheckCircle, XCircle, User, Calendar, Building } from "lucide-react";

interface EmployeeData {
  id: string;
  employee_code: string;
  full_name: string;
  position: string;
  is_active: boolean;
  end_date?: string;
  created_at: string;
}

const EmploymentVerification = () => {
  const [verificationNumber, setVerificationNumber] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EmployeeData | null>(null);
  const [error, setError] = useState("");

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_code', verificationNumber.trim())
        .ilike('full_name', `%${employeeName.trim()}%`)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError("No employee found with the provided verification number and name.");
        } else {
          throw error;
        }
      } else {
        setResult(data);
      }
    } catch (error) {
      console.error('Error verifying employment:', error);
      setError("An error occurred while verifying employment status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <NavBar />
      <main className="pt-20 bg-slate-50 min-h-screen">
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16 shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Employment <span className="text-golden">Verification</span>
            </h1>
            <p className="text-lg text-gray-200 mb-2">
              Verify employment status with Unknown IITians using verification number and name
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="shadow-premium">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-royal">
                  <Search className="mr-3 h-6 w-6" />
                  Verify Employment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVerification} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="verification-number" className="text-sm font-medium">
                      Verification Number *
                    </Label>
                    <Input
                      id="verification-number"
                      type="text"
                      value={verificationNumber}
                      onChange={(e) => setVerificationNumber(e.target.value)}
                      placeholder="Enter verification number"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employee-name" className="text-sm font-medium">
                      Employee Name *
                    </Label>
                    <Input
                      id="employee-name"
                      type="text"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      placeholder="Enter employee name"
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-royal hover:bg-royal-dark text-white py-3"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Verify Employment
                      </>
                    )}
                  </Button>
                </form>

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center mb-4">
                      <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                      <h3 className="text-lg font-semibold text-green-800">Employment Verified</h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{result.full_name}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Building className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium">Position:</span>
                        <span className="ml-2">{result.position}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium">Employee ID:</span>
                        <span className="ml-2">{result.employee_code}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="font-medium">Start Date:</span>
                        <span className="ml-2">{formatDate(result.created_at)}</span>
                      </div>
                      
                      {result.end_date && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="font-medium">End Date:</span>
                          <span className="ml-2">{formatDate(result.end_date)}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <span className="font-medium">Status:</span>
                        <Badge className={`ml-2 ${result.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {result.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="font-medium">Employment Activity:</span>
                        <span className="ml-2">
                          {result.is_active ? 'Currently Employed' : 'Previously Employed'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default EmploymentVerification;
