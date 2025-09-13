import React from 'react';
import { Link } from 'react-router-dom';

const JEENotes = () => {
  const subjects = [
    {
      name: 'Physics',
      path: 'physics',
      color: 'bg-blue-500',
      description: 'Complete physics notes for JEE preparation'
    },
    {
      name: 'Chemistry',
      path: 'chemistry',
      color: 'bg-green-500',
      description: 'Comprehensive chemistry study material'
    },
    {
      name: 'Mathematics',
      path: 'mathematics',
      color: 'bg-orange-500',
      description: 'Detailed mathematics concepts and formulas'
    }
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">JEE Notes</h1>
      <p className="text-gray-600 mb-8">
        Access comprehensive study notes for all JEE subjects. Our notes are organized 
        by class and topic to help you study systematically.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <Link 
            key={subject.path} 
            to={`/exam-preparation/jee/notes/${subject.path}`}
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-l-blue-500">
              <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center mb-4`}>
                <span className="text-white font-bold text-lg">
                  {subject.name.charAt(0)}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View Notes →
              </button>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-blue-600 text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Class-wise Organization</h4>
              <p className="text-gray-600">Notes organized by Class 11 and Class 12 syllabi</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-green-600 text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Topic-wise Coverage</h4>
              <p className="text-gray-600">Detailed coverage of all important topics</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-orange-600 text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Formula Sheets</h4>
              <p className="text-gray-600">Quick reference formula sheets for revision</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-purple-600 text-sm">✓</span>
            </div>
            <div>
              <h4 className="font-semibold mb-1">Practice Problems</h4>
              <p className="text-gray-600">Solved examples and practice questions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JEENotes;
