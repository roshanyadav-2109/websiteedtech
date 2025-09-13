import React from 'react';
import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import NEETPrep from './NEETPrep';

// Component for handling subject-specific routes
const NEETSubjectRoute = () => {
  const { subject, level, tab } = useParams();
  
  // Pass the URL parameters as props to NEETPrep
  return (
    <NEETPrep 
      initialSubject={subject}
      initialLevel={level}
      initialTab={tab}
    />
  );
};

// Component for handling level-specific routes
const NEETLevelRoute = () => {
  const { level, tab } = useParams();
  
  return (
    <NEETPrep 
      initialLevel={level}
      initialTab={tab}
    />
  );
};

// Component for handling tab-specific routes
const NEETTabRoute = () => {
  const { tab } = useParams();
  
  return (
    <NEETPrep 
      initialTab={tab}
    />
  );
};

// Main NEET Prep Routes component with nested routing
const NEETPrepRoutes = () => {
  return (
    <Routes>
      {/* Base route */}
      <Route path="/" element={<NEETPrep />} />
      
      {/* Tab routes */}
      <Route path="/:tab" element={<NEETTabRoute />} />
      
      {/* Level and tab routes */}
      <Route path="/:level/:tab" element={<NEETLevelRoute />} />
      
      {/* Subject, level and tab routes */}
      <Route path="/:subject/:level/:tab" element={<NEETSubjectRoute />} />
      
      {/* Fallback to base route */}
      <Route path="*" element={<Navigate to="/exam-preparation/neet" replace />} />
    </Routes>
  );
};

export default NEETPrepRoutes;
