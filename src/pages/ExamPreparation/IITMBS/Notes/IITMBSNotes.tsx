import React from 'react';
import { Routes, Route, useParams, Link, Outlet } from 'react-router-dom';

// Component for displaying individual branch and level content
const BranchLevelContent: React.FC = () => {
  const { branch, level } = useParams<{ branch: string; level: string }>();
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {branch?.toUpperCase()} - {level?.charAt(0).toUpperCase() + level?.slice(1)} Level
        </h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            This is the {level} level content for {branch} branch. 
            In a complete implementation, this would contain:
          </p>
          <ul className="list-disc list-inside mt-3 text-blue-700 space-y-1">
            <li>Detailed study materials for {branch}</li>
            <li>Lecture notes and video content</li>
            <li>Practice problems and assignments</li>
            <li>Previous exam papers and solutions</li>
            <li>Interactive quizzes and assessments</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Component for displaying branch selection
const BranchSelection: React.FC = () => {
  const { branch } = useParams<{ branch: string }>();
  
  const levels = [
    { id: 'foundation', name: 'Foundation', description: 'Basic concepts and fundamentals' },
    { id: 'diploma', name: 'Diploma', description: 'Intermediate level coursework' },
    { id: 'degree', name: 'Degree', description: 'Advanced degree level content' }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {branch?.toUpperCase()} Branch - Select Level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {levels.map((level) => (
            <Link
              key={level.id}
              to={`/exam-preparation/iitmbs/notes/${branch}/${level.id}`}
              className="block p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-colors"
            >
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{level.name}</h3>
              <p className="text-blue-700 text-sm">{level.description}</p>
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};

// Main notes home component
const IITMBSNotesHome: React.FC = () => {
  const branches = [
    { id: 'datascience', name: 'Data Science', description: 'Core data science concepts and applications' },
    { id: 'programming', name: 'Programming', description: 'Programming languages and software development' },
    { id: 'mathematics', name: 'Mathematics', description: 'Mathematical foundations and statistics' },
    { id: 'electronics', name: 'Electronics', description: 'Electronic systems and applications' }
  ];

  return (
    <div className="space-y-6">
      <div className="border-l-4 border-blue-500 pl-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">IITMBS Study Notes</h1>
        <p className="text-lg text-gray-600">
          Comprehensive study materials for IIT Madras BS in Data Science and Applications
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {branches.map((branch) => (
          <Link
            key={branch.id}
            to={`/exam-preparation/iitmbs/notes/${branch.id}`}
            className="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-blue-900 mb-3">{branch.name}</h2>
            <p className="text-blue-700">{branch.description}</p>
          </Link>
        ))}
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
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
    </div>
  );
};

// Main IITMBSNotes component with routing
const IITMBSNotes: React.FC = () => {
  return (
    <Routes>
      <Route index element={<IITMBSNotesHome />} />
      <Route path=":branch" element={<BranchSelection />}>
        <Route path=":level" element={<BranchLevelContent />} />
      </Route>
    </Routes>
  );
};

export default IITMBSNotes;
