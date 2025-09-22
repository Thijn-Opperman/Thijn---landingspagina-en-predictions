'use client';

import { useState, useEffect } from 'react';
import { Play, RotateCcw, Trophy, Star } from 'lucide-react';

interface MiniGameProps {
  onClose: () => void;
}

export default function MiniGame({ onClose }: MiniGameProps) {
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
        setScore(prev => prev + 10);
        setTimeLeft(prev => prev + 5); // Bonus time
        generateSequence();
      } else {
        setCurrentStep(prev => prev + 1);
      }
    } else {
      // Wrong sequence
      setGameState('gameOver');
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
    }

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  const getBadge = (score: number) => {
    if (score >= 100) return { icon: '🏆', text: 'Memory Master', color: 'text-yellow-600' };
    if (score >= 50) return { icon: '⭐', text: 'Sharp Mind', color: 'text-blue-600' };
    if (score >= 20) return { icon: '🎯', text: 'Good Memory', color: 'text-green-600' };
    return { icon: '💪', text: 'Keep Practicing', color: 'text-gray-600' };
  };

  const badge = getBadge(score);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gradient">Memory Challenge</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
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
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Game
            </button>
          </div>
        )}

        {gameState === 'playing' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary-600" />
                <span className="font-semibold">{score} pts</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
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
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
              <button
                onClick={onClose}
                className="btn-secondary w-full"
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
