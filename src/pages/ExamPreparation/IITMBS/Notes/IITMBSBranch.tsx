import React from 'react';

const IITMBSBranch: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="border-l-4 border-green-500 pl-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">IITMBS Branch Selection Guide</h1>
          <p className="text-lg text-gray-600">
            Comprehensive guide to understanding branches and specializations in IIT Madras BS Program
          </p>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Program Structure</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-blue-800 mb-4">
              The IIT Madras BS in Data Science and Applications is a comprehensive 4-year program 
              that doesn't have traditional "branches" like engineering programs. Instead, it offers 
              specializations and tracks within the data science domain.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Core Specializations */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
              <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                CS
              </span>
              Core Specializations
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">📊 Data Science & Analytics</h3>
                <p className="text-purple-700 text-sm">
                  Focus on statistical analysis, data mining, predictive modeling, and business intelligence.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">🤖 Machine Learning & AI</h3>
                <p className="text-purple-700 text-sm">
                  Deep dive into algorithms, neural networks, natural language processing, and computer vision.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">💻 Software Development</h3>
                <p className="text-purple-700 text-sm">
                  Programming, web development, database management, and software engineering principles.
                </p>
              </div>
            </div>
          </div>
          
          {/* Domain Applications */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
              <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                DA
              </span>
              Domain Applications
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🏦 Business Analytics</h3>
                <p className="text-green-700 text-sm">
                  Apply data science in finance, marketing, operations, and strategic decision making.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🧬 Healthcare Analytics</h3>
                <p className="text-green-700 text-sm">
                  Medical data analysis, bioinformatics, healthcare informatics, and public health.
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">🌍 Social Sciences</h3>
                <p className="text-green-700 text-sm">
                  Computational social science, digital humanities, and policy analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Career Pathways */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Career Pathways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">💼 Industry Roles</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Data Scientist</li>
                <li>• ML Engineer</li>
                <li>• Data Analyst</li>
                <li>• Software Developer</li>
                <li>• Business Analyst</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🏢 Sectors</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Technology</li>
                <li>• Finance & Banking</li>
                <li>• Healthcare</li>
                <li>• E-commerce</li>
                <li>• Consulting</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">🎓 Further Studies</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• MS in Data Science</li>
                <li>• MBA with Analytics</li>
                <li>• PhD in CS/Stats</li>
                <li>• Specialized Certifications</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Selection Guidelines */}
        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800 mb-3">🎯 How to Choose Your Focus</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
            <div>
              <h4 className="font-semibold mb-2">Consider Your Interests:</h4>
              <ul className="text-sm space-y-1">
                <li>• Do you enjoy mathematical modeling?</li>
                <li>• Are you interested in programming?</li>
                <li>• Do you like working with business problems?</li>
                <li>• Are you passionate about specific domains?</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Practical Steps:</h4>
              <ul className="text-sm space-y-1">
                <li>• Explore courses in Foundation level first</li>
                <li>• Talk to alumni and current students</li>
                <li>• Consider industry trends and job market</li>
                <li>• Align with your long-term career goals</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> This is a placeholder component for IITMBS branch selection guidance. 
            In a complete implementation, this would include detailed curriculum information, 
            faculty profiles, research opportunities, and interactive decision-making tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default IITMBSBranch;
