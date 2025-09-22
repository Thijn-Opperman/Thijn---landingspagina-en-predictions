import React, { useState, useEffect } from 'react';

// Standalone CountdownTimer Component
// Geen externe dependencies behalve React

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
  team1: string;
  team2: string;
  game: string;
  className?: string;
  showGame?: boolean;
  showTrophy?: boolean;
}

export default function CountdownTimer({ 
  targetDate, 
  targetTime, 
  team1, 
  team2, 
  game,
  className = "",
  showGame = true,
  showTrophy = true
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const target = new Date(`${targetDate}T${targetTime}:00Z`);
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, targetTime]);

  return (
    <div className={`bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 text-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {showTrophy && (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
            </svg>
          )}
          <h3 className="text-xl font-bold">Next Match</h3>
        </div>
        {showGame && (
          <div className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <span>{game}</span>
          </div>
        )}
      </div>
      
      <div className="text-center mb-6">
        <h4 className="text-2xl font-bold mb-2">
          {team1} vs {team2}
        </h4>
        <p className="text-blue-100">
          {new Date(`${targetDate}T${targetTime}:00Z`).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="text-center">
            <div className="bg-white/20 rounded-lg p-3">
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-sm capitalize">{unit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Export voor gebruik in andere projecten
export { CountdownTimer };
export type { CountdownTimerProps };
