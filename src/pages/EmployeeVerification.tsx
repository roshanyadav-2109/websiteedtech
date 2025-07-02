
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

interface Employee {
  id: string;
  employee_code: string;
  full_name: string;
  position: string;
  is_active: boolean;
  end_date?: string;
}

const EmployeeVerification = () => {
  const [employeeCode, setEmployeeCode] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeCode.trim() || !employeeName.trim()) return;

    setIsSearching(true);
    setNotFound(false);
    setEmployee(null);

    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_code', employeeCode.trim())
        .ilike('full_name', `%${employeeName.trim()}%`)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setEmployee(data);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error verifying employee:', error);
      setNotFound(true);
    } finally {
      setIsSearching(false);
    }
  };

  const resetForm = () => {
    setEmployeeCode("");
    setEmployeeName("");
    setEmployee(null);
    setNotFound(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-royal text-white p-3 rounded-full">
                <User className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Employee Verification</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verify employment status and details of Unknown IITians team members
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Verification Form */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-royal to-royal-dark text-white">
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  Employee Verification Form
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleVerification} className="space-y-6">
                  <div>
                    <Label htmlFor="employeeCode">Employee ID/Code *</Label>
                    <Input
                      id="employeeCode"
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                      placeholder="Enter employee ID"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="employeeName">Employee Name *</Label>
                    <Input
                      id="employeeName"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      placeholder="Enter full name"
                      required
                      className="mt-1"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <Button 
                      type="submit" 
                      disabled={isSearching}
                      className="flex-1 bg-royal hover:bg-royal-dark text-white"
                    >
                      <Search className="w-4 h-4 mr-2" />
                      {isSearching ? "Verifying..." : "Verify Employee"}
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
              {employee && (
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
                      <Badge className={employee.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {employee.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium">Name:</span>
                        <span className="ml-2">{employee.full_name}</span>
                      </div>

                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                        <span className="font-medium">Position:</span>
                        <span className="ml-2">{employee.position}</span>
                      </div>

                      <div className="flex items-center">
                        <span className="font-medium">Employee ID:</span>
                        <span className="ml-2 font-mono">{employee.employee_code}</span>
                      </div>

                      {employee.end_date && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                          <span className="font-medium">End Date:</span>
                          <span className="ml-2">{new Date(employee.end_date).toLocaleDateString()}</span>
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
                      No employee found with the provided Employee ID and Name combination. 
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
                    <p>• Enter the exact Employee ID/Code provided by Unknown IITians</p>
                    <p>• Employee name should match our records</p>
                    <p>• Verification results show current employment status</p>
                    <p>• For queries, contact our HR department</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeVerification;
