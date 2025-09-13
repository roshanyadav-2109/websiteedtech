import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NEETNotes from './Notes/NEETNotes';
import NEETSubject from './Notes/NEETSubject';
import NEETClass from './Notes/NEETClass';
import NEETPYQs from './NEETPYQs';

const NEETPrepRoutes: React.FC = () => {
  return (
    <Routes>
      {/* NEET Notes Routes */}
      <Route path="notes" element={<NEETNotes />} />
      <Route path="notes/:subject" element={<NEETSubject />} />
      <Route path="notes/:subject/:class" element={<NEETClass />} />
      
      {/* NEET PYQs Route */}
      <Route path="pyqs" element={<NEETPYQs />} />
      
      {/* Default route */}
      <Route index element={<NEETNotes />} />
    </Routes>
  );
};

export default NEETPrepRoutes;
