// src/performance-monitoring.js
const performanceTracker = {
  trackQuizPerformance: (stats) => {
    const performanceData = {
      level: stats.level,
      timeSpent: stats.timeSpent,
      correctAnswers: stats.correctAnswers,
      timestamp: new Date().toISOString()
    };

    // Could integrate with analytics service
    console.log('Quiz Performance:', performanceData);
  },

  logError: (error) => {
    const errorLog = {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    };

    // Error logging mechanism
    console.error('Application Error:', errorLog);
  }
};

export default performanceTracker;
