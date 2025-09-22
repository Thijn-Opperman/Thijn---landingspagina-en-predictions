'use client';

import { useState } from 'react';
import { TrendingUp, Users, Clock } from 'lucide-react';
import { polls, type Poll } from '@/lib/dummyData';

export default function PredictionsModule() {
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [userPoints, setUserPoints] = useState(0);

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls.has(pollId)) return;
    
    setVotedPolls(prev => new Set([...prev, pollId]));
    setUserPoints(prev => prev + 5); // 5 points per vote
  };

  const formatTimeLeft = (expiresAt: string) => {
    const now = new Date().getTime();
    const expiry = new Date(expiresAt).getTime();
    const diff = expiry - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gradient">Predictions</h3>
        <div className="flex items-center gap-2 bg-primary-50 px-3 py-1 rounded-full">
          <TrendingUp className="w-5 h-5 text-primary-600" />
          <span className="font-semibold text-primary-700">{userPoints} pts</span>
        </div>
      </div>

      <div className="space-y-6">
        {polls.map((poll) => (
          <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">{poll.question}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{formatTimeLeft(poll.expiresAt)}</span>
              </div>
            </div>

            <div className="space-y-3">
              {poll.options.map((option) => {
                const hasVoted = votedPolls.has(poll.id);
                const isVotedOption = hasVoted && option.id === poll.options.find(o => o.votes > 0)?.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleVote(poll.id, option.id)}
                    disabled={hasVoted}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                      hasVoted
                        ? isVotedOption
                          ? 'border-primary-500 bg-primary-50 text-primary-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                        : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-50 cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.text}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">
                          {option.percentage}%
                        </span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${option.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{poll.totalVotes} votes</span>
              </div>
              {votedPolls.has(poll.id) && (
                <span className="text-green-600 font-semibold">
                  +5 points earned!
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
        <h4 className="font-semibold mb-2">How it works:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Vote on predictions to earn points</li>
          <li>• Correct predictions earn bonus points</li>
          <li>• Points are added to your leaderboard score</li>
          <li>• New polls appear before each match</li>
        </ul>
      </div>
    </div>
  );
}
