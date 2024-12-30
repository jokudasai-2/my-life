import React from 'react';
import { Flame } from 'lucide-react';
import { GoalStreak } from '../../types';

interface GoalStreaksProps {
  streaks: GoalStreak[];
}

export function GoalStreaks({ streaks }: GoalStreaksProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Goal Streaks</h2>
      <div className="space-y-4">
        {streaks.map((streak) => (
          <div key={streak.goalId} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Flame className={`w-5 h-5 ${streak.current > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
              <span className="font-medium">{streak.goalTitle}</span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Current Streak</div>
              <div className="font-semibold">{streak.current} days</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}