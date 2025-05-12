
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const ProfileComplete = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [exam, setExam] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const classOptions = ["11th", "12th", "Dropper", "College student"];
  const examOptions = ["JEE", "NEET", "IITM BS Data Science", "IITM BS Electronic Systems"];

  // Validate phone number (10 digits)
  const isValidPhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data.session) {
          navigate('/auth');
          return;
        }
        
        setUser(data.session.user);
        
        // Check if profile already exists
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setFullName(profileData.full_name || '');
          setPhone(profileData.phone || '');
          setStudentClass(profileData.class || '');
          setExam(profileData.exam || '');
        }
        
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/auth');
      }
    };
    
    getUserData();
  }, [navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!fullName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidPhone(phone)) {
      toast({
        title: "Invalid phone number",
        description: "Phone number must be exactly 10 digits",
        variant: "destructive",
      });
      return;
    }
    
    if (!studentClass) {
      toast({
        title: "Class required",
        description: "Please select your class",
        variant: "destructive",
      });
      return;
    }
    
    if (!exam) {
      toast({
        title: "Exam required",
        description: "Please select your exam",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          email: user.email,
          phone,
          class: studentClass,
          exam
        });
        
      if (error) throw error;
      
      // Grant access to content based on exam type
      const contentTypes = ["notes", "pyqs", "community"];
      for (const contentType of contentTypes) {
        await supabase.from('user_access').upsert({
          user_id: user.id,
          content_type: contentType,
          exam_type: exam
        });
      }
      
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated."
      });
      
      navigate('/');
      
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error saving profile",
        description: error.message || "An error occurred while saving your profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 pt-24 pb-24">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Please provide your details to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="Your full name" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  placeholder="Your 10-digit phone number" 
                  value={phone} 
                  onChange={(e) => {
                    // Only allow digits
                    const value = e.target.value.replace(/\D/g, '');
                    // Limit to 10 digits
                    setPhone(value.substring(0, 10));
                  }}
                  required
                  minLength={10}
                  maxLength={10}
                />
                {phone && !isValidPhone(phone) && (
                  <p className="text-sm text-red-500">Phone number must be exactly 10 digits</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select value={studentClass} onValueChange={setStudentClass} required>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="exam">Exam</Label>
                <Select value={exam} onValueChange={setExam} required>
                  <SelectTrigger id="exam">
                    <SelectValue placeholder="Select your exam" />
                  </SelectTrigger>
                  <SelectContent>
                    {examOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-royal hover:bg-royal-dark" 
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default ProfileComplete;
