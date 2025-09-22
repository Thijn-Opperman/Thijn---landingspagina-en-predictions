'use client';

import { useState, useEffect } from 'react';
import { Clock, Trophy } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  targetTime: string;
  team1: string;
  team2: string;
  game: string;
}

export default function CountdownTimer({ 
  targetDate, 
  targetTime, 
  team1, 
  team2, 
  game 
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
    <div className="card gradient-bg text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          <h3 className="text-xl font-bold">Next Match</h3>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Clock className="w-4 h-4" />
          <span>{game}</span>
        </div>
      </div>
      
      <div className="text-center mb-6">
        <h4 className="text-2xl font-bold mb-2">
          {team1} vs {team2}
        </h4>
        <p className="text-primary-100">
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
