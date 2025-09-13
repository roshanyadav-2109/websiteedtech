import React from 'react';

const IITMBSNotes: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IITMBS Study Notes</h1>
          <p className="text-lg text-gray-600">
            Comprehensive study materials for IIT Madras BS in Data Science and Applications
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Foundation Level */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                F
              </span>
              Foundation Level
            </h2>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Mathematics I & II
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Statistics I & II
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Programming Concepts
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                English I & II
              </li>
            </ul>
          </div>
          
          {/* Diploma Level */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                D
              </span>
              Diploma Level
            </h2>
            <ul className="space-y-2 text-green-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Database Management
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Data Structures & Algorithms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Machine Learning
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Business Data Management
              </li>
            </ul>
          </div>
          
          {/* Degree Level */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-purple-900 mb-3 flex items-center">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                B
              </span>
              Degree Level
            </h2>
            <ul className="space-y-2 text-purple-800">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Deep Learning
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Business Analytics
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Modern Application Development
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                Data Science Ethics
              </li>
            </ul>
          </div>
        </div>
        
        {/* Study Resources Section */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Study Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Study Materials</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Comprehensive lecture notes for each subject</li>
                <li>• Practice problem sets with solutions</li>
                <li>• Previous year question papers</li>
                <li>• Reference textbooks and supplementary readings</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">💻 Online Resources</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Video lectures and tutorials</li>
                <li>• Interactive coding exercises</li>
                <li>• Virtual lab sessions</li>
                <li>• Online discussion forums</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Tips Section */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">💡 Study Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
            <div>
              <h4 className="font-semibold mb-2">Time Management:</h4>
              <ul className="text-sm space-y-1">
                <li>• Create a structured study schedule</li>
                <li>• Allocate specific time slots for each subject</li>
                <li>• Take regular breaks to avoid burnout</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Effective Learning:</h4>
              <ul className="text-sm space-y-1">
                <li>• Practice coding problems regularly</li>
                <li>• Join study groups and peer discussions</li>
                <li>• Apply theoretical concepts to real-world projects</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This is a placeholder component for IITMBS study notes. 
            In a complete implementation, this would include actual study materials, 
            downloadable resources, and interactive content organized by subjects and levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IITMBSNotes;
