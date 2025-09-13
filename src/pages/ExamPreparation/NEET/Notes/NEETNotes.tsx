import React from 'react';
import { useNavigate } from 'react-router-dom';

const NEETNotes: React.FC = () => {
  const navigate = useNavigate();

  const subjects = [
    {
      id: 'physics',
      name: 'Physics',
      description: 'Complete physics notes for NEET preparation',
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      id: 'chemistry',
      name: 'Chemistry', 
      description: 'Comprehensive chemistry notes covering all topics',
      color: 'bg-green-50 text-green-700 border-green-200',
      hoverColor: 'hover:bg-green-100'
    },
    {
      id: 'biology',
      name: 'Biology',
      description: 'Detailed biology notes for NEET success',
      color: 'bg-red-50 text-red-700 border-red-200',
      hoverColor: 'hover:bg-red-100'
    }
  ];

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/exam-preparation/neet/notes/${subjectId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NEET Study Notes</h1>
        <p className="text-gray-600 mb-8">Access comprehensive study materials for all NEET subjects</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => handleSubjectClick(subject.id)}
              className={`${subject.color} border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${subject.hoverColor} hover:shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-3">{subject.name}</h3>
              <p className="text-sm opacity-80 mb-4">{subject.description}</p>
              
              <div className="space-y-1 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-current opacity-60 mr-2"></span>
                  Class 11 & 12 Topics
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-current opacity-60 mr-2"></span>
                  Previous Year Questions
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 rounded-full bg-current opacity-60 mr-2"></span>
                  Practice Problems
                </div>
              </div>
              
              <div className="mt-4 text-xs opacity-70">
                Click to explore {subject.name.toLowerCase()} notes
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Study Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Physics Strategy</h3>
              <p className="text-sm text-gray-600">Focus on numerical problems and conceptual understanding</p>
            </div>
            <div className="bg-white rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Chemistry Approach</h3>
              <p className="text-sm text-gray-600">Balance theory with problem-solving practice</p>
            </div>
            <div className="bg-white rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Biology Method</h3>
              <p className="text-sm text-gray-600">Emphasize diagrams and factual recall</p>
            </div>
            <div className="bg-white rounded-md p-4">
              <h3 className="font-medium text-gray-900 mb-2">Time Management</h3>
              <p className="text-sm text-gray-600">Allocate time based on question weightage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NEETNotes;
