
import React from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useBackend } from "@/components/BackendIntegratedWrapper";

interface SubjectBlockProps {
  subject: string;
  selectedClass: string;
}

const NEETSubjectBlock = ({ subject, selectedClass }: SubjectBlockProps) => {
  const { notes, handleDownload, downloadCounts, contentLoading } = useBackend();
  
  const neetNotes = notes.filter(note => note.exam_type === 'NEET');

  const chapters = neetNotes.filter(
    note => note.subject === subject && note.class_level === selectedClass
  );

  const handleDownloadClick = async (noteId: string, fileUrl?: string) => {
    await handleDownload(noteId, 'notes', fileUrl);
  };
  
  const currentDownloads = downloadCounts;

  if (contentLoading) {
    return (
        <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
        </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((chapter) => (
          <Card key={chapter.id} className="border-none shadow-md hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-lg">{chapter.title}</CardTitle>
              <CardDescription>{chapter.description || ''}</CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button
                onClick={() => handleDownloadClick(chapter.id, chapter.file_link || undefined)}
                className="bg-royal hover:bg-royal-dark text-white"
              >
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <div className="flex items-center">
                <span className="text-sm text-gray-500">{currentDownloads[chapter.id] || chapter.download_count || 0}</span>
                <div className="ml-2 bg-gray-200 h-1.5 w-16 rounded-full overflow-hidden">
                  <div 
                    className="bg-royal h-full rounded-full" 
                    style={{ width: `${Math.min(100, ((currentDownloads[chapter.id] || chapter.download_count || 0) / 100) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {chapters.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No chapters available for this selection. Please try a different subject or class.
        </div>
      )}
    </div>
  );
};

export default NEETSubjectBlock;
