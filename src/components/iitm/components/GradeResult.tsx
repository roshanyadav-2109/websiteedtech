
import React from "react";
import { GradeResult as GradeResultType } from "../types/gradeTypes";

interface GradeResultProps {
  result: GradeResultType;
}

export default function GradeResult({ result }: GradeResultProps) {
  return (
    <div className="bg-green-50 p-6 rounded-lg border border-green-200">
      <h3 className="text-lg font-bold mb-4 text-green-800">Your Grade Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{result.score}</div>
          <div className="text-sm text-gray-600">Total Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{result.letter}</div>
          <div className="text-sm text-gray-600">Grade Letter</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{result.points}</div>
          <div className="text-sm text-gray-600">Grade Points</div>
        </div>
      </div>
    </div>
  );
}
