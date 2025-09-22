import React, { useState } from 'react';

// Standalone PredictionsModule Component
// Geen externe dependencies behalve React

interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  expiresAt: string;
}

interface PredictionsModuleProps {
  polls: Poll[];
  className?: string;
  onVote?: (pollId: string, optionId: string) => void;
  onPointsEarned?: (points: number) => void;
}

export default function PredictionsModule({ 
  polls, 
  className = "",
  onVote,
  onPointsEarned
}: PredictionsModuleProps) {
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [userPoints, setUserPoints] = useState(0);

  const handleVote = (pollId: string, optionId: string) => {
    if (votedPolls.has(pollId)) return;
    
    setVotedPolls(prev => new Set([...prev, pollId]));
    const pointsEarned = 5;
    setUserPoints(prev => prev + pointsEarned);
    
    if (onVote) {
      onVote(pollId, optionId);
    }
    
    if (onPointsEarned) {
      onPointsEarned(pointsEarned);
    }
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
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Predictions
        </h3>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-semibold text-blue-700">{userPoints} pts</span>
        </div>
      </div>

      <div className="space-y-6">
        {polls.map((poll) => (
          <div key={poll.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold">{poll.question}</h4>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
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
                          ? 'border-blue-500 bg-blue-50 text-blue-800'
                          : 'border-gray-200 bg-gray-50 text-gray-600 cursor-not-allowed'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 cursor-pointer'
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
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
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

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
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

// Export voor gebruik in andere projecten
export { PredictionsModule };
export type { PredictionsModuleProps, Poll, PollOption };
