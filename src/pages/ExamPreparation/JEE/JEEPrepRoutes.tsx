import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import JEEPYQs from './JEEPYQs';
import JEENotes from './Notes/JEENotes';
import JEESubject from './Notes/JEESubject';
import JEEClass from './Notes/JEEClass';

const JEEPrepRoutes = () => {
  return (
    <Routes>
      <Route index element={<div>JEE Main Page - Coming Soon</div>} />
      <Route path="pyqs" element={<JEEPYQs />} />
      <Route path="notes" element={<JEENotes />} />
      <Route path="notes/:subject" element={<JEESubject />} />
      <Route path="notes/:subject/:class" element={<JEEClass />} />
      {/* Add more JEE-specific routes here */}
    </Routes>
  );
};

export default JEEPrepRoutes;
