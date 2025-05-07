
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import EmailPopup from "@/components/EmailPopup";
import { Button } from "@/components/ui/button";
import ImprovedToggleGroup from "@/components/ImprovedToggleGroup";

const IITMBSPrep = () => {
  const [selectedBranch, setSelectedBranch] = useState("data-science");
  const [selectedFoundationLevel, setSelectedFoundationLevel] = useState("level-1");
  const [selectedDSDegreeLevel, setSelectedDSDegreeLevel] = useState("level-1");
  const [selectedESLevel, setSelectedESLevel] = useState("level-1");
  const [selectedTab, setSelectedTab] = useState("notes");

  // Branch options
  const branchOptions = [
    { value: "data-science", label: "Data Science" },
    { value: "electronic-systems", label: "Electronic Systems" },
  ];

  // Foundation level options
  const foundationLevelOptions = [
    { value: "level-1", label: "Level 1" },
    { value: "level-2", label: "Level 2" },
    { value: "level-3", label: "Level 3" },
    { value: "level-4", label: "Level 4" },
  ];

  // Degree level options - Data Science
  const dsDegreeLevelOptions = [
    { value: "level-1", label: "Diploma Level 1" },
    { value: "level-2", label: "Diploma Level 2" },
    { value: "level-3", label: "Degree Level 1" },
    { value: "level-4", label: "Degree Level 2" },
    { value: "level-5", label: "Degree Level 3" },
  ];

  // Degree level options - Electronic Systems
  const esLevelOptions = [
    { value: "level-1", label: "Diploma Level 1" },
    { value: "level-2", label: "Diploma Level 2" },
    { value: "level-3", label: "Degree Level 1" },
    { value: "level-4", label: "Degree Level 2" },
  ];

  // Tab options
  const tabOptions = [
    { value: "notes", label: "Notes" },
    { value: "community", label: "Community" },
  ];

  // Data Science Course Structure
  const dsFoundationCourses = {
    "level-1": [
      { title: "Programming, Data Structures and Algorithms using Python", link: "#" },
      { title: "Statistics for Data Science I", link: "#" },
      { title: "Computational Thinking", link: "#" },
    ],
    "level-2": [
      { title: "Programming, Data Structures and Algorithms using Python II", link: "#" },
      { title: "Database Management Systems", link: "#" },
      { title: "Statistics for Data Science II", link: "#" },
    ],
    "level-3": [
      { title: "Machine Learning Foundations", link: "#" },
      { title: "Data Visualization", link: "#" },
    ],
    "level-4": [
      { title: "Business Data Management", link: "#" },
      { title: "Systems Thinking", link: "#" },
    ],
  };

  const dsDegreeCourses = {
    "level-1": [
      { title: "Python for Data Science", link: "#" },
      { title: "Mathematics for Data Science", link: "#" },
      { title: "Business Data Management", link: "#" },
    ],
    "level-2": [
      { title: "Machine Learning Techniques", link: "#" },
      { title: "Data Visualization", link: "#" },
      { title: "SQL for Data Science", link: "#" },
    ],
    "level-3": [
      { title: "Deep Learning", link: "#" },
      { title: "Natural Language Processing", link: "#" },
      { title: "Big Data Analytics", link: "#" },
    ],
    "level-4": [
      { title: "Reinforcement Learning", link: "#" },
      { title: "Time Series Analysis", link: "#" },
    ],
    "level-5": [
      { title: "Advanced Machine Learning", link: "#" },
      { title: "Industry Project", link: "#" },
    ],
  };

  // Electronic Systems Course Structure
  const esFoundationCourses = {
    "level-1": [
      { title: "Digital Systems", link: "#" },
      { title: "Signals and Systems", link: "#" },
    ],
    "level-2": [
      { title: "Electronics I", link: "#" },
      { title: "Mathematics for Electronic Systems", link: "#" },
    ],
    "level-3": [
      { title: "Analog Electronics", link: "#" },
      { title: "Digital Signal Processing", link: "#" },
    ],
    "level-4": [
      { title: "Control Systems", link: "#" },
      { title: "VLSI Design", link: "#" },
    ],
  };

  const esDegreeCourses = {
    "level-1": [
      { title: "Embedded Systems", link: "#" },
      { title: "IoT Foundations", link: "#" },
    ],
    "level-2": [
      { title: "Wireless Communication", link: "#" },
      { title: "RF Design", link: "#" },
    ],
    "level-3": [
      { title: "Advanced Microprocessors", link: "#" },
      { title: "PCB Design", link: "#" },
    ],
    "level-4": [
      { title: "Capstone Project", link: "#" },
      { title: "Industry Application", link: "#" },
    ],
  };

  // Community links
  const communityLinks = {
    "data-science": {
      telegram: "https://t.me/joinchat/iitmbs-datascience",
      whatsappGroups: [
        { name: "Python Programming", link: "https://chat.whatsapp.com/example1" },
        { name: "Machine Learning", link: "https://chat.whatsapp.com/example2" },
        { name: "Data Analysis", link: "https://chat.whatsapp.com/example3" },
      ],
    },
    "electronic-systems": {
      telegram: "https://t.me/joinchat/iitmbs-electronics",
      whatsappGroups: [
        { name: "Digital Systems", link: "https://chat.whatsapp.com/example4" },
        { name: "Embedded Systems", link: "https://chat.whatsapp.com/example5" },
        { name: "PCB Design", link: "https://chat.whatsapp.com/example6" },
      ],
    },
  };

  // Render course content based on selected filters
  const renderCourseContent = () => {
    if (selectedBranch === "data-science") {
      if (selectedFoundationLevel === "level-1" || selectedFoundationLevel === "level-2") {
        return dsFoundationCourses[selectedFoundationLevel as keyof typeof dsFoundationCourses].map((course, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium">{course.title}</h3>
            <Button variant="link" className="text-royal p-0 h-auto mt-1">
              View Notes
            </Button>
          </div>
        ));
      } else {
        return dsDegreeCourses[selectedDSDegreeLevel as keyof typeof dsDegreeCourses].map((course, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium">{course.title}</h3>
            <Button variant="link" className="text-royal p-0 h-auto mt-1">
              View Notes
            </Button>
          </div>
        ));
      }
    } else {
      if (selectedFoundationLevel === "level-1" || selectedFoundationLevel === "level-2") {
        return esFoundationCourses[selectedFoundationLevel as keyof typeof esFoundationCourses].map((course, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium">{course.title}</h3>
            <Button variant="link" className="text-royal p-0 h-auto mt-1">
              View Notes
            </Button>
          </div>
        ));
      } else {
        return esDegreeCourses[selectedESLevel as keyof typeof esDegreeCourses].map((course, index) => (
          <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <h3 className="font-medium">{course.title}</h3>
            <Button variant="link" className="text-royal p-0 h-auto mt-1">
              View Notes
            </Button>
          </div>
        ));
      }
    }
  };

  // Render community content
  const renderCommunityContent = () => {
    const links = selectedBranch === "data-science" 
      ? communityLinks["data-science"] 
      : communityLinks["electronic-systems"];

    return (
      <div className="space-y-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4">Telegram Community</h3>
          <p className="mb-4 text-gray-600">
            Join our active Telegram group for real-time discussions, updates, and support.
          </p>
          <a 
            href={links.telegram} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#0088cc] text-white px-4 py-2 rounded-md hover:bg-[#0077b5] transition-colors"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.568 8.16c-.18.78-2.388 10.62-2.388 10.62s-.3.78-1.14.84c-.3 0-.72-.18-1.2-.54-.9-.66-1.74-1.2-2.4-1.74-.72-.6-2.04-1.74-.12-3.48l4.14-3.96c.48-.48.96-1.56-.12-1.56s-4.44 2.82-6.42 4.02c-.42.3-1.86.66-3.3.12-1.38-.48-3-1.14-.3-2.22 6.78-3.12 17.1-7.08 17.58-7.26.48-.12 1.56-.48 1.56-.48s.54-.18 1.02-.12c.24 0 .78.18.78.66-.18.72-.18 1.2-.24 1.86z" />
            </svg>
            Join Telegram Group
          </a>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4">WhatsApp Study Groups</h3>
          <p className="mb-4 text-gray-600">
            Join our subject-specific WhatsApp groups for focused discussions.
          </p>
          
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {links.whatsappGroups.map((group, index) => (
              <a 
                key={index}
                href={group.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-3 py-2 rounded-md hover:bg-[#128C7E] transition-colors text-center"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.72.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                </svg>
                {group.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-royal to-royal-dark text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              IIT Madras BS Preparation
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive study resources for IIT Madras BS programs in Data Science and Electronic Systems
            </p>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
              {/* Tab Selection */}
              <div className="mb-8">
                <ImprovedToggleGroup
                  value={selectedTab}
                  onValueChange={setSelectedTab}
                  items={tabOptions}
                />
              </div>
              
              {selectedTab === "notes" ? (
                <>
                  {/* Filters */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <ImprovedToggleGroup
                        title="Select Branch"
                        value={selectedBranch}
                        onValueChange={setSelectedBranch}
                        items={branchOptions}
                      />
                    </div>
                    
                    <div>
                      <ImprovedToggleGroup
                        title="Select Level"
                        value={
                          selectedBranch === "data-science" 
                            ? selectedFoundationLevel === "level-1" || selectedFoundationLevel === "level-2"
                              ? selectedFoundationLevel
                              : selectedDSDegreeLevel
                            : selectedFoundationLevel === "level-1" || selectedFoundationLevel === "level-2"
                              ? selectedFoundationLevel
                              : selectedESLevel
                        }
                        onValueChange={(value) => {
                          if (value === "level-1" || value === "level-2") {
                            setSelectedFoundationLevel(value);
                          } else if (selectedBranch === "data-science") {
                            setSelectedDSDegreeLevel(value);
                          } else {
                            setSelectedESLevel(value);
                          }
                        }}
                        items={
                          selectedBranch === "data-science"
                            ? [...foundationLevelOptions.slice(0, 2), ...dsDegreeLevelOptions]
                            : [...foundationLevelOptions.slice(0, 2), ...esLevelOptions]
                        }
                      />
                    </div>
                  </div>
                  
                  {/* Course Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {renderCourseContent()}
                  </div>
                </>
              ) : (
                // Community Tab Content
                renderCommunityContent()
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <EmailPopup />
    </>
  );
};

export default IITMBSPrep;
