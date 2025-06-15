import { Level } from "../types/gradeTypes";

export function calculateFoundationGrade(subjectKey: string, values: Record<string, number>): number {
  const { GAA = 0, Qz1 = 0, Qz2 = 0, F = 0, Bonus = 0, GAAP = 0, OPPE1 = 0, OPPE2 = 0, GRPA = 0, NPPE = 0, OPE = 0, BPTA = 0, VMT = 0 } = values;
  
  switch (subjectKey) {
    // Data Science subjects
    case "maths1": {
      const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(part1, part2);
    }
    case "english1": {
      const part1 = 0.1 * GAA + 0.5 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(part1, part2);
    }
    case "statistics1": {
      const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2) + Bonus;
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2 + Bonus;
      return Math.max(part1, part2);
    }
    case "python":
      return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;

    // Electronic Systems subjects
    case "english_es1":
    case "math_electronics1":
    case "electronic_systems_thinking":
    case "english_es2":
    case "digital_systems":
    case "electrical_electronic_circuits": {
      const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(part1, part2);
    }
    case "intro_c_programming": {
      const oppeScore = Math.max(0.15 * OPPE1 + 0.15 * OPPE2, 0.20 * Math.max(OPPE1, OPPE2));
      return 0.1 * GAA + 0.2 * Qz1 + 0.4 * F + oppeScore;
    }
    case "intro_linux_programming":
      return 0.1 * GAA + 0.05 * NPPE + 0.2 * Qz1 + 0.25 * OPE + 0.3 * F + 0.05 * BPTA + 0.05 * VMT;
    case "embedded_c_programming": {
      const part1 = 0.1 * GAA + 0.1 * GRPA + 0.5 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.1 * GRPA + 0.4 * F + 0.2 * Qz1 + 0.2 * Qz2;
      return Math.max(part1, part2);
    }

    default:
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
  }
}

export function calculateDiplomaGrade(subjectKey: string, values: Record<string, number>): number {
  const { GAA = 0, GA = 0, Qz1 = 0, Qz2 = 0, Qz3 = 0, F = 0, GAAP = 0, OPPE1 = 0, OPPE2 = 0, NPPE1 = 0, NPPE2 = 0, NPPE3 = 0, GrPA = 0, GAA1 = 0, GAA2 = 0, PE1 = 0, PE2 = 0, LE = 0, LV = 0, D = 0 } = values;
  
  switch (subjectKey) {
    case "programming_python":
    case "java_programming":
    case "appdev1":
    case "appdev2":
      return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;
    case "machinelearning_practice": {
      const nppeScores = [NPPE1, NPPE2, NPPE3].sort((a, b) => b - a);
      return 0.2 * GA + 0.15 * Qz1 + 0.15 * Qz2 + 0.15 * Qz3 + 0.15 * nppeScores[0] + 0.1 * nppeScores[1] + 0.1 * nppeScores[2];
    }

    // ES Diploma Subjects
    case "math_electronics2":
    case "analog_electronic_systems":
    case "sensors_applications": {
        const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
        const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
        return Math.max(part1, part2);
    }
    case "signals_systems": {
        const part1 = 0.5 * F + 0.2 * Math.max(Qz1, Qz2);
        const part2 = 0.4 * F + 0.2 * Qz1 + 0.2 * Qz2;
        return 0.1 * GAA + Math.max(part1, part2) + 0.1 * GrPA;
    }
    case "python_programming_es": {
        const pe_max = Math.max(PE1, PE2);
        const pe_min = Math.min(PE1, PE2);
        const score = 0.1 * GAA1 + 0.1 * GAA2 + 0.1 * Qz1 + 0.4 * F + 0.25 * pe_max + 0.15 * pe_min;
        return Math.min(100, score);
    }
    case "digital_signal_processing": {
        const part1 = 0.55 * F + 0.1 * Math.max(Qz1, Qz2);
        const part2 = 0.45 * F + 0.15 * Qz1 + 0.15 * Qz2;
        return 0.1 * GAA + 0.1 * LE + 0.05 * LV + Math.max(part1, part2);
    }
    case "digital_system_design": {
        const part1 = 0.5 * F + 0.2 * Math.max(Qz1, Qz2);
        const part2 = 0.4 * F + 0.2 * Qz1 + 0.2 * Qz2;
        return 0.1 * GAA + 0.1 * GrPA + Math.max(part1, part2);
    }
    case "control_engineering": {
        return 0.1 * GAA + 0.45 * F + 0.2 * Qz1 + 0.2 * Qz2 + 0.05 * D;
    }

    default:
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
  }
}

export function calculateDegreeGrade(subjectKey: string, values: Record<string, number>): number {
  const { GAA = 0, GA = 0, Qz1 = 0, Qz2 = 0, Qz3 = 0, F = 0, Bonus = 0, GP1 = 0, GP2 = 0, PP = 0, CP = 0, GP = 0, OPPE1 = 0, OPPE2 = 0, GAAP = 0, NPPE1 = 0, NPPE2 = 0, NPPE3 = 0 } = values;
  
  switch (subjectKey) {
    case "computer_organization_es":
    case "electromagnetic_fields_es":
    case "electronic_product_design_es": {
      const part1 = 0.1 * GAA + 0.6 * F + 0.2 * Math.max(Qz1, Qz2);
      const part2 = 0.1 * GAA + 0.4 * F + 0.2 * Qz1 + 0.3 * Qz2;
      return Math.max(part1, part2);
    }
    case "software_engineering":
      return 0.05 * GAA + 0.2 * Qz2 + 0.4 * F + 0.1 * GP1 + 0.1 * GP2 + 0.1 * PP + 0.05 * CP;
    case "deep_learning":
    case "ai_search":
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2 + Bonus;
    case "strat_prof_growth":
    case "strat_prof_growth_es":
      return 0.15 * GAA + 0.25 * GP + 0.25 * Qz2 + 0.35 * F;
    case "int_bigdata":
      return 0.1 * GAA + 0.3 * F + 0.2 * OPPE1 + 0.4 * OPPE2;
    case "c_prog":
      return 0.05 * GAA + 0.1 * GAAP + 0.15 * Qz1 + 0.2 * OPPE1 + 0.2 * OPPE2 + 0.3 * F;
    case "deep_learning_practice": {
      const nppeScores = [NPPE1, NPPE2, NPPE3].sort((a, b) => b - a);
      return 0.2 * GA + 0.15 * Qz1 + 0.15 * Qz2 + 0.15 * Qz3 + 0.15 * nppeScores[0] + 0.1 * nppeScores[1] + 0.1 * nppeScores[2];
    }
    default:
      return 0.1 * GAA + 0.4 * F + 0.25 * Qz1 + 0.25 * Qz2;
  }
}

export function getGradeLetter(score: number): string {
  if (score >= 90) return "S";
  if (score >= 80) return "A";
  if (score >= 70) return "B";
  if (score >= 60) return "C";
  if (score >= 50) return "D";
  if (score >= 40) return "Pass";
  return "Fail";
}

export function getGradePoints(score: number): number {
  if (score >= 90) return 10;
  if (score >= 80) return 9;
  if (score >= 70) return 8;
  if (score >= 60) return 7;
  if (score >= 50) return 6;
  if (score >= 40) return 5;
  return 0;
}

export function calculateGradeByLevel(level: Level, subjectKey: string, values: Record<string, number>): number {
  switch (level) {
    case "foundation":
      return calculateFoundationGrade(subjectKey, values);
    case "diploma":
      return calculateDiplomaGrade(subjectKey, values);
    case "degree":
      return calculateDegreeGrade(subjectKey, values);
    default:
      return 0;
  }
}
