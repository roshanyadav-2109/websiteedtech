
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, BookOpen, GraduationCap } from "lucide-react";

interface UserProfile {
  program_type: string;
  branch?: string;
  level?: string;
  exam_type?: string;
  student_status?: string;
  subjects?: string[];
  student_name?: string;
}

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onProfileUpdate: (profile: UserProfile) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  profile,
  onProfileUpdate
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [studentName, setStudentName] = useState('');
  const [programType, setProgramType] = useState('');
  const [branch, setBranch] = useState('');
  const [level, setLevel] = useState('');
  const [examType, setExamType] = useState('');
  const [studentStatus, setStudentStatus] = useState('');

  // Initialize form with current profile data
  useEffect(() => {
    if (profile) {
      setStudentName(profile.student_name || '');
      setProgramType(profile.program_type || '');
      setBranch(profile.branch || '');
      setLevel(profile.level || '');
      setExamType(profile.exam_type || '');
      setStudentStatus(profile.student_status || '');
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const updateData: any = {
        student_name: studentName,
        program_type: programType,
      };

      if (programType === 'IITM_BS') {
        updateData.branch = branch;
        updateData.level = level;
        updateData.exam_type = null;
        updateData.student_status = null;
        updateData.subjects = null;
      } else if (programType === 'COMPETITIVE_EXAM') {
        updateData.exam_type = examType;
        updateData.student_status = studentStatus;
        updateData.subjects = null; // Remove subject selection
        updateData.branch = null;
        updateData.level = null;
      }

      // Save to updated_profiles table for history
      const { error: historyError } = await supabase
        .from('updated_profiles')
        .insert({
          profile_id: user.id,
          ...updateData,
          full_name: profile?.student_name,
          email: user.email,
        });

      if (historyError) {
        console.error('Error saving profile history:', historyError);
      }

      // Update main profiles table
      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      // Update local profile state
      const updatedProfile = {
        ...profile,
        ...updateData
      } as UserProfile;
      
      onProfileUpdate(updatedProfile);
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      
      onClose();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="student-name">Full Name</Label>
                <Input
                  id="student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <Label htmlFor="program-type">Program Type</Label>
                <Select value={programType} onValueChange={setProgramType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select program type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IITM_BS">IITM BS Degree</SelectItem>
                    <SelectItem value="COMPETITIVE_EXAM">Competitive Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* IITM BS Configuration */}
          {programType === 'IITM_BS' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  IITM BS Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="branch">Branch</Label>
                  <Select value={branch} onValueChange={setBranch}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Data Science and Applications">Data Science and Applications</SelectItem>
                      <SelectItem value="Electronic Systems">Electronic Systems</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="foundation">Foundation</SelectItem>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="degree">Degree</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Competitive Exam Configuration */}
          {programType === 'COMPETITIVE_EXAM' && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Competitive Exam Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="exam-type">Exam Type</Label>
                  <Select value={examType} onValueChange={setExamType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JEE">JEE</SelectItem>
                      <SelectItem value="NEET">NEET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="student-status">Student Status</Label>
                  <Select value={studentStatus} onValueChange={setStudentStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11th">11th</SelectItem>
                      <SelectItem value="12th">12th</SelectItem>
                      <SelectItem value="Dropper">Dropper</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;
