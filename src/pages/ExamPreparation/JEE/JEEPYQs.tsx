import React from 'react';

const JEEPYQs = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">JEE Previous Year Questions</h1>
      <p className="text-gray-600 mb-4">
        Access previous year questions for JEE Main and JEE Advanced to practice and improve your understanding.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Physics</h3>
          <p className="text-gray-600 mb-4">Previous year physics questions with detailed solutions</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            View Questions
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Chemistry</h3>
          <p className="text-gray-600 mb-4">Previous year chemistry questions with detailed solutions</p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            View Questions
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold mb-2">Mathematics</h3>
          <p className="text-gray-600 mb-4">Previous year mathematics questions with detailed solutions</p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
            View Questions
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Year-wise Papers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map(year => (
            <button 
              key={year}
              className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg text-center font-medium transition-colors"
            >
              JEE {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JEEPYQs;
