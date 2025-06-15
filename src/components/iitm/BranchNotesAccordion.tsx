import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { Note } from "./hooks/useIITMBranchNotes";

export interface BranchNotesAccordionProps {
  groupedNotes: Record<string, Note[]>;
  level: string;
  handleDownload: (noteId: string) => void;
  currentSubjects: string[];
  loading: boolean;
}

const BranchNotesAccordion: React.FC<BranchNotesAccordionProps> = ({
  groupedNotes,
  level,
  handleDownload,
  currentSubjects,
  loading,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-royal"></div>
        <span className="ml-2 text-gray-600">Loading notes...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {currentSubjects.map((subject) => {
        const subjectNotes = groupedNotes[subject] || [];

        return (
          <Accordion type="single" collapsible key={subject} className="bg-white rounded-lg shadow-md">
            <AccordionItem value={subject}>
              <AccordionTrigger className="p-4 hover:bg-gray-50">
                <span className="font-semibold text-lg">{subject}</span>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {subjectNotes.map((note) => (
                    <Card key={note.id} className="border-none shadow-sm hover:shadow-md transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex items-center">
                          <div className="rounded-full bg-royal/10 p-2 mr-3">
                            <FileText className="h-4 w-4 text-royal" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{note.title}</CardTitle>
                            <CardDescription className="text-xs">{note.description}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardFooter className="flex justify-between pt-0">
                        <Button
                          size="sm"
                          onClick={() => handleDownload(note.id)}
                          className="bg-royal hover:bg-royal-dark text-white text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" /> Download
                        </Button>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">{note.downloads}</span>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      })}
      {!loading && currentSubjects.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No subjects available for this selection. Please try a different branch or level.
        </div>
      )}
    </div>
  );
};

export default BranchNotesAccordion;
