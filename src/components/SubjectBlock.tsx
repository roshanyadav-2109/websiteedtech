
import React from "react";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import ChapterList, { Chapter } from "./ChapterList";

interface SubjectBlockProps {
  subject: string;
  selectedClass: string;
  examType: 'JEE' | 'NEET';
}

const SubjectBlock = ({ subject, selectedClass, examType }: SubjectBlockProps) => {
  const { notes, handleDownload, downloadCounts, contentLoading } = useBackend();
  
  const filteredNotes = notes.filter(note => note.exam_type === examType);

  let chapters: Chapter[] = filteredNotes.filter(
    (note) => note.subject === subject && note.class_level === selectedClass
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
  
  const showMockData = chapters.length === 0;

  if (showMockData) {
      chapters = [
          {
              id: `mock-1-${examType}-${subject}-${selectedClass}`,
              title: `Sample Chapter 1 for ${subject}`,
              description: 'This is a sample chapter to demonstrate the layout. Real content can be added by an admin.',
              file_link: '#',
              download_count: 123,
              content_url: '#',
          },
          {
              id: `mock-2-${examType}-${subject}-${selectedClass}`,
              title: `Sample Chapter 2 for ${subject}`,
              description: 'This is another sample chapter. Preview and download are disabled for samples.',
              file_link: undefined,
              download_count: 45,
              content_url: null,
          },
      ];
  }

  return (
    <>
        {showMockData && (
            <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-md" role="alert">
                <p className="font-bold">Demonstration Content</p>
                <p className="text-sm">You are seeing sample data because no chapters have been added for this selection. An administrator can add content via the admin dashboard.</p>
            </div>
        )}
        <ChapterList chapters={chapters} downloadCounts={downloadCounts} onDownload={handleDownloadClick} />
    </>
  );
};

export default SubjectBlock;
