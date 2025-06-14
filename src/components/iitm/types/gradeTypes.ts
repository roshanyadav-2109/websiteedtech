
export interface SubjectField {
  id: string;
  label: string;
  min: number;
  max: number;
}

export interface Subject {
  key: string;
  name: string;
  fields: SubjectField[];
}

export interface GradeResult {
  score: number;
  letter: string;
  points: number;
}

export type Level = "foundation" | "diploma" | "degree";
