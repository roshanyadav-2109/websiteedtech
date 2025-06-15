
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
  const { notes, handleDownload, downloadCounts, contentLoading } = useBackend();
  
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
      {staticChapters.length > 0 && dbChapters.length === 0 && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            📚 <strong>Demonstration Content:</strong> These are sample chapters. Download links will be added soon.
          </p>
        </div>
      )}
      <ChapterList chapters={allChapters} downloadCounts={downloadCounts} onDownload={handleDownloadClick} />
    </div>
  );
};

export default SubjectBlock;
