// src/utils/levelProgression.ts
export const calculateLevelProgress = (
  currentLevel: string, 
  correctAnswers: number,
  consecutiveCorrect: number
): { canAdvance: boolean; nextLevel: string } => {
  const levels = ['Beginner', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const currentIndex = levels.indexOf(currentLevel);

  const progressByCorrectTotal = correctAnswers >= 23;
  const progressByConsecutive = consecutiveCorrect >= 7;

  return {
    canAdvance: progressByCorrectTotal || progressByConsecutive,
    nextLevel: levels[Math.min(currentIndex + 1, levels.length - 1)]
  };
};

export const trackUserAchievement = (progress: UserProgress) => {
  // Placeholder for achievement tracking
  console.log('User Achievement:', progress);
};
