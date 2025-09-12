import React from 'react';

const IITMBSTools = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            IITM BS Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to the IITM BS Tools page! Here you'll find all the essential tools and resources 
            to help you succeed in your IITM Bachelor of Science program.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Academic Calendar
            </h3>
            <p className="text-gray-600">
              Stay up to date with important academic dates and deadlines.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Course Materials
            </h3>
            <p className="text-gray-600">
              Access study materials, notes, and resources for all your courses.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Exam Resources
            </h3>
            <p className="text-gray-600">
              Find past papers, exam schedules, and preparation materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IITMBSTools;
