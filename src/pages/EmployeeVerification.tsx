
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Clock, User, Briefcase, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

interface Employee {
  id: string;
  employee_code: string;
  full_name: string;
  position: string;
  is_active: boolean;
  end_date?: string;
  created_at: string;
}

const EmployeeVerification = () => {
  const [verificationNumber, setVerificationNumber] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const { toast } = useToast();

  const handleVerification = async () => {
    if (!verificationNumber.trim() || !employeeName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both verification number and employee name.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_code', verificationNumber.trim())
        .ilike('full_name', `%${employeeName.trim()}%`)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setEmployee(null);
        } else {
          throw error;
        }
      } else {
        setEmployee(data);
      }
    } catch (error) {
      console.error('Error verifying employee:', error);
      toast({
        title: "Verification Error",
        description: "An error occurred while verifying the employee. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setVerificationNumber('');
    setEmployeeName('');
    setEmployee(null);
    setSearched(false);
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-16">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Employee Verification
              </h1>
              <p className="text-lg text-gray-600">
                Verify employment status and position details
              </p>
            </div>

            {/* Verification Form */}
            <Card className="mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-blue-600" />
                  Verification Details
                </CardTitle>
                <CardDescription>
                  Enter the employee verification number and full name to check employment status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="verification-number" className="text-sm font-medium text-gray-700">
                    Verification Number
                  </label>
                  <Input
                    id="verification-number"
                    placeholder="Enter employee verification number"
                    value={verificationNumber}
                    onChange={(e) => setVerificationNumber(e.target.value)}
                    className="h-12"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="employee-name" className="text-sm font-medium text-gray-700">
                    Employee Full Name
                  </label>
                  <Input
                    id="employee-name"
                    placeholder="Enter employee full name"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleVerification}
                    disabled={loading}
                    className="flex-1 h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Verify Employee
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="h-12 px-6"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {searched && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {employee ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        Verification Successful
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        Employee Not Found
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {employee ? (
                    <div className="space-y-6">
                      {/* Employee Details */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <User className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Full Name</p>
                            <p className="font-semibold text-gray-900">{employee.full_name}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Briefcase className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Position</p>
                            <p className="font-semibold text-gray-900">{employee.position}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Clock className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">Employment Status</p>
                            <Badge 
                              variant={employee.is_active ? "default" : "destructive"}
                              className="mt-1"
                            >
                              {employee.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <Calendar className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="text-sm text-gray-600">
                              {employee.is_active ? "Start Date" : "End Date"}
                            </p>
                            <p className="font-semibold text-gray-900">
                              {employee.is_active 
                                ? new Date(employee.created_at).toLocaleDateString()
                                : employee.end_date 
                                ? new Date(employee.end_date).toLocaleDateString()
                                : "N/A"
                              }
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Verification Code */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 mb-1">Verification Code</p>
                        <p className="font-mono font-bold text-green-800">{employee.employee_code}</p>
                      </div>
                      
                      {!employee.is_active && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-700">
                            <strong>Note:</strong> This employee is no longer active with the organization.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <XCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Employee Found
                      </h3>
                      <p className="text-gray-600">
                        No employee found with the provided verification number and name combination. 
                        Please check the details and try again.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmployeeVerification;
