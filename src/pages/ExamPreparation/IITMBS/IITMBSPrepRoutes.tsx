import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IITMBSNotes from './Notes/IITMBSNotes';
import IITMBSBranch from './Notes/IITMBSBranch';
import IITMBSLevel from './Notes/IITMBSLevel';

const IITMBSPrepRoutes: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">IITMBS Preparation</h1>
        <p className="text-lg text-gray-600 mb-8">
          Comprehensive preparation resources for IIT Madras BS in Data Science and Applications.
        </p>
        
        <Routes>
          <Route path="/" element={
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-blue-900 mb-3">Study Notes</h2>
                  <p className="text-blue-700 mb-4">
                    Comprehensive notes covering all subjects and topics for IIT Madras BS program.
                  </p>
                  <a href="/exam-preparation/iitmbs/notes" 
                     className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Access Notes
                  </a>
                </div>
                
                <div className="bg-green-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-green-900 mb-3">Branch Selection</h2>
                  <p className="text-green-700 mb-4">
                    Information about different branches and specializations available in the program.
                  </p>
                  <a href="/exam-preparation/iitmbs/branch" 
                     className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                    Explore Branches
                  </a>
                </div>
                
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold text-purple-900 mb-3">Level Information</h2>
                  <p className="text-purple-700 mb-4">
                    Understand the different levels and progression in the IIT Madras BS program.
                  </p>
                  <a href="/exam-preparation/iitmbs/level" 
                     className="inline-block bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Level Details
                  </a>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About IIT Madras BS Program</h2>
                <p className="text-gray-700 mb-4">
                  The IIT Madras BS in Data Science and Applications is a 4-year online undergraduate program 
                  designed to provide students with a strong foundation in data science, programming, and analytics.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Program Highlights:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Online learning with flexibility</li>
                      <li>Industry-relevant curriculum</li>
                      <li>Strong programming foundation</li>
                      <li>Data science specialization</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Career Opportunities:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Data Scientist</li>
                      <li>Software Developer</li>
                      <li>Business Analyst</li>
                      <li>Research Analyst</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          } />
          <Route path="/notes/*" element={<IITMBSNotes />} />
          <Route path="/branch/*" element={<IITMBSBranch />} />
          <Route path="/level/*" element={<IITMBSLevel />} />
        </Routes>
      </div>
    </div>
  );
};

export default IITMBSPrepRoutes;
