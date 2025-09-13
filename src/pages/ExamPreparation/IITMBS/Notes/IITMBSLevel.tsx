import React from 'react';

const IITMBSLevel: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="border-l-4 border-purple-500 pl-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IITMBS Level Information</h1>
          <p className="text-lg text-gray-600">
            Understanding the progression levels in IIT Madras BS in Data Science and Applications
          </p>
        </div>
        
        {/* Program Levels Overview */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Program Structure</h2>
          <div className="bg-blue-50 p-6 rounded-lg mb-4">
            <p className="text-blue-800">
              The IIT Madras BS program is structured as a 4-year undergraduate degree with three distinct levels: 
              Foundation, Diploma, and Degree. Each level has specific requirements and learning outcomes.
            </p>
          </div>
        </div>
        
        {/* Level Details */}
        <div className="space-y-6 mb-8">
          {/* Foundation Level */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <span className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4">
                1
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-blue-900">Foundation Level</h2>
                <p className="text-blue-700">Duration: 1 Year (2 Terms)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-blue-800 mb-3">📚 Core Subjects</h3>
                <ul className="space-y-2 text-blue-700">
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
                    Computational Thinking
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    English I & II
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-3">🎯 Requirements</h3>
                <ul className="space-y-2 text-blue-700 text-sm">
                  <li>• Complete 8 courses (4 per term)</li>
                  <li>• Maintain minimum grade requirements</li>
                  <li>• Pass all assessments and exams</li>
                  <li>• Build fundamental knowledge base</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Diploma Level */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <span className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4">
                2
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-green-900">Diploma Level</h2>
                <p className="text-green-700">Duration: 1.5-2 Years (3-4 Terms)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-green-800 mb-3">📚 Core Subjects</h3>
                <ul className="space-y-2 text-green-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Programming & Data Structures
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Database Management
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Machine Learning Foundations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Business Data Management
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-3">🎯 Requirements</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Complete Foundation Level first</li>
                  <li>• Choose specialization tracks</li>
                  <li>• Complete practical projects</li>
                  <li>• Industry internship (optional)</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Degree Level */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <span className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold mr-4">
                3
              </span>
              <div>
                <h2 className="text-2xl font-semibold text-purple-900">Degree Level</h2>
                <p className="text-purple-700">Duration: 1.5-2 Years (3-4 Terms)</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-purple-800 mb-3">📚 Advanced Subjects</h3>
                <ul className="space-y-2 text-purple-700">
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
                    Modern App Development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                    Capstone Project
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-purple-800 mb-3">🎯 Requirements</h3>
                <ul className="space-y-2 text-purple-700 text-sm">
                  <li>• Complete Diploma Level first</li>
                  <li>• Specialize in chosen domain</li>
                  <li>• Complete capstone project</li>
                  <li>• Industry collaboration project</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Progression Requirements */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Progression Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">📊 Grading</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Minimum CGPA requirements</li>
                <li>• No failing grades in core subjects</li>
                <li>• Continuous assessment scores</li>
                <li>• Project evaluation criteria</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">⏰ Timeline</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Flexible progression pace</li>
                <li>• Maximum 8 years to complete</li>
                <li>• Can exit at any level</li>
                <li>• Re-entry options available</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🎓 Certification</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Foundation Certificate (Year 1)</li>
                <li>• Diploma Certificate (Year 2-3)</li>
                <li>• Bachelor's Degree (Year 4)</li>
                <li>• Industry recognized credentials</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Tips and Guidelines */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">💡 Level Progression Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
            <div>
              <h4 className="font-semibold mb-2">Academic Success:</h4>
              <ul className="text-sm space-y-1">
                <li>• Master foundation concepts thoroughly</li>
                <li>• Participate actively in online sessions</li>
                <li>• Complete assignments on time</li>
                <li>• Seek help from teaching assistants</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Career Preparation:</h4>
              <ul className="text-sm space-y-1">
                <li>• Build a strong portfolio</li>
                <li>• Network with peers and faculty</li>
                <li>• Pursue relevant internships</li>
                <li>• Stay updated with industry trends</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This is a placeholder component for IITMBS level information. 
            In a complete implementation, this would include detailed academic calendars, 
            grade requirements, progression tracking tools, and personalized guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IITMBSLevel;
