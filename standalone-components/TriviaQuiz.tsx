import React, { useState } from 'react';

// Standalone TriviaQuiz Component
// Geen externe dependencies behalve React

interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  category: string;
}

interface TriviaQuizProps {
  questions: TriviaQuestion[];
  showScore?: boolean;
  title?: string;
  className?: string;
  onComplete?: (score: number) => void;
  onQuestionAnswer?: (questionId: string, isCorrect: boolean) => void;
}

export default function TriviaQuiz({ 
  questions, 
  showScore = true,
  title = "Quick Quiz",
  className = "",
  onComplete,
  onQuestionAnswer
}: TriviaQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (answered) return;
    
    setSelectedAnswer(answerIndex);
    setAnswered(true);
    
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + questions[currentQuestion].points);
    }
    
    // Callback voor externe tracking
    if (onQuestionAnswer) {
      onQuestionAnswer(questions[currentQuestion].id, isCorrect);
    }
    
    setTimeout(() => {
      setShowResult(true);
    }, 1000);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowResult(false);
    } else {
      // Quiz completed
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnswered(false);
    setShowResult(false);
  };

  const getBadge = (score: number) => {
    if (score >= 25) return { icon: '🏆', text: 'Quiz Master', color: 'text-yellow-600' };
    if (score >= 15) return { icon: '⭐', text: 'Expert', color: 'text-blue-600' };
    if (score >= 10) return { icon: '🎯', text: 'Good', color: 'text-green-600' };
    return { icon: '💪', text: 'Keep Trying', color: 'text-gray-600' };
  };

  const badge = getBadge(score);

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h3>
        {showScore && (
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold text-blue-700">{score} pts</span>
          </div>
        )}
      </div>

      {currentQuestion < questions.length ? (
        <div>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="text-sm font-semibold text-blue-600">
                {questions[currentQuestion].points} points
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-4">
              {questions[currentQuestion].question}
            </h4>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === questions[currentQuestion].correctAnswer;
                const isWrong = isSelected && !isCorrect;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                      isCorrect && showResult
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : isWrong && showResult
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                    } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                      {showResult && isWrong && (
                        <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showResult && currentQuestion < questions.length - 1 && (
            <button
              onClick={nextQuestion}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Next Question
            </button>
          )}

          {showResult && currentQuestion === questions.length - 1 && (
            <div className="text-center">
              <div className="mb-4">
                <div className="text-4xl mb-2">{badge.icon}</div>
                <h4 className="text-xl font-bold mb-2">Quiz Complete!</h4>
                <p className={`font-semibold ${badge.color}`}>
                  {badge.text} - {score} points
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="mb-4">
            <div className="text-4xl mb-2">{badge.icon}</div>
            <h4 className="text-xl font-bold mb-2">Quiz Complete!</h4>
            <p className={`font-semibold ${badge.color}`}>
              {badge.text} - {score} points
            </p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}

// Export voor gebruik in andere projecten
export { TriviaQuiz };
export type { TriviaQuizProps, TriviaQuestion };
