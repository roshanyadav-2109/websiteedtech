
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileFormProps {
  fullName: string;
  setFullName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  studentClass: string;
  setStudentClass: (value: string) => void;
  exam: string;
  setExam: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  isValidPhone: (phone: string) => boolean;
  classOptions: string[];
  examOptions: string[];
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  fullName,
  setFullName,
  phone,
  setPhone,
  studentClass,
  setStudentClass,
  exam,
  setExam,
  isLoading,
  handleSubmit,
  isValidPhone,
  classOptions,
  examOptions,
}) => {
  return (
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
            const value = e.target.value.replace(/\D/g, '').substring(0, 10);
            setPhone(value);
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
  );
};

export default ProfileForm;
