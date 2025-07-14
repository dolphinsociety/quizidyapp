// src/analytics.js
const analyticsService = {
  trackEvent: (eventName, eventData) => {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString()
    };

    // Placeholder for actual analytics integration
    console.log('Analytics Event:', event);
  },

  trackLevelProgress: (level, progress) => {
    analyticsService.trackEvent('level_progress', {
      level,
      progress
    });
  }
};

export default analyticsService;
