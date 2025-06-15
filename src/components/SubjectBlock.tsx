
import React from "react";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import ChapterList from "./ChapterList";
import { jeeChapters, neetChapters } from "@/data/chaptersData";

interface SubjectBlockProps {
  subject: string;
  selectedClass: string;
  examType: 'JEE' | 'NEET';
}

const SubjectBlock = ({ subject, selectedClass, examType }: SubjectBlockProps) => {
  const { notes, contentLoading } = useBackend();
  
  // Get chapters from the data files
  const chaptersData = examType === 'JEE' ? jeeChapters : neetChapters;
  const staticChapters = chaptersData[subject]?.[selectedClass] || [];
  
  // Filter database notes for this subject and class
  const examNotes = notes.filter(note => note.exam_type === examType);
  const dbChapters = examNotes.filter(
    note => note.subject === subject && note.class_level === selectedClass
  );

  // Combine static chapters with database chapters, giving priority to database data
  const allChapters = [...staticChapters, ...dbChapters];

  if (contentLoading) {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
        </div>
    );
  }

  return (
    <div>
      <ChapterList chapters={allChapters} />
    </div>
  );
};

export default SubjectBlock;
