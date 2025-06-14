
import React from "react";

interface GradeRequirement {
  letter: string;
  min: number;
  requiredF: number | null;
}

interface GradeRequirementsTableProps {
  requirements: GradeRequirement[];
}

export default function GradeRequirementsTable({ requirements }: GradeRequirementsTableProps) {
  return (
    <div className="mb-3">
      <div className="font-semibold mb-2">Minimum Final Exam (F) marks needed for each grade:</div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border bg-white rounded shadow">
          <thead>
            <tr className="bg-indigo-100">
              <th className="py-2 px-3 text-left">Grade</th>
              <th className="py-2 px-3 text-left">Total Score</th>
              <th className="py-2 px-3 text-left">Required F (out of 100)</th>
            </tr>
          </thead>
          <tbody>
            {requirements.map(row => (
              <tr key={row.letter} className="border-t">
                <td className="py-2 px-3 font-bold">{row.letter}</td>
                <td className="py-2 px-3">{row.min}</td>
                <td className="py-2 px-3">
                  {row.requiredF == null ? (
                    <span className="text-red-600 font-semibold">Impossible</span>
                  ) : (
                    `${row.requiredF} /100`
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-xs mt-2 text-gray-500">
        Enter your marks to see what you need in the final. "Impossible" means the grade can't be reached with current scores.
      </div>
    </div>
  );
}
