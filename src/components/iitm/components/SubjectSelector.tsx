
import React from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Subject } from "../types/gradeTypes";

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedSubject: string;
  onSubjectChange: (subjectKey: string) => void;
}

export default function SubjectSelector({ subjects, selectedSubject, onSubjectChange }: SubjectSelectorProps) {
  return (
    <div>
      <Label htmlFor="subject-select">Select Subject</Label>
      <Select value={selectedSubject} onValueChange={onSubjectChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a subject" />
        </SelectTrigger>
        <SelectContent>
          {subjects.map((subject) => (
            <SelectItem key={subject.key} value={subject.key}>
              {subject.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
