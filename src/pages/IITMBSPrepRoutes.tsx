import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import IITMBSPrep from './IITMBSPrep';

// Component for handling subject-specific routes
const IITMBSSubjectRoute = () => {
  const { subject, level, tab } = useParams();
  
  // Pass the URL parameters as props to IITMBSPrep
  return (
    <IITMBSPrep 
      initialSubject={subject}
      initialLevel={level}
      initialTab={tab}
    />
  );
};

// Component for handling level-specific routes
const IITMBSLevelRoute = () => {
  const { level, tab } = useParams();
  
  return (
    <IITMBSPrep 
      initialLevel={level}
      initialTab={tab}
    />
  );
};

// Component for handling tab-specific routes
const IITMBSTabRoute = () => {
  const { tab } = useParams();
  
  return (
    <IITMBSPrep 
      initialTab={tab}
    />
  );
};

// Main IITM-BS Prep Routes component with nested routing
const IITMBSPrepRoutes = () => {
  return (
    <Routes>
      {/* Base route */}
      <Route path="/" element={<IITMBSPrep />} />
      
      {/* Tab routes */}
      <Route path="/:tab" element={<IITMBSTabRoute />} />
      
      {/* Level and tab routes */}
      <Route path="/:level/:tab" element={<IITMBSLevelRoute />} />
      
      {/* Subject, level and tab routes */}
      <Route path="/:subject/:level/:tab" element={<IITMBSSubjectRoute />} />
      
      {/* Fallback to base route */}
      <Route path="*" element={<Navigate to="/exam-preparation/iitm-bs" replace />} />
    </Routes>
  );
};

export default IITMBSPrepRoutes;
