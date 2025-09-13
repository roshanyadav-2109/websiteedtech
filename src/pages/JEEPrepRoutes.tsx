import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import JEEPrep from './JEEPrep';

// Component for handling subject-specific routes
const JEESubjectRoute = () => {
  const { subject, level, tab } = useParams();
  
  // Pass the URL parameters as props to JEEPrep
  return (
    <JEEPrep 
      initialSubject={subject}
      initialLevel={level}
      initialTab={tab}
    />
  );
};

// Component for handling level-specific routes
const JEELevelRoute = () => {
  const { level, tab } = useParams();
  
  return (
    <JEEPrep 
      initialLevel={level}
      initialTab={tab}
    />
  );
};

// Component for handling tab-specific routes
const JEETabRoute = () => {
  const { tab } = useParams();
  
  return (
    <JEEPrep 
      initialTab={tab}
    />
  );
};

// Main JEE Prep Routes component with nested routing
const JEEPrepRoutes = () => {
  return (
    <Routes>
      {/* Base route */}
      <Route path="/" element={<JEEPrep />} />
      
      {/* Tab routes */}
      <Route path="/:tab" element={<JEETabRoute />} />
      
      {/* Level and tab routes */}
      <Route path="/:level/:tab" element={<JEELevelRoute />} />
      
      {/* Subject, level and tab routes */}
      <Route path="/:subject/:level/:tab" element={<JEESubjectRoute />} />
      
      {/* Fallback to base route */}
      <Route path="*" element={<Navigate to="/exam-preparation/jee" replace />} />
    </Routes>
  );
};

export default JEEPrepRoutes;
