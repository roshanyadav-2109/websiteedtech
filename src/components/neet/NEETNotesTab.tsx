
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NEETSubjectBlock from "@/components/NEETSubjectBlock";

const NEETNotesTab = () => {
  const [activeSubject, setActiveSubject] = useState("Physics");
  const [activeClass, setActiveClass] = useState("class11");

  const subjects = ["Physics", "Botany", "Zoology", "Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"];
  const classes = [
    { value: "class11", label: "Class 11" },
    { value: "class12", label: "Class 12" }
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Subject-wise Notes</h2>
      </div>

      {/* Subject Filter Tabs */}
      <div className="mb-6">
        <Tabs value={activeSubject} onValueChange={setActiveSubject}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full min-w-fit">
              {subjects.map((subject) => (
                <TabsTrigger key={subject} value={subject} className="rounded-md flex-shrink-0">
                  {subject}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>

      <div className="mb-6">
        <Tabs value={activeClass} onValueChange={setActiveClass}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-full min-w-fit">
              {classes.map((classItem) => (
                <TabsTrigger key={classItem.value} value={classItem.value} className="rounded-md flex-shrink-0">
                  {classItem.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </Tabs>
      </div>
      
      <NEETSubjectBlock 
        subject={activeSubject} 
        selectedClass={activeClass}
      />
    </>
  );
};

export default NEETNotesTab;
