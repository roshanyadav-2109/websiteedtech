
export const gradeThresholds = [
  { letter: "S", min: 90 },
  { letter: "A", min: 80 },
  { letter: "B", min: 70 },
  { letter: "C", min: 60 },
  { letter: "D", min: 50 },
  { letter: "Pass", min: 40 }
];

export function parseNumOrZero(v: string | number | undefined): number {
  const n = Number(v);
  return isNaN(n) ? 0 : n;
}

export function hasMarksEntered(form: Record<string, string>): boolean {
  return Object.values(form).some((v) => v && `${v}` !== "" && !isNaN(Number(v)));
}
