
import React from "react";

interface EligibilityCheckerProps {
  eligible: boolean;
  message: string;
}

export default function EligibilityChecker({ eligible, message }: EligibilityCheckerProps) {
  return (
    <div className={`p-3 rounded mb-3 ${eligible ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}`}>
      {message}
    </div>
  );
}
