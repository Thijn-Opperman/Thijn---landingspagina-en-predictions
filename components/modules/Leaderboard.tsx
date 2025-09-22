'use client';

import { Trophy, Medal, Star, Crown } from 'lucide-react';
import { leaderboard, type LeaderboardEntry } from '@/lib/dummyData';

export default function Leaderboard() {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-gray-400" />;
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
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-primary-600" />
        <h3 className="text-2xl font-bold text-gradient">Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {leaderboard.map((entry, index) => (
          <div
            key={entry.id}
            className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-200 ${
              index < 3 ? 'shadow-lg' : 'hover:shadow-md'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${getRankColor(entry.rank)}`}>
              {getRankIcon(entry.rank)}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{entry.username}</h4>
                <div className="flex gap-1">
                  {entry.badges.map((badge, badgeIndex) => (
                    <span key={badgeIndex} className="text-lg">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  {entry.points.toLocaleString()} pts
                </span>
                <span>Rank #{entry.rank}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-primary-600">
                {entry.points.toLocaleString()}
              </div>
              <div className="text-sm text-gray-500">points</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
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
