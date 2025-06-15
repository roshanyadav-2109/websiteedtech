
import React from "react";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import ChapterList from "./ChapterList";

interface SubjectBlockProps {
  subject: string;
  selectedClass: string;
  examType: 'JEE' | 'NEET';
}

const SubjectBlock = ({ subject, selectedClass, examType }: SubjectBlockProps) => {
  const { notes, handleDownload, downloadCounts, contentLoading } = useBackend();
  
  // Filter database notes for this subject and class
  const filteredNotes = notes.filter(
    note => note.exam_type === examType && note.subject === subject && note.class_level === selectedClass
  );

  const handleDownloadClick = async (noteId: string, fileUrl?: string) => {
    await handleDownload(noteId, 'notes', fileUrl);
  };
  
  if (contentLoading) {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
        </div>
    );
  }

  return (
    <div>
      <ChapterList chapters={filteredNotes} downloadCounts={downloadCounts} onDownload={handleDownloadClick} />
    </div>
  );
};

export default SubjectBlock;
