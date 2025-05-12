
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ProfileComplete = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [exam, setExam] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/auth");
        return;
      }
      
      setUserId(data.session.user.id);
      
      // Try to get existing profile data
      try {
        const { data: profileData, error } = await supabase
          .from('profiles')
          .select('full_name, phone, class, exam')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setFullName(profileData.full_name || "");
          setPhone(profileData.phone || "");
          setStudentClass(profileData.class || "");
          setExam(profileData.exam || "");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ 
          id: userId,
          full_name: fullName,
          phone: phone,
          class: studentClass,
          exam: exam
        });
      
      if (error) throw error;
      
      // Grant access to content based on selected exam
      if (exam) {
        const accessTypes = ["notes", "pyqs", "community"];
        
        for (const contentType of accessTypes) {
          const { error: accessError } = await supabase
            .from('user_access')
            .upsert({
              user_id: userId,
              content_type: contentType,
              exam_type: exam
            });
          
          if (accessError) console.error(`Error granting ${contentType} access:`, accessError);
        }
      }
      
      toast({
        title: "Profile updated successfully",
        description: "Your profile information has been saved.",
      });
      
      // Redirect to home page
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message || "An error occurred while saving your profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center font-bold">Complete Your Profile</CardTitle>
          <CardDescription className="text-center">
            Please provide your details to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)} 
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="9876543210"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select
                value={studentClass}
                onValueChange={setStudentClass}
                required
              >
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select your class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="11th">11th</SelectItem>
                  <SelectItem value="12th">12th</SelectItem>
                  <SelectItem value="Dropper">Dropper</SelectItem>
                  <SelectItem value="College student">College student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam">Exam</Label>
              <Select
                value={exam}
                onValueChange={setExam}
                required
              >
                <SelectTrigger id="exam">
                  <SelectValue placeholder="Select your exam" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JEE">JEE</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="IITM BS Data Science">IITM BS Data Science</SelectItem>
                  <SelectItem value="IITM BS Electronic Systems">IITM BS Electronic Systems</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full bg-royal hover:bg-royal-dark" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Button 
            variant="link"
            className="text-gray-500"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/auth");
            }}
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileComplete;
