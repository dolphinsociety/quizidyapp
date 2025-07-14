// src/mocks/quizQuestions.ts
import { QuizQuestion } from '../types/quiz';

export const generateMockQuestions = (level: string): QuizQuestion[] => {
  const questionBanks: Record<string, QuizQuestion[]> = {
    'Beginner': [
      {
        id: 'beginner-001',
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correct: 1,
        level: 'Beginner'
      }
    ],
    'A1': [
      {
        id: 'a1-001',
        question: 'I ___ a student',
        options: ['am', 'is', 'are', 'be'],
        correct: 0,
        level: 'A1'
      }
    ]
    // Add more levels
  };

  return questionBanks[level] || [];
};
