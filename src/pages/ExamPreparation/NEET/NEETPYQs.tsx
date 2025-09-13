import React from 'react';

const NEETPYQs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          NEET Previous Year Questions (PYQs)
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Physics PYQs */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-blue-600 mb-3">Physics PYQs</h3>
              <p className="text-gray-600 mb-4">Access previous year questions for Physics</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">• Mechanics</div>
                <div className="text-sm text-gray-500">• Thermodynamics</div>
                <div className="text-sm text-gray-500">• Optics</div>
                <div className="text-sm text-gray-500">• Modern Physics</div>
              </div>
            </div>
            
            {/* Chemistry PYQs */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-green-600 mb-3">Chemistry PYQs</h3>
              <p className="text-gray-600 mb-4">Access previous year questions for Chemistry</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">• Organic Chemistry</div>
                <div className="text-sm text-gray-500">• Inorganic Chemistry</div>
                <div className="text-sm text-gray-500">• Physical Chemistry</div>
              </div>
            </div>
            
            {/* Biology PYQs */}
            <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-red-600 mb-3">Biology PYQs</h3>
              <p className="text-gray-600 mb-4">Access previous year questions for Biology</p>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">• Botany</div>
                <div className="text-sm text-gray-500">• Zoology</div>
                <div className="text-sm text-gray-500">• Human Physiology</div>
                <div className="text-sm text-gray-500">• Genetics</div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Year-wise PYQs</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016'].map(year => (
                <button 
                  key={year}
                  className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-md transition-colors"
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NEETPYQs;
