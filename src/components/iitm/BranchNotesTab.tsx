import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { useBackend } from "@/components/BackendIntegratedWrapper";
import { runPopulation } from "@/utils/populateIITMNotes";
import BranchNotesAccordion from "./BranchNotesAccordion";
import { useIITMBranchNotes } from "./hooks/useIITMBranchNotes";
import AdminPopulateButton from "./AdminPopulateButton";

interface Note {
  id: string;
  title: string;
  description: string;
  week: number;
  downloads: number;
  subject?: string | null;
}

const BranchNotesTab = () => {
  const [branch, setBranch] = useState("data-science");
  const [level, setLevel] = useState("foundation");

  const { isAdmin } = useBackend();
  const {
    notes,
    loading,
    groupedNotes,
    getCurrentSubjects,
    reloadNotes
  } = useIITMBranchNotes(branch, level);

  // Generate placeholder notes for subjects with no data
  const generatePlaceholderNotes = (subject: string) => {
    const maxWeeks = level === "qualifier" ? 4 : 12;
    const placeholderNotes: Note[] = [];
    for (let week = 1; week <= maxWeeks; week++) {
      placeholderNotes.push({
        id: `placeholder-${subject}-w${week}`,
        title: `Week ${week} - ${subject}`,
        description: `Week ${week} lecture notes and practice problems`,
        week: week,
        downloads: Math.floor(Math.random() * 50) + 10,
        subject: subject
      });
    }
    return placeholderNotes;
  };

  const handleDownload = (noteId: string) => {
    console.log(`Downloading note: ${noteId}`);
    // Actual download logic would go here
  };

  const currentSubjects = getCurrentSubjects();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
          <Tabs value={branch} onValueChange={setBranch} className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="data-science">Data Science</TabsTrigger>
              <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {[
                { value: "qualifier", label: "Qualifier" },
                { value: "foundation", label: "Foundation" },
                { value: "diploma", label: "Diploma" },
                { value: "degree", label: "Degree" }
              ].map((lvl) => (
                <SelectItem key={lvl.value} value={lvl.value}>
                  {lvl.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4 capitalize">
          {branch.replace('-', ' ')} - {level.charAt(0).toUpperCase() + level.slice(1)} Level Notes
          {level === "qualifier" && (
            <span className="text-sm font-normal text-gray-600 ml-2">(Weeks 1-4 only)</span>
          )}
        </h2>

        <BranchNotesAccordion
          groupedNotes={groupedNotes}
          level={level}
          handleDownload={handleDownload}
          generatePlaceholderNotes={generatePlaceholderNotes}
          currentSubjects={currentSubjects}
          loading={loading}
        />
      </div>
      {isAdmin && (
        <div className="flex justify-end mb-2">
          <AdminPopulateButton loading={loading} onDone={reloadNotes} />
        </div>
      )}
    </div>
  );
};

export default BranchNotesTab;
