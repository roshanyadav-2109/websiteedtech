
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Note {
  id: string;
  title: string;
  description: string;
}

interface SubjectNotesProps {
  subject: string;
  notes: Note[];
  downloads: Record<string, number>;
  onDownload: (id: string) => void;
}

const IITMBSNotesSection = ({ subject, notes, downloads, onDownload }: SubjectNotesProps) => {
  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4 capitalize">{subject}</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="notes">
          <AccordionTrigger className="text-xl font-medium">
            Available Notes
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {notes.map((note) => (
                <Card key={note.id} className="border-none shadow-md hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription>{note.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex justify-between">
                    <Button
                      onClick={() => onDownload(note.id)}
                      className="bg-royal hover:bg-royal-dark text-white"
                    >
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500">{downloads[note.id] || 0}</span>
                      <div className="ml-2 bg-gray-200 h-1.5 w-16 rounded-full overflow-hidden">
                        <div 
                          className="bg-royal h-full rounded-full" 
                          style={{ width: `${Math.min(100, ((downloads[note.id] || 0) / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default IITMBSNotesSection;
