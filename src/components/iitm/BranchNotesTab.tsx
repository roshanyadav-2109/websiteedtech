
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IITMBSNotesSection from "@/components/IITMBSNotesSection";

// Define the props interface for BranchNotesTab
interface BranchNotesTabProps {
  dataScienceFoundation: string[];
  dataScienceDiploma: string[];
  dataScienceDegree: string[];
  dataScienceDegreeElectives: string[];
  dataScienceQualifier: string[];
  electronicSystemsFoundation: string[];
  electronicSystemsDiploma: string[];
  electronicSystemsDegree: string[];
  electronicSystemsDegreeElectives: string[];
  electronicSystemsQualifier: string[];
}

const BranchNotesTab = ({
  dataScienceFoundation,
  dataScienceDiploma,
  dataScienceDegree,
  dataScienceDegreeElectives,
  dataScienceQualifier,
  electronicSystemsFoundation,
  electronicSystemsDiploma,
  electronicSystemsDegree,
  electronicSystemsDegreeElectives,
  electronicSystemsQualifier
}: BranchNotesTabProps) => {
  const [branch, setBranch] = useState("data-science");
  const [downloads, setDownloads] = useState<Record<string, number>>({});
  
  const handleDownload = (id: string) => {
    setDownloads(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    // Here you would add actual download functionality
    console.log(`Downloading note with ID: ${id}`);
  };
  
  // Mock data for DS Foundation notes
  const dataScFoundationNotes = dataScienceFoundation.map((course, index) => ({
    id: `ds-foundation-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));
  
  // Mock data for DS Diploma notes
  const dataSciDiplomaNotes = dataScienceDiploma.map((course, index) => ({
    id: `ds-diploma-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));
  
  // Mock data for DS Degree notes
  const dataSciDegreeNotes = dataScienceDegree.map((course, index) => ({
    id: `ds-degree-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));

  // Mock data for DS Degree Electives notes
  const dataSciDegreeElectivesNotes = dataScienceDegreeElectives.map((course, index) => ({
    id: `ds-elective-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));
  
  // Mock data for DS Qualifier notes
  const dataSciQualifierNotes = dataScienceQualifier.map((course, index) => ({
    id: `ds-qualifier-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));

  // Mock data for ES Foundation notes
  const electronicSysFoundationNotes = electronicSystemsFoundation.map((course, index) => ({
    id: `es-foundation-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));
  
  // Mock data for ES Diploma notes
  const electronicSysDiplomaNotes = electronicSystemsDiploma.map((course, index) => ({
    id: `es-diploma-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));
  
  // Mock data for ES Degree notes
  const electronicSysDegreeNotes = electronicSystemsDegree.map((course, index) => ({
    id: `es-degree-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));

  // Mock data for ES Degree Electives notes
  const electronicSysDegreeElectivesNotes = electronicSystemsDegreeElectives.map((course, index) => ({
    id: `es-elective-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));
  
  // Mock data for ES Qualifier notes
  const electronicSysQualifierNotes = electronicSystemsQualifier.map((course, index) => ({
    id: `es-qualifier-${index}`,
    title: course,
    description: `Study notes for ${course}`,
    week: Math.floor(Math.random() * 12) + 1
  }));

  return (
    <div className="space-y-6">
      <Tabs value={branch} onValueChange={setBranch} className="w-full">
        <TabsList className="mb-6 grid grid-cols-2">
          <TabsTrigger value="data-science">Data Science</TabsTrigger>
          <TabsTrigger value="electronic-systems">Electronic Systems</TabsTrigger>
        </TabsList>
        
        <TabsContent value="data-science" className="space-y-6">
          <IITMBSNotesSection 
            subject="Foundation Level Courses" 
            notes={dataScFoundationNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="foundation"
          />
          
          <IITMBSNotesSection 
            subject="Diploma Level Courses" 
            notes={dataSciDiplomaNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="diploma"
          />
          
          <IITMBSNotesSection 
            subject="Degree Level Core Courses" 
            notes={dataSciDegreeNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="degree"
          />
          
          <IITMBSNotesSection 
            subject="Degree Level Elective Courses" 
            notes={dataSciDegreeElectivesNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="degree"
          />
          
          <IITMBSNotesSection 
            subject="Qualifier Courses" 
            notes={dataSciQualifierNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="qualifier"
          />
        </TabsContent>
        
        <TabsContent value="electronic-systems" className="space-y-6">
          <IITMBSNotesSection 
            subject="Foundation Level Courses" 
            notes={electronicSysFoundationNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="foundation"
          />
          
          <IITMBSNotesSection 
            subject="Diploma Level Courses" 
            notes={electronicSysDiplomaNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="diploma"
          />
          
          <IITMBSNotesSection 
            subject="Degree Level Core Courses" 
            notes={electronicSysDegreeNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="degree"
          />
          
          <IITMBSNotesSection 
            subject="Degree Level Elective Courses" 
            notes={electronicSysDegreeElectivesNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="degree"
          />
          
          <IITMBSNotesSection 
            subject="Qualifier Courses" 
            notes={electronicSysQualifierNotes}
            downloads={downloads}
            onDownload={handleDownload}
            level="qualifier"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BranchNotesTab;
