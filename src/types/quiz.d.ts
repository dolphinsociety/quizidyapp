// src/types/quiz.d.ts
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  level: 'Beginner' | 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
}

export interface UserProgress {
  currentLevel: string;
  totalCorrectAnswers: number;
  consecutiveCorrectAnswers: number;
  levelsUnlocked: string[];
}
