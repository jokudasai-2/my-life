import React from 'react';
import { Target, Flame, Calendar, Trophy } from 'lucide-react';
import { GoalStats } from '../../types';

interface StatsGridProps {
  stats: GoalStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const items = [
    {
      icon: <Target className="w-6 h-6 text-pink-600" />,
      label: 'Goals Completed',
      value: stats.totalCompleted,
    },
    {
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      label: 'Current Streak',
      value: `${stats.currentStreak} days`,
    },
    {
      icon: <Trophy className="w-6 h-6 text-yellow-500" />,
      label: 'Best Streak',
      value: `${stats.bestStreak} days`,
    },
    {
      icon: <Calendar className="w-6 h-6 text-green-500" />,
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <div key={item.label} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div className="bg-gray-50 p-3 rounded-lg">{item.icon}</div>
            <span className="text-2xl font-bold">{item.value}</span>
          </div>
          <p className="mt-2 text-gray-600">{item.label}</p>
        </div>
      ))}
    </div>
  );
}