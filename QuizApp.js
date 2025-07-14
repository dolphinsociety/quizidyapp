// src/QuizApp.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const QuizApp = () => {
  // Entire quiz logic from previous implementation
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(7);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  
  // Level Management State
  const levels = ['Beginner', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Expert'];
  const [userLevel, setUserLevel] = useState('A1');
  const [levelProgress, setLevelProgress] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [wrongStreak, setWrongStreak] = useState(0);

  // Question Banks
  const questionsByLevel = {
    'Beginner': [
      { question: "Hello in English is ___", options: ["Hi", "Bye", "Yes", "No"], correct: 0 },
      { question: "Cat is a ___", options: ["animal", "food", "color", "number"], correct: 0 },
    ],
    'A1': [
      { question: "I ___ a student.", options: ["am", "is", "are", "be"], correct: 0 },
      { question: "She ___ coffee.", options: ["like", "likes", "liking", "liked"], correct: 1 },
      { question: "What ___ your name?", options: ["is", "are", "am", "be"], correct: 0 },
    ],
    // Add more levels...
  };

  // Level Progression Logic
  const checkLevelProgression = useCallback((isCorrect) => {
    if (isCorrect) {
      const newConsecutiveCorrect = consecutiveCorrect + 1;
      setConsecutiveCorrect(newConsecutiveCorrect);
      setWrongStreak(0);

      // Consecutive Correct Level Up (7 correct)
      if (newConsecutiveCorrect >= 7) {
        advanceLevel('consecutive');
        setConsecutiveCorrect(0);
      }

      // Progress Bar Level Up
      const newLevelProgress = levelProgress + 1;
      setLevelProgress(newLevelProgress);

      if (newLevelProgress >= 23) {
        advanceLevel('progress');
        setLevelProgress(0);
      }
    } else {
      setConsecutiveCorrect(0);
      const newWrongStreak = wrongStreak + 1;
      setWrongStreak(newWrongStreak);

      // Demotion Check
      if (newWrongStreak >= 3) {
        demoteLevel();
      }
    }
  }, [consecutiveCorrect, levelProgress, wrongStreak]);

  // Level Advancement Methods
  const advanceLevel = useCallback((method) => {
    const currentIndex = levels.indexOf(userLevel);
    if (currentIndex < levels.length - 1) {
      const nextLevel = levels[currentIndex + 1];
      setUserLevel(nextLevel);
      alert(`🎉 Level Up! Advanced to ${nextLevel} via ${method}`);
    }
  }, [userLevel, levels]);

  const demoteLevel = useCallback(() => {
    const currentIndex = levels.indexOf(userLevel);
    if (currentIndex > 0) {
      const previousLevel = levels[currentIndex - 1];
      setUserLevel(previousLevel);
      setWrongStreak(0);
      alert(`📉 Demoted to ${previousLevel} due to consecutive wrong answers`);
    }
  }, [userLevel, levels]);

  // Question Handling
  const handleAnswer = (answerIndex) => {
    const questions = questionsByLevel[userLevel];
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    setSelectedAnswer(answerIndex);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    checkLevelProgression(isCorrect);

    setTimeout(handleNextQuestion, 1500);
  };

  const handleNextQuestion = () => {
    const questions = questionsByLevel[userLevel];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(7);
    } else {
      setCurrentScreen('results');
    }
  };

  // Timer Logic
  useEffect(() => {
    let timer;
    if (currentScreen === 'quiz' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      handleAnswer(null);
    }
    return () => clearTimeout(timer);
  }, [currentScreen, timeLeft]);

  // Screen Components
  const QuizScreen = () => {
    const questions = questionsByLevel[userLevel];
    const currentQ = questions[currentQuestion];

    return (
      <div className="screen quiz-screen">
        <div className="quiz-header">
          <span className="timer">0:0{timeLeft}</span>
          <div className="level-info">
            <span className="current-level">{userLevel}</span>
            <div className="consecutive-streak">
              Consecutive: {consecutiveCorrect}/7
            </div>
          </div>
        </div>
        
        <div className="question-card">
          <p className="question-text">{currentQ.question}</p>
        </div>

        <div className="answers-grid">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`answer-btn ${
                selectedAnswer === index
                  ? index === currentQ.correct
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Other screen components (similar structure)
  const WelcomeScreen = () => (
    <div className="screen welcome-screen">
      <h1>Quizidy</h1>
      <button onClick={() => setCurrentScreen('auth')}>Start</button>
    </div>
  );

  const ResultsScreen = () => (
    <div className="screen results-screen">
      <h2>Quiz Complete! 🎉</h2>
      <div className="results-details">
        <p>Level: {userLevel}</p>
        <p>Score: {score}</p>
        <p>Consecutive Correct: {consecutiveCorrect}</p>
      </div>
      <button onClick={() => setCurrentScreen('welcome')}>
        Play Again
      </button>
    </div>
  );

  // Screen Rendering
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome': return <WelcomeScreen />;
      case 'quiz': return <QuizScreen />;
      case 'results': return <ResultsScreen />;
      default: return <WelcomeScreen />;
    }
  };

  return (
    <div className="quiz-app">
      {renderScreen()}
    </div>
  );
};

export default QuizApp;
