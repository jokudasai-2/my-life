import React from 'react';
import { Trophy } from 'lucide-react';

interface AchievementBadgeProps {
  progress: number;
  target: number;
}

export function AchievementBadge({ progress, target }: AchievementBadgeProps) {
  if (progress <= target) return null;

  const percentage = Math.round((progress / target - 1) * 100);
  
  return (
    <div className="flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
      <Trophy className="w-4 h-4 mr-1" />
      <span>+{percentage}% achieved!</span>
    </div>
  );
}