import React, { useState, useEffect } from 'react';

// Standalone MiniGame Component
// Geen externe dependencies behalve React

interface MiniGameProps {
  onClose: () => void;
  className?: string;
  onScoreUpdate?: (score: number) => void;
  onGameComplete?: (finalScore: number) => void;
}

export default function MiniGame({ 
  onClose, 
  className = "",
  onScoreUpdate,
  onGameComplete
}: MiniGameProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver'>('menu');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isShowingSequence, setIsShowingSequence] = useState(false);

  const colors = [
    { id: 0, name: 'Red', class: 'bg-red-500 hover:bg-red-600' },
    { id: 1, name: 'Blue', class: 'bg-blue-500 hover:bg-blue-600' },
    { id: 2, name: 'Green', class: 'bg-green-500 hover:bg-green-600' },
    { id: 3, name: 'Yellow', class: 'bg-yellow-500 hover:bg-yellow-600' },
  ];

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    generateSequence();
  };

  const generateSequence = () => {
    const newSequence = Array.from({ length: 3 }, () => Math.floor(Math.random() * 4));
    setSequence(newSequence);
    setPlayerSequence([]);
    setCurrentStep(0);
    showSequence(newSequence);
  };

  const showSequence = (seq: number[]) => {
    setIsShowingSequence(true);
    let step = 0;
    
    const interval = setInterval(() => {
      if (step < seq.length) {
        // Highlight the color
        setTimeout(() => {
          setIsShowingSequence(false);
        }, 500);
        step++;
      } else {
        clearInterval(interval);
        setIsShowingSequence(false);
      }
    }, 1000);
  };

  const handleColorClick = (colorId: number) => {
    if (gameState !== 'playing' || isShowingSequence) return;

    const newPlayerSequence = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSequence);

    if (colorId === sequence[currentStep]) {
      if (currentStep === sequence.length - 1) {
        // Sequence completed
        const newScore = score + 10;
        setScore(newScore);
        setTimeLeft(prev => prev + 5); // Bonus time
        
        if (onScoreUpdate) {
          onScoreUpdate(newScore);
        }
        
        generateSequence();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      // Wrong sequence
      setGameState('gameOver');
      if (onGameComplete) {
        onGameComplete(score);
      }
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('gameOver');
      if (onGameComplete) {
        onGameComplete(score);
      }
    }

    return () => clearTimeout(timer);
  }, [gameState, timeLeft, score, onGameComplete]);

  const getBadge = (score: number) => {
    if (score >= 100) return { icon: '🏆', text: 'Memory Master', color: 'text-yellow-600' };
    if (score >= 50) return { icon: '⭐', text: 'Sharp Mind', color: 'text-blue-600' };
    if (score >= 20) return { icon: '🎯', text: 'Good Memory', color: 'text-green-600' };
    return { icon: '💪', text: 'Keep Practicing', color: 'text-gray-600' };
  };

  const badge = getBadge(score);

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 ${className}`}>
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Memory Challenge
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {gameState === 'menu' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🧠</div>
              <h4 className="text-xl font-bold mb-2">Memory Challenge</h4>
              <p className="text-gray-600">
                Watch the sequence and repeat it! Get points for each correct sequence.
              </p>
            </div>
            <button
              onClick={startGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{score} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{timeLeft}s</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-4 text-center">
                {isShowingSequence ? 'Watch the sequence...' : 'Repeat the sequence!'}
              </h4>
              
              <div className="grid grid-cols-2 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => handleColorClick(color.id)}
                    disabled={isShowingSequence}
                    className={`h-20 rounded-lg transition-all duration-200 ${
                      isShowingSequence && sequence[currentStep] === color.id
                        ? 'ring-4 ring-white shadow-lg scale-105'
                        : color.class
                    } ${isShowingSequence ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Progress: {currentStep}/{sequence.length}
              </p>
            </div>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="text-4xl mb-2">{badge.icon}</div>
              <h4 className="text-xl font-bold mb-2">Game Over!</h4>
              <p className={`font-semibold ${badge.color}`}>
                {badge.text} - {score} points
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={startGame}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Play Again
              </button>
              <button
                onClick={onClose}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export voor gebruik in andere projecten
export { MiniGame };
export type { MiniGameProps };
