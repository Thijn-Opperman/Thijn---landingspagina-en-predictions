'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Trophy, Star } from 'lucide-react';
import { triviaQuestions, type TriviaQuestion } from '@/lib/dummyData';

interface TriviaQuizProps {
  questions?: TriviaQuestion[];
  showScore?: boolean;
  title?: string;
}

export default function TriviaQuiz({ 
  questions = triviaQuestions, 
  showScore = true,
  title = "Quick Quiz"
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
    
    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + questions[currentQuestion].points);
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
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gradient">{title}</h3>
        {showScore && (
          <div className="flex items-center gap-2 bg-primary-50 px-3 py-1 rounded-full">
            <Trophy className="w-5 h-5 text-primary-600" />
            <span className="font-semibold text-primary-700">{score} pts</span>
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
              <span className="text-sm font-semibold text-primary-600">
                {questions[currentQuestion].points} points
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
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
                        ? 'border-primary-500 bg-primary-50 text-primary-800'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50'
                    } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                      {showResult && isWrong && (
                        <XCircle className="w-5 h-5 text-red-600" />
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
              className="btn-primary w-full"
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
                className="btn-primary"
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
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
