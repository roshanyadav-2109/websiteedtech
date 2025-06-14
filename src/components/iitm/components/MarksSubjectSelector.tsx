
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MarksSubjectSelectorProps {
  subjects: Array<{ key: string; name: string }>;
  selectedSubject: string;
  onSubjectChange: (subjectKey: string) => void;
  onFormReset: () => void;
}

export default function MarksSubjectSelector({ 
  subjects, 
  selectedSubject, 
  onSubjectChange,
  onFormReset 
}: MarksSubjectSelectorProps) {
  const handleSubjectChange = (value: string) => {
    onSubjectChange(value);
    onFormReset();
  };

  return (
    <div>
      <Label>Subject</Label>
      <Select value={selectedSubject} onValueChange={handleSubjectChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {subjects.map(subject => (
            <SelectItem key={subject.key} value={subject.key}>
              {subject.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
