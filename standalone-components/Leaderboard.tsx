import React from 'react';

// Standalone Leaderboard Component
// Geen externe dependencies behalve React

interface LeaderboardEntry {
  id: string;
  username: string;
  points: number;
  rank: number;
  avatar: string;
  badges: string[];
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  className?: string;
  maxEntries?: number;
  showBadges?: boolean;
  onUserClick?: (userId: string) => void;
}

export default function Leaderboard({ 
  entries, 
  className = "",
  maxEntries = 10,
  showBadges = true,
  onUserClick
}: LeaderboardProps) {
  const displayEntries = entries.slice(0, maxEntries);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
          </svg>
        );
      case 2:
        return (
          <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
          </svg>
        );
      case 3:
        return (
          <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-100 p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM8 15V9h4v6H8z" clipRule="evenodd" />
        </svg>
        <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Leaderboard
        </h3>
      </div>

      <div className="space-y-3">
        {displayEntries.map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
              index < 3 ? 'shadow-lg' : 'hover:shadow-md'
            } ${onUserClick ? 'cursor-pointer' : ''}`}
            onClick={() => onUserClick && onUserClick(entry.id)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankColor(entry.rank)}`}>
              {getRankIcon(entry.rank)}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{entry.username}</h4>
                {showBadges && (
                  <div className="flex gap-1">
                    {entry.badges.map((badge, badgeIndex) => (
                      <span key={badgeIndex} className="text-lg">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {entry.points.toLocaleString()} pts
                </span>
                <span>Rank #{entry.rank}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">
                {entry.points.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">points</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h4 className="font-semibold mb-2">How to climb the leaderboard:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Vote on predictions (+5 points each)</li>
          <li>• Answer trivia questions correctly (+5-10 points)</li>
          <li>• Complete mini-games (+10-20 points)</li>
          <li>• Engage with highlights (+1 point per like/share)</li>
        </ul>
      </div>
    </div>
  );
}

// Export voor gebruik in andere projecten
export { Leaderboard };
export type { LeaderboardProps, LeaderboardEntry };
