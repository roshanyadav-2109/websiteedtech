
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const DEGREE_COURSES = [
  {
    key: "software_testing",
    name: "Software Testing",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "software_engineering",
    name: "Software Engineering",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "GP1", label: "Group Project 1", min: 0, max: 100 },
      { id: "GP2", label: "Group Project 2", min: 0, max: 100 },
      { id: "PP", label: "Project Presentation", min: 0, max: 100 },
      { id: "CP", label: "Course Participation", min: 0, max: 100 }
    ],
    formula: "T = 0.05×GAA + 0.2×Qz2 + 0.4×F + 0.1×GP1 + 0.1×GP2 + 0.1×PP + 0.05×CP",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Submit GP1, GP2, GP3 (score > 0)"
    ]
  },
  {
    key: "deep_learning",
    name: "Deep Learning",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "Bonus", label: "Bonus (Programming Activities, max 5)", min: 0, max: 5 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "ai_search",
    name: "AI: Search Methods for Problem Solving",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "Bonus", label: "Bonus (Programming Assignment, max 5)", min: 0, max: 5 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "strat_prof_growth",
    name: "Strategies for Professional Growth",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "GP", label: "Group Project (GP)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.15×GAA + 0.25×GP + 0.25×Qz2 + 0.35×F",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)"
    ]
  },
  {
    key: "int_bigdata",
    name: "Introduction to Big Data",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
      { id: "OPPE2", label: "OPPE2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.3×F + 0.2×OPPE1 + 0.4×OPPE2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "At least 40/100 in OPPE1 or OPPE2"
    ]
  },
  {
    key: "c_prog",
    name: "Programming in C",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "GAAP", label: "Programming Assign. Avg (Best 7/8, GAAP)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
      { id: "OPPE2", label: "OPPE2", min: 0, max: 100 }
    ],
    formula: "T = 0.05×GAA + 0.1×GAAP + 0.15×Qz1 + 0.2×OPPE1 + 0.2×OPPE2 + 0.3×F",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "At least 40/100 in OPPE1 or OPPE2"
    ]
  },
  {
    key: "dl_cv",
    name: "Deep Learning for Computer Vision",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "mgr_econ",
    name: "Managerial Economics",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "bioinfo",
    name: "Algorithmic Thinking in Bioinformatics",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.2×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.4×F",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "llm",
    name: "Large Language Models",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "Bonus", label: "Bonus (max 10)", min: 0, max: 10 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2 + Bonus",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "speech_tech",
    name: "Speech Technology",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "V", label: "Viva (V)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.15×GAA + 0.15×V + 0.3×F + 0.2×Qz1 + 0.2×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "design_thinking",
    name: "Design Thinking for Data-Driven App Development",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "GP1", label: "Project 1 (GP1)", min: 0, max: 100 },
      { id: "GP2", label: "Project 2 (GP2)", min: 0, max: 100 },
      { id: "GP3", label: "Project 3 (GP3)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.1×GP1 + 0.1×GP2 + 0.2×GP3 + 0.2×Qz2 + 0.3×F",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Final Project > 60/100"
    ]
  },
  {
    key: "market_research",
    name: "Market Research",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "P", label: "Project", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.2×Qz1 + 0.2×Qz2 + 0.25×P + 0.25×F",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "stat_computing",
    name: "Statistical Computing",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "adv_algo",
    name: "Advanced Algorithms",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.15×GAA + 0.35×F + 0.25×Qz1 + 0.25×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "game_theory",
    name: "Game Theory and Strategy",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.25×Qz1 + 0.25×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "csd",
    name: "Computer System Design",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "Circ", label: "Circuit Verse Assignment", min: 0, max: 100 }
    ],
    formula: "T = 0.1×GAA + 0.4×F + 0.2×Qz1 + 0.25×Qz2 + 0.05×Circ",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "dl_practice",
    name: "Deep Learning Practice",
    fields: [
      { id: "GA", label: "Assignment Avg (Best 5/7, GA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "Qz3", label: "Quiz 3", min: 0, max: 100 },
      { id: "NPPE1", label: "NPPE 1", min: 0, max: 100 },
      { id: "NPPE2", label: "NPPE 2", min: 0, max: 100 },
      { id: "NPPE3", label: "NPPE 3", min: 0, max: 100 }
    ],
    formula:
      "T = 0.2×GA + 0.15×Qz1 + 0.15×Qz2 + 0.15×Qz3 + 0.15×Best(NPPEs) + 0.1×SecondBest(NPPEs) + 0.1×Lowest(NPPEs)",
    eligibility: [
      "GA ≥ 40/100 (best 5/7)",
      "Attend at least one quiz"
    ]
  },
  {
    key: "mf_genai",
    name: "Math Foundations of Generative AI",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "Qz1", label: "Quiz 1", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 },
      { id: "OPPE", label: "OPPE", min: 0, max: 100 }
    ],
    formula: "T = 0.2×GAA + 0.35×F + 0.1×Qz1 + 0.15×Qz2 + 0.2×OPPE",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)"
    ]
  },
  {
    key: "ads",
    name: "Algorithms for Data Science (ADS)",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 2/3, GAA)", min: 0, max: 100 },
      { id: "Qz2", label: "Quiz 2", min: 0, max: 100 }
    ],
    formula: "T = 0.2×GAA + 0.45×F + 0.35×Qz2",
    eligibility: [
      "GAA ≥ 40/100 (best 2/3)"
    ]
  },
  {
    key: "mlops",
    name: "MLOPS",
    fields: [
      { id: "GAA", label: "Assignment Avg (Best 5/7, GAA)", min: 0, max: 100 },
      { id: "OPPE1", label: "OPPE1", min: 0, max: 100 },
      { id: "OPPE2", label: "OPPE2", min: 0, max: 100 },
      { id: "Bonus", label: "Bonus", min: 0, max: 10 }
    ],
    formula: "T = 0.1×GAA + 0.3×F + 0.3×OPPE1 + 0.3×OPPE2 + Bonus",
    eligibility: [
      "GAA ≥ 40/100 (best 5/7)"
    ]
  }
];

// Parse string/number value to number, fallback to 0 on NaN
function parseNumOrZero(v: string | number | undefined) {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

const gradeThresholds = [
  { letter: "S", min: 90 },
  { letter: "A", min: 80 },
  { letter: "B", min: 70 },
  { letter: "C", min: 60 },
  { letter: "D", min: 50 },
  { letter: "Pass", min: 40 }
];

// Per course, calculate T given values and F
function calcScore(courseKey: string, values: Record<string, number>, F: number) {
  switch (courseKey) {
    case "software_testing":
    case "dl_cv":
    case "mgr_econ":
    case "stat_computing":
    case "game_theory":
      // All: 0.1*GAA+0.4*F+0.25*Qz1+0.25*Qz2
      return 0.1 * (values.GAA ?? 0) + 0.4 * F + 0.25 * (values.Qz1 ?? 0) + 0.25 * (values.Qz2 ?? 0);
    case "deep_learning":
    case "ai_search": {
      // 0.1*GAA+0.4*F+0.25*Qz1+0.25*Qz2+Bonus
      return 0.1 * (values.GAA ?? 0) + 0.4 * F + 0.25 * (values.Qz1 ?? 0) + 0.25 * (values.Qz2 ?? 0) + (values.Bonus ?? 0);
    }
    case "software_engineering":
      return (
        0.05 * (values.GAA ?? 0) +
        0.2 * (values.Qz2 ?? 0) +
        0.4 * F +
        0.1 * (values.GP1 ?? 0) +
        0.1 * (values.GP2 ?? 0) +
        0.1 * (values.PP ?? 0) +
        0.05 * (values.CP ?? 0)
      );
    case "strat_prof_growth":
      return (
        0.15 * (values.GAA ?? 0) +
        0.25 * (values.GP ?? 0) +
        0.25 * (values.Qz2 ?? 0) +
        0.35 * F
      );
    case "int_bigdata":
      return (
        0.1 * (values.GAA ?? 0) +
        0.3 * F +
        0.2 * (values.OPPE1 ?? 0) +
        0.4 * (values.OPPE2 ?? 0)
      );
    case "c_prog":
      return (
        0.05 * (values.GAA ?? 0) +
        0.1 * (values.GAAP ?? 0) +
        0.15 * (values.Qz1 ?? 0) +
        0.2 * (values.OPPE1 ?? 0) +
        0.2 * (values.OPPE2 ?? 0) +
        0.3 * F
      );
    case "bioinfo":
      return (
        0.2 * (values.GAA ?? 0) +
        0.2 * (values.Qz1 ?? 0) +
        0.2 * (values.Qz2 ?? 0) +
        0.4 * F
      );
    case "llm":
      return (
        0.1 * (values.GAA ?? 0) +
        0.4 * F +
        0.25 * (values.Qz1 ?? 0) +
        0.25 * (values.Qz2 ?? 0) +
        (values.Bonus ?? 0)
      );
    case "speech_tech":
      return (
        0.15 * (values.GAA ?? 0) +
        0.15 * (values.V ?? 0) +
        0.3 * F +
        0.2 * (values.Qz1 ?? 0) +
        0.2 * (values.Qz2 ?? 0)
      );
    case "design_thinking":
      return (
        0.1 * (values.GAA ?? 0) +
        0.1 * (values.GP1 ?? 0) +
        0.1 * (values.GP2 ?? 0) +
        0.2 * (values.GP3 ?? 0) +
        0.2 * (values.Qz2 ?? 0) +
        0.3 * F
      );
    case "market_research":
      return (
        0.1 * (values.GAA ?? 0) +
        0.2 * (values.Qz1 ?? 0) +
        0.2 * (values.Qz2 ?? 0) +
        0.25 * (values.P ?? 0) +
        0.25 * F
      );
    case "adv_algo":
      return (
        0.15 * (values.GAA ?? 0) +
        0.35 * F +
        0.25 * (values.Qz1 ?? 0) +
        0.25 * (values.Qz2 ?? 0)
      );
    case "csd":
      return (
        0.1 * (values.GAA ?? 0) +
        0.4 * F +
        0.2 * (values.Qz1 ?? 0) +
        0.25 * (values.Qz2 ?? 0) +
        0.05 * (values.Circ ?? 0)
      );
    case "dl_practice": {
      const best = Math.max(values.NPPE1 ?? 0, values.NPPE2 ?? 0, values.NPPE3 ?? 0);
      const arr = [values.NPPE1 ?? 0, values.NPPE2 ?? 0, values.NPPE3 ?? 0].sort((a, b) => b - a);
      return (
        0.2 * (values.GA ?? 0) +
        0.15 * (values.Qz1 ?? 0) +
        0.15 * (values.Qz2 ?? 0) +
        0.15 * (values.Qz3 ?? 0) +
        0.15 * arr[0] + 0.1 * arr[1] + 0.1 * arr[2]
      );
    }
    case "mf_genai":
      return (
        0.2 * (values.GAA ?? 0) +
        0.35 * F +
        0.1 * (values.Qz1 ?? 0) +
        0.15 * (values.Qz2 ?? 0) +
        0.2 * (values.OPPE ?? 0)
      );
    case "ads":
      return (
        0.2 * (values.GAA ?? 0) +
        0.45 * F +
        0.35 * (values.Qz2 ?? 0)
      );
    case "mlops":
      return (
        0.1 * (values.GAA ?? 0) +
        0.3 * F +
        0.3 * (values.OPPE1 ?? 0) +
        0.3 * (values.OPPE2 ?? 0) +
        (values.Bonus ?? 0)
      );
    default:
      return 0;
  }
}

// For each course & values (except F), and target T, what F is minimally required for that T?
function requiredF(courseKey: string, values: Record<string, number>, targetT: number): number | null {
  for (let F = 0; F <= 100; ++F) {
    if (calcScore(courseKey, values, F) >= targetT) return F;
  }
  return null;
}

const getEligibility = (courseKey: string, values: Record<string, number>): [boolean, string] => {
  // Only show common minimum: GAA or GA ≥ 40
  let minGAAId = "GAA";
  if (courseKey === "dl_practice") minGAAId = "GA";
  const minGAA = values[minGAAId] ?? 0;
  if (minGAA < 40) return [false, "Assignment average must be at least 40."];
  // Most courses: require attendance of quiz
  if (["software_testing", "deep_learning", "ai_search", "dl_cv", "mgr_econ", "bioinfo", "llm", "speech_tech", "market_research", "stat_computing", "adv_algo", "game_theory", "csd", "dl_practice"].includes(courseKey)) {
    const Qz1 = values.Qz1 ?? 0, Qz2 = values.Qz2 ?? 0, Qz3 = values.Qz3 ?? 0;
    if (Qz1 <= 0 && Qz2 <= 0 && Qz3 <= 0) return [false, "At least one quiz score must be entered (>0)."];
  }
  return [true, "Eligible for Final Exam"];
};

export default function DegreeMarksPredictor() {
  const [course, setCourse] = React.useState(DEGREE_COURSES[0].key);
  const [form, setForm] = React.useState<Record<string, string>>({});

  const subject = DEGREE_COURSES.find((c) => c.key === course);

  // Compose numeric values except F
  const values: Record<string, number> = {};
  (subject?.fields || []).forEach(f => {
    if (f.id !== "F") values[f.id] = parseNumOrZero(form[f.id]);
  });

  // Only show table if a mark is entered
  const markEntered = Object.values(form).some((v) => v && `${v}` !== "" && !isNaN(Number(v)));

  // Eligibility
  const [eligible, eligMsg] = getEligibility(course, values);

  // Required F table
  const requiredTable = gradeThresholds.map((g) => ({
    letter: g.letter,
    min: g.min,
    requiredF: requiredF(course, values, g.min)
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Degree Final Exam Marks Predictor</CardTitle>
        <div className="text-xs mt-2 text-gray-600">{subject?.formula}</div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label>Subject</Label>
            <Select value={course} onValueChange={v => { setCourse(v); setForm({}); }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DEGREE_COURSES.map(c => (
                  <SelectItem key={c.key} value={c.key}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {(subject?.fields ?? []).filter(f => f.id !== "F").map(f => (
            <div key={f.id}>
              <Label>{f.label}</Label>
              <Input
                type="number"
                min={f.min}
                max={f.max}
                value={form[f.id] ?? ""}
                placeholder="0"
                onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                inputMode="numeric"
              />
            </div>
          ))}
        </div>
        <div className={`p-3 rounded mb-3 ${eligible ? "bg-green-50 text-green-800" : "bg-yellow-50 text-yellow-800"}`}>{eligMsg}</div>

        {markEntered && (
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
                  {requiredTable.map(row => (
                    <tr key={row.letter} className="border-t">
                      <td className="py-2 px-3 font-bold">{row.letter}</td>
                      <td className="py-2 px-3">{row.min}</td>
                      <td className="py-2 px-3">
                        {row.requiredF == null ? <span className="text-red-600 font-semibold">Impossible</span> : `${row.requiredF} /100`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Reduced explanation */}
            <div className="text-xs mt-2 text-gray-500">
              Enter your marks to see what you need in the final. "Impossible" means the grade can't be reached with current scores.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
